import {
  type PropType,
  defineComponent,
  h,
  type Slots,
  isVNode,
  type VNode,
} from "vue";

export type AsChildProps = {
  asChild?: boolean;
};

type RenderFunctionArgs = Parameters<typeof h>[0];

/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 */
export function getValidChildren(slots: Slots | null): VNode[] {
  const slotArray = slots?.default?.() || [];
  return slotArray.filter((child) => {
    return isVNode(child);
  });
}

export function withAsChild(__component: RenderFunctionArgs) {
  const component = defineComponent<AsChildProps>(
    ({ asChild }, { attrs, slots }) => {
      if (!asChild)
        return () => <__component {...attrs}>{slots.default?.()}</__component>;
      else {
        console.log("attrs", attrs);
        return () => slots.default?.(attrs); //  {
      }
    }
  );

  component.props = {
    asChild: Boolean as PropType<boolean>,
  };
  component.inheritAttrs = false;
  return component;
}
