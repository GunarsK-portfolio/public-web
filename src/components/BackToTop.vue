<template>
  <Transition name="fade">
    <n-button
      v-show="showButton"
      circle
      size="large"
      type="primary"
      style="
        position: fixed;
        bottom: 40px;
        right: 40px;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      "
      @click="scrollToTop"
    >
      <template #icon>
        <n-icon size="24">
          <ArrowUpOutline />
        </n-icon>
      </template>
    </n-button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { NButton, NIcon } from 'naive-ui'
import { ArrowUpOutline } from '@vicons/ionicons5'

const showButton = ref(false)

const handleScroll = () => {
  showButton.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
