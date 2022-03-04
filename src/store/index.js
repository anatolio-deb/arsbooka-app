import Vue from "vue";
import Vuex from "vuex";
import { HTTP } from "../main";
import wishList from "./wishList";

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
    setBook(context, url) {
      HTTP.get(url).then((response) => { context.state.book = response.data });
    },
    setParentalGuidance(context, url) {
      HTTP.get(url).then((response) => { context.state.parental_guidance = response.data });
    }
  },
  modules: {
    wishList,
  },
  getters: {
    getBookByUrl: (state) => (url) => {
      return state.books.find(book => book.url === url);
    },
  }
});
