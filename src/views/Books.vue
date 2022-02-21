<template>
  <v-container>
    <v-row>
      <v-col v-for="book in books" :key="book.url" cols="3">
        <book
          :url="book.url"
          :title="book.title"
          :price="book.price"
          :cover="book.cover"
          :parental_guidance="book.parental_guidance"
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
  methods: mapActions(["setBooks"]),
  mounted() {
    this.setBooks();
  },
};
</script>

<style>
</style>