<script>
export default {
    name: 'Preloader',
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<template>
    <div id="preloader-active">
        <div class="preloader d-flex align-items-center justify-content-center">
            <div class="preloader-inner position-relative">
                <div class="text-center">
                    <img class="jump" src="/imgs/theme/favico.svg" alt="" />
                    <h5 class="mb-5">Now Loading</h5>
                    <div class="loader">
                        <div class="bar bar1"></div>
                        <div class="bar bar2"></div>
                        <div class="bar bar3"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
