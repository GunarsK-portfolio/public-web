<template>
  <div class="profile-wrapper">
    <n-space v-if="loading" justify="center" role="status" aria-live="polite">
      <n-spin size="large" aria-label="Loading profile" />
    </n-space>

    <Transition name="fade-up">
      <n-space v-if="!loading" vertical align="center" :size="32" class="profile-content">
        <n-avatar
          round
          :size="150"
          :src="addSourceToFileUrl(profile.avatarFile?.url)"
          fallback-src="/avatar-placeholder.svg"
        />

        <n-space vertical align="center" :size="12">
          <h1 class="profile-name">{{ profile.name }}</h1>
          <h2 class="profile-title">{{ profile.title }}</h2>
        </n-space>

        <n-text class="profile-tagline">
          {{ profile.tagline }}
        </n-text>

        <n-space :size="16" wrap class="profile-buttons">
          <n-button
            v-if="profile.resumeFile?.url"
            type="primary"
            size="large"
            tag="a"
            :href="addSourceToFileUrl(profile.resumeFile.url)"
            target="_blank"
            rel="noopener noreferrer"
          >
            <template #icon>
              <n-icon><DownloadOutline /></n-icon>
            </template>
            Download Resume
          </n-button>
          <n-button size="large" @click="scrollTo('resume')"> Experience </n-button>
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
import { NSpace, NAvatar, NText, NButton, NIcon, NSpin } from 'naive-ui'
import { DownloadOutline } from '@vicons/ionicons5'
import api from '../../services/api'
import { useErrorHandler } from '../../composables/useErrorHandler'
import { createDataLoader } from '../../utils/crudHelpers'
import { addSourceToFileUrl } from '../../utils/fileUrl'

const { handleError } = useErrorHandler()

const profile = ref({})
const loading = ref(true)

const loadProfile = createDataLoader({
  loading,
  data: profile,
  service: api.getProfile,
  entityName: 'profile',
  handleError,
})

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
