<template>
  <WagonView />
</template>

<script setup lang="ts">
import { useHeadTitleStore } from '@/store/titleStore';

const { setHeadTitle } = useHeadTitleStore();
setHeadTitle('wagons.title')

</script>