<template>
  <n-space vertical :size="24">
    <h1 style="font-size: 36px; font-weight: bold">Work Experience & Certifications</h1>

    <n-space v-if="loading" justify="center">
      <n-spin size="large" />
    </n-space>

    <n-space v-else vertical :size="32">
      <div>
        <h2 style="font-size: 24px; font-weight: 600; margin-bottom: 16px">Work Experience</h2>
        <n-timeline>
          <n-timeline-item v-for="exp in experience" :key="exp.id">
            <n-card>
              <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 4px">
                {{ exp.position }}
              </h3>
              <p style="font-size: 16px; margin: 4px 0">{{ exp.company }}</p>
              <p style="font-size: 14px; opacity: 0.7; margin: 4px 0">
                {{ exp.start_date }} - {{ exp.is_current ? 'Present' : exp.end_date }}
              </p>
              <p style="margin-top: 8px">{{ exp.description }}</p>
            </n-card>
          </n-timeline-item>
        </n-timeline>
      </div>

      <div>
        <h2 style="font-size: 24px; font-weight: 600; margin-bottom: 16px">Certifications</h2>
        <n-grid :cols="2" :x-gap="16" :y-gap="16" responsive="screen">
          <n-grid-item v-for="cert in certifications" :key="cert.id">
            <n-card>
              <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 4px">
                {{ cert.name }}
              </h3>
              <p style="margin: 4px 0">{{ cert.issuer }}</p>
              <p style="font-size: 14px; opacity: 0.7; margin: 4px 0">
                Issued: {{ cert.issue_date }}
              </p>
              <a
                v-if="cert.credential_url"
                :href="cert.credential_url"
                target="_blank"
                style="
                  color: var(--n-color-target);
                  text-decoration: none;
                  margin-top: 8px;
                  display: inline-block;
                "
              >
                View Credential →
              </a>
            </n-card>
          </n-grid-item>
        </n-grid>
      </div>
    </n-space>
  </n-space>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { NSpace, NSpin, NTimeline, NTimelineItem, NCard, NGrid, NGridItem } from 'naive-ui'
import api from '../services/api'
import { useErrorHandler } from '../composables/useErrorHandler'

const { handleError } = useErrorHandler()

const experience = ref([])
const certifications = ref([])
const loading = ref(true)

const loadExperienceAndCertifications = async () => {
  try {
    const [expResp, certResp] = await Promise.all([api.getExperience(), api.getCertifications()])
    experience.value = expResp.data
    certifications.value = certResp.data
  } catch (error) {
    handleError(error, { retryFn: loadExperienceAndCertifications })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadExperienceAndCertifications()
})
</script>
