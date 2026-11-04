# Plain CSS, core's ColorModeButton, formatPublishedDate

The user asked for plain CSS in place of `@apply` (with variables for the tokens), `main.css` in
place of `tailwind.css`, core's `ColorModeButton` in place of `ColorModeSwitch`, `postDate` from
core, and no `@types/node` and `vue-tsc`.

## Checklist

- [x] `app/assets/css/main.css`: plain CSS, no `@apply`. The colors are variables in `@theme`
      (`--color-page`, `-body`, `-heading`, `-muted`, `-line`, `-line-strong`, `-surface`), with
      the dark values under `.dark`, so each one is also a utility (`text-heading`). Sizes read the
      Tailwind theme variables (`--spacing`, `--text-*`, `--radius-*`).
- [x] The components use the color utilities: no `dark:` pair for a color of the site.
- [x] `<ColorModeButton>` of core in `SiteNavbar`, styled with Tailwind classes.
- [x] `formatPublishedDate` of core in place of `app/utils/post.ts` (needs core 0.55).
- [x] No `@types/node`, no `vue-tsc`. Nuxt no longer downloads a type checker, so the `typecheck`
      script goes too. A one-off `vue-tsc` found no type errors.
- [x] README and the docs (project structure, the CSS entry).
- [x] Live check with local core: light, dark, the post with its cover.
