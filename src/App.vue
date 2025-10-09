<template>
  <div class="min-h-screen bg-base-100">
    <nav class="navbar bg-base-200 shadow-lg">
      <div class="navbar-start">
        <router-link to="/" class="btn btn-ghost text-xl">Portfolio</router-link>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/experience">Experience</router-link></li>
          <li><router-link to="/miniatures">Miniatures</router-link></li>
        </ul>
      </div>
    </nav>

    <main class="container mx-auto p-4">
      <router-view />
    </main>

    <footer class="footer footer-center p-4 bg-base-300 text-base-content">
      <div>
        <p>© 2024 Portfolio - Built with Vue.js & Tailwind CSS</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
</script>
