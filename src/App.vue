<template>
  <!-- App.vue -->

  <v-app>
    <!-- <v-navigation-drawer app>
    </v-navigation-drawer> -->

    <v-app-bar app flat hide-on-scroll color="white">
      <v-img src="./assets/logo.jpg" max-width="50"></v-img>
      <v-toolbar-title class="text-overline pl-4">Книги детям</v-toolbar-title>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
export default {};
</script>

<style>
</style>