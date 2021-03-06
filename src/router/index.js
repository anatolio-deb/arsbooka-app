import Vue from "vue";
import VueRouter from "vue-router";
import Books from "../views/Books.vue";
import Book from "../views/Book.vue"
import ParentalGuidance from "../views/ParentalGuidance.vue"


Vue.use(VueRouter);

const routes = [
  {
    path: "/books",
    component: Books
  },
  {
    path: "/books/:title",
    component: Book
  },
  {
    path: "/books/parental-guidance/:age",
    component: ParentalGuidance
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
