<template>
  <v-container>
    <v-row>
      <v-col>
        <v-container fluid class="grey lighten-4 rounded-lg">
          <v-row justify="end" class="mb-n8">
            <v-col cols="3">
              <v-btn
                icon
                :color="wishListButtonColor"
                @click="handleWishList"
              >
                <v-icon>mdi-heart</v-icon>
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
            <v-col cols="1">
              <v-chip
                color="light-green"
                class="white--text rounded-circle text-caption px-4 py-4"
                x-small
              >
                <span class="ml-n3">New</span>
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
      <v-col
        align-self="center"
        class="light-green--text text-h5"
        v-if="inStock"
        
      >
        {{ price }}m
      </v-col>

      <v-col v-else>
        <v-btn depressed color="yellow" class="white--text rounded-lg mr-n6 py-5" small
          >Предзаказ</v-btn
        >
      </v-col>

      <v-col>
        <v-btn
          depressed
          color="orange"
          class="white--text rounded-lg ml-10 py-5"
          :disabled="!inStock"
          small
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
    ...mapGetters(["getBookByUrl", "wishList/getBookByUrl"]),
    wishListButtonColor(){
      if (this["wishList/getBookByUrl"](this.url)){
        return 'red'
      }
      return 'grey'
    }
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
      if (this["wishList/getBookByUrl"](this.url)) {
        this.removeFromWishList(this.getBookByUrl(this.url))
      } else {
        this.addToWishList(this.getBookByUrl(this.url))
      }
      }
    },
  };
</script>

<style>
.clickable {
  cursor: pointer;
}
</style>