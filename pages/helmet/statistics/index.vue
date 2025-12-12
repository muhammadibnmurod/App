<template>
  <div class="h-full">
    <HelmetStatistics />
  </div>
</template>

<script setup lang="ts">
import { useHeadTitleStore } from '@/store/titleStore';

const { setHeadTitle } = useHeadTitleStore();
const { t } = useI18n();
setHeadTitle('camera.statistics')

</script>