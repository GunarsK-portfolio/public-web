<template>
  <n-space
    id="contact"
    vertical
    :size="32"
    style="padding: 80px 20px; max-width: 600px; margin: 0 auto; text-align: center"
  >
    <h2 style="font-size: 36px; font-weight: 700; margin: 0">Get In Touch</h2>

    <n-divider />

    <n-text style="font-size: 16px">
      I'm always interested in hearing about new opportunities and interesting projects.
    </n-text>

    <n-space vertical :size="16" style="width: 100%">
      <n-card>
        <n-space vertical :size="12">
          <n-space align="center" :size="12">
            <n-icon size="24"><MailOutline /></n-icon>
            <n-text>your.email@example.com</n-text>
          </n-space>
        </n-space>
      </n-card>

      <n-space justify="center" :size="16">
        <n-button
          circle
          size="large"
          tag="a"
          href="https://github.com/yourusername"
          target="_blank"
        >
          <template #icon>
            <n-icon size="24"><LogoGithub /></n-icon>
          </template>
        </n-button>

        <n-button
          circle
          size="large"
          tag="a"
          href="https://linkedin.com/in/yourusername"
          target="_blank"
        >
          <template #icon>
            <n-icon size="24"><LogoLinkedin /></n-icon>
          </template>
        </n-button>
      </n-space>
    </n-space>

    <n-divider>OR</n-divider>

    <n-button type="primary" size="large" @click="$router.push('/contact')">
      Send Me a Message →
    </n-button>
  </n-space>
</template>

<script setup>
import { NSpace, NDivider, NText, NCard, NButton, NIcon } from 'naive-ui'
import { MailOutline, LogoGithub, LogoLinkedin } from '@vicons/ionicons5'
</script>
