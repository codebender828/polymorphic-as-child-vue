# polymorphic-as-child-vue

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/vitejs-vite-1t1ngf)

Implements the `asChild` prop for Vue.js

When the `asChild` prop is passed, the user should remember to also extract the slot props from the parent component.

### In Vue

```vue
<dialog-trigger as-child v-slot:default="props">
  <span v-bind="props">Dialog Trigger (asChild &rarr; Vue SFC)</span>
</dialog-trigger>

<!-- renders <span /> element -->
```

### In TSX

```tsx
<DialogTrigger id={id} asChild class="space-inline-end-4">
  {{
    default: (props: any) => (
      <span {...props}>Dialog Trigger (asChild &rarr; Vue JSX)</span>
    ),
  }}
</DialogTrigger>

//  renders <span /> element
```

See examples in usage folder
