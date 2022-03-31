<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-list nav outlined class="rounded-lg">
          <v-list-item>
            <v-list-item-action class="ml-3">
              <v-checkbox
                color="#FB9300"
                @change="updateNewFilter()"
              ></v-checkbox>
            </v-list-item-action>
            <v-list-item-title
              class="text-caption font-weight-medium ml-n6 mt-1"
            >
              Новинки
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-list nav class="rounded-lg" outlined>
          <v-expansion-panels flat>
            <v-expansion-panel>
              <v-expansion-panel-header class="text-subtitle-2">
                Возраст
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-btn
                  v-for="age in ages"
                  :key="ages.indexOf(age)"
                  depressed
                  :color="age.activated ? '#FB9300' : '#F5E6CA'"
                  @click="handleAge(age)"
                  class="rounded-lg text-caption font-weight-medium ma-1"
                  small
                >
                  {{ age.text }}
                </v-btn>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-list>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-list nav class="rounded-lg" outlined>
          <v-expansion-panels flat>
            <v-expansion-panel>
              <v-expansion-panel-header class="text-subtitle-2">
                Категории
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list-item
                  v-for="category in categories"
                  :key="category.url"
                  class="ml-n2 my-n4"
                >
                  <v-list-item-action class="mx-n1 pr-4">
                    <v-checkbox
                      color="#FB9300"
                      @change="handleCategoryFilterEvent($event, category.url)"
                    ></v-checkbox>
                  </v-list-item-action>

                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-list-item-title
                        class="text-caption font-weight-medium mt-1"
                        v-bind="attrs"
                        v-on="on"
                      >
                        {{ category.title }}
                      </v-list-item-title>
                    </template>
                    {{ category.title }}
                  </v-tooltip>
                </v-list-item>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      showCategories: false,
      ages: [
        { text: "до года", activated: false },
        { text: "1", activated: false },
        { text: "2", activated: false },
        { text: "3", activated: false },
        { text: "4-5", activated: false },
        { text: "6-7", activated: false },
        { text: "8-9", activated: false },
        { text: "10+", activated: false },
        { text: "12+", activated: false },
        { text: "16+", activated: false },
        { text: "18+", activated: false },
      ],
    };
  },
  computed: {
    ...mapState(["categories", "parentalGuidances"]),
  },
  methods: {
    ...mapActions([
      "setCategories",
      "setCategory",
      "unsetCategory",
      "updateNewFilter",
      "setParentalGuidances",
      "setParentalGuidance",
      "unsetParentalGuidance",
    ]),
    handleCategoryFilterEvent(event, url) {
      if (event) {
        this.setCategory(url);
      } else {
        this.unsetCategory(url);
      }
    },
    async handleAge(age) {
      // change age state
      this.ages[this.ages.indexOf(age)].activated =
        !this.ages[this.ages.indexOf(age)].activated;

      // diactivate all other age buttons (change)
      for (let _age of this.ages) {
        if (_age.activated && _age.text !== age.text) {
          this.ages[this.ages.indexOf(_age)].activated = false;
        }
      }

      // unset books of every age (clean)
      for (let parentalGuidance of this.parentalGuidances) {
        if (parentalGuidance.books) {
          await this.unsetParentalGuidance(parentalGuidance.url);
        }
      }

      // if the age filter is activated by the user
      if (this.ages[this.ages.indexOf(age)].activated) {
        // get ages to set books for
        let parentalGuidances = [];

        switch (age.text) {
          case this.ages[0].text:
            parentalGuidances = this.parentalGuidances.filter(
              (parentalGuidance) => !parentalGuidance.age
            );
            break;
          case this.ages[1].text:
            parentalGuidances = this.parentalGuidances.filter(
              (parentalGuidance) => parentalGuidance.age === 1
            );
            break;
          case this.ages[2].text:
            parentalGuidances = this.parentalGuidances.filter(
              (parentalGuidance) => parentalGuidance.age === 2
            );
            break;
          case this.ages[3].text:
            parentalGuidances = this.parentalGuidances.filter(
              (parentalGuidance) => parentalGuidance.age === 3
            );
            break;
          case this.ages[4].text:
            parentalGuidances = this.parentalGuidances.filter(
              (parentalGuidance) =>
                parentalGuidance.age === 4 || parentalGuidance.age === 5
            );
            break;
          case this.ages[5].text:
            parentalGuidances = this.parentalGuidances.filter(
              (parentalGuidance) =>
                parentalGuidance.age === 6 || parentalGuidance.age === 7
            );
            break;
          case this.ages[6].text:
            parentalGuidances = this.parentalGuidances.filter(
              (parentalGuidance) =>
                parentalGuidance.age === 8 || parentalGuidance.age === 9
            );
            break;
          case this.ages[7].text:
            parentalGuidances = this.parentalGuidances.filter(
              (parentalGuidance) => parentalGuidance.age >= 10
            );
            break;
          case this.ages[8].text:
            parentalGuidances = this.parentalGuidances.filter(
              (parentalGuidance) => parentalGuidance.age >= 12
            );
            break;
          case this.ages[9].text:
            parentalGuidances = this.parentalGuidances.filter(
              (parentalGuidance) => parentalGuidance.age >= 16
            );
            break;
          case this.ages[10].text:
            parentalGuidances = this.parentalGuidances.filter(
              (parentalGuidance) => parentalGuidance.age >= 18
            );
            break;
        }

        // set books for choosen ages
        for (let parentalGuidance of parentalGuidances) {
          await this.setParentalGuidance(parentalGuidance.url);
        }
      }
    },
  },
  created() {
    this.setCategories();
    this.setParentalGuidances();
  },
};
</script>

<style scoped>
.background {
  background-color: #f5e6ca;
  text-align: center;
}
</style>
