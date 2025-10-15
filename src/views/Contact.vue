<template>
  <n-space vertical size="large" class="section-wrapper">
    <n-button text @click="$router.push('/')">
      <template #icon>
        <n-icon><ArrowBackOutline /></n-icon>
      </template>
      Back to Home
    </n-button>

    <n-page-header title="Contact Me" subtitle="Let's connect and discuss opportunities">
    </n-page-header>

    <n-grid :x-gap="24" :y-gap="24" :cols="1" :l="2">
      <n-grid-item>
        <n-card title="Send a Message" class="contacts-card">
          <n-form ref="formRef" :model="formData" :rules="rules">
            <n-form-item label="Name" path="name">
              <n-input v-model:value="formData.name" placeholder="Your name" />
            </n-form-item>

            <n-form-item label="Email" path="email">
              <n-input v-model:value="formData.email" placeholder="your.email@example.com" />
            </n-form-item>

            <n-form-item label="Subject" path="subject">
              <n-input v-model:value="formData.subject" placeholder="What is this about?" />
            </n-form-item>

            <n-form-item label="Message" path="message">
              <n-input
                v-model:value="formData.message"
                type="textarea"
                placeholder="Your message..."
                :autosize="{ minRows: 6, maxRows: 12 }"
              />
            </n-form-item>

            <n-space>
              <n-button type="primary" :loading="sending" @click="handleSubmit">
                <template #icon>
                  <n-icon><SendOutline /></n-icon>
                </template>
                Send Message
              </n-button>
              <n-button @click="handleReset">Clear Form</n-button>
            </n-space>
          </n-form>
        </n-card>
      </n-grid-item>

      <n-grid-item>
        <n-space vertical size="large">
          <n-card title="Contact Information">
            <n-space vertical size="large">
              <n-space align="center">
                <n-icon size="24" color="#2080f0">
                  <MailOutline />
                </n-icon>
                <n-space vertical size="small">
                  <n-text strong>Email</n-text>
                  <n-text depth="3">your.email@example.com</n-text>
                </n-space>
              </n-space>

              <n-divider />

              <n-space align="center">
                <n-icon size="24" color="#2080f0">
                  <LocationOutline />
                </n-icon>
                <n-space vertical size="small">
                  <n-text strong>Location</n-text>
                  <n-text depth="3">City, Country (Open to remote)</n-text>
                </n-space>
              </n-space>

              <n-divider />

              <n-space vertical size="small">
                <n-text strong>Social Media</n-text>
                <n-space>
                  <n-button
                    circle
                    secondary
                    tag="a"
                    href="https://github.com/yourusername"
                    target="_blank"
                  >
                    <template #icon>
                      <n-icon size="20"><LogoGithub /></n-icon>
                    </template>
                  </n-button>
                  <n-button
                    circle
                    secondary
                    tag="a"
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
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
              I typically respond to messages within 24-48 hours. For urgent inquiries, please reach
              out via email directly.
            </n-text>
          </n-card>
        </n-space>
      </n-grid-item>
    </n-grid>
  </n-space>
</template>

<script setup>
import { ref } from 'vue'
import {
  useMessage,
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
} from 'naive-ui'
import {
  ArrowBackOutline,
  SendOutline,
  MailOutline,
  LocationOutline,
  LogoGithub,
  LogoLinkedin,
} from '@vicons/ionicons5'
// import api from '../services/api'

const message = useMessage()
const formRef = ref(null)
const sending = ref(false)

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const rules = {
  name: [
    {
      required: true,
      message: 'Please enter your name',
      trigger: 'blur',
    },
  ],
  email: [
    {
      required: true,
      message: 'Please enter your email',
      trigger: 'blur',
    },
    {
      type: 'email',
      message: 'Please enter a valid email address',
      trigger: ['blur', 'input'],
    },
  ],
  subject: [
    {
      required: true,
      message: 'Please enter a subject',
      trigger: 'blur',
    },
  ],
  message: [
    {
      required: true,
      message: 'Please enter your message',
      trigger: 'blur',
    },
    {
      min: 10,
      message: 'Message must be at least 10 characters',
      trigger: 'blur',
    },
  ],
}

const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    sending.value = true

    // TODO: Replace with actual API call
    // await api.sendContactMessage(formData.value)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    message.success('Message sent successfully! I will get back to you soon.')
    handleReset()
  } catch (error) {
    if (error.message) {
      message.error('Failed to send message. Please try again.')
    }
  } finally {
    sending.value = false
  }
}

const handleReset = () => {
  formData.value = {
    name: '',
    email: '',
    subject: '',
    message: '',
  }
}
</script>

<style scoped>
/* Card styling */
.contacts-card {
  padding: 16px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.contacts-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}
</style>
