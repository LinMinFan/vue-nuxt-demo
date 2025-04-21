<script>

export default {
    layout: 'default',
    async asyncData({ params, store, $axios }) {
        const { id } = params

        return {
            id,
        }
    },
    head() {

    },
    data() {
        return {
        }
    },
    methods: {
        
    },
    computed: {
        
    },
}
</script>

<template>
    <div>
        <h1>這是商品 {{ id }}</h1>
    </div>
</template>

<style scoped>

</style>
