<script setup lang="ts">
const route = useRoute();
const slug = computed(() => String(route.params.slug));

const { data, error } = await usePlutoPublicItem<Post>("post", slug);
const post = computed(() => data.value?.data);

if (error.value) {
  throw createError({ status: 404, statusText: "Post not found" });
}

// An absolute URL for the cover in `og:image`.
const origin = useRequestURL().origin;

useSeoMeta({
  title: () => post.value?.title,
  description: () => post.value?.excerpt,
  ogTitle: () => post.value?.title,
  ogDescription: () => post.value?.excerpt,
  ogType: "article",
  ogImage: () =>
    post.value?.cover ? new URL(post.value.cover.url, origin).href : undefined,
});

usePlutoEditLink("post", () => post.value?.id);
</script>

<template>
  <PostArticle v-if="post" :post="post" />
</template>
