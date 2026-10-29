<script setup lang="ts">
const route = useRoute();
const slug = computed(() => String(route.params.slug));

interface Post {
  id: string | number;
  title: string;
  excerpt?: string;
  html: string;
  createdAt?: string;
  publishedAt?: string;
}

const { data, error } = await usePlutoPublicItem<Post>("post", slug);
const post = computed(() => data.value?.data);

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: "Post not found" });
}

useSeoMeta({
  title: () => post.value?.title,
  description: () => post.value?.excerpt,
  ogTitle: () => post.value?.title,
  ogDescription: () => post.value?.excerpt,
  ogType: "article",
});

usePlutoEditLink("post", slug);
</script>

<template>
  <PostArticle
    v-if="post"
    :title="post.title"
    :excerpt="post.excerpt"
    :html="post.html"
    :published-at="post.publishedAt"
    :created-at="post.createdAt"
  />
</template>
