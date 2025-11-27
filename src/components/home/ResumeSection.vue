<template>
  <n-space id="resume" vertical :size="32" class="hero-section-wrapper">
    <h2 class="hero-title">Resume</h2>

    <n-divider />

    <!-- Work Experience -->
    <h3 class="section-title">Work Experience</h3>

    <n-space v-if="loadingExperience" justify="center" role="status" aria-live="polite">
      <n-spin size="large" aria-label="Loading work experience" />
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
            <n-card size="small" class="card-hoverable-subtle resume-card">
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

    <n-space v-if="loadingCertifications" justify="center" role="status" aria-live="polite">
      <n-spin size="large" aria-label="Loading certifications" />
    </n-space>

    <transition-group name="fade-up" tag="div">
      <div v-if="!loadingCertifications" key="certifications-content">
        <n-grid cols="1 512:2 768:3" :x-gap="16" :y-gap="16">
          <n-grid-item v-for="cert in certifications" :key="cert.id">
            <n-card size="small" hoverable class="card-hoverable resume-card">
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
                  rel="noopener noreferrer"
                >
                  View Credential
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
  NDivider,
  NTimeline,
  NTimelineItem,
  NCard,
  NText,
  NGrid,
  NGridItem,
} from 'naive-ui'
import api from '../../services/api'
import { useErrorHandler } from '../../composables/useErrorHandler'
import { createDataLoader } from '../../utils/crudHelpers'

const { handleError } = useErrorHandler()

const experience = ref([])
const certifications = ref([])
const loadingExperience = ref(true)
const loadingCertifications = ref(true)

const loadExperience = createDataLoader({
  loading: loadingExperience,
  data: experience,
  service: api.getExperience,
  entityName: 'experience',
  handleError,
})

const loadCertifications = createDataLoader({
  loading: loadingCertifications,
  data: certifications,
  service: api.getCertifications,
  entityName: 'certifications',
  handleError,
})

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
</script>

<style scoped>
.resume-card {
  padding: 16px;
}

.resume-company,
.resume-cert-name {
  font-size: 16px;
}

.resume-description {
  font-size: 14px;
}

.resume-cert-issuer,
.resume-cert-date {
  font-size: 14px;
  opacity: 0.8;
}
</style>
