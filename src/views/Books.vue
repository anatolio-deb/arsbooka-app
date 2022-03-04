<template>
  <v-container>
    <v-row justify="center">
      <v-col v-for="book in books" :key="book.url" lg="2" md="4" sm="6">
        <book
          :url="book.url"
          :title="book.title"
          :price="book.price"
          :cover="book.cover"
          :parentalGuidance="book.parental_guidance"
          :new="getNew(book.date_added)"
          :inStock="book.in_stock"
        >
        </book>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Book from "../components/Book.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Book,
  },
  computed: mapState(["books"]),
  methods: {
    ...mapActions(["setBooks"]),
    getNew(date_added) {
      return new Date().getMonth() - new Date(date_added).getMonth() >= 0;
    },
  },
  mounted() {
    this.setBooks();
  },
};
</script>

<style>
</style>