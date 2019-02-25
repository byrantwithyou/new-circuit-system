<template>
  <div>
    <v-btn @click="loginAsStudent">Log in as Student</v-btn>
    <v-btn @click="loginAsTeacher">Log in as Teacher</v-btn>
  </div>
</template>

<script>
  export default {
    data: () => ({
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
      }
    },
  }
</script>

<style>

</style>
