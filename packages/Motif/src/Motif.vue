<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" 
        :class="spinner ? 'spinner' : ''">
            <component :is="type"/>
    </svg>
</template>

<script>
import icons from './icons'

export default {
    name: 'Motif',
    props: {
        /**
         * The icon you want to display.<br />
         * See the story for a full list.
         */
        type: {
            type: String,
            required: true
        },
        /**
         * If the icon should spin.<br />
         * Mostly used for loaders.
         */
        spinner: {
            type: Boolean,
            required: false
        }
    },
    components: {
        ...icons
    }
}
</script>

<style scoped lang="scss">
@-webkit-keyframes rotating /* Safari and Chrome */ {
    from {
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
@keyframes rotating {
    from {
        -ms-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    to {
        -ms-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
.spinner {
    -webkit-animation: rotating 1.5s linear infinite;
    -moz-animation: rotating 1.5s linear infinite;
    -ms-animation: rotating 1.5s linear infinite;
    -o-animation: rotating 1.5s linear infinite;
    animation: rotating 1.5s linear infinite;
}
</style>
