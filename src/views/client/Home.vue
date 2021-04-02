<template>
    <div>
        <div class="logo">
            <img src="@/assets/logo.png"/>
            <span>일윤주식회사</span>
        </div>
        <div class="menu-1 flex" :class="{show: show}">
            <div class="slider">
                <img v-for="product in products" v-if="product" :src="product.list_image"/>
            </div>
        </div>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'
import {categories} from "@/cafe24info";

@Component
export default class Home extends Vue {
    show = false

    async beforeMount() {
        await this.$store.dispatch('findProductList', categories['home'])
        this.show = true
    }

    get isDesktop() {
        return window.innerWidth > 460
    }

    get products() {
        return this.$store.getters.products
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/style/media-query';
@import 'src/assets/style/common';
.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 100px 0;
    span {
        margin-left: 30px;
        font-size: 80px;
    }
    @include mobile {
        span {
            font-size: 30px;
        }
        img {
            height: 30px;
        }
    }
}
.flex {
    display: flex;
    overflow: hidden;
}

.slider {
    display: flex;
    animation: move 100s linear infinite alternate;
}

img {
    height: 20vh;
    margin: 5px;
}

@-webkit-keyframes move {
    0% {
        margin-left: 0;
    }
    100% {
        margin-left: -12500px;
    }
}
</style>
