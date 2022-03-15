import Vue from "vue";
import Vuex from "vuex";
import { HTTP } from "../main";
import wishList from "./wishList";
import cart from "./cart";
import axios from "axios";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    books: [],
    book: {},
    parental_guidance: [],
    categories: [],
  },
  mutations: {
    unsetCategory(state, url) {
      for (let category of state.categories) {
        if (category.url === url) {
          state.categories[state.categories.indexOf(category)].books = undefined
        }
      }
    },
    updateBooks(state, books = []) {
      if (books.length < 1) {
        for (let category of state.categories) {
          if (category.books !== undefined) {
            books.concat(category.books)
          }
        }
      }
      state.books = books
    }
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
    },
    setCategory(context, url) {
      axios.get(url).then((response) => {
        for (let category of context.state.categories) {
          if (category.url === url) {
            context.state.categories[context.state.categories.indexOf(category)].books = response.data.books
          }
        }
      })
    }
  },
  modules: {
    wishList,
    cart,
  },
  getters: {
    getBookByUrl: (state) => (url) => {
      return state.books.find(book => book.url === url);
    },
    newBooks: (state) => {
      return state.books.filter(
        (book) =>
          new Date().getMonth() - new Date(book.date_added).getMonth() >= 0)
    },
  }
});
