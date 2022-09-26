const state = () => ({
    // for auto create tabs to header
    /* 
      why not used $router.options? 
      added prop to route object, it's similarly state on store Vue
    */
   selectedPage: null,
    routesArray: [
        {
          name: "Главная",
          route: "/",
          icon: "slash-forward",
  
        },
        {
          name: "Библиотека",
          route: "/lib",
          icon: "book-open-page-variant"
        },
        {
          name: "Личный кабинет",
          route: "/user", 
          icon: "account"
        },
    ],
});


const getters = {
  switchPageNormalize() {
    return 
  }
};


const actions = () => ({

});


const mutations = {
  switchPage(state, payload) {
    state.selectedPage = payload;
  },
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}