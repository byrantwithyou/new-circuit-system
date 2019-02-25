<template>
  <div>
    <h2 align="center">Sort for subsection 1</h2>

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
  
    </v-card>


  </div>

  
</template>

<script>
  import SortableList from "@/components/SortableList";
  import SortableItem from "@/components/SortableItem";
  export default {
    data: () => ({
      searchDialog: false,
      items: ['Item 1', 'Item 2']
    }),
    name: "step2",
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
