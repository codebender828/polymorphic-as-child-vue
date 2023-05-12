import {
  type PropType,
  defineComponent,
  h,
  Fragment,
  VNode,
  cloneVNode,
} from "vue";

export type AsChildProps = {
  asChild?: boolean;
};

type RenderFunctionArgs = Parameters<typeof h>[0];

export function withAsChild(__component: RenderFunctionArgs) {
  const component = defineComponent<AsChildProps>(
    ({ asChild }, { attrs, slots }) => {
      if (!asChild)
        return () => <__component {...attrs}>{slots.default?.()}</__component>;
      else {
        return () => {
          let children = slots.default?.();
          children = renderSlotFragments(children || []);

          if (Object.keys(attrs).length > 0) {
            const [firstChild, ...otherChildren] = children;
            if (!isValidVNodeElement(firstChild) || otherChildren.length > 0)
              // TODO Improve error message
              throw new Error("Only one child is allowed");

            const mergedProps = mergeProps(firstChild.props ?? {}, attrs);
            let cloned = cloneVNode(firstChild, mergedProps);
            // Explicitly override props starting with `on`.
            // It seems cloneVNode from Vue doesn't like overriding `onXXX` props. So
            // we have to do it manually.
            for (let prop in mergedProps) {
              if (prop.startsWith("on")) {
                cloned.props ||= {};
                cloned.props[prop] = mergedProps[prop];
              }
            }
            return cloned;
          }

          if (Array.isArray(children) && children.length === 1) {
            return children[0];
          }

          return children;
        };
      }
    }
  );

  component.props = {
    asChild: Boolean as PropType<boolean>,
  };
  component.inheritAttrs = false;
  return component;
}

function isValidVNodeElement(input: any): boolean {
  // No children
  if (input == null) return false;
  // Raw HTML elements like 'div', 'span', e.t.c.
  if (typeof input.type === "string") return true;
  // Other Vue component objects
  if (typeof input.type === "object") return true;
  // Functional components
  if (typeof input.type === "function") return true;
  // HTML Comment nodes or Text nodes
  return false;
}

/**
 * When you create a component and pass a <slot />, Vue wraps
 * the contents of <slot /> inside a <Fragment /> component and assigns
 * the <slot /> VNode a type of Fragment.
 *
 * So why are we flattening here? Vue renders VNodes from the leaf
 * nodes going up to the root. In other words, when executing the render function
 * of each component, it executes the child render functions first before the parents.
 *
 * This means that at any components render function execution context, all it's children
 * VNodes should have already been rendered -- and that includes any slots! :D
 *
 * In the edgecase where we pass in a component with slots to the `asChild` component,
 * we shall need to flatten those slot fragment VNodes so as to extract all it's children VNodes
 * to correctly apply the props and event listeners from the with as child components.
 *
 * We do this recursively to ensure that all first child slots are rendered into VNodes before passing events.
 * to the first actual element VNode.
 */
function renderSlotFragments(children: VNode[]): VNode[] {
  return children.flatMap((child) => {
    if (child.type === Fragment) {
      return renderSlotFragments(child.children as VNode[]);
    }
    return [child];
  });
}

/**
 * We use our own `mergeProps` instead of Vue's merge props to correctly collect our own props
 *
 */
function mergeProps(...propsArgs: Record<any, any>[]) {
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
      if (prop.startsWith("on") && typeof props[prop] === "function") {
        eventHandlers[prop] ??= [];
        eventHandlers[prop].push(props[prop]);
      } else {
        // Override incoming prop
        target[prop] = props[prop];
      }
    }
  }

  // Do not bind any event handlers when there is a `disabled` or `aria-disabled` prop set.
  if (target.disabled || target["aria-disabled"]) {
    return Object.assign(
      target,
      // Set all event listeners that we collected to `undefined`. This is
      // important because of the `cloneVNode` from Vue, which merges the
      // existing and new props, they don't just override therefore we have to
      // explicitly nullify them.
      Object.fromEntries(
        Object.keys(eventHandlers).map((eventName) => [eventName, undefined])
      )
    );
  }

  console.log("eventHandlers", eventHandlers);

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
