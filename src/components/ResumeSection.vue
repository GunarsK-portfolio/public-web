<template>
  <n-space
    id="resume"
    vertical
    :size="32"
    style="padding: 80px 20px; max-width: 900px; margin: 0 auto"
  >
    <n-space justify="space-between" align="center" style="width: 100%">
      <h2 style="font-size: 36px; font-weight: 700; margin: 0">Resume</h2>
      <n-button type="primary" @click="downloadResume">
        <template #icon>
          <n-icon><DownloadOutline /></n-icon>
        </template>
        Download PDF
      </n-button>
    </n-space>

    <n-divider />

    <div>
      <h3 style="font-size: 24px; font-weight: 600; margin-bottom: 24px">Work Experience</h3>
      <n-timeline>
        <n-timeline-item
          v-for="exp in experience"
          :key="exp.id"
          :title="exp.position"
          :time="formatDateRange(exp)"
        >
          <n-card size="small">
            <n-space vertical :size="8">
              <n-text strong style="font-size: 16px">{{ exp.company }}</n-text>
              <n-text>{{ exp.description }}</n-text>
            </n-space>
          </n-card>
        </n-timeline-item>
      </n-timeline>
    </div>

    <n-divider />

    <div>
      <h3 style="font-size: 24px; font-weight: 600; margin-bottom: 24px">Certifications</h3>
      <n-grid :cols="2" :x-gap="16" :y-gap="16" responsive="screen">
        <n-grid-item v-for="cert in certifications" :key="cert.id">
          <n-card size="small" hoverable>
            <n-space vertical :size="8">
              <n-text strong>{{ cert.name }}</n-text>
              <n-text depth="3">{{ cert.issuer }}</n-text>
              <n-text depth="3" style="font-size: 14px">
                Issued: {{ formatDate(cert.issue_date) }}
              </n-text>
              <n-button
                v-if="cert.credential_url"
                text
                type="primary"
                tag="a"
                :href="cert.credential_url"
                target="_blank"
              >
                View Credential →
              </n-button>
            </n-space>
          </n-card>
        </n-grid-item>
      </n-grid>
    </div>
  </n-space>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  NSpace,
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
import api from '../services/api'

const experience = ref([])
const certifications = ref([])

onMounted(async () => {
  try {
    const [expResp, certResp] = await Promise.all([api.getExperience(), api.getCertifications()])
    experience.value = expResp.data
    certifications.value = certResp.data
  } catch (error) {
    console.error('Failed to load resume data:', error)
  }
})

const formatDateRange = (exp) => {
  const endDate = exp.is_current ? 'Present' : exp.end_date
  return `${exp.start_date} - ${endDate}`
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  })
}

const downloadResume = () => {
  // TODO: Implement resume download
  window.open('/resume.pdf', '_blank')
}
</script>
