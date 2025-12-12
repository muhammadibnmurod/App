<template>
  <CameraItemsView v-if="id && camera_id" :id="id" :camera_id="camera_id" />
</template>

<script setup lang="ts">
import { useHeadTitleStore } from '@/store/titleStore';

const route = useRoute();
const id = route.params.id as string;
const camera_id = route.params.camera_id as string;

const { setHeadTitle } = useHeadTitleStore();

const { data } = await useApiService().WagonSession.WagonSessionController_findOne(camera_id);
setHeadTitle(data.value?.camera_name || 'Camera Details');

</script>