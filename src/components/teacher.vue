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
  </div>
</template>

<script>
  import overview from "@/components/overview";
  import teacherStudent from "@/components/teacher-student";
  import authoring from "@/components/authoring"
  export default {
    data: () => ({
      visualize: "overview"
    }),
    name: "teacher",
    components: {
      overview,
      teacherStudent,
      authoring
    },
    sockets: {
      photoToJudgeByTeacher: function(data) {
        this.$store.commit("step/addStudent", {
          id: data[2],
          img: data[0]
        })
      }
    }
  }
</script>

<style>

</style>
