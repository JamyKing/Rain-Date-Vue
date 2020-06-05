<template>
    <el-dialog
        title="添加时间节点"
        :visible.sync="sync_value"
        width="45%"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <el-form :model="dataForm" ref="dataForm" :rules="rules" label-width="80px" size="medium">
            <el-row class="u-f-cer">
                <el-col :span="18">
                    <el-form-item label="节点标题" prop="title">
                        <el-input v-model="dataForm.title" placeholder="节点标题"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="18">
                    <el-form-item label="简介" prop="subtitle">
                        <el-input v-model="dataForm.subtitle" type="textarea" :rows="3" placeholder="简介"></el-input>
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
                    <el-form-item label="完成时间" prop="completeTime">
                        <el-date-picker
                            v-model="dataForm.completeTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择时间">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="18">
                    <el-form-item label="图片" prop="images">
                        <el-upload
                            list-type="picture-card"
                            action="/api/common/upload"
                            :on-remove="handleRemove"
                            :before-upload="beforeUploadHandle"
                            :on-success="successHandle">
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
            <el-button @click="subForm" type="primary">提 交</el-button>
        </span>
    </el-dialog>
</template>

<script>
import propSync from 'vue-propsync'
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
                completeTime: '',
                images: []
            },
            fileList: [],
            dialogImageUrl: '',
            dialogVisible: false,
            rules: {
                title: [
                    { required: true, message: '请输入节点标题', trigger: 'blur' }
                ],
                subtitle: [
                    { required: true, message: '请输入简介说明', trigger: 'blur' }
                ],
                completeTime: [
                    { required: true, message: '请输入完成时间', trigger: 'blur' }
                ]
            }
        }
    },
    created() {
    },
    activated() {
    },
    computed: {
    },
    methods: {
        async handleRemove (file, fileList) {
            let name = file.response.data.url
            let imgName = name.split('images/')[1]
            try {
                const { code } = await this.$request('/api/common/delFile', 'POST', { imgName })
                if (code === 0) {
                    this.fileList = fileList
                    this.$message({
                        message: '删除成功！',
                        type: 'success',
                        duration: 1000
                    })
                }
            } catch (err) {
                console.error(err)
            }
        },
        // 上传之前
        beforeUploadHandle (file) {
            if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
                this.$message.error('只支持jpg、png、gif格式的图片！')
                return false
            }
        },
        // 上传成功
        successHandle (response, file, fileList) {
            if (response && response.code === 0) {
                this.fileList = fileList
                this.$message({
                    message: '上传成功',
                    type: 'success'
                })
            } else {
                this.$message.error(response.msg)
            }
        },
        subForm () {
            this.$refs['dataForm'].validate(async (valid) => {
                if (valid) {
                    const { dataForm, fileList } = this
                    if (fileList.length > 0) {
                        for (let item of fileList) {
                            dataForm.images.push(item.response.data.url)
                        }
                    }
                    try {
                        const { code } = await this.$request('/api/timeLine/add', 'POST', { ...dataForm })
                        if (code === 0) {
                            this.$message({
                                message: '创建成功！',
                                type: 'success',
                                duration: '1000',
                                onClose: () => {
                                    this.handleClose()
                                }
                            })
                        }
                    } catch (err) {
                        console.error(err)
                    }
                } else {
                    this.$message({
                        message: '请正确输入信息！',
                        type: 'warning'
                    })
                    return false
                }
            })
        },
        handleClose () {
            this.$refs['dataForm'].resetFields()
            this.sync_value = false
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
