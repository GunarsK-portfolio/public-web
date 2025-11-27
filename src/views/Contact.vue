<template>
  <n-space vertical size="large" class="section-wrapper">
    <n-button text @click="goBack">
      <template #icon>
        <n-icon><ArrowBackOutline /></n-icon>
      </template>
      Back
    </n-button>

    <n-page-header title="Contact Me" subtitle="Let's connect and discuss opportunities">
    </n-page-header>

    <n-spin :show="loading">
      <n-grid :x-gap="24" :y-gap="24" :cols="1" :l="2">
        <n-grid-item>
          <n-card title="Send a Message" class="card-hoverable-subtle contacts-card">
            <n-form ref="formRef" :model="formData" :rules="rules">
              <n-form-item label="Name" path="name">
                <n-input
                  v-model:value="formData.name"
                  placeholder="Your name"
                  :disabled="sending"
                />
              </n-form-item>

              <n-form-item label="Email" path="email">
                <n-input
                  v-model:value="formData.email"
                  placeholder="your.email@example.com"
                  :disabled="sending"
                />
              </n-form-item>

              <n-form-item label="Subject" path="subject">
                <n-input
                  v-model:value="formData.subject"
                  placeholder="What is this about?"
                  :disabled="sending"
                />
              </n-form-item>

              <n-form-item label="Message" path="message">
                <n-input
                  v-model:value="formData.message"
                  type="textarea"
                  placeholder="Your message..."
                  :autosize="{ minRows: 6, maxRows: 12 }"
                  :disabled="sending"
                />
              </n-form-item>

              <n-space>
                <n-button type="primary" :loading="sending" @click="handleSubmit">
                  <template #icon>
                    <n-icon><SendOutline /></n-icon>
                  </template>
                  Send Message
                </n-button>
                <n-button :disabled="sending" @click="handleReset">Clear Form</n-button>
              </n-space>
            </n-form>
          </n-card>
        </n-grid-item>

        <n-grid-item>
          <n-space vertical size="large">
            <n-card title="Contact Information">
              <n-space vertical size="large">
                <n-space v-if="profile.email" align="center">
                  <n-icon size="24" color="#2080f0">
                    <MailOutline />
                  </n-icon>
                  <n-space vertical size="small">
                    <n-text strong>Email</n-text>
                    <n-text depth="3">{{ profile.email }}</n-text>
                  </n-space>
                </n-space>

                <n-divider v-if="profile.email && profile.location" />

                <n-space v-if="profile.location" align="center">
                  <n-icon size="24" color="#2080f0">
                    <LocationOutline />
                  </n-icon>
                  <n-space vertical size="small">
                    <n-text strong>Location</n-text>
                    <n-text depth="3">{{ profile.location }}</n-text>
                  </n-space>
                </n-space>

                <n-divider
                  v-if="(profile.github || profile.linkedin) && (profile.email || profile.location)"
                />

                <n-space v-if="profile.github || profile.linkedin" vertical size="small">
                  <n-text strong>Social Media</n-text>
                  <n-space>
                    <n-button
                      v-if="profile.github"
                      circle
                      secondary
                      tag="a"
                      :href="profile.github"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <template #icon>
                        <n-icon size="20"><LogoGithub /></n-icon>
                      </template>
                    </n-button>
                    <n-button
                      v-if="profile.linkedin"
                      circle
                      secondary
                      tag="a"
                      :href="profile.linkedin"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <template #icon>
                        <n-icon size="20"><LogoLinkedin /></n-icon>
                      </template>
                    </n-button>
                  </n-space>
                </n-space>
              </n-space>
            </n-card>

            <n-card title="Response Time">
              <n-text>
                I typically respond to messages within 24-48 hours. For urgent inquiries, please
                reach out via email directly.
              </n-text>
            </n-card>
          </n-space>
        </n-grid-item>
      </n-grid>
    </n-spin>
  </n-space>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  NSpace,
  NPageHeader,
  NButton,
  NIcon,
  NGrid,
  NGridItem,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NText,
  NDivider,
  NSpin,
} from 'naive-ui'
import {
  ArrowBackOutline,
  SendOutline,
  MailOutline,
  LocationOutline,
  LogoGithub,
  LogoLinkedin,
} from '@vicons/ionicons5'
import api from '../services/api'
import { useViewServices } from '../composables/useViewServices'
import { useErrorHandler } from '../composables/useErrorHandler'
import { createDataLoader } from '../utils/crudHelpers'
import { required, email, minLength, validateForm } from '../utils/validation'
import { logger } from '../utils/logger'

const { router, message } = useViewServices()
const { handleError } = useErrorHandler()

// Safe navigation - go to home if no history
const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

const formRef = ref(null)
const loading = ref(true)
const sending = ref(false)
const profile = ref({})

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const rules = {
  name: [required('Name')],
  email: [required('Email'), email()],
  subject: [required('Subject')],
  message: [required('Message'), minLength(10)],
}

async function handleSubmit() {
  if (!(await validateForm(formRef))) return

  sending.value = true
  try {
    // TODO: Replace with actual API call when contact endpoint is implemented
    // await api.sendContactMessage(formData.value)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    logger.info('Contact form submitted', { subject: formData.value.subject })
    message.success('Message sent successfully! I will get back to you soon.')
    handleReset()
  } catch (error) {
    logger.error('Failed to send contact message', {
      error: error.message,
      status: error.response?.status,
    })
    message.error('Failed to send message. Please try again.')
  } finally {
    sending.value = false
  }
}

function handleReset() {
  formData.value = {
    name: '',
    email: '',
    subject: '',
    message: '',
  }
  message.info('Form cleared')
}

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
.contacts-card {
  padding: 16px;
}
</style>
