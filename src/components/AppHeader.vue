<template>
    <v-card>
        <header>
          <v-app-bar dense app>
            <v-app-bar-nav-icon tile @click="openDrawerOnMobile = !openDrawerOnMobile" class="d-flex d-md-none">
            </v-app-bar-nav-icon>
            <v-toolbar-title 
              class="flex-grow-1 flex-md-grow-0 cursor-pointer"
            >
              <router-link
                to="/"
                tag="p"
                class="mb-0 d-inline"
              >
                {{companyName}}
              </router-link>
            </v-toolbar-title>
            <v-scale-transition>
              <v-btn 
                icon
                color="info"
                @click="switchPage('/cart')"
                to="/cart"
                class="d-md-none"
                v-show="!openDrawerOnMobile"
              >
                <router-link to="/cart">
                  <v-icon>mdi-cart</v-icon>
                </router-link>
              </v-btn> 
            </v-scale-transition>
            <v-scale-transition> 
              <v-btn
                icon
                @click="changeTheme()"
                v-show="!openDrawerOnMobile"                
                class="d-md-none"
              >
                <v-icon>
                  mdi-weather-{{isDark ? "night": "sunny"}}
                </v-icon>
              </v-btn> 
            </v-scale-transition>     
            <v-toolbar-items
              class="justify-end d-none d-md-flex flex-grow-1"
            >
              <v-tabs
                v-model="selectedPage"
                color="info"
                right
                class="flex-grow-0 flex-shrink-0 w-auto"
              >
                <v-tabs-slider></v-tabs-slider>
                <v-tab 
                  v-for="(item) in routesNamed"
                  @click="switchPage(item.route)"
                  :key="item"
                  :to="item.route"
                >
                  <v-icon
                    small
                    left
                  >
                    mdi-{{ item.icon }}
                  </v-icon>
                  <span>{{ item.name }}</span>
                </v-tab>
              </v-tabs>
              <div>
                <v-btn 
                  icon
                  color="info"
                  @click="switchPage('/cart')"
                  to="/cart"
                >
                  <router-link to="/cart">
                    <v-icon>mdi-cart</v-icon>
                  </router-link>
                </v-btn>
                <v-scale-transition> 
                  <v-btn
                    icon
                    @click="changeTheme()"                
                  >
                    <v-icon>
                      mdi-weather-{{isDark ? "night": "sunny"}}
                    </v-icon>
                  </v-btn> 
                </v-scale-transition> 
              </div>
            </v-toolbar-items>
          </v-app-bar>
        </header>
        <v-navigation-drawer v-model="openDrawerOnMobile" temporary app>
          <template v-slot:prepend>
            <v-toolbar dense nav>
              <v-toolbar-title class="flex-grow-1">
                <router-link
                  to="/"
                  tag="p"
                  class="mb-0"
                >
                  {{companyName}}
                </router-link>
            </v-toolbar-title>
              <v-scale-transition>
                <v-btn 
                  icon
                  color="info"
                  @click="switchPage('/cart')"
                  to="/cart"
                  class="d-md-none"
                  v-show="openDrawerOnMobile"
                >
                  <router-link to="/cart">
                    <v-icon>mdi-cart</v-icon>
                  </router-link>
                </v-btn>  
              </v-scale-transition>
              <v-scale-transition> 
                <v-btn
                  icon
                  @click="changeTheme()"
                  v-show="openDrawerOnMobile"                
                  class="d-md-none"
                >
                  <v-icon>
                    mdi-weather-{{isDark ? "night": "sunny"}}
                  </v-icon>
                </v-btn> 
              </v-scale-transition>            
            </v-toolbar>
          </template>
          <v-list dense>
            <v-subheader>Навигация</v-subheader>
              <v-list-item-group v-model="selectedPage" color="info">
                <v-list-item 
                  link
                  v-for="(item, i) in routesNamed" 
                  :to="item.route"
                  :key="item"
                  @click="switchPage(item.route)"
                >
                  <v-list-item-icon>
                    <v-icon left>mdi-{{item.icon}}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                      <!-- run animate before selected current item and drawer is open -->
                    <p
                      class="ma-0 pr-2 text-non-space" 
                      :class="{ 'animate-selected': selectedPage === i && openDrawerOnMobile,  'animate-not-selected': selectedPage !== i && !isRender }"
                    >{{ item.name }} </p>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
          </v-list>
          <template v-slot:append>
              <v-card elevation="10">
                <v-card-title>Powered by Nastya</v-card-title>
              </v-card>
          </template>
        </v-navigation-drawer>
      </v-card>
</template>

<script>
  import { mapMutations, mapState } from "vuex";
  
  export default {
    name: "app-header",
    data: () => ({
      isRender: false,
      openDrawerOnMobile: false,
      isDark: false,
    }),
    methods: {
      ...mapMutations({
        switchPage: "routes/switchPage",

      }),
      changeTheme() {
        this.isDark = !this.isDark;
        return this.$vuetify.theme.dark = this.isDark;
      }
    },
    computed: {
      ...mapState({
        companyName: 'companyName',
        selectedPage: state => state.routes.selectedPage, 
        routesNamed: state => state.routes.routesArray,
      }),
      // companyName() {
      //   return this.$store.state.companyName;
      // },
      // selectedPage() {
      //   return this.$store.state.routes.selectedPage;
      // },
      // routesNamed() {
      //   return this.$store.state.routes.routesArray;
      // },
      noramalizeSwitchPage() {
        // normalize path for btn togller and list group
        let url = this.$route.path;
        return this.$store.commit('routes/switchPage', url);
      }

    },
    mounted() {
      return this.isRender = true; 
    },
  }
</script>
<style scoped lang="scss">
  /* change animation delay for undeline link's (docs css animation-delay) */
  $animation-selected-speed: .5s;
  $animation-line-color: #80DEEA;

  .animate {
    &-selected {
      // append priority on class properties
      display: inline-block !important; 
      flex: 0 0 !important;
      position: relative !important;
      &:after {
        animation: selected $animation-selected-speed ease-in-out;
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: .1rem;
        background-color: $animation-line-color;
      }
    }
    &-not-selected {
      display: inline-block !important; 
      flex: 0 0 !important;
      position: relative !important;
      &:after {
        animation: not-selected $animation-selected-speed ease-in-out;
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0%;
        height: .1rem;
        background-color: $animation-line-color;
      }
    }
  }
  @keyframes selected {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }
  @keyframes not-selected {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }  
  .text-non-space {
    white-space: nowrap;
  }
</style>