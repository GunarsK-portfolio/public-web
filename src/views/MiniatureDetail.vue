<template>
  <n-space vertical size="large" class="section-wrapper">
    <n-button text @click="$router.back()">
      <template #icon>
        <n-icon><ArrowBackOutline /></n-icon>
      </template>
      Back to Gallery
    </n-button>

    <n-space v-if="loading" justify="center">
      <n-spin size="large" />
    </n-space>

    <transition-group name="fade-up" tag="div">
      <div v-if="!loading" class="minaiture-wrapper">
        <n-space v-if="miniature" vertical size="large" class="miniature-detail">
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
                      :src="addSourceToFileUrl(image.url)"
                      :alt="image.caption"
                      object-fit="cover"
                      class="image-cover"
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
                          class="color-swatch"
                          :style="{ backgroundColor: paint.colorHex }"
                        ></div>
                      </template>
                      <n-space vertical size="small">
                        <n-text strong>{{ paint.name }}</n-text>
                        <n-text depth="3" class="text-small">{{ paint.manufacturer }}</n-text>
                      </n-space>
                    </n-list-item>
                  </n-list>
                </n-card>

                <n-card v-if="miniature.timeSpent" title="Project Stats">
                  <n-descriptions :column="1" bordered>
                    <n-descriptions-item label="Time Spent">
                      {{ miniature.timeSpent }} hours
                    </n-descriptions-item>
                    <n-descriptions-item v-if="miniature.difficulty" label="Difficulty">
                      {{ miniature.difficulty }}
                    </n-descriptions-item>
                    <n-descriptions-item v-if="miniature.theme" label="Theme">
                      {{ miniature.theme?.name }}
                    </n-descriptions-item>
                  </n-descriptions>
                </n-card>
              </n-space>
            </n-grid-item>
          </n-grid>
        </n-space>
      </div>
    </transition-group>
  </n-space>
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
import { createItemLoader } from '../utils/crudHelpers'
import { addSourceToFileUrl } from '../utils/fileUrl'

const route = useRoute()
const { handleError } = useErrorHandler()
const loading = ref(true)
const miniature = ref(null)

const loadMiniature = createItemLoader({
  loading,
  data: miniature,
  service: api.getMiniatureById,
  entityName: 'miniature',
  handleError,
  getId: () => route.params.id,
})

onMounted(() => {
  loadMiniature()
})
</script>

<style scoped>
.miniature-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}
</style>
