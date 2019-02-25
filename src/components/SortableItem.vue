<template>
  <li class="list-item">{{item}}</li>
</template>

<script>
  import { ContainerMixin, ElementMixin } from "vue-slicksort";
  export default {
    mixins: [ElementMixin],
    props: ["item"]
  }
</script>