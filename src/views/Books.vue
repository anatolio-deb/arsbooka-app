<template>
  <v-container fluid class="rounded-lg">
    <v-row justify="center">
      <v-col cols="2">
        <v-container>
          <BooksFilter
            v-on:new="handleNewFilter($event)"
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
import axios from "axios";

export default {
  data() {
    return {
      books: [],
      categoryFilter: [],
      newFilter: false,
      categories: [],
    };
  },
  computed: {
    newBooks() {
      return this.books.filter(
        (book) =>
          new Date().getMonth() - new Date(book.date_added).getMonth() >= 0
      );
    },
  },
  components: {
    Book,
    BooksFilter,
  },
  methods: {
    isNew(book) {
      return this.newBooks.includes(book);
    },
    unsetCategory(category) {
      this.setBooks();
      let booksToUnset = [];

      for (let cat of this.categories) {
        if (cat.title === category.title) {
          booksToUnset = cat.books;
        }
      }

      this.books = this.books.filter((book) => {
        for (let b of booksToUnset) {
          return b.title !== book.title;
        }
      });

      this.categories = this.categories.filter((cat) => {
        return cat.title !== category.title;
      });
    },
    getCategory(url) {
      return axios.get(url);
    },
    setCategory(category) {
      this.getCategory(category.url).then((response) => {
        this.categories.push({
          title: category.title,
          books: response.data.books,
        });
        this.setCategories();
        if (this.newFilter) {
          this.handleNewFilter();
        }
      });
    },
    setCategories() {
      let books = [];
      for (let category of this.categories) {
        books = books.concat(category.books);
      }
      this.books = books;
    },
    handleNewFilter(event = true) {
      if (event) {
        this.books = this.newBooks;
      } else {
        this.setBooks();
      }
      this.newFilter = event;
    },
    handleFilterCategory(category) {
      if (this.categoryFilter.includes(category.title)) {
        this.categoryFilter.splice(
          this.categoryFilter.indexOf(category.title),
          1
        );
        this.unsetCategory(category);
      } else {
        this.categoryFilter.push(category.title);
        this.setCategory(category);
      }
    },
    setBooks() {
      return this.$http.get("books/").then((response) => {
        this.books = response.data;
        if (this.categoryFilter.length > 0) {
          this.setCategories();
        }
      });
    },
  },
  mounted() {
    this.setBooks();
  },
};
</script>

<style>
</style>