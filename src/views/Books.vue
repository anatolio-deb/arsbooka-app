<template>
  <v-container fluid class="rounded-lg">
    <v-row>
      <v-col v-for="book in books" :key="book.url" lg="3" md="4" sm="6">
        <book
          :url="book.url"
          :title="book.title"
          :price="book.price"
          :cover="book.cover"
          :parentalGuidance="book.parental_guidance"
          :new="isNew(book)"
          :inStock="book.in_stock"
        >
        </book>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Book from "../components/Book.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Book,
  },
  computed: {
    ...mapGetters(["newBooks"]),
    ...mapGetters("filter", ["filterApplied"]),
    books() {
      if (this.filterApplied) {
        return this.$store.state.filter.books;
      } else {
        return this.$store.state.books;
      }
    },
  },
  methods: {
    ...mapActions(["setBooks"]),
    isNew(book) {
      return this.newBooks.includes(book);
    },
  },
  mounted() {
    this.setBooks();
  },
};
</script>

<style>
</style>