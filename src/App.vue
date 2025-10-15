<template>
  <n-config-provider :theme="currentTheme">
    <n-notification-provider>
      <n-message-provider>
        <n-global-style />
        <n-layout style="min-height: 100vh">
          <n-layout-header
            bordered
            style="
              position: fixed;
              top: 0;
              z-index: 100;
              background: var(--n-color);
              backdrop-filter: blur(8px);
            "
          >
            <div
              style="
                display: flex;
                align-items: center;
                padding: 0 24px;
                height: 64px;
                max-width: 1200px;
                margin: 0 auto;
                width: 100%;
              "
            >
              <router-link
                to="/"
                style="
                  text-decoration: none;
                  color: inherit;
                  font-size: 20px;
                  font-weight: bold;
                  margin-right: auto;
                "
              >
                Portfolio
              </router-link>
              <n-menu
                mode="horizontal"
                :options="menuOptions"
                style="flex: 1; justify-content: center"
              />
              <n-button circle @click="toggleTheme">
                <template #icon>
                  <n-icon size="20">
                    <MoonOutline v-if="isDark" />
                    <SunnyOutline v-else />
                  </n-icon>
                </template>
              </n-button>
            </div>
          </n-layout-header>

          <n-layout-content style="padding-top: 64px">
            <router-view />
          </n-layout-content>

          <n-layout-footer bordered style="padding: 16px; text-align: center">
            <p>© 2025 Portfolio - Built with Vue.js & Naive UI</p>
          </n-layout-footer>
        </n-layout>

        <BackToTop />
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<script setup>
import { h, ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import {
  NConfigProvider,
  NNotificationProvider,
  NMessageProvider,
  NGlobalStyle,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NMenu,
  NButton,
  NIcon,
  darkTheme,
} from 'naive-ui'
import { MoonOutline, SunnyOutline } from '@vicons/ionicons5'
import BackToTop from './components/BackToTop.vue'

const isDark = ref(false)

const currentTheme = computed(() => (isDark.value ? darkTheme : null))

const toggleTheme = () => {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDark.value = true
  } else if (savedTheme === null) {
    // Check system preference
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
})

const menuOptions = [
  {
    label: () => h(RouterLink, { to: '/' }, { default: () => 'Home' }),
    key: 'home',
  },
  {
    label: () => h(RouterLink, { to: '/gallery' }, { default: () => 'Gallery' }),
    key: 'gallery',
  },
  {
    label: () => h(RouterLink, { to: '/contact' }, { default: () => 'Contact' }),
    key: 'contact',
  },
]
</script>
