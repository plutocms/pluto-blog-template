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

// The form holds the id of the cover. The preview reads its record from the
// media library (the preview runs for a signed-in editor).
const media = usePlutoMedia();
const coverId = computed(() => mediaFieldIds(props.item.cover)[0]);
const { data: cover } = useAsyncData(
  "post-preview-cover",
  async () =>
    coverId.value && media.enabled
      ? ((await media.get([coverId.value]))[0] ?? null)
      : null,
  { watch: [coverId], server: false },
);
</script>

<template>
  <PostArticle
    :title="text(props.item.title) ?? ''"
    :excerpt="text(props.item.excerpt)"
    :html="html"
    :published-at="text(props.item.publishedAt, props.item.published_at)"
    :created-at="text(props.item.createdAt, props.item.created_at)"
    :cover="cover"
  />
</template>
