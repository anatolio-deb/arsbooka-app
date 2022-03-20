import axios from "axios";



export default {
    namespaced: true,
    state: () => ({
        book: {},
        parental_guidances: [],
        parental_guidance: {},
    }),
    mutations: {
    },
    actions: {
        setBook(context, url) {
            axios.get(url).then(response => context.state.book = response.data);
        },


        setParentalGuidances(context) {
            apiClient.get("parental_guidances/").then(response => context.state.parental_guidances = response.data)
        },
        setParentalGuidance(context, url) {
            axios.get(url).then(response => context.state.parental_guidance = response.data);
        },
    },
    getters: {
    }
};
