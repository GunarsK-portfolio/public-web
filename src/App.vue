<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="currentThemeOverrides">
    <n-notification-provider>
      <n-dialog-provider>
        <n-message-provider>
          <n-global-style />
          <n-layout class="app-layout">
            <n-layout-header bordered class="app-header">
              <div class="header-inner">
                <router-link to="/" class="header-logo"> Portfolio </router-link>

                <!-- Desktop Menu -->
                <n-menu mode="horizontal" :options="menuOptions" class="header-menu" />

                <!-- Mobile Drawer Button -->
                <n-button
                  circle
                  class="mobile-menu-btn"
                  aria-label="Open navigation menu"
                  @click="drawerVisible = true"
                >
                  <template #icon>
                    <n-icon size="20">
                      <MenuOutline />
                    </n-icon>
                  </template>
                </n-button>

                <n-button
                  circle
                  class="theme-toggle"
                  :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
                  @click="toggleTheme"
                >
                  <template #icon>
                    <n-icon size="20">
                      <MoonOutline v-if="isDark" />
                      <SunnyOutline v-else />
                    </n-icon>
                  </template>
                </n-button>
              </div>
            </n-layout-header>

            <!-- Mobile Drawer -->
            <n-drawer
              v-model:show="drawerVisible"
              placement="left"
              size="240px"
              :mask-closable="true"
              :show-footer="false"
            >
              <n-menu
                mode="vertical"
                :options="menuOptions"
                style="margin-top: 24px"
                @click="drawerVisible = false"
              />
            </n-drawer>

            <n-layout-content class="app-content">
              <router-view />
            </n-layout-content>

            <n-layout-footer bordered class="app-footer">
              <p>© 2025 Portfolio - Built with Vue.js & Naive UI</p>
            </n-layout-footer>
          </n-layout>

          <BackToTop />
        </n-message-provider>
      </n-dialog-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<script setup>
import { h, ref, computed, onMounted, provide } from 'vue'
import { RouterLink } from 'vue-router'
import {
  NConfigProvider,
  NNotificationProvider,
  NDialogProvider,
  NMessageProvider,
  NGlobalStyle,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NMenu,
  NButton,
  NIcon,
  NDrawer,
  darkTheme,
} from 'naive-ui'
import { MoonOutline, SunnyOutline, MenuOutline } from '@vicons/ionicons5'
import BackToTop from './components/shared/BackToTop.vue'
import { THEMES, getStoredTheme, setStoredTheme, createThemeConfig } from './composables/useTheme'
import { lightOverrides, darkOverrides } from './themes/portfolio'

// Map theme codes to Naive UI themes
const THEME_CONFIG = createThemeConfig({
  [THEMES.DARK]: darkTheme,
})

// Map theme codes to theme overrides
const THEME_OVERRIDES = {
  [THEMES.LIGHT]: lightOverrides,
  [THEMES.DARK]: darkOverrides,
}

// Initialize theme code from localStorage
const currentThemeCode = ref(getStoredTheme())

// Provide theme for child components to watch
provide('currentThemeCode', currentThemeCode)

// Computed properties
const currentTheme = computed(() => THEME_CONFIG[currentThemeCode.value] || null)
const currentThemeOverrides = computed(() => THEME_OVERRIDES[currentThemeCode.value] || null)
const isDark = computed(() => currentThemeCode.value === THEMES.DARK)

const setTheme = (themeCode) => {
  if (setStoredTheme(themeCode)) {
    currentThemeCode.value = themeCode
  }
}

const toggleTheme = () => {
  // Toggle between light and dark
  const newTheme = currentThemeCode.value === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK
  setTheme(newTheme)
}

const drawerVisible = ref(false)

onMounted(() => {
  // Theme is already set
})

const menuOptions = [
  {
    label: () => h(RouterLink, { to: '/' }, { default: () => 'Home' }),
    key: 'home',
  },
  {
    label: () => h(RouterLink, { to: '/projects' }, { default: () => 'Projects' }),
    key: 'projects',
  },
  {
    label: () => h(RouterLink, { to: '/miniatures' }, { default: () => 'Miniatures' }),
    key: 'miniatures',
  },
  {
    label: () => h(RouterLink, { to: '/contact' }, { default: () => 'Contact' }),
    key: 'contact',
  },
]
</script>

<style scoped>
/* Layout base */
.app-layout {
  min-height: 100vh;
  background-color: var(--n-color-background);
  color: var(--n-text-color);
}

/* Header */
.app-header {
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  backdrop-filter: blur(10px);
  background-color: var(--n-color);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid var(--n-divider-color);
}

/* Header inner wrapper */
.header-inner {
  display: flex;
  align-items: center;
  height: 64px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Logo / brand */
.header-logo {
  text-decoration: none;
  color: inherit;
  font-size: 20px;
  font-weight: bold;
  margin-right: auto;
}

/* Desktop menu */
.header-menu {
  flex: 1;
  justify-content: center;
}

/* Mobile menu button */
.mobile-menu-btn {
  display: none;
  margin-right: 8px;
}

/* Theme toggle button */
.theme-toggle {
  margin-left: 16px;
}

/* Content */
.app-content {
  padding-top: 64px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Footer */
.app-footer {
  padding: 16px;
  text-align: center;
  font-size: 14px;
  color: var(--n-text-color-3);
}

/* Back to Top button */
.back-to-top {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 200;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .header-menu {
    display: none;
  }
  .mobile-menu-btn {
    display: flex;
  }
  .header-inner {
    padding: 0 12px;
  }
}
</style>
