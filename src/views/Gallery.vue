<template>
  <n-space vertical size="large" class="section-wrapper">
    <n-button text @click="$router.back()">
      <template #icon>
        <n-icon><ArrowBackOutline /></n-icon>
      </template>
      Back to Home
    </n-button>

    <n-page-header title="Miniatures Gallery" subtitle="My painting projects organized by theme">
    </n-page-header>

    <n-space v-if="loading" justify="center">
      <n-spin size="large" />
    </n-space>

    <transition-group name="fade-up" tag="div">
      <div v-if="!loading" class="gallery-wrapper">
        <n-space vertical size="large">
          <n-card
            v-for="theme in themes"
            :key="theme.id"
            :title="theme.name"
            hoverable
            class="theme-card"
          >
            <template #header-extra>
              <n-tag :bordered="false" type="info">{{ theme.miniatures.length }} miniatures</n-tag>
            </template>

            <n-text depth="3" class="theme-description">
              {{ theme.description }}
            </n-text>

            <n-grid :x-gap="16" :y-gap="16" :cols="1" :s="2" :m="3" :l="4">
              <n-grid-item v-for="mini in theme.miniatures" :key="mini.id">
                <n-card
                  hoverable
                  class="miniature-card"
                  @click="$router.push(`/miniatures/${mini.id}`)"
                >
                  <n-image
                    :src="mini.coverImage"
                    :alt="mini.name"
                    object-fit="cover"
                    class="miniature-image"
                    preview-disabled
                  />
                  <n-space vertical size="small" class="miniature-info">
                    <n-text strong>{{ mini.name }}</n-text>
                    <n-space>
                      <n-tag v-if="mini.scale" size="small" :bordered="false">
                        {{ mini.scale }}
                      </n-tag>
                      <n-tag v-if="mini.manufacturer" size="small" :bordered="false" type="info">
                        {{ mini.manufacturer }}
                      </n-tag>
                    </n-space>
                  </n-space>
                </n-card>
              </n-grid-item>
            </n-grid>
          </n-card>
        </n-space>
      </div>
    </transition-group>
  </n-space>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  NSpace,
  NSpin,
  NPageHeader,
  NButton,
  NIcon,
  NCard,
  NTag,
  NText,
  NGrid,
  NGridItem,
  NImage,
} from 'naive-ui'
import { ArrowBackOutline } from '@vicons/ionicons5'
import api from '../services/api'
import { useErrorHandler } from '../composables/useErrorHandler'

const { handleError } = useErrorHandler()
const loading = ref(true)
const themes = ref([])

const loadThemes = async () => {
  try {
    const response = await api.getMiniatureThemes()
    themes.value = response.data
  } catch (err) {
    handleError(err, { retryFn: loadThemes })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadThemes()
})
</script>

<style scoped>
.back-button {
  margin-bottom: 24px;
}

.theme-card {
  cursor: default;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  margin-bottom: 32px;
}

.theme-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.theme-description {
  margin-bottom: 16px;
}

.miniature-card {
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.miniature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.miniature-image {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  object-fit: cover;
}

.miniature-info {
  margin-top: 12px;
}
</style>
