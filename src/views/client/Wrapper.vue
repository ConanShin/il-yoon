<template>
    <div>
        <template>
            <Menu/>
            <transition name="fade" mode="out-in">
                <router-view class="view"/>
            </transition>
            <FooterFixed class="footer"/>
        </template>
    </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'
import Menu from "@/views/client/Menu";
import FooterFixed from "@/views/client/FooterFixed";
@Component({
    components: {FooterFixed, Menu}
})
export default class Wrapper extends Vue {
    get products() {
        return this.$store.getters.products
    }

    get isDesktop () {
        return window.innerWidth > 460
    }

    async beforeMount () {
        const param = this.getParam()
        if (param.path) {
            await this.$router.push({name: param.path}).catch(() => {})
        }
    }

    getParam () {
        const search = location.search.substring(1);
        if (search.length === 0) return {}
        return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
    }
}
</script>
<style lang="scss">
@import "src/assets/style/hamburgers.scss";
.fade-enter-active,
.fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
    opacity: 0
}
</style>
<style scoped lang="scss">
@import 'src/assets/style/media-query';
@import 'src/assets/style/common';

.view {
    max-width: $view-max-width;
    margin: auto;
    position: relative;
    @include desktop {
        min-height: calc(100vh - #{$nav-height-desktop + 99});
        width: 80%;
        padding-top: $nav-height-desktop;
    }
    @include mobile {
        min-height: calc(100vh - #{$nav-height-mobile + 90});
        width: 100%;
        padding-top: $nav-height-mobile;
    }
}
</style>
