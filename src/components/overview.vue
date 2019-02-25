<template>
  <div>
    <h1>overview</h1>
    <v-container>
      <v-layout>
        <v-flex xs4>
          <GChart type="PieChart" :data="pieChartData" :options="pieChartOptions"/>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    data: () => ({
      pieChartData: [
        ['Step', 'Student Number'],
        ['Step1', 10],
        ['Step2', 20],
        ['Step3', 10],
        ['Step4', 10]
      ],
      pieChartOptions: {
        title: "Overall Progress"
      }
    }),
    name: "overview",
    methods: {
    },
  }
</script>

<style>

</style>
