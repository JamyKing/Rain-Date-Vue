<template>
  <el-row>
    <el-col class="head" :style="[{height: guideHeight}]" :span="24">
      <el-row class="guide" type="flex" justify="space-between">
        <el-col :xl="{span: 2}" :lg="{span: 3}" :md="{span: 4}" :sm="{span: 5}" :xs="{span: 6}">
          <div class="guide-title u-f-auto">棋剑乐府</div>
        </el-col>
        <el-col class="u-f-jsb" :xl="{span: 5, pull: 1}" :lg="{span: 9}" :md="{span: 12}" :sm="{span: 15}"
                :xs="{span: 18}">
          <div @click="navTo('index')" class="guide-item u-f-auto">沁园春</div>
          <div @click="navTo('about')" class="guide-item u-f-auto">青玉案</div>
          <div v-if="hasLogin" @click="navTo('admin')" class="guide-item u-f-auto">临江仙</div>
          <div v-if="hasLogin" class="guide-item u-f-auto">
            <el-avatar src="../../../static/imgs/head.jpg"></el-avatar>
          </div>
          <div v-if="!hasLogin" @click="navTo('login')" class="guide-item u-f-auto">如梦令</div>
        </el-col>
      </el-row>
      <template v-if="imgShow">
        <video ref="videoBg" v-if="!isMobile && videoShow" class="bg-video" autoplay muted loop>
          <source class="source-box" src="http://www.jianking.vip/resource/RainDate/night.mp4" type="video/mp4" />
        </video>
        <el-image v-else class="bg-img" fit="cover" src="http://www.jianking.vip/resource/RainDate/night.jpg" lazy></el-image>
      </template>
      <div v-if="sayingShow" class="saying u-f-cer animated flipInX">
        <h1>{{ spring.feature }}</h1>
        <h3 v-if="spring.extract !== '无'">-《{{ spring.extract }}》</h3>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'headGuide',
  props: {
    guideHeight: {
      type: String,
      default: '560px'
    },
    videoShow: {
      type: Boolean,
      default: false
    },
    imgShow: {
      type: Boolean,
      default: true
    },
    sayingShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      hello: 'hello'
    }
  },
  created() {
    this.getAim()
  },
  activated() {
    if (!this.isMobile && this.imgShow && this.videoShow && this.$refs.videoBg.paused) {
      this.$refs.videoBg.play()
    }
  },
  computed: {
    ...mapState(['hasLogin', 'spring', 'isMobile'])
  },
  methods: {
    navTo(url) {
      this.$router.push({name: url})
    },
    async getAim() {
      if (!this.spring.id && this.imgShow && this.sayingShow) {
        try {
          const {code, data} = await this.$request('/api/common/getAim', 'GET')
          if (code === 0) {
            this.$store.commit('setSpring', data)
          }
        } catch (err) {
          console.error(err)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.head {
  position: relative;
  /*height: 500px;*/
  //margin-bottom: 20px;

  .guide {
    position: sticky;
    top: 0;
    z-index: 10;
    background: #cfcfcf;
    opacity: 0.7;

    .guide-title {
      width: 120px;
      height: 60px;
      font-size: 26px;
      color: #000000;
    }

    .guide-item {
      width: 120px;
      height: 60px;
      font-size: 26px;
      font-family: cursive;
      color: #000000;

      &:hover {
        cursor: pointer;
        color: #414141;
      }
    }
  }
  .bg-img {
    margin-top: -60px;
    width: 100%;
    height: 100%;
  }
  .bg-video {
    margin-top: -60px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    .source-box {
      min-width: 100%;
      min-height: 100%;
      height: auto;
      width: auto;
    }
  }

  .saying {
    width: 100%;
    position: absolute;
    bottom: 30%;

    h1 {
      font-size: 36px;
      max-width: 500px;
      color: white;
      text-align: center;
      font-family: cursive;
      margin-bottom: 30px;
    }

    h3 {
      color: white;
      font-family: cursive;
    }
  }
}
</style>
