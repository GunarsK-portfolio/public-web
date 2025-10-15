<template>
  <n-spin :show="loading" style="padding: 24px">
    <n-space v-if="miniature" vertical size="large" style="max-width: 1200px; margin: 0 auto">
      <n-button text @click="$router.push('/gallery')">
        <template #icon>
          <n-icon><ArrowBackOutline /></n-icon>
        </template>
        Back to Gallery
      </n-button>

      <n-page-header :title="miniature.name" :subtitle="miniature.subtitle">
        <template #extra>
          <n-space>
            <n-tag v-if="miniature.scale" :bordered="false">{{ miniature.scale }}</n-tag>
            <n-tag v-if="miniature.manufacturer" :bordered="false" type="info">
              {{ miniature.manufacturer }}
            </n-tag>
            <n-tag v-if="miniature.completedDate" :bordered="false" type="success">
              Completed {{ miniature.completedDate }}
            </n-tag>
          </n-space>
        </template>
      </n-page-header>

      <n-grid :x-gap="24" :y-gap="24" :cols="1" :l="2">
        <n-grid-item>
          <n-card title="Gallery">
            <n-image-group>
              <n-space vertical size="large">
                <n-image
                  v-for="(image, index) in miniature.images"
                  :key="index"
                  :src="image.url"
                  :alt="image.caption"
                  object-fit="cover"
                  style="width: 100%; border-radius: 8px"
                />
              </n-space>
            </n-image-group>
          </n-card>
        </n-grid-item>

        <n-grid-item>
          <n-space vertical size="large">
            <n-card title="Description">
              <n-text>{{ miniature.description }}</n-text>
            </n-card>

            <n-card v-if="miniature.techniques?.length" title="Painting Techniques">
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

            <n-card v-if="miniature.paints?.length" title="Paints Used">
              <n-list bordered>
                <n-list-item v-for="paint in miniature.paints" :key="paint.name">
                  <template #prefix>
                    <div
                      :style="{
                        width: '24px',
                        height: '24px',
                        borderRadius: '4px',
                        backgroundColor: paint.color,
                        border: '1px solid #ccc',
                      }"
                    ></div>
                  </template>
                  <n-space vertical size="small">
                    <n-text strong>{{ paint.name }}</n-text>
                    <n-text depth="3" style="font-size: 12px">{{ paint.manufacturer }}</n-text>
                  </n-space>
                </n-list-item>
              </n-list>
            </n-card>

            <n-card v-if="miniature.timeSpent" title="Project Stats">
              <n-descriptions :column="1" bordered>
                <n-descriptions-item label="Time Spent">
                  {{ miniature.timeSpent }}
                </n-descriptions-item>
                <n-descriptions-item v-if="miniature.difficulty" label="Difficulty">
                  {{ miniature.difficulty }}
                </n-descriptions-item>
                <n-descriptions-item v-if="miniature.theme" label="Theme">
                  {{ miniature.theme }}
                </n-descriptions-item>
              </n-descriptions>
            </n-card>

            <n-card v-if="miniature.notes" title="Notes">
              <n-text>{{ miniature.notes }}</n-text>
            </n-card>
          </n-space>
        </n-grid-item>
      </n-grid>
    </n-space>
  </n-spin>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  NSpin,
  NSpace,
  NPageHeader,
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
} from 'naive-ui'
import { ArrowBackOutline } from '@vicons/ionicons5'
import api from '../services/api'
import { useErrorHandler } from '../composables/useErrorHandler'

const route = useRoute()
const { handleError } = useErrorHandler()
const loading = ref(false)
const miniature = ref(null)

const loadMiniature = async () => {
  loading.value = true
  try {
    const id = route.params.id
    const response = await api.getMiniatureById(id)
    miniature.value = response.data
  } catch (error) {
    handleError(error, { retryFn: loadMiniature })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadMiniature()
})
</script>
