<template>
  <div>{{ this.book }}</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["book"]),
};
</script>

<style>
</style>