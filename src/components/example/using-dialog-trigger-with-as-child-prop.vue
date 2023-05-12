<template>
  <div>
    <dialog-trigger class="space-inline-end-4" id="some-random-id" as-child>
      <span class="redhot"> Dialog Trigger (asChild &rarr; Vue SFC) </span>
    </dialog-trigger>

    <dialog-trigger class="space-inline-end-4" id="blue-cats">
      Dialog Trigger Default (Vue SFC)
    </dialog-trigger>
  </div>
</template>

<script setup lang="ts">
import { DialogTrigger } from "../dialog-trigger";
</script>

<style>
.redhot {
  background-color: red;
}
</style>
