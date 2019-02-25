<template>
  <div>
    <step1 v-if="step==1"></step1>
    <!--step2 v-if="step==2"></step2-->
    <step3 v-if="step==2"></step3>
    <step4 v-if="step==3"></step4>
    <!--step5 v-if="step==4"></step5-->
    <step6 v-if="step==4"></step6>
    <step7 v-if="step==5"></step7>
  </div>
</template>

<script>
  import step1 from "@/components/step1";
  import step3 from "@/components/step3";
  import step4 from "@/components/step4";
  import step6 from "@/components/step6";
  import step7 from "@/components/step7";

  export default {
    data: () => ({
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
      step1,
      step3,
      step4,
      step6,
      step7
    },
    sockets: {
      photoToJudge: function(data) {
        console.log(data);
      }
    },
    created: function() {
      console.log(this.$socket.id);
    }
  }
</script>

<style>

</style>
