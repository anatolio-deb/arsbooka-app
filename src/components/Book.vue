<template>
  <v-list>
    <v-list-item>
      <v-container class="canvas rounded-lg" fluid>
        <v-row justify="end" class="mb-n8">
          <v-col cols="3">
            <v-btn
              large
              icon
              :color="wishListButtonColor"
              @click="handleWishList"
            >
              <v-icon>{{ wishListButtonIcon }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-img
              :src="cover"
              contain
              max-height="240px"
              @click="onBookClick"
              class="clickable"
            ></v-img>
          </v-col>
        </v-row>

        <v-row justify="space-between" class="mt-n2">
          <v-col cols="1" class="ma-2">
            <v-chip
              color="#FB9300"
              class="rounded-circle text-caption px-5 py-5"
              x-small
              text-color="white"
            >
              <span class="ml-n3">New</span>
            </v-chip>
          </v-col>

          <v-col class="text-caption" align-self="center" cols="2">
            {{ parentalGuidance.age + "+" }}
          </v-col>
        </v-row>
      </v-container>
    </v-list-item>

    <v-list-item inactive>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-list-item-title
            v-bind="attrs"
            v-on="on"
            class="text-subtitle-2 clickable"
            @click="onBookClick"
          >
            {{ title }}
          </v-list-item-title>
        </template>
        {{ title }}
      </v-tooltip>
    </v-list-item>

    <v-list-item>
      <v-container fluid>
        <v-row>
          <v-col cols="8" class="text-h5 mx-n3" v-if="inStock">
            {{ price }}m
          </v-col>
          <v-col v-else>
            <v-btn
              depressed
              color="yellow"
              class="white--text rounded-lg mr-n6 py-5"
              small
              >Предзаказ</v-btn
            >
          </v-col>
          <v-col align-self="center" cols="1" class="ml-3"
            ><v-btn
              depressed
              color="#F54748"
              class="white--text rounded-lg py-5"
              :disabled="!inStock"
              small
              @click="handleCart"
              >В корзину</v-btn
            ></v-col
          >
        </v-row>
      </v-container>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  props: {
    url: String,
    title: String,
    price: Number,
    parentalGuidance: {
      age: Number,
      url: String,
    },
    cover: String,
    new: {
      type: Boolean,
      default: false,
    },
    inStock: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters([
      "getBookByUrl",
      "wishList/getBookByUrl",
      "cart/getBookByUrl",
    ]),
    wishListButtonColor() {
      if (this["wishList/getBookByUrl"](this.url)) {
        return "#F54748";
      }
      return "#343F56";
    },
    wishListButtonIcon() {
      if (this["wishList/getBookByUrl"](this.url)) {
        return "mdi-heart";
      }
      return "mdi-heart-outline";
    },
  },
  methods: {
    ...mapActions(["setBook", "setParentalGuidance"]),
    ...mapMutations([
      "wishList/addToWishList",
      "wishList/removeFromWishList",
      "cart/addToCart",
    ]),
    onBookClick() {
      this.setBook(this.url);
      this.$router.push(`/books/${this.title}`);
    },
    handleWishList() {
      let book = this["wishList/getBookByUrl"](this.url);
      if (book) {
        this["wishList/removeFromWishList"](book);
      } else {
        this["wishList/addToWishList"](this.getBookByUrl(this.url));
      }
    },
    handleCart() {
      this["cart/addToCart"](this.getBookByUrl(this.url));
    },
  },
};
</script>

<style>
.clickable {
  cursor: pointer;
}
.canvas {
  background-color: #f5e6ca;
}
</style>