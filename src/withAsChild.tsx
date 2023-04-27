import { type PropType, defineComponent, h } from "vue";

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
        return () => slots.default?.(attrs);
      }
    }
  );

  component.props = {
    asChild: Boolean as PropType<boolean>,
  };
  component.inheritAttrs = false;
  return component;
}
