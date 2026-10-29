<script setup lang="ts">
const props = defineProps<{
  contentType: string;
  item: Record<string, unknown>;
  html: string;
}>();

// The admin item uses the field names of the backend: `publishedAt` in the
// GitHub CMS, `published_at` in Supabase.
const text = (...values: unknown[]) =>
  values.find((value): value is string => typeof value === "string");
</script>

<template>
  <PostArticle
    :title="text(props.item.title) ?? ''"
    :excerpt="text(props.item.excerpt)"
    :html="html"
    :published-at="text(props.item.publishedAt, props.item.published_at)"
    :created-at="text(props.item.createdAt, props.item.created_at)"
  />
</template>
