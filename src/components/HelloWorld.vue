<template>
  <div>
    <div v-if="test==1">
    <v-btn @click="loginAsStudent">Log in as Student</v-btn>
    <v-btn @click="loginAsTeacher">Log in as Teacher</v-btn>
    <v-btn @click="authoringTool">Authoring Tool</v-btn>
    </div>
    <div v-if="test==0">
      <v-text-field placeholder="Input your name here" v-model="name"></v-text-field>
      <v-btn @click="myNext">Next</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      test: 0,
      name: ""
    }),
    name: "HelloWorld",
    methods: {
      loginAsStudent: function() {
        this.$socket.emit("studentLogin");
        this.$router.push("/student");
        this.$store.commit("step/alteroute", {
          route: "/student"
        })
      },
      loginAsTeacher: function() {
        this.$socket.emit("teacherLogin");
        this.$router.push("/teacher");
        this.$store.commit("step/alteroute", {
          route: "/teacher"
        })
      },
      authoringTool:function () {
        this.$router.push("/authoringTool");
      },
      myNext: function() {
        this.$socket.emit("sendWebName", this.name);
        this.test += 1;
      }
    },
    sockets: {
      getMobilePhoto: function(data) {
        console.log(data);
      }
    }
  }
</script>

<style>

</style>
