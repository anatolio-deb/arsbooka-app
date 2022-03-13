<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-container class="canvas rounded-lg">
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
                <span class="clickable ml-n3">New</span>
              </v-chip>
            </v-col>

            <v-col
              class="text-caption clickable"
              @click="onParentalGuidanceClick"
              align-self="center"
              cols="2"
            >
              {{ parentalGuidance.age + "+" }}
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <v-row>
      <v-col style="height: 64px">
        <span class="text-subtitle-2 clickable" @click="onBookClick">
          {{ title }}</span
        >
      </v-col>
    </v-row>

    <v-row justify="space-between">
      <v-col align-self="center" class="text-h5" v-if="inStock">
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

      <v-col>
        <v-btn
          depressed
          color="#F54748"
          class="white--text rounded-lg ml-14 py-5"
          :disabled="!inStock"
          small
          @click="handleCart"
          >В корзину</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState(["books"]),
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
  methods: {
    ...mapActions(["setBook", "setParentalGuidance"]),
    ...mapMutations("wishList", ["addToWishList", "removeFromWishList"]),
    ...mapMutations("cart", ["addToCart", "removeFromCart"]),
    onBookClick() {
      this.setBook(this.url);
      this.$router.push(`/books/${this.title}`);
    },
    onParentalGuidanceClick() {
      this.setParentalGuidance(this.parentalGuidance.url);
      this.$router.push(
        `/books/parental-guidance/${this.parentalGuidance.age}/`
      );
    },
    handleWishList() {
      let book = this["wishList/getBookByUrl"](this.url);
      if (book) {
        this.removeFromWishList(book);
      } else {
        this.addToWishList(this.getBookByUrl(this.url));
      }
    },
    handleCart() {
      // if (this["cart/getBookByUrl"](this.url)) {
      //   this.removeFromCart(this.getBookByUrl(this.url));
      // } else {
      this.addToCart(this.getBookByUrl(this.url));
      // }
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