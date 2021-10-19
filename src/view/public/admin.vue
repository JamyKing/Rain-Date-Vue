<template>
    <div class="u-f-col">
        <head-guide guideHeight="60px" :imgShow="false" :sayingShow="false"></head-guide>
        <el-row :gutter="20" class="data-list">
            <el-form :model="filterForm" ref="filterForm" label-width="70px" size="medium" @keyup.enter.native="getDataList()">
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
                <el-col :span="8">
                    <el-button @click="getDataList" size="small" icon="el-icon-search">搜索</el-button>
                    <el-button @click="reset" size="small">重置</el-button>
                    <el-button @click="create" type="primary" size="small" icon="el-icon-edit">写文章</el-button>
                    <el-button @click="timeVisible = true" type="primary" size="small" icon="el-icon-edit">时间轴</el-button>
                    <el-button @click="tagVisible = true" type="primary" size="small" icon="el-icon-edit">分类标签</el-button>
                </el-col>
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
                    <el-table-column prop="category" label="标签" align="center">
                        <template slot-scope="scope" v-if="scope.row.category">
                            <el-tag v-for="tag in scope.row.category" :key="tag.name" :type="tag.type" style="margin: 0 3px;">{{tag.name}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="subtitle" label="简介" align="center"></el-table-column>
                    <el-table-column prop="status" label="状态" align="center">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.state" type="success">正常</el-tag>
                            <el-tag v-else type="danger">停用</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="时间" align="center"></el-table-column>
                    <el-table-column label="操作" align="center" width="300" fixed="right">
                        <template slot-scope="scope">
                            <el-button @click="toEdit(scope.row.id)" type="text" size="small">编辑</el-button>
                            <el-button @click="disFun(scope.row.id, scope.row.state)" type="text" size="small">{{ scope.row.state ? '停用' : '启用' }}</el-button>
                            <el-button @click="delFun(scope.row.id)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24" style="margin: 20px;">
                <el-pagination
                    @size-change="sizeChangeHandle"
                    @current-change="currentChangeHandle"
                    :current-page="pageNo"
                    :page-sizes="[10, 30, 50, 100, 200]"
                    :page-size="pageSize"
                    :total="totalCount"
                    layout="total, sizes, prev, pager, next, jumper">
                </el-pagination>
            </el-col>
        </el-row>
        <tag-house v-if="hasLogin" v-model="tagVisible"></tag-house>
        <time-line v-if="hasLogin" v-model="timeVisible"></time-line>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import headGuide from '@/components/common/head-guide'
import tagHouse from './tagHouse'
import timeLine from './timeLine'
export default {
    name: 'admin',
    components: {
        headGuide,
        tagHouse,
        timeLine
    },
    data() {
        return {
            filterForm: {
                title: '',
                state: null,
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
            pageNo: 1,
            pageSize: 10,
            totalCount: 0,
            dataListLoading: false,
            tagVisible: false,
            timeVisible: false
        }
    },
    created() {
        // this.getDataList()
    },
    activated() {
        this.getDataList()
    },
    computed: {
        ...mapState(['hasLogin', 'category'])
    },
    methods: {
        async getDataList () {
            this.dataListLoading = true
            const { filterForm, pageNo, pageSize } = this
            try {
                const { code, data: { totalCount, listData } } = await this.$request('/api/blog/adminList', 'POST', { pageNo, pageSize, ...filterForm })
                if (code === 0) {
                    this.dataList = listData
                    this.totalCount = totalCount
                }
            } catch (err) {
                console.error(err)
            } finally {
                this.dataListLoading = false
            }
        },
        reset () {
            this.$refs['filterForm'].resetFields()
            this.$nextTick(() => {
                this.getDataList()
            })
        },
        disFun (id, state) {
            this.$confirm(`确认【${state ? '停用' : '启用'}】此文章吗?`, '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
                showClose: false
            }).then(async () => {
                try {
                    const { code } = await this.$request('/api/blog/disable', 'GET', { id: id, state: state ? 0 : 1 })
                    if (code === 0) {
                        this.$message({
                            message: '操作成功！',
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
        toEdit (id) {
            this.$router.push({ name: 'creation', query: { id: id } })
        },
        // 每页数
        sizeChangeHandle (val) {
            this.pageSize = val
            this.pageNo = 1
            this.getDataList()
        },
        // 当前页
        currentChangeHandle (val) {
            this.pageNo = val
            this.getDataList()
        }
    }
}
</script>

<style lang="scss" scoped>
.data-list {
    padding: 0 30px;
    margin: 0!important;
}
</style>
