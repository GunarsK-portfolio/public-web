<template>
  <n-space id="resume" vertical :size="32" class="hero-section-wrapper">
    <n-space justify="space-between" align="center">
      <h2 class="hero-title">Resume</h2>
      <n-button type="primary" @click="downloadResume">
        <template #icon>
          <n-icon><DownloadOutline /></n-icon>
        </template>
        Download PDF
      </n-button>
    </n-space>

    <n-divider />

    <!-- Work Experience -->
    <h3 class="section-title">Work Experience</h3>

    <n-space v-if="loadingExperience" justify="center">
      <n-spin size="large" />
    </n-space>

    <transition-group name="fade-up" tag="div">
      <div v-if="!loadingExperience" key="experience-content">
        <n-timeline>
          <n-timeline-item
            v-for="exp in experience"
            :key="exp.id"
            :title="exp.position"
            :time="formatDateRange(exp)"
          >
            <n-card size="small" class="resume-card">
              <n-space vertical :size="8">
                <n-text strong class="resume-company">{{ exp.company }}</n-text>
                <n-text class="resume-description">{{ exp.description }}</n-text>
              </n-space>
            </n-card>
          </n-timeline-item>
        </n-timeline>
      </div>
    </transition-group>

    <n-divider />

    <!-- Certifications -->
    <h3 class="section-title">Certifications</h3>

    <n-space v-if="loadingCertifications" justify="center">
      <n-spin size="large" />
    </n-space>

    <transition-group name="fade-up" tag="div">
      <div v-if="!loadingCertifications" key="certifications-content">
        <n-grid cols="1 512:2 768:3" :x-gap="16" :y-gap="16">
          <n-grid-item v-for="cert in certifications" :key="cert.id">
            <n-card size="small" hoverable class="resume-card">
              <n-space vertical :size="8">
                <n-text strong class="resume-cert-name">{{ cert.name }}</n-text>
                <n-text depth="3" class="resume-cert-issuer">{{ cert.issuer }}</n-text>
                <n-text depth="3" class="resume-cert-date">
                  Issued: {{ formatDate(cert.issueDate) }}
                </n-text>
                <n-button
                  v-if="cert.credentialUrl"
                  text
                  type="primary"
                  tag="a"
                  :href="cert.credentialUrl"
                  target="_blank"
                >
                  View Credential →
                </n-button>
              </n-space>
            </n-card>
          </n-grid-item>
        </n-grid>
      </div>
    </transition-group>
  </n-space>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  NSpace,
  NSpin,
  NButton,
  NIcon,
  NDivider,
  NTimeline,
  NTimelineItem,
  NCard,
  NText,
  NGrid,
  NGridItem,
} from 'naive-ui'
import { DownloadOutline } from '@vicons/ionicons5'
import api from '../../services/api'
import { useErrorHandler } from '../../composables/useErrorHandler'

const { handleError } = useErrorHandler()

const experience = ref([])
const certifications = ref([])
const loadingExperience = ref(true)
const loadingCertifications = ref(true)

const loadExperience = async () => {
  try {
    const response = await api.getExperience()
    experience.value = response.data
  } catch (error) {
    handleError(error, { retryFn: loadExperience })
  } finally {
    loadingExperience.value = false
  }
}

const loadCertifications = async () => {
  try {
    const response = await api.getCertifications()
    certifications.value = response.data
  } catch (error) {
    handleError(error, { retryFn: loadCertifications })
  } finally {
    loadingCertifications.value = false
  }
}

onMounted(() => {
  loadExperience()
  loadCertifications()
})

const formatDateRange = (exp) => {
  const endDate = exp.isCurrent ? 'Present' : exp.endDate
  return `${exp.startDate} - ${endDate}`
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  })
}

const downloadResume = () => {
  window.open('/resume.pdf', '_blank')
}
</script>

<style scoped>
.section-title {
  font-size: 24px;
  font-weight: 600;
  margin: 24px 0;
}

.resume-card {
  padding: 16px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.resume-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.resume-company {
  font-size: 16px;
}

.resume-description {
  font-size: 14px;
}

.resume-cert-name {
  font-size: 16px;
}

.resume-cert-issuer,
.resume-cert-date {
  font-size: 14px;
  opacity: 0.8;
}

.resume-button {
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}
</style>
