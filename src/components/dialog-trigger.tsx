import { type SetupContext, defineComponent, mergeProps } from "vue";
import { AsChildProps, withAsChild } from "../withAsChild";

// Fake Polymorphic factory
function comp(Tag: string) {
  return defineComponent((_, { slots, attrs }) => {
    return () => {
      return (
        <Tag {..._} {...attrs}>
          {slots?.default?.(attrs)}
        </Tag>
      );
    };
  });
}

const ark = {
  // Replace comp with any button
  button: withAsChild(comp("button")),
  div: withAsChild(comp("div")),
  section: withAsChild(comp("div")),
};

let _id = 0;
export function useId() {
  return `${++_id}`;
}

// Some composable from Ark that returns props
function useDialogTriggerProps(userProps: Record<any, any>) {
  function handlePointerDown(e: any) {
    console.log("Do something", e);
    alert("Dialog Trigger Clicked " + JSON.stringify(userProps, null, 2));
  }

  const id = useId();

  return {
    id,
    ...userProps,
    "data-dialog-trigger": "",
    onPointerdown: handlePointerDown,
  };
}

type DialogProps = AsChildProps & {
  id: string;
};

// Some Ark UI component that uses the zag hook and returns a polymorphic factory
export const DialogTrigger = defineComponent<DialogProps>(
  (userProps, { attrs, slots }: SetupContext) => {
    const dialogTrigggerProps = useDialogTriggerProps(userProps);
    const mergedProps = mergeProps(dialogTrigggerProps, attrs);

    return () => (
      // Take note that the component props are spread in both the `<ark.button />` component
      // as well as inside the default slot. This allows us to render it using scoped slots.
      <ark.button {...mergedProps}>{slots.default?.(mergedProps)}</ark.button>
    );
  }
);

// See usage examples in the example folder.
