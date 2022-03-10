<template>
  <v-container fluid class="header">
    <v-row>
      <v-col cols="1">
        <v-container>
          <v-row justify="center">
            <v-col cols="7" class="white rounded-circle">
              <v-img src="../assets/logo.jpg" contain></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <v-col align-self="center" lg="9">
        <v-icon class="mr-2 clickable" color="white">mdi-heart-outline</v-icon>
        <v-chip
          v-show="$store.state.wishList.books.length > 0"
          color="#F54748"
          label
          text-color="white"
          class="mr-2"
        >
          {{ $store.state.wishList.books.length }}</v-chip
        >

        <v-icon color="white" class="mr-2 clickable">mdi-cart-outline </v-icon>
        <v-chip
          color="#FB9300"
          text-color="white"
          label
          v-show="$store.state.cart.books.length > 0"
        >
          {{ $store.state.cart.books.length }}
        </v-chip>
      </v-col>

      <v-col align-self="center" class="clickable white--text text-subtitle-1">
        Оплата и доставка
        <v-icon color="white">mdi-truck-cargo-container </v-icon>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
.clickable {
  cursor: pointer;
}
.header {
  background-color: #343f56;
}
</style>