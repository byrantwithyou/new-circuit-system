<template>
  <div>
    <v-card>
      <v-card-title>
        Subsection Resister -- Step 1
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-layout>
            <v-flex xs8>
              <v-card-media contain>
                <v-img src="demo.png"></v-img>
              </v-card-media>
            </v-flex>
            <v-flex offset-xs1 xs2>
              <h5>Gauge the resister</h5>
              <v-card-title>Good Example</v-card-title>
              <v-card-media contain>
                <v-img src="demo.png"></v-img>
              </v-card-media>
              <v-card-title>Bad Example</v-card-title>
              <v-card-media contain>
                <v-img src="demo.png"></v-img>
              </v-card-media>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-media>
        <video  width="200" height="120" autoplay ref="video"></video>
        <canvas ref="canvas"  width="200" height="120"></canvas>
      </v-card-media>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="next">{{btnWord}}</v-btn>
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
  export default {
    data: () => ({
      searchDialog: false,
      btnWord: "Take a photo"
    }),
    name: "step3",
    methods: {
      next: function() {
        if (this.btnWord == "Take a photo") {
          let context = this.$refs.canvas.getContext("2d");
          let video = this.$refs.video;
          context.drawImage(video, 0, 0, 200, 120);
          this.btnWord = "Next";
          this.$socket.emit("photo", this.$refs.canvas.toDataURL(), "Gauge the resister", 0);
        }
        else {
          this.$store.commit("step/addStep");
        }
      }
    },
    mounted() {
      let that = this;
      navigator.mediaDevices.getUserMedia({video: true})
      .then(function(stream) {
        that.$refs.video.srcObject = stream;
      })      
    },
  }
</script>

<style>

</style>
