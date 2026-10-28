<script setup lang="ts">
// The preview of the post editor, in Markdown mode. It replaces the default
// preview of Pluto, so the preview looks like `pages/posts/[slug].vue`. Keep the
// two in step. `data-pluto-post-body` marks the body, so the outline can scroll
// to a heading.
const props = defineProps<{
  contentType: string;
  /** The fields of the post, without the body. */
  item: Record<string, unknown>;
  /** The body as sanitized HTML. */
  html: string;
}>();

const text = (value: unknown) => (typeof value === "string" ? value : "");

const date = computed(() => {
  const value = text(props.item.publishedAt) || text(props.item.createdAt);
  return value
    ? new Date(value).toLocaleDateString("en", { dateStyle: "long" })
    : "";
});
</script>

<template>
  <UContainer class="py-12">
    <article class="mx-auto flex max-w-3xl flex-col gap-6">
      <div class="flex flex-col gap-2">
        <h1 class="text-highlighted text-4xl font-bold tracking-tight">
          {{ text(item.title) }}
        </h1>

        <p class="text-muted text-sm">{{ date }}</p>
      </div>

      <PlutoMarkdown :html="html" tag="div" data-pluto-post-body />
    </article>
  </UContainer>
</template>
