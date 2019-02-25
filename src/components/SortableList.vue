<template>
  <ul class="list">
    <slot />
  </ul>
</template>

<script>
  import { ContainerMixin, ElementMixin } from "vue-slicksort";
  export default {
    mixins: [ContainerMixin]
  }
</script>