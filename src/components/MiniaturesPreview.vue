<template>
  <n-space
    id="miniatures"
    vertical
    :size="32"
    style="padding: 80px 20px; max-width: 900px; margin: 0 auto"
  >
    <h2 style="font-size: 36px; font-weight: 700; margin: 0">Miniature Painting</h2>

    <n-divider />

    <n-text style="font-size: 16px; line-height: 1.6">
      Beyond coding, I enjoy painting miniatures from various tabletop games and fantasy worlds.
      Each project is a study in patience, technique, and bringing tiny characters to life.
    </n-text>

    <n-space v-if="loading" justify="center">
      <n-spin size="large" />
    </n-space>

    <n-grid v-else :cols="3" :x-gap="24" :y-gap="24" responsive="screen">
      <n-grid-item v-for="theme in featuredThemes" :key="theme.name">
        <n-card hoverable style="cursor: pointer" @click="$router.push('/gallery')">
          <template #cover>
            <img
              :src="theme.coverImage"
              :alt="theme.name"
              style="width: 100%; height: 200px; object-fit: cover"
            />
          </template>
          <n-space vertical :size="8" align="center">
            <n-text strong style="font-size: 18px">{{ theme.name }}</n-text>
            <n-text depth="3">{{ theme.count }} miniatures</n-text>
          </n-space>
        </n-card>
      </n-grid-item>
    </n-grid>

    <n-space justify="center" style="margin-top: 16px">
      <n-button type="primary" size="large" @click="$router.push('/gallery')">
        View Full Gallery →
      </n-button>
    </n-space>
  </n-space>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { NSpace, NDivider, NText, NSpin, NGrid, NGridItem, NCard, NButton } from 'naive-ui'

const loading = ref(true)
const featuredThemes = ref([
  {
    name: 'D&D Miniatures',
    slug: 'dnd',
    coverImage: 'https://via.placeholder.com/300x200/4A5568/FFFFFF?text=D%26D',
    count: 12,
  },
  {
    name: 'Stormlight Archive',
    slug: 'stormlight',
    coverImage: 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Stormlight',
    count: 8,
  },
  {
    name: 'Bloodborne',
    slug: 'bloodborne',
    coverImage: 'https://via.placeholder.com/300x200/EF4444/FFFFFF?text=Bloodborne',
    count: 5,
  },
])

onMounted(async () => {
  try {
    // TODO: Fetch actual theme data from API
    // const response = await api.getMiniatureThemes()
    // featuredThemes.value = response.data
    loading.value = false
  } catch (error) {
    console.error('Failed to load miniature themes:', error)
    loading.value = false
  }
})
</script>
