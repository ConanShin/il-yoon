<template>
    <div class="menu-1 flex" :class="{show: show}">
        <div v-if="product" v-html="product.description"></div>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Menu1 extends Vue {
    show = false
    get isDesktop() {
        return window.innerWidth > 460
    }

    get product () {
        return this.$store.getters.product
    }
    async beforeMount () {
        await this.$store.dispatch('findProduct', 14)
        this.show = true
    }
}
</script>

<style scoped lang="scss">
::v-deep p span span {
    font-size: 12px;
    font-family: monospace !important;
}

::v-deep img {
    display: block;
    max-width: 100%;
}
</style>