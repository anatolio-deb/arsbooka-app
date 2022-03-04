<template>
  <div>{{ parental_guidance }}</div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["parental_guidance"]),
};
</script>

<style>
</style>