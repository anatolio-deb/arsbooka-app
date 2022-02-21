import Vue from "vue";
import Vuex from "vuex";
import { HTTP } from "../main";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    books: [],
    book: {},
    parental_guidance: [],
  },
  mutations: {},
  actions: {
    setBooks(context) {
      HTTP.get('books/').then((response) => { context.state.books = response.data });
    },
    getBook(context, url) {
      HTTP.get(url).then((response) => { context.state.book = response.data });
    },
    getParentalGuidance(context, url) {
      HTTP.get(url).then((response) => { context.state.parental_guidance = response.data });
    }
  },
  modules: {},
});
