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
import 'mavon-editor/dist/css/index.css'
export default {
    name: 'creation',
    components: {
        headGuide,
        mavonEditor
    },
    data() {
        return {
            dataForm: {
                title: '',
                state: 1,
                subtitle: '',
                content:'',
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
    },
    activated() {
    },
    computed: {},
    watch: {},
    methods: {
        // 所有操作都会被解析重新渲染
        change (value, render) {
            // render 为 markdown 解析后的结果[html]
            this.dataForm.htmlRender = render
        },
        // 绑定@imgAdd event
        imgAdd (pos, $file) {
            // 第一步.将图片上传到服务器.
            const formdata = new FormData()
            formdata.append('image', $file)
            axios({
                url: 'server url',
                method: 'post',
                data: formdata,
                headers: { 'Content-Type': 'multipart/form-data' },
            }).then((url) => {
                // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                /**
                 * $vm 指为mavonEditor实例，可以通过如下两种方式获取
                 * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
                 * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
                 */
                this.$refs.md.$img2Url(pos, url)
            })
        },
        imgDel (filename) {
            console.log(filename)
        },
        // 提交
        submit () {
            console.log(this.dataForm)
            this.$refs['dataForm'].validate(async (valid) => {
                if (valid) {
                    const { dataForm } = this
                    try {
                        const { code } = await this.$request('/api/blog/new', 'POST', { ...dataForm })
                        if (code === 0) {
                            this.$message({
                                message: '创建成功！',
                                type: 'success',
                                duration: '2000',
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
