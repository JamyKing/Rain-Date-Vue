<template>
    <div class="u-f-col">
        <head-guide></head-guide>
        <el-row :gutter="30" type="flex" justify="center" style="margin: 0;">
            <el-col :span="8">
                <div class="data-list">
                    <div v-for="(item, index) in dataList" :key="index" @click="getDetail(item.id)" class="list-item animated fadeIn">
                        <h2 class="title">{{item.title}}</h2>
                        <div v-if="item.category">
                            <el-tag v-for="tag in item.category" :key="tag" type="success" style="margin: 0 3px;">{{tag | categoryFilter(category)}}</el-tag>
                        </div>
                        <h3 class="sub-title">{{item.subtitle}}</h3>
                        <p class="meta">{{item.createTime}}</p>
                        <div class="hr"></div>
                    </div>
                </div>
            </el-col>
            <el-col class="user u-f-col" :span="4">
                <el-image class="head" src="../../../static/imgs/head.jpg"></el-image>
                <div class="tag-group">
                    <el-tag v-for="tag in category" :key="tag.id" :type="tag.type" effect="plain" class="tags animated fadeInDown">{{tag.name}}</el-tag>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col v-show="dataList.length > 0" :span="8" :offset="6" class="u-f-jsb">
                <el-button @click="prePage" :disabled="pageNo === 1" type="primary" icon="el-icon-arrow-left">上一页</el-button>
                <el-button @click="nextPage" :disabled="pageNo === totalPage" type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </el-col>
        </el-row>
        <foot></foot>
    </div>
</template>

<script>
import { mapState } from 'vuex'
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
            dataList: [],
            pageNo: 1,
            totalPage: 1
        }
    },
    created() {
        this.getDataList()
    },
    computed: {
        ...mapState(['category'])
    },
    filters: {
        categoryFilter (code, category) {
            for (let item of category) {
                if (item.id === code) {
                    return item.name
                }
            }
        }
    },
    methods: {
        async getDataList () {
            const { pageNo } = this
            try {
                const { code, data: { totalPage, listData } } = await this.$request('/api/blog/indexList', 'POST', { pageNo })
                if (code === 0) {
                    this.totalPage = totalPage
                    this.dataList = listData
                }
            } catch (err) {
                console.error(err)
            }
        },
        getDetail (id) {
            this.$router.push({ name: 'detail', query: {id: id} })
        },
        prePage () {
            this.pageNo -= 1
            this.getDataList()
        },
        nextPage () {
            this.pageNo += 1
            this.getDataList()
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
    .tag-group {
        padding: 0 10px;
        .tags {
            margin: 5px;
            &:hover {
                cursor: pointer;
                color: orangered;
            }
        }
        &:hover {
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        }
    }
}
.data-list {
    min-height: 600px;
    .list-item {
        &:hover {
            cursor: pointer;
        }
        .title {
            font-size: 26px;
            line-height: 1.3;
            margin: 30px 0 10px;
        }
        .sub-title {
            font-size: 17px;
            line-height: 1.3;
            font-weight: 300;
            margin: 10px 0;
            max-height: 100px;
            overflow: hidden;
        }
        .meta {
            font-family: Lora,'Times New Roman',serif;
            font-size: 18px;
            font-style: italic;
            margin-bottom: 30px;
        }
        .hr {
            height: 0;
            margin: 20px 0;
            border: 0;
            border-top: 1px solid #eeeeee;
        }
    }
}
</style>
