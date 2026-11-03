<script setup lang="ts">
const props = defineProps<{ post: Post }>();

const date = computed(() => postDate(props.post, "long"));

const WORDS_PER_MINUTE = 220;

const minutes = computed(() => {
  const words = props.post.html
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
});
</script>

<template>
  <article class="mx-auto max-w-2xl px-6 pt-6 pb-16">
    <NuxtLink
      to="/"
      class="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
    >
      <Icon name="lucide:arrow-left" class="size-4" />
      All posts
    </NuxtLink>

    <header class="mt-8">
      <p class="text-sm text-zinc-500">
        <time v-if="date">{{ date }}</time>
        <span v-if="date" aria-hidden="true"> · </span>
        <span>{{ minutes }} min read</span>
      </p>

      <h1
        class="mt-2 text-3xl font-semibold tracking-tight text-balance text-zinc-950 sm:text-4xl dark:text-white"
      >
        {{ post.title }}
      </h1>

      <p v-if="post.excerpt" class="mt-4 text-lg text-pretty text-zinc-500">
        {{ post.excerpt }}
      </p>
    </header>

    <PlutoImage
      v-if="post.cover"
      :media="post.cover"
      sizes="xs:100vw md:672px"
      loading="eager"
      fetchpriority="high"
      class="mt-10 h-auto w-full rounded-xl"
    />

    <PlutoHtml :html="post.html" tag="div" class="mt-10" data-pluto-post-body />
  </article>
</template>
