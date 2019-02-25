<template>
  <div>
    <h2 align="center">Sort for subsection 2</h2>

    <v-card>
      <v-card-text>
        <v-container>
          <v-layout>
            <v-flex xs8>
              <v-card-title>
                Tutorial
              </v-card-title>
              <v-card-media contain>
                <v-img src="demo.png"></v-img>
              </v-card-media>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>

    <v-card>
    <v-card-text>
      <SortableList lockAxis="y" v-model="items">
        <SortableItem v-for="(item, index) in items" :index="index" :key="index" :item="item"/>
      </SortableList>
    </v-card-text>
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
  import SortableList from "@/components/SortableList";
  import SortableItem from "@/components/SortableItem";
  export default {
    data: () => ({
      searchDialog: false,
      items: ['Item 1']
    }),
    name: "step5",
    methods: {
      next: function() {
        this.$store.commit("step/addStep");
      }
    },
    components: {
      SortableItem,
      SortableList
    }
  }
</script>

<style>

</style>
