export default {
    namespaced: true,
    state: () => ({
        books: []
    }),
    mutations: {
        addToWishList(state, book) {
            state.books.push(book);
        },
        removeFromWishList(state, book) {
            state.books.splice(state.books.indexOf(book), 1);
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
