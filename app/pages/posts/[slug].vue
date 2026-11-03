<script setup lang="ts">
const route = useRoute();

// A missing post shows the 404 page. `usePost` also sets the SEO tags and the
// "Edit Post" button of the admin bar.
const { post } = await usePost(() => String(route.params.slug));
</script>

<template>
  <PostArticle v-if="post" :post="post" />
</template>
