
export default {
    namespaced: true,
    state: () => ({
        books: []
    }),
    mutations: {
        filterAdd(state, books) {
            state.books = [...new Set([...state.books, ...books])]
        },
        filterRemove(state, books) {
            state.books = state.books.filter(book => books.includes(book))
        }
    },
    actions: {},
    modules: {},
    getters: {
        filterApplied(state) {
            return state.books.lenght > 0
        }
    }
};
