<template>
  <n-space vertical size="large" class="section-wrapper">
    <n-button text @click="goBack">
      <template #icon>
        <n-icon><ArrowBackOutline /></n-icon>
      </template>
      Back
    </n-button>

    <n-space v-if="loading" justify="center" role="status" aria-live="polite">
      <n-spin size="large" aria-label="Loading miniature details" />
    </n-space>

    <n-result
      v-else-if="!loading && error"
      status="error"
      title="Failed to Load"
      :description="error"
    >
      <template #footer>
        <n-button @click="loadMiniature">Try Again</n-button>
      </template>
    </n-result>

    <transition-group name="fade-up" tag="div">
      <div v-if="!loading && !error && miniature" class="miniature-wrapper">
        <div class="miniature-header">
          <h1 class="hero-title miniature-title">{{ miniature.name }}</h1>
          <p v-if="miniature.subtitle" class="miniature-subtitle">{{ miniature.subtitle }}</p>
          <n-space justify="center" :size="8">
            <n-tag v-if="miniature.scale" :bordered="false">{{ miniature.scale }}</n-tag>
            <n-tag v-if="miniature.manufacturer" :bordered="false" type="info">
              {{ miniature.manufacturer }}
            </n-tag>
            <n-tag v-if="miniature.completedDate" :bordered="false" type="success">
              Completed {{ formatDate(miniature.completedDate) }}
            </n-tag>
          </n-space>
        </div>

        <n-divider />

        <div v-if="miniature.images?.length" class="image-carousel-wrapper">
          <n-image-group>
            <n-carousel
              effect="card"
              prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
              next-slide-style="transform: translateX(50%) translateZ(-800px);"
              class="image-carousel"
              :centered-slides="true"
              :show-dots="true"
            >
              <n-carousel-item
                v-for="(image, index) in miniature.images"
                :key="image.id || `image-${index}`"
                :style="{ width: '60%' }"
              >
                <n-image
                  :src="addSourceToFileUrl(image.url)"
                  :alt="image.caption || miniature.name"
                  object-fit="contain"
                  class="carousel-img"
                />
              </n-carousel-item>
            </n-carousel>
          </n-image-group>
        </div>

        <n-divider />

        <n-grid :x-gap="24" :y-gap="24" cols="1 768:2" class="details-grid">
          <n-grid-item>
            <n-card v-if="miniature.description" title="About">
              <n-text class="description-text">{{ miniature.description }}</n-text>
            </n-card>

            <n-card v-if="miniature.techniques?.length" title="Painting Techniques" class="mt-lg">
              <n-space>
                <n-tag
                  v-for="technique in miniature.techniques"
                  :key="technique"
                  :bordered="false"
                  type="warning"
                >
                  {{ technique }}
                </n-tag>
              </n-space>
            </n-card>
          </n-grid-item>

          <n-grid-item>
            <n-card v-if="miniature.paints?.length" title="Paints Used">
              <n-list bordered>
                <n-list-item v-for="paint in miniature.paints" :key="paint.name">
                  <template #prefix>
                    <div class="color-swatch" :style="{ backgroundColor: paint.colorHex }"></div>
                  </template>
                  <n-space vertical size="small">
                    <n-text strong>{{ paint.name }}</n-text>
                    <n-text depth="3" class="text-small">{{ paint.manufacturer }}</n-text>
                  </n-space>
                </n-list-item>
              </n-list>
            </n-card>

            <n-card v-if="miniature.timeSpent || miniature.difficulty" title="Stats">
              <n-descriptions :column="1" bordered>
                <n-descriptions-item v-if="miniature.timeSpent" label="Time Spent">
                  {{ miniature.timeSpent }} hours
                </n-descriptions-item>
                <n-descriptions-item v-if="miniature.difficulty" label="Difficulty">
                  {{ miniature.difficulty }}
                </n-descriptions-item>
                <n-descriptions-item v-if="miniature.theme?.name" label="Theme">
                  {{ miniature.theme.name }}
                </n-descriptions-item>
              </n-descriptions>
            </n-card>
          </n-grid-item>
        </n-grid>
      </div>
    </transition-group>
  </n-space>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  NSpin,
  NSpace,
  NButton,
  NIcon,
  NTag,
  NGrid,
  NGridItem,
  NCard,
  NImageGroup,
  NImage,
  NText,
  NList,
  NListItem,
  NDescriptions,
  NDescriptionsItem,
  NDivider,
  NCarousel,
  NCarouselItem,
  NResult,
} from 'naive-ui'
import { ArrowBackOutline } from '@vicons/ionicons5'
import api from '../services/api'
import { addSourceToFileUrl } from '../utils/fileUrl'

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const miniature = ref(null)
const error = ref(null)

// Safe navigation - go to miniatures list if no history
const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/miniatures')
  }
}

// Custom loader with inline error display
const loadMiniature = async () => {
  loading.value = true
  error.value = null
  try {
    const id = route.params.id
    const response = await api.getMiniatureById(id)
    miniature.value = response.data
  } catch (err) {
    // Show inline error instead of redirecting
    error.value = err.response?.status === 404 ? 'Miniature not found' : 'Failed to load miniature'
    miniature.value = null
  } finally {
    loading.value = false
  }
}

watch(
  () => route.params.id,
  () => {
    loadMiniature()
  },
  { immediate: true }
)
</script>

<style scoped>
.miniature-wrapper {
  max-width: 1000px;
  margin: 0 auto;
}

.miniature-header {
  text-align: center;
}

.miniature-title {
  text-align: center;
  margin-bottom: 8px;
}

.miniature-subtitle {
  font-size: 1.1rem;
  color: var(--text-color-3);
  margin: 0 0 16px 0;
}

.image-carousel-wrapper {
  margin: 0 auto;
}

.image-carousel {
  height: 400px;
  aspect-ratio: 16 / 9;
}

.description-text {
  white-space: pre-line;
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.carousel-img :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.details-grid {
  margin-top: 8px;
}

.details-grid :deep(.n-grid-item) {
  align-self: start;
}

.mt-lg {
  margin-top: 24px;
}

.color-swatch {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 2px solid rgba(128, 128, 128, 0.6);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.3),
    0 0 0 1px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .image-carousel {
    height: 280px;
  }
}
</style>
