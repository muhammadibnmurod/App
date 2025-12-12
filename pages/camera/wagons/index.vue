<template>
  <CameraWagonsView />
</template>

<script setup lang="ts">
import { useHeadTitleStore } from '@/store/titleStore';

const { setHeadTitle } = useHeadTitleStore();
const { t } = useI18n();
setHeadTitle('wagons.title')

</script>