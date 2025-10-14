<template>
  <n-space vertical size="large" style="padding: 24px; max-width: 1200px; margin: 0 auto">
    <n-button text @click="$router.push('/')">
      <template #icon>
        <n-icon><ArrowBackOutline /></n-icon>
      </template>
      Back to Home
    </n-button>

    <n-page-header title="Miniatures Gallery" subtitle="My painting projects organized by theme">
    </n-page-header>

    <n-spin :show="loading">
      <n-space vertical size="large">
        <n-card
          v-for="theme in themes"
          :key="theme.id"
          :title="theme.name"
          hoverable
          style="cursor: default"
        >
          <template #header-extra>
            <n-tag :bordered="false" type="info">{{ theme.miniatures.length }} miniatures</n-tag>
          </template>

          <n-text depth="3" style="display: block; margin-bottom: 16px">
            {{ theme.description }}
          </n-text>

          <n-grid :x-gap="16" :y-gap="16" :cols="1" :s="2" :m="3" :l="4">
            <n-grid-item v-for="mini in theme.miniatures" :key="mini.id">
              <n-card
                hoverable
                style="cursor: pointer"
                @click="$router.push(`/miniatures/${mini.id}`)"
              >
                <n-image
                  :src="mini.coverImage"
                  :alt="mini.name"
                  object-fit="cover"
                  style="width: 100%; height: 200px; border-radius: 8px"
                  preview-disabled
                />
                <n-space vertical size="small" style="margin-top: 12px">
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
    </n-spin>
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
// import api from '../services/api'

const loading = ref(false)
const themes = ref([])

onMounted(async () => {
  loading.value = true
  try {
    // TODO: Replace with actual API call
    // themes.value = await api.getMiniatureThemes()

    // Placeholder data
    themes.value = [
      {
        id: 1,
        name: 'Dungeons & Dragons',
        description:
          'Classic D&D miniatures for tabletop gaming. Painted with focus on tabletop readiness and visual impact from gaming distance.',
        miniatures: [
          {
            id: 1,
            name: 'Red Dragon',
            coverImage: 'https://via.placeholder.com/300x200?text=Red+Dragon',
            scale: '28mm',
            manufacturer: 'WizKids',
          },
          {
            id: 2,
            name: 'Human Paladin',
            coverImage: 'https://via.placeholder.com/300x200?text=Human+Paladin',
            scale: '28mm',
            manufacturer: 'Reaper',
          },
          {
            id: 3,
            name: 'Beholder',
            coverImage: 'https://via.placeholder.com/300x200?text=Beholder',
            scale: '28mm',
            manufacturer: 'WizKids',
          },
        ],
      },
      {
        id: 2,
        name: 'Stormlight Archive',
        description:
          "Characters and creatures from Brandon Sanderson's Stormlight Archive series. Custom conversions and kitbashes to bring Roshar to life.",
        miniatures: [
          {
            id: 4,
            name: 'Kaladin Stormblessed',
            coverImage: 'https://via.placeholder.com/300x200?text=Kaladin',
            scale: '32mm',
            manufacturer: 'Custom Conversion',
          },
          {
            id: 5,
            name: 'Chasmfiend',
            coverImage: 'https://via.placeholder.com/300x200?text=Chasmfiend',
            scale: '54mm',
            manufacturer: 'Custom Build',
          },
        ],
      },
      {
        id: 3,
        name: 'Bloodborne',
        description:
          "Gothic horror miniatures inspired by FromSoftware's Bloodborne. Focus on grimdark atmosphere and weathering effects.",
        miniatures: [
          {
            id: 6,
            name: 'Hunter',
            coverImage: 'https://via.placeholder.com/300x200?text=Hunter',
            scale: '32mm',
            manufacturer: 'CMON',
          },
          {
            id: 7,
            name: 'Cleric Beast',
            coverImage: 'https://via.placeholder.com/300x200?text=Cleric+Beast',
            scale: '75mm',
            manufacturer: 'CMON',
          },
        ],
      },
    ]
  } catch (error) {
    console.error('Failed to load miniatures:', error)
  } finally {
    loading.value = false
  }
})
</script>
