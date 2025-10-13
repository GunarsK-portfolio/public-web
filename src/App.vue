<template>
  <n-config-provider :theme="theme">
    <n-layout style="min-height: 100vh">
      <n-layout-header bordered>
        <div style="display: flex; align-items: center; padding: 0 24px; height: 64px">
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
        </div>
      </n-layout-header>

      <n-layout-content style="padding: 24px; max-width: 1200px; margin: 0 auto; width: 100%">
        <router-view />
      </n-layout-content>

      <n-layout-footer bordered style="padding: 16px; text-align: center">
        <p>© 2024 Portfolio - Built with Vue.js & Naive UI</p>
      </n-layout-footer>
    </n-layout>
  </n-config-provider>
</template>

<script setup>
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import {
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NMenu,
} from 'naive-ui'

const theme = null

const menuOptions = [
  {
    label: () => h(RouterLink, { to: '/' }, { default: () => 'Home' }),
    key: 'home',
  },
  {
    label: () => h(RouterLink, { to: '/experience' }, { default: () => 'Experience' }),
    key: 'experience',
  },
  {
    label: () => h(RouterLink, { to: '/miniatures' }, { default: () => 'Miniatures' }),
    key: 'miniatures',
  },
]
</script>
