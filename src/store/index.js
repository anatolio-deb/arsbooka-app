import Vue from "vue";
import Vuex from "vuex";
import wishList from "./wishList";
import cart from "./cart";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    books: [],
    categories: [],
    newFilterApplied: false,
    filteredCategoryBooks: [],
  },
  mutations: {
    setNewCollectionOfBooks(state, collectionOfBooks) {
      state.books = collectionOfBooks;
    },
    updateCategory(state, payload) {
      for (let category of state.categories) {
        if (category.url === payload.url) {
          state.categories[state.categories.indexOf(category)] = payload.data
        }
      }
    },
    unsetBooksOfCategory(state, url) {
      for (let category of state.categories) {
        if (category.url === url) {
          delete state.categories[state.categories.indexOf(category)].books
        }
      }
    },
    switchNewfilter(state) {
      state.newFilterApplied = !state.newFilterApplied;
    },
    setFilteredCategoryBooks(state, collectionOfBooks) {
      state.filteredCategoryBooks = collectionOfBooks;
    }
  },
  actions: {
    setBooksFromApi(context) {
      apiClient.get("books/").then(response => context.commit("setNewCollectionOfBooks", response.data))
    },
    setCategories(context) {
      apiClient.get('categories/').then(response => context.state.categories = response.data)
    },
    setCategoryDetail(context, url) {
      axios.get(url).then((response) => {
        return new Promise((resolve) => {
          context.commit("updateCategory", { url: url, data: response.data })
          resolve()
        })
      }).then(() => {
        context.dispatch("updateCategoryFilter")
      })
    },
    unsetCategoryDetail(context, url) {
      context.commit("unsetBooksOfCategory", url)
      context.dispatch("updateCategoryFilter")
    },
    updateCategoryFilter(context) {
      context.dispatch("updateFilteredCategoryBooks").then(() => {
        return new Promise((resolve) => {
          if (context.state.newFilterApplied) {
            context.commit("setFilteredCategoryBooks", context.getters.newBooks(context.state.filteredCategoryBooks))
          }
          context.commit("setNewCollectionOfBooks", context.state.filteredCategoryBooks)
          resolve()
        })
      })
    },
    updateNewFilter(context) {
      context.commit("switchNewfilter")
      if (context.state.filteredCategoryBooks.length > 0) {
        context.dispatch("updateCategoryFilter")
      } else if (context.state.newFilterApplied) {
        context.commit("setNewCollectionOfBooks", context.getters.newBooks(context.state.books))
      } else { context.dispatch("cancelNewFilter") }
    },
    cancelNewFilter(context) {
      context.dispatch("setBooksFromApi")
    },
    updateFilteredCategoryBooks(context) {
      return new Promise((resolve) => {
        let collectionOfBooks = []

        for (let category of context.state.categories) {
          if (category.books) {
            collectionOfBooks.push.apply(collectionOfBooks, category.books)
          }
        }

        if (collectionOfBooks.length > 0) {
          context.commit("setFilteredCategoryBooks", collectionOfBooks)
        } else {
          context.dispatch("setBooksFromApi")
        }
        resolve()
      })
    },
  },
  modules: {
    wishList,
    cart,
  },
  getters: {
    newBooks: () => (collectionOfBooks) => {
      return collectionOfBooks.filter(
        (book) =>
          new Date().getMonth() - new Date(book.date_added).getMonth() >= 0)
    },
    isNewBook: (state, getters) => (book) => {
      return getters.newBooks(state.books).includes(book)
    },
    getBookByUrl: (state) => (url) => {
      return state.books.find(book => book.url === url);
    },
  }
});
