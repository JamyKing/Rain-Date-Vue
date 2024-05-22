<template>
  <div class="u-f-col">
    <head-guide></head-guide>
    <el-row :gutter="20" type="flex" justify="center" style="margin: 0;">
      <el-col :xl="{span: 10}" :lg="{span: 12}" :md="{span: 14}" :sm="{span: 16}" :xs="{span: 17}"
              style="background: white; padding: 10px; box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);">
        <div class="data-list">
          <div v-for="(item, index) in dataList" :key="index" @click="getDetail(item)"
               class="list-item animated fadeIn">
            <h2 class="title">{{ item.title }}</h2>
            <div v-if="item.category">
              <el-tag v-for="tag in item.category" :key="tag.name" :type="tag.type" style="margin: 0 3px;">
                {{ tag.name }}
              </el-tag>
            </div>
            <h3 class="sub-title">{{ item.subtitle }}</h3>
            <div class="list-bottom">
              <p class="meta">{{ item.createTime }}</p>
              <div v-if="item.clickViews" class="item-view">
                <i class="el-icon-view"></i>
                <p class="view-num">{{ item.clickViews }}</p>
              </div>
            </div>
            <div class="hr"></div>
          </div>
        </div>
        <div v-show="dataList.length > 0" class="u-f-jsb" style="padding: 0 10px;">
          <el-button @click="prePage" :disabled="pageNo === 1" type="primary" plain icon="el-icon-arrow-left">上一页
          </el-button>
          <el-button @click="nextPage" :disabled="pageNo === totalPage" type="primary" plain>下一页<i
            class="el-icon-arrow-right el-icon--right"></i></el-button>
        </div>
      </el-col>
      <el-col class="user u-f-col" :xl="{span: 4}" :lg="{span: 4}" :md="{span: 5}" :sm="{span: 5}" :xs="{span: 6}">
        <el-image class="head" src="../../../static/imgs/head.jpg"></el-image>
        <div class="tag-group">
          <el-tag
            v-for="tag in category"
            :key="tag.id"
            :type="tag.type"
            :effect="tag.name === categoryName ? 'dark' : 'plain'"
            @click="tagSelected(tag.name)"
            class="tags animated fadeInDown">
            {{ tag.name }}
          </el-tag>
          <!--全部标签-->
          <el-tag @click="tagSelected()" type="info" effect="plain" class="tags animated fadeInDown">ALL</el-tag>
        </div>
      </el-col>
    </el-row>
    <foot></foot>
    <scroll-top :autoTop="false"></scroll-top>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import headGuide from '@/components/common/head-guide'
import foot from '@/components/common/foot'
import scrollTop from '@/components/common/scrollTop'

export default {
  name: 'index',
  components: {
    headGuide,
    foot,
    scrollTop
  },
  data() {
    return {
      dataList: [],
      categoryName: '',
      pageNo: 1,
      pageSize: 5,
      totalPage: 1
    }
  },
  created() {
    this.getDataList()
  },
  computed: {
    ...mapState(['category'])
  },
  methods: {
    async getDataList() {
      const {pageNo, pageSize, categoryName} = this
      try {
        const {code, data: {totalPage, listData}} = await this.$request('/api/blog/indexList', 'POST', {
          pageNo,
          pageSize,
          categoryName
        })
        if (code === 0) {
          this.totalPage = totalPage
          this.dataList = listData
          if (totalPage === 0) {
            this.$alert('没有找到合适的内容，请更换条件后再次搜索~', '叮咚叮咚', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          }
        }
      } catch (err) {
        console.error(err)
      }
    },
    tagSelected(name) {
      this.categoryName = name
      this.pageNo = 1
      this.getDataList()
    },
    getDetail(item) {
      this.$router.push({name: 'detail', query: {id: item.id}})
      return item.clickViews += 1
    },
    prePage() {
      this.pageNo -= 1
      this.getDataList()
    },
    nextPage() {
      this.pageNo += 1
      this.getDataList()
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  .head {
    width: 80%;
    /*height: 100px;*/
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
  }
}

.data-group {
  background: white;
  padding: 10px;
}

.data-list {
  min-height: 600px;

  .list-item {
    padding: 0 20px;

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
      line-height: 1.5;
      font-weight: 300;
      margin: 10px 0;
      max-height: 100px;
      overflow: hidden;
    }

    .list-bottom {
      display: flex;
      align-items: center;
      .meta {
        font-family: Lora, 'Times New Roman', serif;
        font-size: 18px;
        font-style: italic;
        //margin-bottom: 30px;
      }
      .item-view {
        display: flex;
        align-items: center;
        margin-left: 16px;
        .view-num {
          color: #666666;
          font-size: 15px;
          margin-left: 2px;
        }
      }
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
