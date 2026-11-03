<script setup lang="ts">
const siteName = useRuntimeConfig().public.websiteName;

useHead({
  titleTemplate: (title) =>
    title && title !== siteName ? `${title} - ${siteName}` : siteName,
});
</script>

<template>
  <!-- `--pluto-page-height`: the viewport, less the admin bar while it shows. -->
  <div class="flex min-h-(--pluto-page-height) flex-col">
    <SiteNavbar />

    <main class="flex-1">
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>
