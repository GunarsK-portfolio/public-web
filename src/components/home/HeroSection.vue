<template>
  <div class="profile-wrapper">
    <n-space v-if="loading" justify="center">
      <n-spin size="large" />
    </n-space>

    <Transition name="fade-up">
      <n-space v-if="!loading" vertical align="center" :size="32" class="profile-content">
        <n-avatar
          round
          :size="150"
          :src="profile.avatarUrl"
          fallback-src="https://via.placeholder.com/150"
        />

        <n-space vertical align="center" :size="12">
          <h1 class="profile-name">{{ profile.name }}</h1>
          <h2 class="profile-title">{{ profile.title }}</h2>
        </n-space>

        <n-text class="profile-tagline">
          {{ profile.tagline }}
        </n-text>

        <n-space :size="16" wrap class="profile-buttons">
          <n-button type="primary" size="large" @click="scrollTo('resume')"> Resume </n-button>
          <n-button size="large" @click="scrollTo('skills')"> Skills </n-button>
          <n-button size="large" @click="scrollTo('projects')"> Projects </n-button>
          <n-button size="large" @click="scrollTo('miniatures')"> Miniatures </n-button>
        </n-space>
      </n-space>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { NSpace, NAvatar, NText, NButton, NSpin } from 'naive-ui'
import api from '../../services/api'

const profile = ref({})
const loading = ref(true)

const loadProfile = async () => {
  try {
    const response = await api.getProfile()
    profile.value = response.data
  } catch (error) {
    console.error('Failed to load profile:', error)
  } finally {
    loading.value = false
  }
}

const scrollTo = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

onMounted(() => {
  loadProfile()
})
</script>

<style scoped>
.profile-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 64px);
  padding: 40px 20px;
  text-align: center;
}

.profile-name {
  font-size: 48px;
  font-weight: 700;
  margin: 0;
}

.profile-title {
  font-size: 24px;
  font-weight: 400;
  margin: 0;
  opacity: 0.8;
}

.profile-tagline {
  max-width: 600px;
  text-align: center;
  font-size: 18px;
  line-height: 1.6;
}

.profile-buttons {
  justify-content: center;
  flex-wrap: wrap;
}

.profile-buttons n-button {
  margin: 4px;
  transition: transform 0.2s ease;
}

.profile-buttons n-button:hover {
  transform: translateY(-2px);
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .profile-name {
    font-size: 36px;
  }

  .profile-title {
    font-size: 20px;
  }

  .profile-tagline {
    font-size: 16px;
  }
}
</style>
