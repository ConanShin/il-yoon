<template>
    <div>
        <div class="links">
        </div>
        <template v-if="isDesktop">
            <div class="large">주소. 경상남도 창원시 성산구 성주동 곰절길 18번길12 | 전화. 055-261-5185</div>
            <div class="large">사업자등록번호 608-81-65387</div>
        </template>
        <template v-else>
            <div class="medium">주소. 경상남도 창원시 성산구 성주동 곰절길 18번길12</div>
            <div class="medium">전화. 055-261-5185</div>
            <div class="small">사업자등록번호 608-81-65387</div>
        </template>
        <div class="small">Copyright © 일윤 All rights reserved</div>
    </div>
</template>

<script>
    import {Vue, Component} from 'vue-property-decorator'

    @Component
    export default class Footer extends Vue {

        get isDesktop() {
            return window.innerWidth > 460
        }

        open(link) {
            window.open(link, '_blank')
        }
    }
</script>

<style scoped lang="scss">
    @import 'src/assets/style/media-query';
    @import 'src/assets/style/common';

    .footer {
        background-color: $bright-theme-100;
        position: relative;
        text-align: center;
        border-top: 1px solid #655e5e14;
        overflow: hidden;
        width: 100%;
        height: fit-content;
        padding: 10px 0;
        line-height: 16px;
    }

    .links {
        text-align: center;

        .link {
            margin: 0 7px;
            display: inline-block;
            cursor: pointer;
            background-repeat: no-repeat;
            background-size: contain;

            &.blog {
                width: 33px;
                height: 33px;
                margin-bottom: 4px;
                background-image: url("~@/assets/blog.png")
            }

            &.instagram {
                width: 30px;
                height: 30px;
                margin-bottom: 7px;
                background-image: url("~@/assets/instagram.png")
            }
        }
    }

    .large {
        font-size: 15px;
        line-height: 25px;
    }

    .medium {
        font-size: 11px;
    }

    .small {
        font-size: 10px;
        @include desktop {
            margin-top: 10px;
        }
    }
</style>
