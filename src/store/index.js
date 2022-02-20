import Vue from "vue";
import Vuex from "vuex";
import { HTTP } from "../main";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    books: [],
    book: {}
  },
  mutations: {},
  actions: {
    setBooks(context) {
      HTTP.get('books/').then((data) => { context.state.books = data });
    },
    getBook(context, url) {
      HTTP.get(url).then((data) => { context.state.book = data });
    }
  },
  modules: {},
});
