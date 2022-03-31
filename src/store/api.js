import axios from "axios";



export default {
    namespaced: true,
    state: () => ({
        book: {},

        parental_guidance: {},
    }),
    mutations: {
    },
    actions: {
        setBook(context, url) {
            axios.get(url).then(response => context.state.book = response.data);
        },




    },
    getters: {
    }
};
