<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-list nav outlined class="rounded-lg">
          <v-list-item>
            <v-list-item-action>
              <v-checkbox
                color="#FB9300"
                @change="updateNewFilter()"
              ></v-checkbox>
            </v-list-item-action>
            <v-list-item-title class="text-caption font-weight-bold">
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
                <v-list-item v-for="category in categories" :key="category.url">
                  <v-list-item-action>
                    <v-checkbox
                      color="#FB9300"
                      @change="handleCategoryFilterEvent($event, category.url)"
                    ></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-title class="text-caption font-weight-bold">
                    {{ category.title }}
                  </v-list-item-title>
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