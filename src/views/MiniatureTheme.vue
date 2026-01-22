<template>
  <n-space vertical size="large" class="section-wrapper">
    <n-button text @click="$router.push('/miniatures')">
      <template #icon>
        <n-icon><ArrowBackOutline /></n-icon>
      </template>
      Back to Themes
    </n-button>

    <n-space v-if="loading" justify="center" role="status" aria-live="polite">
      <n-spin size="large" aria-label="Loading theme" />
    </n-space>

    <transition-group name="fade-up" tag="div">
      <div v-if="!loading && theme" class="theme-wrapper">
        <div class="theme-header">
          <h1 class="hero-title theme-title">{{ theme.name }}</h1>
          <p v-if="theme.description" class="theme-description">{{ theme.description }}</p>
          <n-tag v-if="theme.miniatures?.length" :bordered="false" type="info" class="theme-count">
            {{ theme.miniatures.length }} miniature{{ theme.miniatures.length !== 1 ? 's' : '' }}
          </n-tag>
        </div>

        <n-divider />

        <n-grid :x-gap="24" :y-gap="24" cols="1 512:2 768:3 1024:4" class="miniatures-grid">
          <n-grid-item v-for="mini in theme.miniatures" :key="mini.id">
            <n-card
              hoverable
              class="card-hoverable miniature-card"
              tabindex="0"
              role="link"
              :aria-label="`View ${mini.name} details`"
              @click="$router.push(`/miniatures/projects/${mini.id}`)"
              @keydown.enter="$router.push(`/miniatures/projects/${mini.id}`)"
            >
              <template #cover>
                <div class="image-wrapper">
                  <img
                    :src="mini.images?.[0]?.url"
                    :alt="mini.name"
                    class="miniature-image"
                    loading="lazy"
                    width="300"
                    height="300"
                  />
                </div>
              </template>
              <div class="card-content">
                <n-text strong class="miniature-name">{{ mini.name }}</n-text>
                <n-space :size="4" class="miniature-tags">
                  <n-tag v-if="mini.scale" size="small" :bordered="false">
                    {{ mini.scale }}
                  </n-tag>
                  <n-tag v-if="mini.manufacturer" size="small" :bordered="false" type="info">
                    {{ mini.manufacturer }}
                  </n-tag>
                </n-space>
              </div>
            </n-card>
          </n-grid-item>
        </n-grid>

        <n-empty v-if="!theme.miniatures?.length" description="No miniatures in this theme yet" />
      </div>
    </transition-group>
  </n-space>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  NSpace,
  NSpin,
  NButton,
  NIcon,
  NCard,
  NTag,
  NText,
  NGrid,
  NGridItem,
  NEmpty,
  NDivider,
} from 'naive-ui'
import { ArrowBackOutline } from '@vicons/ionicons5'
import api from '../services/api'
import { useErrorHandler } from '../composables/useErrorHandler'
import { useSeoMeta } from '../composables/useSeoMeta'
import { addSourceToFileUrl } from '../utils/fileUrl'
import { createItemLoader } from '../utils/crudHelpers'

const route = useRoute()
const { handleError } = useErrorHandler()
const loading = ref(true)
const theme = ref(null)

useSeoMeta({
  title: computed(() => theme.value?.name || 'Miniature Theme'),
  description: computed(() => theme.value?.description || ''),
  image: computed(() => {
    const img = theme.value?.coverImageFile?.url
    return img ? addSourceToFileUrl(img) : null
  }),
  path: computed(() => `/miniatures/themes/${route.params.id}`),
})

const loadTheme = createItemLoader({
  loading,
  data: theme,
  service: api.getMiniatureThemeById,
  entityName: 'miniature theme',
  handleError,
  getId: () => route.params.id,
})

onMounted(() => {
  loadTheme()
})
</script>

<style scoped>
.theme-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.theme-title {
  text-align: center;
}

.theme-description {
  font-size: 1.1rem;
  color: var(--text-color-3);
  margin: 0 0 16px 0;
  line-height: 1.6;
}

.theme-count {
  font-size: 0.9rem;
}

.miniatures-grid {
  margin-top: 8px;
}

.miniature-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.image-wrapper {
  aspect-ratio: 1;
  overflow: hidden;
}

.miniature-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.miniature-card:hover .miniature-image {
  transform: scale(1.05);
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.miniature-name {
  font-size: 1rem;
  line-height: 1.3;
}

.miniature-tags {
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .theme-description {
    font-size: 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .miniature-image {
    transition: none;
  }

  .miniature-card:hover .miniature-image {
    transform: none;
  }
}
</style>
