import { defineComponent } from "vue";
import { DialogTrigger, useId } from "../dialog-trigger";

// TSX Example
const DialogTriggerExampleTsx = defineComponent(() => {
  const id = useId();

  return () => (
    <div>
      <DialogTrigger id={id} asChild class="space-inline-end-4">
        {{
          default: (props: any) => (
            <span {...props}>Dialog Trigger (asChild &rarr; Vue JSX)</span>
          ),
        }}
      </DialogTrigger>
      <DialogTrigger class="space-inline-end-4" id={id}>
        Dialog Trigger Default (Vue JSX)
      </DialogTrigger>
    </div>
  );
});

export default DialogTriggerExampleTsx;
