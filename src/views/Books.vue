<template>
  <v-container fluid class="rounded-lg">
    <v-row justify="center">
      <v-col cols="2" class="mt-2">
        <BooksFilter />
      </v-col>
      <v-col>
        <v-container fluid>
          <v-row>
            <v-col v-for="book in books" :key="book.url" lg="3" md="4" sm="6">
              <Book
                :url="book.url"
                :title="book.title"
                :price="book.price"
                :cover="book.cover"
                :parentalGuidance="book.parental_guidance"
                :new="isNewBook(book)"
                :inStock="book.in_stock"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Book from "../components/Book.vue";
import BooksFilter from "../components/BooksFilter.vue";

export default {
  components: {
    Book,
    BooksFilter,
  },
  computed: {
    ...mapGetters(["isNewBook"]),
    ...mapState(["books"]),
  },
  methods: mapActions(["setBooksFromApi"]),
  mounted() {
    this.setBooksFromApi();
  },
};
</script>

<style>
</style>