<template>
    <button @click="$emit('click')">
        <!--
        @slot Default slot. Set to display flex
		-->
        <slot/>
    </button>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
    @import './styles/main';

    .destructive-medium {
        color: #ffccff;
        @include mediumBtn('destructive');
    }
</style>