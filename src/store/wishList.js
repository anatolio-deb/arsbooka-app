import { load, dump } from "../localStorageApi";

export default {
    namespaced: true,
    state: () => ({
        books: load("wishList")
    }),
    mutations: {
        addToWishList(state, book) {
            state.books.push(book);
            dump("wishList", JSON.stringify(state.books))
        },
        removeFromWishList(state, book) {
            state.books.splice(state.books.indexOf(book), 1);
            dump("wishList", JSON.stringify(state.books))
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
