<template>
  <th @click="click">
    <slot></slot>
    <indicator v-if="isMySort" :direction="currentSort.dir" />
  </th>
</template>

<script>
import indicator from './indicator'

export default {
  components: {
    indicator
  },

  props: {
    currentSort: {
      type: Object,
      required: false
    },

    data: {
      type: Object,
      required: true
    }
  },

  methods: {
    click () {
      this.$emit('click', this.data)
    }
  },

  computed: {
    isMySort () {
      return this.currentSort.by === this.data.id
    }
  }
}
</script>
