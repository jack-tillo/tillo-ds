<template>
  <motif :class="[$style.motif, state]"
    type="chevron" />
</template>

<script>
import Motif from '@/components/motif/Motif'

export default {
  components: {
    Motif
  },

  props: {
    direction: {
      type: String,
      required: false
    }
  },

  computed: {
    state () {
      return this.$style[this.direction.toLowerCase()]
    }
  }
}
</script>

<style module lang="scss">
  .motif {
    width: 10px;
    margin-left: 10px;
    opacity: 0;
    transition: transform ease-in-out .2s;
  }

  .desc {
    transform: rotate(90deg);
    opacity: 1;
  }

  .asc {
    transform: rotate(270deg);
    opacity: 1; 
  }
</style>