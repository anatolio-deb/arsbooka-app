import { load, dump } from "../localStorageApi";

export default {
    namespaced: true,
    state: () => ({
        books: load("cart")
    }),
    mutations: {
        addToCart(state, book) {
            state.books.push(book);
            dump("cart", JSON.stringify(state.books))
        },
        removeFromCart(state, book) {
            state.books.splice(state.books.indexOf(book), 1);
            dump("cart", JSON.stringify(state.books))
        }
    },
    actions: {},
    modules: {},
    getters: {
        getBookByUrl: (state) => (url) => {
            return state.books.find(book => book.url === url);
        },
    }
};
