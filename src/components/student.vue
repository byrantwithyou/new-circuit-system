<template>
  <div>
    <div>
      <div>
        <v-card>
          <v-card-title>
            Tutorial -- Please select the best order
          </v-card-title>
          <v-card-media>
            <div align="center">
              <img height="150px" width="400px" v-bind:src="settings.picture">
            </div>
            <h3>introductions</h3>
            <div align="center">
              {{settings.introduction}}
            </div>
          </v-card-media>
          <div align="center">
            <draggable :list="subsections" :options = "{forceFallback:true}">
              <div v-for="subsection in subsections" :key="subsection.name">
                <div class="subsections">
                  {{subsection.name}}
                </div>
                <draggable :list="subsection.steps" :options = "{forceFallback:true}">
                  <div v-for="step in subsection.steps" :key="step.id">
                    <div class="steps">
                      {{step.content}}
                    </div>
                  </div>
                </draggable>
              </div>
            </draggable>
          </div>


        </v-card>
        <router-link :to="{path:'/steps',query:{subsection:subsections}}">
          <el-button>begin</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import draggable from "vuedraggable"

  export default {
    data: () => ({
      subsections:[],
      settings:[]
    }),
    name: "student",
    computed: {
      step: function() {
        return this.$store.state.step.step;
      }
    },
    methods: {
      test: function() {
        this.$store.commit("step/addStep");
      }
    },
    components: {
      draggable
    },
    sockets: {
      photoToJudge: function(data) {
        console.log(data);
      },
      authoring: function(data) {
        let subsections = data[0];
        let behaviors = data[1];
        let settings = data[2];
        console.log("subsections");
        console.log(subsections);
        console.log("behaviors");
        console.log(behaviors);
        console.log("settings");
        console.log(settings);
        this.subsections = subsections;
        this.settings = data[2];
        }
      }
    ,
    created: function() {
      console.log(this.$socket.id);
    }
  }
</script>

<style>
  .subsections{
    border: 1px solid gray;
    width:800px;
    /*min-height: 80px;*/
    /*height:80px;*/
    /*line-height: 80px;*/
    text-align: center;
    font-size:20px;
    margin:1px 0px;
    cursor: move;
  }
  .steps{
    border: 1px solid #BBBBBB;
    width:800px;
    /*min-height: 60px;*/
    /*height:60px;*/
    /*line-height: 60px;*/
    text-align: center;
    font-size:16px;
    margin:1px 0px;
    cursor: move;
  }
</style>
