import Vue from 'vue';
import Vuex from 'vuex';

// import all modules
import books from "./modules/books.js";
import routes from "./modules/routes.js";


Vue.use(Vuex);

export default new Vuex.Store({
    // global states for app
    state: {
        companyName: "Test"
    },
    // module states,getters and etc.
    modules: {
        books,
        routes,
    },
});