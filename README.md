# polymorphic-as-child-vue

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/vitejs-vite-1t1ngf)

Implements the `asChild` prop for Vue.js

### In Vue

```vue
<dialog-trigger as-child>
  <span>Dialog Trigger (asChild &rarr; Vue SFC)</span>
</dialog-trigger>

<!-- renders <span /> element -->
```

### In TSX

```tsx
<DialogTrigger id={id} asChild class="space-inline-end-4">
  <span>Dialog Trigger (asChild &rarr; Vue JSX)</span>
</DialogTrigger>

//  renders <span /> element
```

See examples in usage folder
