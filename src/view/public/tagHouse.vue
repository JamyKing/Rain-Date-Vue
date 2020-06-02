<template>
    <el-dialog
        title="分类标签"
        :visible.sync="sync_value"
        width="40%"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <el-card class="box-card">
            <el-tag
                v-for="tag in category"
                :key="tag.id"
                :type="tag.type"
                closable
                effect="plain"
                class="tags animated fadeInDown"
                @close="tagClose(tag)">
                {{tag.name}}
            </el-tag>
            <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="inputConfirm"
                @blur="inputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag animated fadeInDown" size="small" @click="showInput">+ 新标签</el-button>
        </el-card>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">关 闭</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import propSync from 'vue-propsync'
import { randomNum } from "../../assets/js"
export default {
    name: 'tagHouse',
    mixins: [propSync],
    props: {
        value: {
            type: Boolean,
            default: false,
            isSync: true // 需要开启双向绑定的一定要写这句话，默认不会将所有的 prop 开启双向绑定
        }
    },
    data() {
        return {
            isUpdate: false,
            inputVisible: false,
            inputValue: '',
            options: [
                {
                    label: 1,
                    value: ''
                },
                {
                    label: 2,
                    value: 'success'
                },
                {
                    label: 3,
                    value: 'info'
                },
                {
                    label: 4,
                    value: 'warning'
                },
                {
                    label: 5,
                    value: 'danger'
                }
            ]
        }
    },
    created() {
    },
    activated() {
    },
    computed: {
        ...mapState(['category'])
    },
    watch: {
        'sync_value' (val) {
            if (val) {
                this.isUpdate = false
            }
        }
    },
    methods: {
        tagClose (tag) {
            this.$confirm(`确认删除【${tag.name}】标签吗?`, '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
                showClose: false
            }).then(async () => {
                try {
                    const { code } = await this.$request('/api/category/del', 'GET', { id: tag.id })
                    if (code === 0) {
                        this.isUpdate = true
                        this.$message({
                            message: '删除成功！',
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                this.category.splice(this.category.indexOf(tag), 1)
                            }
                        })
                    }
                } catch (err) {
                    this.$message.error(err)
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                })
            })
        },
        showInput() {
            this.inputVisible = true
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus()
            })
        },
        async inputConfirm() {
            let inputValue = this.inputValue
            if (inputValue) {
                let num = randomNum(1, 5)
                const subForm = {
                    id: null,
                    name: inputValue,
                    type: ''
                }
                for (let item of this.options) {
                    if (item.label === num) {
                        subForm.type = item.value
                        break
                    }
                }
                try {
                    const { code, data } = await this.$request('/api/category/add', 'POST', { ...subForm })
                    if (code === 0) {
                        subForm.id = data.id
                        this.category.push(subForm)
                        this.isUpdate = true
                    }
                } catch (err) {
                    console.error(err)
                } finally {
                    this.inputVisible = false
                    this.inputValue = ''
                }
            }
        },
        handleClose () {
            if (this.isUpdate) {
                this.$store.commit('setCategory', this.category)
                console.log('success')
            }
            this.sync_value = false
        }
    }
}
</script>

<style lang="scss" scoped>
.box-card {
    min-height: 360px;
    .tags {
        margin: 5px;
    }
    .button-new-tag {
        margin: 5px 10px;
        height: 32px;
        line-height: 32px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin: 5px 10px;
        vertical-align: bottom;
    }
}
</style>
