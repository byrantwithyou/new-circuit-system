<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex xs8>
          <v-card-title>
            Subsection Resister -- Step2
          </v-card-title>
          <v-card-media contain>
            <v-img src="demo.png"></v-img>
          </v-card-media>
        </v-flex>
        <v-flex offset-xs1 xs3>
          <h5>Gauge the Resister</h5>
          <v-card-title>
            Good example
          </v-card-title>
          <v-card-media contain>
            <v-img src="demo.png"></v-img>
          </v-card-media>
          <v-card-title>
            Bad example
          </v-card-title>
          <v-card-media>
            <v-img src="demo.png"></v-img>
          </v-card-media>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card>
      <h3>Example: Quiz to develop habit?</h3>
      <v-radio-group v-model="ans">
        <v-radio key="1" value="1" label="foo"></v-radio>
        <v-radio key="2" value="2" label="bar"></v-radio>
      </v-radio-group>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="next">Next</v-btn>
        <v-btn @click="searchDialog=true" icon><v-icon>search</v-icon></v-btn>

      </v-card-actions>
    </v-card>

    <v-dialog v-model="searchDialog">
      <v-card>
        <v-card-title>
          Search for Guidlines
        </v-card-title>
        <v-card-text>
          <v-autocomplete></v-autocomplete>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click="searchDialog=false"><v-icon>close</v-icon></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import Vue from "vue";
  export default {
    data: () => ({
      searchDialog: false,
      ans: "1"
    }),
    name: "step4",
    methods: {
      next: function() {
        if (this.ans == "2") {
          this.$store.commit("step/addStep");
        }
        else {
          Vue.notify({
            type: "error",
            title: "Wrong!"
          })
        }
      }
    },
  }
</script>

<style>

</style>
