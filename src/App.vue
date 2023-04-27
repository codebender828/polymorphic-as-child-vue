<template>
  <div class="v-stack-4">
    <h1 class="space-block-end-5">Vue <code>asChild</code> prop</h1>
    <dialog-trigger-example-tsx class="space-block-end-5" />
    <dialog-trigger-example-vue class="space-block-end-5" />
  </div>
</template>

<script setup lang="ts">
import DialogTriggerExampleTsx from "./components/example/using-dialog-trigger-with-as-child-prop";
import DialogTriggerExampleVue from "./components/example/using-dialog-trigger-with-as-child-prop.vue";
</script>

<style>
.space-block-end-3 {
  margin-block-end: 0.75rem;
}
.space-block-end-4 {
  margin-block-end: 1rem;
}
.space-block-end-5 {
  margin-block-end: 1.25rem;
}

.space-inline-end-3 {
  margin-inline-end: 0.75rem;
}
.space-inline-end-4 {
  margin-inline-end: 1rem;
}
.space-inline-end-5 {
  margin-inline-end: 1.25rem;
}
</style>
