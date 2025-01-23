<template>
  <!-- Render HeaderSection and FooterSection for non-admin users -->
  <HeaderSection v-if="role !== 'admin'" />
  <SidebarAdmin v-if="role === 'admin'" />
  <NavbarAdmin v-if="role === 'admin'" />
  <router-view></router-view>
  <FooterSection v-if="role !== 'admin'" />
  <FooterAdmin v-if="role === 'admin'" />
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

import FooterSection from './components/FooterSection.vue';
import HeaderSection from './components/HeaderSection.vue';
import SidebarAdmin from '@/components/admin/SidebarAdmin.vue';
import NavbarAdmin from './components/admin/NavbarAdmin.vue';
import FooterAdmin from './components/admin/FooterAdmin.vue';

export default {
  name: 'App',
  components: {
    HeaderSection,
    FooterSection,
    SidebarAdmin,
    NavbarAdmin,
    FooterAdmin,
  },
  setup() {
    const store = useStore(); // Access the Vuex store

    // Get role from the Vuex store using a computed property
    const role = computed(() => store.getters.getRole);

    return {
      role, // Return role to use it in the template
    };
  },
};
</script>

<style>

 @import '@/assets/css/bootstrap.min.css';
@import '@/assets/css/style.css';
</style>
