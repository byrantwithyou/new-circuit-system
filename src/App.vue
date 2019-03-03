<template>
  <v-app>
    <notifications/>
    <v-navigation-drawer v-if="route=='/teacher'" v-model="drawer" right fixed app>
      <sidebar></sidebar>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
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
  }
}
</script>
