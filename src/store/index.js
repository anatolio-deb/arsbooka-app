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
  modules: {
    wishList,
    cart,
  },
  state: {
    books: [],
    categories: [],
    newFilterApplied: false,
    parentalGuidances: [],
  },
  mutations: {
    setNewCollectionOfBooks(state, collectionOfBooks) {
      state.books = collectionOfBooks;
    },
    updateCategory(state, payload) {
      for (let category of state.categories) {
        if (category.url === payload.url) {
          state.categories[state.categories.indexOf(category)] = payload
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
    updateParentalGuidance(state, payload) {
      for (let parentalGuidance of state.parentalGuidances) {
        if (parentalGuidance.url === payload.url) {
          state.parentalGuidances[state.parentalGuidances.indexOf(parentalGuidance)] = payload
        }
      }
    },
    unsetBooksOfParentalGuidance(state, url) {
      for (let parentalGuidance of state.parentalGuidances) {
        if (parentalGuidance.url === url) {
          delete state.parentalGuidances[state.parentalGuidances.indexOf(parentalGuidance)].books
        }
      }
    },
  },
  actions: {
    setBooksFromApi(context) {
      apiClient.get("books/").then(response => context.commit("setNewCollectionOfBooks", response.data))
    },
    setCategories(context) {
      apiClient.get('categories/').then(response => context.state.categories = response.data)
    },
    setCategory(context, url) {
      axios.get(url).then((response) => {
        context.commit("updateCategory", response.data)
        context.dispatch("updateFilter")
      })
    },
    unsetCategory(context, url) {
      context.commit("unsetBooksOfCategory", url)
      context.dispatch("updateFilter")
    },
    updateNewFilter(context) {
      context.commit("switchNewfilter")
      if (context.getters.getActiveCategoriesBooks.length) {
        context.dispatch("updateFilter")
      } else if (context.state.newFilterApplied) {
        context.commit("setNewCollectionOfBooks", context.getters.newBooks(context.state.books))
      } else { context.dispatch("cancelNewFilter") }
    },
    cancelNewFilter(context) {
      context.dispatch("setBooksFromApi")
    },
    setParentalGuidances(context) {
      apiClient.get("parental_guidances/").then(response => context.state.parentalGuidances = response.data)
    },
    setParentalGuidance(context, url) {
      axios.get(url).then(response => {
        context.commit("updateParentalGuidance", response.data)
        context.dispatch("updateFilter")
      })
    },
    unsetParentalGuidance(context, url) {
      context.commit("unsetBooksOfParentalGuidance", url)
      context.dispatch("updateFilter")
    },
    getActiveParentalGuidanceBooks(context) {
      let activeParentalGuidanceBooks = []

      for (let parentalGuidance of context.state.parentalGuidances) {
        if (parentalGuidance.books) {
          activeParentalGuidanceBooks.push.apply(activeParentalGuidanceBooks, parentalGuidance.books)
        }
      }

      return activeParentalGuidanceBooks
    },
    getActiveCategoriesBooks(context) {
      let activeCategoriesBooks = []

      for (let category of context.state.categories) {
        if (category.books) {
          activeCategoriesBooks.push.apply(activeCategoriesBooks, category.books)
        }
      }

      return activeCategoriesBooks
    },
    getActiveParentalGuidances(context) {
      return context.state.parentalGuidances.filter(parentalGuidance => parentalGuidance.books)
    },
    async updateFilter(context) {
      let collectionOfBooks = [];
      let activeCategoriesBooks = await context.dispatch("getActiveCategoriesBooks")

      if (activeCategoriesBooks.length) {
        collectionOfBooks = activeCategoriesBooks
      }

      let activeParentalGuidances = await context.dispatch("getActiveParentalGuidances")

      if (activeParentalGuidances.length) {
        let urls = [];

        for (let parentalGuidance of activeParentalGuidances) {
          urls.push(parentalGuidance.url)
        }

        if (collectionOfBooks.length) {
          collectionOfBooks = collectionOfBooks.filter(book => urls.includes(book.parental_guidance.url));
        } else {
          collectionOfBooks = await context.dispatch("getActiveParentalGuidanceBooks");
        }
      }

      if (collectionOfBooks.length) {
        if (context.state.newFilterApplied) {
          collectionOfBooks = context.getters.newBooks(collectionOfBooks);
        }
        context.commit("setNewCollectionOfBooks", collectionOfBooks)
      } else {
        context.dispatch("setBooksFromApi")
      }
    }
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
