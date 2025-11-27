<template>
  <n-space id="miniatures" vertical :size="32" class="hero-section-wrapper">
    <h2 class="hero-title">Miniature Painting</h2>

    <n-divider />

    <n-text class="miniatures-description">
      Beyond coding, I enjoy painting miniatures from various tabletop games and fantasy worlds.
      Each project is a study in patience, technique, and bringing tiny characters to life.
    </n-text>

    <n-space v-if="loading" justify="center" role="status" aria-live="polite">
      <n-spin size="large" aria-label="Loading miniatures" />
    </n-space>

    <transition-group name="fade-up" tag="div">
      <div v-if="!loading" class="miniatures-grid-wrapper">
        <n-grid :x-gap="24" :y-gap="24" cols="1 512:2 768:3">
          <n-grid-item v-for="theme in themes" :key="theme.id">
            <n-card hoverable class="card-hoverable" @click="$router.push('/gallery')">
              <template #cover>
                <img :src="theme.coverImageFile?.url" :alt="theme.name" class="image-card-cover" />
              </template>
              <n-space vertical :size="8" align="center">
                <n-text strong class="miniature-name">{{ theme.name }}</n-text>
                <n-text depth="3" class="miniature-count">
                  {{ theme.miniatures?.length || 0 }} miniatures
                </n-text>
              </n-space>
            </n-card>
          </n-grid-item>
        </n-grid>
      </div>
    </transition-group>

    <n-space justify="center" class="miniatures-button">
      <n-button type="primary" size="large" @click="$router.push('/gallery')">
        View Full Gallery
      </n-button>
    </n-space>
  </n-space>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { NSpace, NDivider, NText, NSpin, NGridItem, NCard, NButton, NGrid } from 'naive-ui'
import api from '../../services/api'
import { useErrorHandler } from '../../composables/useErrorHandler'
import { createDataLoader } from '../../utils/crudHelpers'

const { handleError } = useErrorHandler()

const loading = ref(true)
const themes = ref([])

const loadThemes = createDataLoader({
  loading,
  data: themes,
  service: api.getMiniatureThemes,
  entityName: 'miniature themes',
  handleError,
})

onMounted(() => {
  loadThemes()
})
</script>

<style scoped>
.miniatures-description {
  font-size: 16px;
  line-height: 1.6;
  text-align: center;
}

.miniature-name {
  font-size: 18px;
}

.miniature-count {
  font-size: 14px;
  opacity: 0.7;
}

.miniatures-button {
  margin-top: 16px;
}

@media (max-width: 480px) {
  .miniatures-description {
    font-size: 14px;
  }
}
</style>
