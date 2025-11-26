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
            class="card-hoverable-subtle theme-card"
          >
            <template #header-extra>
              <n-tag :bordered="false" type="info"
                >{{ theme.miniatures?.length || 0 }} miniatures</n-tag
              >
            </template>

            <n-text depth="3" class="theme-description">
              {{ theme.description }}
            </n-text>

            <n-grid :x-gap="16" :y-gap="16" :cols="1" :s="2" :m="3" :l="4">
              <n-grid-item v-for="mini in theme.miniatures" :key="mini.id">
                <n-card
                  hoverable
                  class="card-hoverable"
                  @click="$router.push(`/miniatures/${mini.id}`)"
                >
                  <n-image
                    :src="theme.coverImageFile?.url"
                    :alt="mini.name"
                    object-fit="cover"
                    class="image-cover-md"
                    preview-disabled
                  />
                  <n-space vertical size="small" class="mt-md">
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
import { createDataLoader } from '../utils/crudHelpers'

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
.theme-card {
  margin-bottom: 32px;
}

.theme-description {
  margin-bottom: 16px;
}
</style>
