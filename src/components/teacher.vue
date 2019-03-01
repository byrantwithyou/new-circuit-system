<template>
  <div>
    <v-toolbar dense app>
      <v-divider vertical></v-divider>
      <v-btn @click="visualize='overview'" ripple flat>Overview</v-btn>
      <v-divider vertical></v-divider>
      <v-btn ripple @click="visualize='student'" flat>Student</v-btn>
      <v-divider vertical></v-divider>
      <v-btn ripple @click="visualize='authoring'" flat>Authoring</v-btn>
    </v-toolbar>
    <v-container>
      <overview v-if="visualize=='overview'"></overview>
      <teacherStudent v-if="visualize=='student'"></teacherStudent>
      <authoring v-if="visualize=='authoring'"></authoring>
    </v-container>

    <v-dialog  v-model="reviewDialog" width="500">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
              {{behaviorTitle.name}}
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
  </div>
</template>

<script>
  import overview from "@/components/overview";
  import teacherStudent from "@/components/teacher-student";
  import authoring from "@/components/authoring"
  export default {
    data: () => ({
      visualize: "overview",
      reviewDialog: false,
      behaviorTitle:"",
      reviewImgURL: "",
      comment: "",
      userLoopBack: "",
      severity:"",
    }),
    name: "teacher",
    components: {
      overview,
      teacherStudent,
      authoring
    },
    methods: {
      right: function() {
                this.reviewDialog = false;
                this.$socket.emit("review", 1, this.reviewImgURL, this.behaviorTitle, this.userLoopBack, this.comment, this.severity);
            },
      wrong: function() {
          this.reviewDialog = false;
          this.$socket.emit("review", 0, this.reviewImgURL, this.behaviorTitle, this.userLoopBack, this.comment, this.severity);
      },
    },
    sockets: {
      photoToJudgeByTeacher: function(data) {
        this.$store.commit("step/addStudent", {
          id: data[2],
          img: data[0]
        })
        this.reviewDialog = true;
        this.behaviorTitle = data[1];
        this.reviewImgURL = data[0];
        this.userLoopBack = data[2];
        this.severity = data[3];
      }
    }
  }
</script>

<style>

</style>
