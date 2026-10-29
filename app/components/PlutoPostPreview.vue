<script setup lang="ts">
// The preview of the post editor (in the admin). It replaces the default
// preview of Pluto and renders the post with PostArticle.vue, the same
// component as the post page, so the preview always looks like the page.
const props = defineProps<{
  contentType: string;
  /** The fields of the post, without the body. */
  item: Record<string, unknown>;
  /** The body as sanitized HTML. */
  html: string;
}>();

const text = (value: unknown) =>
  typeof value === "string" ? value : undefined;
</script>

<template>
  <PostArticle
    :title="text(props.item.title) ?? ''"
    :excerpt="text(props.item.excerpt)"
    :html="html"
    :published-at="text(props.item.publishedAt)"
    :created-at="text(props.item.createdAt)"
  />
</template>
