<template>
  <v-container>
    <v-row>
      <v-col>
        <v-container fluid class="grey lighten-4 rounded-lg">
          <v-row>
            <v-col>
              <v-img :src="cover" contain max-height="200px"></v-img>
            </v-col>
          </v-row>
          <v-row justify="end">
            <v-col class="text-caption" cols="2">
              {{ parental_guidance.age + "+" }}
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-row justify="space-between">
      <v-col align-self="center" class="green--text text-subtitle-1">
        {{ price }}M
      </v-col>
      <v-col>
        <v-btn depressed color="orange">В корзину</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    url: String,
    title: String,
    price: String,
    parental_guidance: {
      age: Number,
      url: String,
    },
    cover: String,
  },
};
</script>

<style>
</style>