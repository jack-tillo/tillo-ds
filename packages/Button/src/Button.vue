<template>
    <button class="destructive-medium">
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