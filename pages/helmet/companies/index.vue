<template>
  <HelmetCompaniesView />
</template>

<script setup lang="ts">
import { useHeadTitleStore } from '@/store/titleStore';

const { setHeadTitle } = useHeadTitleStore();
setHeadTitle('camera.companies')

</script>