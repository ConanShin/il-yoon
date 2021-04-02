<template>
    <div class="menu-1 flex" :class="{show: show}">
        <div class="submenu" :class="{show: $route.path.includes('portfolio')}">
            <div v-for="(categoryId, categoryName) in submenus" @click="search(categoryId)" :class="{bold: clickedCategoryId === categoryId}">{{categoryName}}</div>
        </div>
        <div v-masonry transition-duration="0.3s" item-selector=".item">
            <div v-masonry-tile class="item" v-for="product in products">
                <img :src="product.list_image"/>
                <div>{{product.product_name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'
import {categories} from "@/cafe24info";

@Component
export default class Menu2 extends Vue {
    show = false
    submenus = categories['menu2']
    clickedCategoryId = Object.values(categories['menu2'])[0]
    containerId = 'container'
    get isDesktop() {
        return window.innerWidth > 460
    }
    get products () {
        return this.$store.getters.products
    }

    search(categoryId) {
        this.clickedCategoryId = categoryId
        this.$store.dispatch('findProductList', categoryId)
    }

    async beforeMount () {
        await this.search(this.clickedCategoryId)
        this.show = true
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/media-query';
.item {
    width: 45%;
    padding: 5px;
    @include desktop {
        width: 30%;
        padding: 20px;
    }
    img {
        width: 100%;
    }
}

.submenu {
    display: flex;
    padding-bottom: 3px;
    font-size: 20px;
    justify-content: space-around;
    margin: 10px 0;

    div {
        margin-right: 10px;
        cursor: pointer;

        &.bold {
            font-weight: bold;
            color: black;
        }
    }

    @include mobile {
        justify-content: space-evenly;
        padding-top: 25px;
        font-size: 12px;
    }
}
</style>