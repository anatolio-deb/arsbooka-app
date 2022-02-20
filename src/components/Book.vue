<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="2">
        <v-img :src="cover" contain></v-img>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col class="text-subtitle-2" cols="auto" @click="onTitleClick">
        {{ title }}
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col class="text-caption" cols="auto">
        <v-btn color="orange" rounded depressed>
          <v-icon> mdi-cart-arrow-down </v-icon> <v-col>{{ price }} ман.</v-col>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

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
  methods: {
    ...mapActions(["getBook"]),
    onTitleClick() {
      this.getBook(this.url);
      this.$router.push(`/books/${this.title.replace(" ", "-").toLowerCase()}`);
    },
  },
};
</script>

<style>
</style>