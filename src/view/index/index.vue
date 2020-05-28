<template>
    <div class="u-f-col">
        <head-guide></head-guide>
        <el-row :gutter="30" type="flex" justify="center" style="margin: 0">
            <el-col :span="8">
                <div class="data-list">
                    <div class="list-item">
                        <h2 class="title">「知乎」为什么 CSS 这么难学？</h2>
                        <h3 class="sub-title">Why I dislike CSS as a programming language</h3>
                        <div class="content">
                            这篇文章转载自我在知乎上的回答 对我来说，CSS 难学以及烦人是因为它「出乎我意料之外的复杂」且让我觉得「定位矛盾」。
                            @方应杭 老师的答案我赞了：CSS 的属性互不正交，大量的依赖与耦合难以记忆。
                            @顾轶灵 @王成 说得也没错：CSS 的很多规则是贯彻整个体系的，而且都记在规范里了，是有规律的，你应该好好读文档而不是去瞎试。
                            「CSS是一门正儿八经的编程语言，请拿出你学C+...
                        </div>
                        <p class="meta">
                            Posted by Hux on October 6, 2017
                        </p>
                    </div>
                    <div class="hr"></div>

                    <div class="list-item">
                        <h2 class="title">「知乎」为什么 CSS 这么难学？</h2>
                        <h3 class="sub-title">Why I dislike CSS as a programming language</h3>
                        <div class="content">
                            这篇文章转载自我在知乎上的回答 对我来说，CSS 难学以及烦人是因为它「出乎我意料之外的复杂」且让我觉得「定位矛盾」。
                            @方应杭 老师的答案我赞了：CSS 的属性互不正交，大量的依赖与耦合难以记忆。
                            @顾轶灵 @王成 说得也没错：CSS 的很多规则是贯彻整个体系的，而且都记在规范里了，是有规律的，你应该好好读文档而不是去瞎试。
                            「CSS是一门正儿八经的编程语言，请拿出你学C+...
                        </div>
                        <p class="meta">
                            Posted by Hux on October 6, 2017
                        </p>
                    </div>
                    <div class="hr"></div>

                    <div class="list-item">
                        <h2 class="title">「知乎」为什么 CSS 这么难学？</h2>
                        <h3 class="sub-title">Why I dislike CSS as a programming language</h3>
                        <div class="content">
                            这篇文章转载自我在知乎上的回答 对我来说，CSS 难学以及烦人是因为它「出乎我意料之外的复杂」且让我觉得「定位矛盾」。
                            @方应杭 老师的答案我赞了：CSS 的属性互不正交，大量的依赖与耦合难以记忆。
                            @顾轶灵 @王成 说得也没错：CSS 的很多规则是贯彻整个体系的，而且都记在规范里了，是有规律的，你应该好好读文档而不是去瞎试。
                            「CSS是一门正儿八经的编程语言，请拿出你学C+...
                        </div>
                        <p class="meta">
                            Posted by Hux on October 6, 2017
                        </p>
                    </div>
                    <div class="hr"></div>

                    <div class="list-item">
                        <h2 class="title">「知乎」为什么 CSS 这么难学？</h2>
                        <h3 class="sub-title">Why I dislike CSS as a programming language</h3>
                        <div class="content">
                            这篇文章转载自我在知乎上的回答 对我来说，CSS 难学以及烦人是因为它「出乎我意料之外的复杂」且让我觉得「定位矛盾」。
                            @方应杭 老师的答案我赞了：CSS 的属性互不正交，大量的依赖与耦合难以记忆。
                            @顾轶灵 @王成 说得也没错：CSS 的很多规则是贯彻整个体系的，而且都记在规范里了，是有规律的，你应该好好读文档而不是去瞎试。
                            「CSS是一门正儿八经的编程语言，请拿出你学C+...
                        </div>
                        <p class="meta">
                            Posted by Hux on October 6, 2017
                        </p>
                    </div>
                    <div class="hr"></div>

                    <div class="list-item">
                        <h2 class="title">「知乎」为什么 CSS 这么难学？</h2>
                        <h3 class="sub-title">Why I dislike CSS as a programming language</h3>
                        <div class="content">
                            这篇文章转载自我在知乎上的回答 对我来说，CSS 难学以及烦人是因为它「出乎我意料之外的复杂」且让我觉得「定位矛盾」。
                            @方应杭 老师的答案我赞了：CSS 的属性互不正交，大量的依赖与耦合难以记忆。
                            @顾轶灵 @王成 说得也没错：CSS 的很多规则是贯彻整个体系的，而且都记在规范里了，是有规律的，你应该好好读文档而不是去瞎试。
                            「CSS是一门正儿八经的编程语言，请拿出你学C+...
                        </div>
                        <p class="meta">
                            Posted by Hux on October 6, 2017
                        </p>
                    </div>
                    <div class="hr"></div>
                </div>
            </el-col>
            <el-col class="user u-f-rc" :span="4">
                <el-image class="head" src="../../../static/imgs/head.jpg"></el-image>
            </el-col>
        </el-row>
        <foot></foot>
    </div>

</template>

<script>
import headGuide from '@/components/common/head-guide'
import foot from '@/components/common/foot'
export default {
    name: 'index',
    components: {
        headGuide,
        foot
    },
    data() {
        return {
        }
    },
    created() {
        // this.loadData()
    },
    activated() {
    },
    computed: {
    },
    watch: {
    },
    methods: {
        async loadData () {
            try {
                const { code, data } = await this.$request('/api/blog/list', 'GET')
                if (code === 0) {
                    console.log(data)
                }
            } catch (err) {
                console.error(err)
            } finally {
                console.log('finally')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.user {
    .head {
        width: 200px;
        height: 200px;
        padding: 5px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin: 10px auto;
    }
}
.data-list {
    .list-item {
        .title {
            font-size: 26px;
            line-height: 1.3;
            margin: 30px 0 10px;
        }
        .sub-title {
            font-size: 16px;
            line-height: 1.3;
            font-weight: 300;
            margin-bottom: 10px;
        }
        .content {
            font-size: 14px;
            font-style: italic;
            color: #a3a3a3;
        }
        .meta {
            font-family: Lora,'Times New Roman',serif;
            font-size: 18px;
            font-style: italic;
            margin-bottom: 30px;
        }
    }
    .hr {
        height: 0;
        margin: 20px 0;
        border: 0;
        border-top: 1px solid #eeeeee;
    }
}
</style>
