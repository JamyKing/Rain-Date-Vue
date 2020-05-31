<template>
    <div class="u-f-col">
        <head-guide guideHeight="60px" :imgShow="false"></head-guide>
        <el-form :model="dataForm" ref="dataForm" :rules="rules" label-width="60px" size="medium" style="padding: 0 30px;">
            <el-row :gutter="20">
                <el-col :span="5">
                    <el-form-item label="标题" prop="title">
                        <el-input v-model="dataForm.title" placeholder="文章标题" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="状态" prop="state">
                        <el-select v-model="dataForm.state" placeholder="文章状态">
                            <el-option
                                v-for="item in statusOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="说明" prop="subtitle">
                        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="dataForm.subtitle"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                    <el-button @click="submit" type="primary" size="small">提交</el-button>
                </el-col>
            </el-row>
            <el-row>
                <mavon-editor
                    ref="md"
                    v-model="dataForm.content"
                    @change="change"
                    @imgAdd="imgAdd"
                    @imgDel="imgDel"
                    style="min-height: 600px">
                </mavon-editor>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import headGuide from '@/components/common/head-guide'
import { mavonEditor } from 'mavon-editor'
import { upload } from '@/assets/js'
import 'mavon-editor/dist/css/index.css'
export default {
    name: 'creation',
    components: {
        headGuide,
        mavonEditor
    },
    data() {
        return {
            id: null,
            dataForm: {
                title: '',
                state: 1,
                subtitle: '',
                content: '',
                htmlRender:'',
            },
            statusOptions: [{
                value: 1,
                label: '正常'
            }, {
                value: 0,
                label: '停用'
            }],
            rules: {
                title: [
                    { required: true, message: '请输入文章标题', trigger: 'blur' }
                ],
                subtitle: [
                    { required: true, message: '请输入文章说明', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '文章内容不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        this.id = this.$route.query.id
        if (this.id) {
            this.editDetail(this.id)
        }
    },
    activated() {
    },
    computed: {},
    watch: {},
    methods: {
        async editDetail (id) {
            try {
                const { code, data } = await this.$request('/api/blog/edit', 'GET', { id })
                if (code === 0) {
                    this.dataForm = { ...data }
                }
            } catch (err) {
                console.error(err)
            }
        },
        // 所有操作都会被解析重新渲染
        change (value, render) {
            // render 为 markdown 解析后的结果[html]
            this.dataForm.htmlRender = render
        },
        // 绑定@imgAdd event
        async imgAdd (pos, $file) {
            try {
                const { code, data: { url } } = await upload($file)
                if (code === 0) {
                    this.$refs.md.$img2Url(pos, url)
                } else {
                    this.$message.error('上传失败！')
                }
            } catch (err) {
                console.error(err)
            }
        },
        imgDel (filename) {
            console.log(filename)
        },
        // 提交
        submit () {
            this.$refs['dataForm'].validate(async (valid) => {
                if (valid) {
                    const { id, dataForm } = this
                    try {
                        const { code } = await this.$request(`/api/blog/${id ? 'update' : 'new'}`, 'POST', { id, ...dataForm })
                        if (code === 0) {
                            this.$message({
                                message: `${id ? '更新' : '创建'}成功！`,
                                type: 'success',
                                duration: '1500',
                                onClose: () => {
                                    this.$router.push({ name: 'admin' })
                                }
                            })
                        } else {
                            this.$message.error('出错了！')
                        }
                    } catch (err) {
                        this.$message.error(err)
                    }
                } else {
                    this.$message({
                        message: '请正确输入信息！',
                        type: 'warning'
                    })
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
