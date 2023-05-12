/**
 * We use our own `mergeProps` instead of Vue's mergeProps to correctly handle event listeners.
 *
 * Credit: headless-ui/vue: https://github.com/tailwindlabs/headlessui/blob/main/packages/@headlessui-vue/src/utils/render.ts#L196
 */
export function mergeProps(...propsArgs: Record<any, any>[]) {
  if (propsArgs.length === 0) return {};
  if (propsArgs.length === 1) return propsArgs[0];

  let target: Record<any, any> = {};

  let eventHandlers: Record<
    string,
    ((
      event: { defaultPrevented: boolean },
      ...args: any[]
    ) => void | undefined)[]
  > = {};

  for (let props of propsArgs) {
    for (let prop in props) {
      // Collect event handlers
      if (prop.startsWith('on') && typeof props[prop] === 'function') {
        eventHandlers[prop] ??= [];
        eventHandlers[prop].push(props[prop]);
      } else {
        // Override incoming prop
        target[prop] = props[prop];
      }
    }
  }

  // Do not bind any event handlers when there is a `disabled` or `aria-disabled` prop set.
  if (target.disabled || target['aria-disabled']) {
    return Object.assign(
      target,
      // Set all event listeners that we collected to `undefined` so that `cloneVNode` from Vue doesn't drop them. `cloneVNode` only merges the
      // existing and new props, they don't just override therefore we have to
      // explicitly declare and nullify them.
      Object.fromEntries(
        Object.keys(eventHandlers).map((eventName) => [eventName, undefined])
      )
    );
  }

  // Merge event handlers
  for (let eventName in eventHandlers) {
    Object.assign(target, {
      [eventName](event: { defaultPrevented: boolean }, ...args: any[]) {
        let handlers = eventHandlers[eventName];

        for (let handler of handlers) {
          if (event instanceof Event && event.defaultPrevented) {
            return;
          }

          handler(event, ...args);
        }
      },
    });
  }

  return target;
}
