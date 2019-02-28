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

      <div>
        <draggable :list="subsections">
          <div v-for="subsection in subsections" :key="subsection.name">
            <div class="subsections">
              {{subsection.name}}
            </div>
            <draggable :list="subsection.steps">
              <div v-for="step in subsection.steps" :key="step.id">
                <div class="steps">
                  {{step.content}}
                </div>
              </div>
            </draggable>
          </div>
        </draggable>
      </div>


      <!--<v-card-text>-->
        <!--<v-radio-group v-model="order">-->
          <!--<v-radio key="1" value="1" label="Insert the Power Subsection, then the Resister subsection"></v-radio>-->
          <!--<v-radio key="2" value="2" label="Insert the Resister subsection, then the Power subsection"></v-radio>-->
        <!--</v-radio-group>-->
      <!--</v-card-text>-->
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
  import draggable from 'vuedraggable'
  import SortableList from "@/components/SortableList";
  import SortableItem from "@/components/SortableItem";
  export default {
    data: () => ({
      searchDialog: false,
      order: "1",
      items: ["Item1", "Item2"],
      subsections:[]
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
    socket:{
      authoring: function(data) {
        let subsections = data[0];
        console.log("this.subsections");
        this.subsections = subsections;
        console.log(this.subsections);
      }
    },
    components: {
      SortableList,
      SortableItem,
      draggable
    }
  }
</script>

<style>
  .subsections{
    border: 1px solid gray;
    width:300px;
    height:80px;
    line-height: 80px;
    text-align: center;
    font-size:20px;
    margin:1px 0px;
    cursor: move;
  }
  .steps{
    border: 1px solid #BBBBBB;
    width:300px;
    height:60px;
    line-height: 60px;
    text-align: center;
    font-size:16px;
    margin:1px 0px;
    cursor: move;
  }
</style>
