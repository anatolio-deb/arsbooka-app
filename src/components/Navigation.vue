<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card outlined rounded="lg">
          <v-card-text>
            <v-container>
              <v-row justify="space-between">
                <v-col cols="2">
                  <v-checkbox
                    color="#FB9300"
                    v-model="newFilter"
                    @change="handleNewFilter"
                  ></v-checkbox>
                </v-col>
                <v-col
                  class="text-caption font-weight-medium"
                  align-self="center"
                >
                  Новинки
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card outlined rounded="lg">
          <v-card-title>
            <v-container fluid>
              <v-row justify="space-between">
                <v-col class="text-subtitle-2" align-self="center">
                  Категории
                </v-col>
                <v-col cols="3">
                  <v-btn
                    plain
                    :ripple="false"
                    icon
                    @click="showCategories = !showCategories"
                  >
                    <v-icon>{{
                      showCategories ? "mdi-chevron-up" : "mdi-chevron-down"
                    }}</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-title>

          <v-expand-transition>
            <div v-show="showCategories">
              <v-divider></v-divider>
              <v-card-text>
                <v-container>
                  <v-row
                    justify="space-between"
                    v-for="category in categories"
                    :key="category.url"
                  >
                    <v-container class="my-n6">
                      <v-row>
                        <v-col cols="2">
                          <v-checkbox
                            color="#FB9300"
                            v-model="categoryFilter"
                            @change="handleCategoryFilter(category.url)"
                            :value="category.url"
                          ></v-checkbox>
                        </v-col>
                        <v-col
                          class="text-caption font-weight-medium"
                          align-self="center"
                        >
                          {{ category.title }}
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-row>
                </v-container>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
import { HTTP } from "../main";

export default {
  data() {
    return {
      showCategories: false,
      newFilter: false,
      categoryFilter: [],
    };
  },
  computed: {
    ...mapState(["categories"]),
    ...mapGetters(["newBooks"]),
  },
  methods: {
    ...mapActions(["setCategories"]),
    handleCategoryFilter(url) {
      HTTP.get(url).then((response) => {
        let books = response.data.books;
        if (this.categoryFilter.includes(url)) {
          if (this.newFilter) {
            books = books.filter((book) => this.newBooks.includes(book));
          }
          this.filterAdd(books);
        } else {
          this.filterRemove(books);
        }
      });
    },
    ...mapMutations("filter", ["filterAdd", "filterRemove"]),
    handleNewFilter() {
      if (this.newFilter) {
        this.filterAdd(this.newBooks);
      } else {
        this.filterRemove(this.newBooks);
      }
    },
  },
  created() {
    this.setCategories();
  },
};
</script>

<style>
</style>