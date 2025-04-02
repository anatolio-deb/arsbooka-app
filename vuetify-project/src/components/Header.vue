<template>
  <v-container fluid height="200" class="bg-grey-lighten-5">
    <v-row>
      <v-col>
        <div>schedule</div>
      </v-col>
      <v-col>
        <div class="text-pink">email</div>
      </v-col>
      <v-col>
        <div class="text-pink">phone</div>
      </v-col>
      <!-- <v-col>
        
      </v-col>
      <v-container> </v-container>
      <v-col class="text-h3"> ArsBooka </v-col>
      <v-col class="text-subtitle-1"> Магазин детской книги </v-col> -->
    </v-row>
    <v-row>
      <v-col>
        <v-img
          :max-width="80"
          aspect-ratio="1/1"
          cover
          src="@/assets/logo.jpg"
        ></v-img>
      </v-col>
      <v-col>
        <v-text-field
          append-inner-icon="mdi-magnify"
          density="comfortable"
          label="Поиск"
          variant="solo"
          hide-details
          single-line
          bg-color="grey-lighten-3"
          color="grey-lighten-3"
          flat
        ></v-text-field>
      </v-col>
      <v-col>
        <v-icon icon="mdi-account-outline"></v-icon>
      </v-col>
      <v-col>
        <v-icon icon="mdi-heart-outline"></v-icon>
      </v-col>
      <v-col>
        <v-icon icon="mdi-cart-outline"></v-icon>
      </v-col>
      <v-col>
        <div class="text-pink">0 ₽</div>
      </v-col>
    </v-row>
  </v-container>
</template>
