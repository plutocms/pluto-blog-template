<script setup lang="ts">
// The language of the public site. Each language is named in its own
// language, so a visitor finds theirs. The choice is kept in the
// `pluto-site-locale` cookie. With one site language, nothing shows.
const { t, locale, locales, setLocale } = usePlutoSiteI18n();

function languageName(code: string): string {
  const name = new Intl.DisplayNames([code], { type: "language" }).of(code);
  return name ? name.charAt(0).toLocaleUpperCase(code) + name.slice(1) : code;
}

const items = computed(() =>
  locales.value.map((code) => ({
    label: languageName(code),
    type: "checkbox" as const,
    checked: code === locale.value,
    onSelect: () => setLocale(code),
  })),
);
</script>

<template>
  <UDropdownMenu v-if="locales.length > 1" :items="items">
    <UButton
      :aria-label="t('site.nav.language')"
      :label="locale.split('-')[0]?.toUpperCase()"
      icon="i-lucide-languages"
      color="neutral"
      variant="ghost"
      size="md"
    />
  </UDropdownMenu>
</template>
