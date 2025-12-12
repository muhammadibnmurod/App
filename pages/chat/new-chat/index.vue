<template>
  <NewChatView />
</template>
<script setup lang="ts">
import { useHeadTitleStore } from '@/store/titleStore';

const { setHeadTitle, headTitle } = useHeadTitleStore();
const { t } = useI18n();
setHeadTitle(t('chat.title'))

</script>