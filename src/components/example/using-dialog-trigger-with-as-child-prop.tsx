import { defineComponent } from "vue";
import { DialogTrigger, useId } from "../dialog-trigger";

// TSX Example
const DialogTriggerExampleTsx = defineComponent(() => {
  const idForAsChild = useId();
  const idForNormal = useId();

  return () => (
    <div>
      <DialogTrigger asChild id={idForAsChild} class="space-inline-end-4">
        <span>Dialog Trigger (asChild &rarr; Vue JSX)</span>
      </DialogTrigger>

      <DialogTrigger class="space-inline-end-4" id={idForNormal}>
        Dialog Trigger Default (Vue JSX)
      </DialogTrigger>
    </div>
  );
});

export default DialogTriggerExampleTsx;
