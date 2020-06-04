<template>
    <el-dialog
        title="添加时间节点"
        :visible.sync="sync_value"
        width="40%"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <el-form :model="dataForm" ref="dataForm" label-width="80px">
            <el-row class="u-f-cer">
                <el-col :span="18">
                    <el-form-item label="节点标题" prop="title">
                        <el-input v-model="dataForm.title" placeholder="节点标题"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="18">
                    <el-form-item label="简介" prop="subtitle">
                        <el-input v-model="dataForm.subtitle" placeholder="简介"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="18">
                    <el-form-item label="github" prop="github">
                        <el-input v-model="dataForm.github" placeholder="github地址"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="18">
                    <el-form-item label="线上地址" prop="link">
                        <el-input v-model="dataForm.link" placeholder="线上地址"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="18">
                    <el-form-item label="图片" prop="images">
                        <el-upload
                            list-type="picture-card"
                            action="http://www.jianking.vip/image/"
                            :on-change="handleChange"
                            :auto-upload="false"
                            :file-list="fileList"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">关 闭</el-button>
        </span>
    </el-dialog>
</template>

<script>
import propSync from 'vue-propsync'
import { upload } from '@/assets/js'
export default {
    name: 'timeLine',
    mixins: [propSync],
    props: {
        value: {
            type: Boolean,
            default: false,
            isSync: true
        }
    },
    data() {
        return {
            dataForm: {
                title: '',
                subtitle: '',
                github: '',
                link: '',
                images: []
            },
            fileList: [],
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    created() {
    },
    activated() {
    },
    computed: {
    },
    methods: {
        handleChange (file, fileList) {
            console.log('file=>', file)
            console.log('fileList=>',fileList)
        },
        async uploadFile (file) {
            try {
                const { code, data: { url } } = await upload(file)
                if (code === 0) {
                    console.log(url)
                }
            } catch (err) {
                console.error(err)
            }
        },
        handleClose () {
            this.sync_value = false
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
