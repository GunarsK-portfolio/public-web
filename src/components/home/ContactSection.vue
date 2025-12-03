<template>
  <n-space id="contact" vertical :size="32" class="hero-section-wrapper">
    <h2 class="hero-title">Get In Touch</h2>

    <n-divider />

    <n-text class="contact-text">
      I'm always interested in hearing about new opportunities and interesting projects.
    </n-text>

    <n-space v-if="loading" justify="center" role="status" aria-live="polite">
      <n-spin size="large" aria-label="Loading contact information" />
    </n-space>

    <transition-group name="fade-up" tag="div">
      <div v-if="!loading" key="contact-content">
        <n-space vertical :size="16" class="contact-cards">
          <n-card>
            <n-space align="center" :size="12">
              <n-icon size="24"><MailOutline /></n-icon>
              <n-text>{{ profile.email }}</n-text>
            </n-space>
          </n-card>

          <n-space
            v-if="profile.github || profile.linkedin"
            justify="center"
            :size="16"
            class="contact-buttons"
          >
            <n-button
              v-if="profile.github"
              circle
              size="large"
              tag="a"
              :href="profile.github"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
            >
              <template #icon>
                <n-icon size="24"><LogoGithub /></n-icon>
              </template>
            </n-button>

            <n-button
              v-if="profile.linkedin"
              circle
              size="large"
              tag="a"
              :href="profile.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              <template #icon>
                <n-icon size="24"><LogoLinkedin /></n-icon>
              </template>
            </n-button>
          </n-space>
        </n-space>

        <n-divider>OR</n-divider>

        <n-space justify="center">
          <n-button type="primary" size="large" @click="$router.push('/contact')">
            Send Me a Message →
          </n-button>
        </n-space>
      </div>
    </transition-group>
  </n-space>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { NSpace, NDivider, NText, NCard, NButton, NIcon, NSpin } from 'naive-ui'
import { MailOutline, LogoGithub, LogoLinkedin } from '@vicons/ionicons5'
import api from '../../services/api'
import { useErrorHandler } from '../../composables/useErrorHandler'
import { createDataLoader } from '../../utils/crudHelpers'

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

onMounted(() => {
  loadProfile()
})
</script>

<style scoped>
.contact-text {
  font-size: 16px;
}

.contact-cards {
  width: 100%;
}
</style>
