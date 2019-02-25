<template>
  <v-card>
    <v-card-media>
      <v-img :src="imgUrl"></v-img>
    </v-card-media>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon><v-icon>check</v-icon></v-btn>
      <v-btn icon><v-icon>close</v-icon></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default ({
    name: "student-grid",
    props: {
      imgUrl: String
    }
  })
</script>