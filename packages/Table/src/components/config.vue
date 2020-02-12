<template>
  <dropdown 
    :useArrow="false"
    :class="$style.dropdown"
    :value="{}">

    <button slot="trigger"
      slot-scope="{toggleOpen}"
      :class="$style.configureButton"
      @mousedown.stop="toggleOpen">
        <div v-if="hasHiddenColumns" class="indicator"></div>
        <motif type="mixer" />
    </button>

    <div slot="options" :class="$style.listContainer">
      <button v-for="({heading, visible}, key) in headings"
        :key="key"
        :class="$style.option"
        @mousedown.stop="$emit('configure', {heading, index: key})">
          <checkbox disabled :value="visible"/>
          {{heading.label}}
      </button>
    </div>

  </dropdown>
</template>

<script>
import dropdown from '@/components/dropdown/Dropdown'
import motif from '@/components/motif/Motif' 
import checkbox from '@/components/inputs/Checkbox.vue'

export default {
  props: {
    headings: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      hasHiddenColumns: false
    }
  },

  watch: {
    headings (value) {
      let hiddenElements = 0
      value.forEach(element => {
        if (!element.visible) {
          hiddenElements++
        }
      });

      this.hasHiddenColumns = hiddenElements > 0
    }
  },

  components: {
    dropdown,
    motif,
    checkbox
  }
}
</script>

<style module lang="scss">
  @import './styles/configure';
</style>