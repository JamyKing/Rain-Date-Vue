<template>
    <div class="u-f-col">
        <head-guide guideHeight="60px" :imgShow="false"></head-guide>
        <el-row :gutter="20" class="data-list">
            <el-form :model="filterForm" ref="filterForm" label-width="70px" size="medium" @keyup.enter.native="getDataList()">
                <el-row :gutter="20">
                    <el-col :span="5">
                        <el-form-item label="标题" prop="title">
                            <el-input v-model="filterForm.title" placeholder="文章标题" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="状态" prop="state">
                            <el-select v-model="filterForm.state" placeholder="文章状态">
                                <el-option
                                    v-for="item in statusOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="时间" prop="createTime">
                            <el-date-picker
                                v-model="filterForm.createTime"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-button @click="getDataList" type="primary" size="small" icon="el-icon-search">搜索</el-button>
                        <el-button @click="reset" size="small">重置</el-button>
                        <el-button @click="create" size="small">写文章</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-row>
        <el-row :gutter="20" class="data-list">
            <el-col :span="24">
                <el-table
                    border
                    ref="table"
                    :data="dataList"
                    highlight-current-row
                    v-loading="dataListLoading"
                    style="width: 100%;">
                    <span slot="empty">-暂无数据-</span>
                    <el-table-column prop="title" label="标题" align="center"></el-table-column>
                    <el-table-column prop="status" label="状态" align="center">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.state" type="success">正常</el-tag>
                            <el-tag v-else type="danger">停用</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="时间" align="center"></el-table-column>
                    <el-table-column label="操作" align="center" width="300" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="text" size="small">编辑</el-button>
                            <el-button type="text" size="small">{{ scope.row.state ? '停用' : '启用' }}</el-button>
                            <el-button @click="delFun(scope.row.id)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24" style="margin-top: 20px;">
                <el-pagination
                    @size-change="sizeChangeHandle"
                    @current-change="currentChangeHandle"
                    :current-page="pageIndex"
                    :page-sizes="[10, 30, 50, 100, 200]"
                    :page-size="pageSize"
                    :total="totalPage"
                    layout="total, sizes, prev, pager, next, jumper">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import headGuide from '@/components/common/head-guide'
export default {
    name: 'admin',
    components: {
        headGuide
    },
    data() {
        return {
            filterForm: {
                title: '',
                state: 1,
                createTime: ''
            },
            statusOptions: [{
                value: 1,
                label: '正常'
            }, {
                value: 0,
                label: '停用'
            }],
            dataList: [],
            pageIndex: 1,
            pageSize: 10,
            totalPage: 0,
            dataListLoading: false
        }
    },
    created() {
        this.getDataList()
    },
    activated() {
    },
    computed: {},
    watch: {},
    methods: {
        async getDataList () {
            this.dataListLoading = true
            const { filterForm } = this
            try {
                const { code, data } = await this.$request('/api/blog/adminList', 'POST', { ...filterForm })
                if (code === 0) {
                    this.dataList = data
                }
            } catch (err) {
                console.error(err)
            } finally {
                this.dataListLoading = false
            }
        },
        reset () {
            this.$refs['filterForm'].resetFields()
            this.filterForm = {}
            this.$nextTick(() => {
                this.getDataList()
            })
        },
        delFun (id) {
            this.$confirm(`确认删除此文章吗?`, '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
                showClose: false
            }).then(async () => {
                try {
                    const { code } = await this.$request('/api/blog/del', 'GET', { id: id })
                    if (code === 0) {
                        this.$message({
                            message: '删除成功！',
                            type: 'success',
                            duration: 1500,
                            onClose: () => {
                                this.getDataList()
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
        create () {
            this.$router.push({ name: 'creation' })
        },
        // 每页数
        sizeChangeHandle (val) {
            this.pageSize = val
            this.pageIndex = 1
            this.getDataList()
        },
        // 当前页
        currentChangeHandle (val) {
            this.pageIndex = val
            this.getDataList()
        }
    }
}
</script>

<style lang="scss" scoped>
.data-list {
    padding: 0 30px;
}
</style>
