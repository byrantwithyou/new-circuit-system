<template>
  <div>
    <h1>teacher-student</h1>
    <v-container>
      <v-layout>
        <v-flex xs3 :key="index" v-for="(item, index) in studentItems"> 
          <v-card>
            <v-card-media contain>
              <v-img :src="item.img"></v-img>
            </v-card-media>
            <v-btn absolute top right icon><v-icon @click="chatDialog=true">chat_bubble</v-icon></v-btn>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon @click="teacherSendToStudentDone(item.id, item.img)"><v-icon>done</v-icon></v-btn>
              <v-btn icon @click="teacherSendToStudentNotDone(item.id, item.img)"><v-icon>clear</v-icon></v-btn>
              <v-btn icon><v-icon>thumb_up</v-icon></v-btn>
              <v-btn icon><v-icon>thumb_down</v-icon></v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-dialog v-model="chatDialog">
        <v-card>
          <v-card-title>
            Comment
          </v-card-title>
          <v-text-field v-model="comment"></v-text-field>
          <v-btn small @click="comment='Wire Cross'">Wire Cross</v-btn>
          <v-btn small @click="comment='Mind Polarity'">Mind Polarity</v-btn>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="chatDialog=false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
  export default {
    data: () => ({
      chatDialog: false,
      comment: ""
    }),
    name: "teacher-student",
    methods: {
      teacherSendToStudentDone: function(id, img) {
        console.log("run here");
        console.log(id);
        console.log(img);
        this.$socket.emit("teacherReview", 1, img, "", id, this.comment, 0);
        this.$store.commit("step/deleteStudent", {
          id: id
        });
      },
      teacherSendToStudentNotDone: function(id, img) {
        this.$socket.emit("teacherReview", 0, img, "", id, this.comment, 0);
        this.$store.commit("step/deleteStudent", {
          id: id
        })
      }
    },
    computed: {
      studentItems: function() {
        return this.$store.state.step.studentGrid;
      }
    },
    components: {
      
    },
    sockets: {
      
    },
    created: function() {
      // eslint-disable-next-line
      console.log(this.$socket.id);
    }

  }
</script>

<style>

</style>
