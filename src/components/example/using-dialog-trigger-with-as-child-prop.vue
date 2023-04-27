<template>
  <div>
    <dialog-trigger
      class="space-inline-end-4"
      id="some-random-id"
      as-child
      v-slot:default="props"
    >
      <span v-bind="props">Dialog Trigger (asChild &rarr; Vue SFC)</span>
    </dialog-trigger>

    <dialog-trigger class="space-inline-end-4" id="blue-cats">
      <span>Dialog Trigger Default (Vue SFC)</span>
    </dialog-trigger>
  </div>
</template>

<script setup lang="ts">
import { DialogTrigger } from "../dialog-trigger";
</script>
