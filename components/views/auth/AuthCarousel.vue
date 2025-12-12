<>
<script setup lang="ts">

  import AuthTopLeft from "~/assets/images/auth-top-left.png"
  import AuthTopRight from "~/assets/images/auth-top-right.png"
  import AuthBottomLeft from "~/assets/images/auth-bottom-left.png"
  import AuthBottomRight from "~/assets/images/auth-bottom-right.png"

  import AuthAiCarousel from "~/assets/images/auth-AI-carousel.png"
  import AuthAiPereezd from "~/assets/images/auth-AI-pereezd.png"

  const carouselList = ref([
    {
      image: AuthAiCarousel
    }, {
      image: AuthAiPereezd
    }
  ])
</script>


<template>
  <n-carousel trigger="click" class="!h-full" show-arrow :autoplay="false">
    <template v-for="(item, index) in carouselList" :key="index"
              class="!h-full border border-surface-30 bg-surface-20">
      <div
          class="bg-radial-auth dark:bg-dark-radial-auth !overflow-hidden w-full h-full flex flex-col gap-[22px] relative !z-[9999]">

        <div class="absolute flex flex-col left-20 right-20 top-[55px] text-center z-[99999]">
          <span class="font-bold text-[#0A0F1A] dark:text-white text-[30px]">
            {{ $t('auth.slide.title') }}
          </span>
          <span class="text-primary-300">
            {{ $t('auth.slide.description') }}
          </span>
        </div>

        <div class="absolute flex items-center justify-center w-full h-full px-10">
          <img :src="item.image" :alt="item.image" class="m-auto w-full my-auto object-cover" />
        </div>

      </div>
    </template>
  </n-carousel>
</template>

<style>
  .el-carousel__container {
    @apply !h-full !rounded-lg !overflow-hidden;
  }
</style>