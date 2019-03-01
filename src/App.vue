<template>
  <v-app>
    <notifications/>
    <v-navigation-drawer v-if="route=='/teacher'" v-model="drawer" right fixed app>
      <sidebar></sidebar>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
      
        <!--v-dialog  v-model="reviewDialog" width="500">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
              Gauge the Resister
            </v-card-title>
            <v-card-media contain>
              <v-img :src="reviewImgURL"></v-img>
            </v-card-media>
            <v-card-text>
              <v-text-field v-model="comment" label="Comment" required></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outline small @click="comment='Your wire is problematic'">Your wire is problematic</v-btn>
              <v-btn outline small @click="comment='Mind the polarity'">Mind the polarity</v-btn>
            </v-card-actions>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" icon>
                <v-icon @click="right">done</v-icon>
              </v-btn>
              <v-btn @click="wrong" color="primary" icon>
                <v-icon>clear</v-icon>
              </v-btn> 
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog  v-model="reviewResultDialog" width="500">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
              Gauge the Resister
            </v-card-title>
            <v-card-media contain>
              <v-img :src="reviewResultImgURL"></v-img>
            </v-card-media>
            <v-card-text>
              {{reviewComment}}
              <br>
              {{reviewIcon}}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon small @click="reviewResultDialog=false"><v-icon>close</v-icon></v-btn>
              <v-btn @click="sendToTeacher">Send Again to teacher</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog-->
    </v-content>
  </v-app>
</template>

<script>
import sidebar from "@/components/sidebar";
export default {
  name: 'App',
  components: {
    sidebar
  },
  data () {
    return {
      drawer: true,
      reviewDialog: false,
      reviewImgURL: "",
      comment: "",
      userLoopBack: "",
      reviewResultDialog: false,
      reviewResultImgURL: "",
      reviewComment: "",
      reviewIcon: ""
    }
  },
  created: function() {
    this.$router.push("/");
    this.$store.commit("step/alteroute", {
      route: "/"
    });
  },
  computed: {
    route: function() {
      return this.$store.state.step.route;
    },
  },
  methods: {
    right: function() {
      this.reviewDialog = false;
      this.$socket.emit("review", 1, this.reviewImgURL, "Gauge the resister", this.userLoopBack, this.comment, 0);
    },
    wrong: function() {
      this.reviewDialog = false;
      this.$socket.emit("review", 0, this.reviewImgURL, "Gauge the resister", this.userLoopBack, this.comment, 0);
    },
    sendToTeacher: function() {
      this.reviewResultDialog = false;
      this.$socket.emit("photoToTeacher", this.reviewResultImgURL, "dsf", 1);
    } 
  },
  sockets: {
    photoToJudge: function(data) {
      this.reviewDialog = true;
      this.reviewImgURL = data[0];
      this.userLoopBack = data[2];
    },
    reviewResult: function(data) {
      this.reviewResultDialog = true;
      this.reviewComment = data[3];
      this.reviewResultImgURL = data[0];
      if (data[1] == 1) {
        this.reviewIcon = "Right";
      }
      else {
        this.reviewIcon = "Wrong";
      }
    },
  }
}
</script>
