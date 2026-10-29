<script setup lang="ts">
const props = defineProps<{
  contentType: string;
  item: Record<string, unknown>;
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
