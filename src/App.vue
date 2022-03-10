<template>
  <!-- App.vue -->

  <v-app>
    <Header />
    <v-container>
      <v-row>
        <v-col cols="2">
          <Navigation />
        </v-col>
        <v-col>
          <!-- Sizes your content based upon application components -->
          <v-main>
            <!-- Provides the application the proper gutter -->
            <v-container fluid>
              <!-- If using vue-router -->
              <router-view></router-view>
            </v-container>
          </v-main>
        </v-col>
      </v-row>
    </v-container>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
import Navigation from "./components/Navigation.vue";

export default {
  components: { Header, Navigation },
};
</script>

<style>
</style>