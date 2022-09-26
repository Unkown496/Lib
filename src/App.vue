<template>
  <v-app>
    <app-header></app-header>
    <v-main>    
      <keep-alive include="Cart,Login,Lib,User">
        <router-view />
      </keep-alive>
    </v-main>
    <app-footer></app-footer>
  </v-app>
</template>


<script>
  import appHeader from './components/AppHeader.vue';
  import appFooter from './components/AppFooter.vue';
  export default {
    name: 'App',
    components: {
      "app-header": appHeader,
      "app-footer": appFooter,
    },
  };
</script>

