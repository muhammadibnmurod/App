<template>
  <AllWagonView />
</template>

<script setup lang="ts">
import { useHeadTitleStore } from '@/store/titleStore';

const { setHeadTitle } = useHeadTitleStore();
setHeadTitle('wagon.listAll')

</script>