<template>
  <v-container class="rounded-lg white">
    <v-row justify="center">
      <v-col cols="2" class="mt-2">
        <BooksFilter :key="reset" />
      </v-col>
      <v-col>
        <v-container fluid>
          <v-row v-if="activeParentalGuidance">
            <v-col class="text-h4">
              Книги для детей {{ getParentalGuidancesRangeString() }}
            </v-col>
          </v-row>
          <v-row v-if="activeParentalGuidance">
            <v-col>
              <v-chip
                close
                color="#FB9300"
                label
                @click:close="handleFilterReset"
                text-color="white"
              >
                Сбросить
              </v-chip>
            </v-col>
          </v-row>
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
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import Book from "../components/Book.vue";
import BooksFilter from "../components/BooksFilter.vue";

export default {
  components: {
    Book,
    BooksFilter,
  },
  data() {
    return {
      reset: false,
    };
  },
  computed: {
    ...mapGetters(["isNewBook", "activeParentalGuidance"]),
    ...mapState(["books", "parentalGuidances", "categories"]),
  },
  methods: {
    ...mapActions(["setBooksFromApi", "updateFilter", "unsetCategory"]),
    ...mapMutations(["unsetBooksOfParentalGuidance"]),
    getParentalGuidancesRangeString() {
      let ages = [];

      for (let parentalGuidance of this.parentalGuidances) {
        if (parentalGuidance.books) {
          ages.push(parentalGuidance.age);
        }
      }

      if (ages.length === 2) {
        if (ages[0] > ages[1]) {
          return `от ${ages[1]} до ${ages[0]} лет`;
        } else if (ages[0] < ages[1]) {
          return `от ${ages[0]} до ${ages[1]} лет`;
        }
      } else if (ages.length === 1) {
        return `от ${ages[0]} лет`;
      }
    },
    handleFilterReset() {
      for (let parentalGuidance of this.parentalGuidances) {
        if (parentalGuidance.books) {
          this.unsetBooksOfParentalGuidance(parentalGuidance.url);
        }
      }
      for (let category of this.categories) {
        if (category.books) {
          this.unsetCategory(category.url);
        }
      }
      this.updateFilter();
      this.reset = !this.reset;
    },
  },
  mounted() {
    this.setBooksFromApi();
  },
};
</script>

<style>
</style>