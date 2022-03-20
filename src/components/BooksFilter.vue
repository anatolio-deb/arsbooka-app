<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-list nav outlined class="rounded-lg">
          <v-list-item>
            <v-list-item-action class="ml-3">
              <v-checkbox
                color="#FB9300"
                @change="updateNewFilter()"
              ></v-checkbox>
            </v-list-item-action>
            <v-list-item-title class="text-caption font-weight-bold ml-n6 mt-1">
              Новинки
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-list nav class="rounded-lg" outlined>
          <v-expansion-panels flat>
            <v-expansion-panel>
              <v-expansion-panel-header class="text-subtitle-2">
                Категории
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list-item
                  v-for="category in categories"
                  :key="category.url"
                  class="ml-n2 my-n4"
                >
                  <v-list-item-action class="mx-n1 pr-4">
                    <v-checkbox
                      color="#FB9300"
                      @change="handleCategoryFilterEvent($event, category.url)"
                    ></v-checkbox>
                  </v-list-item-action>

                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-list-item-title
                        class="text-caption font-weight-bold mt-1"
                        v-bind="attrs"
                        v-on="on"
                      >
                        {{ category.title }}
                      </v-list-item-title>
                    </template>
                    {{ category.title }}
                  </v-tooltip>
                </v-list-item>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      showCategories: false,
    };
  },
  computed: mapState(["categories"]),
  methods: {
    ...mapActions([
      "setCategories",
      "setCategoryDetail",
      "unsetCategoryDetail",
      "updateNewFilter",
    ]),
    handleCategoryFilterEvent(event, url) {
      if (event) {
        this.setCategoryDetail(url);
      } else {
        this.unsetCategoryDetail(url);
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