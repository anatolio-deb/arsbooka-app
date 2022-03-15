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
                    @change="$emit('new', $event)"
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
                            @change="$emit('category', category)"
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
export default {
  data() {
    return {
      categories: [],
      showCategories: false,
    };
  },
  created() {
    this.$http
      .get("categories/")
      .then((response) => (this.categories = response.data));
  },
};
</script>

<style>
</style>