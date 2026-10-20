<script setup lang="ts">
const route = useRoute();

// One published post. Its body comes as sanitized HTML in `html`. A draft
// or a missing slug gives a 404.
const { data: post, error } = await usePlutoCmsItem(
  "post",
  String(route.params.slug),
);

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: "Post not found" });
}

useHead({ title: () => String(post.value?.title ?? "Post") });

const date = computed(() => {
  const value = post.value?.publishedAt ?? post.value?.createdAt;
  return typeof value === "string"
    ? new Date(value).toLocaleDateString("en", { dateStyle: "long" })
    : "";
});
</script>

<template>
  <UContainer v-if="post" class="py-12">
    <article class="mx-auto flex max-w-3xl flex-col gap-6">
      <div class="flex flex-col gap-2">
        <NuxtLink to="/" class="text-muted hover:text-primary text-sm">
          ← All posts
        </NuxtLink>

        <h1 class="text-highlighted text-4xl font-bold tracking-tight">
          {{ post.title }}
        </h1>

        <p class="text-muted text-sm">{{ date }}</p>
      </div>

      <PlutoMarkdown :html="post.html" tag="div" />
    </article>
  </UContainer>
</template>
