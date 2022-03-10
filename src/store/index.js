import Vue from "vue";
import Vuex from "vuex";
import { HTTP } from "../main";
import wishList from "./wishList";
import cart from "./cart";
import filter from "./filter";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    books: [],
    book: {},
    parental_guidance: [],
    categories: [],
  },
  mutations: {
  },
  actions: {
    setBooks(context) {
      HTTP.get('books/').then((response) => { context.state.books = response.data });
    },
    setBook(context, url) {
      HTTP.get(url).then((response) => { context.state.book = response.data });
    },
    setParentalGuidance(context, url) {
      HTTP.get(url).then((response) => { context.state.parental_guidance = response.data });
    },
    setCategories(context) {
      HTTP.get('categories/').then((response) => { context.state.categories = response.data });
    }
  },
  modules: {
    wishList,
    cart,
    filter,
  },
  getters: {
    getBookByUrl: (state) => (url) => {
      return state.books.find(book => book.url === url);
    },
    newBooks: (state) => {
      return state.books.filter(book => new Date().getMonth() - new Date(book.date_added).getMonth() >= 0)
    },
  }
});
