<template>
  <n-space id="miniatures" vertical :size="32" class="hero-section-wrapper">
    <h2 class="hero-title">Miniature Painting</h2>

    <n-divider />

    <n-text class="miniatures-description">
      Beyond coding, I enjoy painting miniatures from various tabletop games and fantasy worlds.
      Each project is a study in patience, technique, and bringing tiny characters to life.
    </n-text>

    <n-space v-if="loading" justify="center">
      <n-spin size="large" />
    </n-space>

    <transition-group name="fade-up" tag="div">
      <div v-if="!loading" class="miniatures-grid-wrapper">
        <n-grid :x-gap="24" :y-gap="24" cols="1 512:2 768:3">
          <n-grid-item v-for="theme in featuredThemes" :key="theme.name">
            <n-card hoverable class="miniature-card" @click="$router.push('/gallery')">
              <template #cover>
                <img :src="theme.coverImage" :alt="theme.name" class="miniature-cover" />
              </template>
              <n-space vertical :size="8" align="center">
                <n-text strong class="miniature-name">{{ theme.name }}</n-text>
                <n-text depth="3" class="miniature-count">{{ theme.count }} miniatures</n-text>
              </n-space>
            </n-card>
          </n-grid-item>
        </n-grid>
      </div>
    </transition-group>

    <n-space justify="center" class="miniatures-button">
      <n-button type="primary" size="large" @click="$router.push('/gallery')">
        View Full Gallery →
      </n-button>
    </n-space>
  </n-space>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { NSpace, NDivider, NText, NSpin, NGridItem, NCard, NButton, NGrid } from 'naive-ui'

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

<style scoped>
.miniatures-description {
  font-size: 16px;
  line-height: 1.6;
  text-align: center;
}

.miniature-card {
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.miniature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.miniature-cover {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px 4px 0 0;
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

/* Responsive adjustments */
@media (max-width: 480px) {
  .miniatures-title {
    font-size: 28px;
  }

  .miniatures-description {
    font-size: 14px;
  }

  .miniature-cover {
    height: 180px;
  }
}
</style>
