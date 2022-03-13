<template>
  <v-container fluid class="rounded-lg">
    <v-row justify="center">
      <v-col cols="2">
        <v-container>
          <BooksFilter
            v-on:new="handleFilterNew($event)"
            v-on:category="handleFilterCategory($event)"
          />
        </v-container>
      </v-col>
      <v-col>
        <v-container>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Book from "../components/Book.vue";
import BooksFilter from "../components/BooksFilter.vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  components: {
    Book,
    BooksFilter,
  },
  computed: {
    ...mapGetters(["newBooks"]),
    ...mapState(["books"]),
  },
  methods: {
    ...mapActions(["setBooks"]),
    isNew(book) {
      return this.newBooks.includes(book);
    },
    handleFilterNew(event) {
      console.log(event);
    },
    handleFilterCategory(category) {
      console.log(category);
    },
  },
  mounted() {
    this.setBooks();
  },
};
</script>

<style>
</style>