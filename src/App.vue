<template>
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

import FooterSection from './components/website/Footer.vue';
import HeaderSection from './components/website/Header.vue';
import SidebarAdmin from '@/components/admin/Sidebar.vue';
import NavbarAdmin from './components/admin/Navbar.vue';
import FooterAdmin from './components/admin/Footer.vue';

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
    const store = useStore(); 
    const role = computed(() => store.getters['auth/getRole']);
    console.log('Role in App:', role.value); // For debugging

    return {
      role, 
    };
  },
};
</script>

<style>

 @import '@/assets/css/bootstrap.min.css';
@import '@/assets/css/style.css';
html, body {
  height: 100%;
  margin: 0;
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
