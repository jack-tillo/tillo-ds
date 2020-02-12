<template>
    <button @click="click"
        :class="`${variant}-${size}${isOutline}`">
        <!--
        @slot Default slot. <br />Set to display: flex
		-->
        <slot />
    </button>
</template>

<script>
export default {
    props: {
        /**
         * Button design/style. A choice of 4 by design:<br/><br/>
         * <strong>desctructive</strong>: Cancel, Delete, Clear, Remove <br/>
         * <strong>positive</strong>: Ok, Proceed, Go, Search, Next <br/>
         * <strong>neutral</strong>: A positive, non-destrucive button (part of a choice?) <br/>
         * <strong>disabled</strong>: Unavailable, incomplete, invalid <br/>
         * 
         * @variant
         */
        variant: {
            type: String,
            required: false,
            default: () => {
                return 'neutral'
            }
        },
        /**
         * Simple prop that tells the button to be outline only
         */
        outline: {
            type: Boolean,
            required: false,
            default: () => {
                return false
            }
        },
        /**
         * Size of button. A choice of 3 by design:<br/><br/>
         * <strong>sml</strong> | 
         * <strong>med</strong> | 
         * <strong>lrg</strong>
         * 
         * @size
         */
        size: {
            type: String,
            required: false,
            default: () => {
                return 'sml'
            }
        }
    },
    
    computed: {
        isOutline () {
            return this.outline ? '-outline' : ''
        }
    },

    methods: {
        click (event) {
            /**
             * Simple re-bubbling of inner click event.<br />
             * Will push out the original MouseEvent.
             * @event @click
             */
            this.$emit('click', event)
        }
    }
}
</script>

<style scoped lang="scss">
    @import './styles/main';
</style>