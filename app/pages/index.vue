<script setup lang="ts">
useHead({ title: "Blog" });

interface PostSummary {
  id: string;
  title: string;
  excerpt: string;
  createdAt?: string;
  publishedAt?: string;
}

// The published posts, newest first, from the public API
// (`/api/pluto/v1/content/post`). Drafts never appear here.
const { data, error } = await usePlutoPublicList<PostSummary>("post", {
  limit: 20,
});

function formatDate(value: unknown): string {
  return typeof value === "string"
    ? new Date(value).toLocaleDateString("en", { dateStyle: "long" })
    : "";
}
</script>

<template>
  <UContainer class="py-12">
    <h1 class="text-highlighted mb-8 text-4xl font-bold tracking-tight">
      Blog
    </h1>

    <UAlert
      v-if="error"
      color="error"
      variant="subtle"
      title="Could not load the posts"
      :description="error.statusMessage || error.message"
    />

    <p v-else-if="!data?.data.length" class="text-muted">No posts yet.</p>

    <div v-else class="grid gap-6 sm:grid-cols-2">
      <UCard
        v-for="post in data.data"
        :key="post.id"
        :ui="{ body: 'flex flex-col gap-2' }"
      >
        <p class="text-muted text-sm">
          {{ formatDate(post.publishedAt ?? post.createdAt) }}
        </p>

        <NuxtLink
          :to="`/posts/${post.id}`"
          class="text-highlighted hover:text-primary text-xl font-semibold"
        >
          {{ post.title }}
        </NuxtLink>

        <p class="text-toned">{{ post.excerpt }}</p>
      </UCard>
    </div>
  </UContainer>
</template>
