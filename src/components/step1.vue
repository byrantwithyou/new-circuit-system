<template>
  <div>
    <v-card>
      <v-card-title>
        Tutorial -- Please select the best order
      </v-card-title>
      <v-card-media>
        <div align="center">
          <img height="150px" width="400px" src="demo.png">
        </div>
      </v-card-media>
      <v-card-text>
        <v-radio-group v-model="order">
          <v-radio key="1" value="1" label="Insert the Power Subsection, then the Resister subsection"></v-radio>
          <v-radio key="2" value="2" label="Insert the Resister subsection, then the Power subsection"></v-radio>
        </v-radio-group>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>
        Sort for subsection 1
      </v-card-title>
      <v-card-text>
        <SortableList lockAxis="y" v-model="items">
          <SortableItem v-for="(item, index) in items" :index="index" :key="index" :item="item"/>
        </SortableList>
      </v-card-text>
    </v-card>

    
    <v-card>
      <v-card-title>
        Sort for subsection 2
      </v-card-title>
      <v-card-text>
        <SortableList lockAxis="y" v-model="items">
          <SortableItem v-for="(item, index) in items" :index="index" :key="index" :item="item"/>
        </SortableList>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="next">Next</v-btn>
        <v-btn  @click="searchDialog=true" icon><v-icon>search</v-icon></v-btn>
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
  import SortableList from "@/components/SortableList";
  import SortableItem from "@/components/SortableItem";
  export default {
    data: () => ({
      searchDialog: false,
      order: "1",
      items: ["Item1", "Item2"]
    }),
    name: "step1",
    methods: {
      next: function() {
        if (this.order == "2") {
          this.$store.commit("step/addStep");
        }
        else {
          Vue.notify({
            type: "error",
            title: "Wrong",
          })
        }
      }
    },
    components: {
      SortableList,
      SortableItem
    }
  }
</script>

<style>

</style>
