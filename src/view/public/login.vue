<template>
    <div class="login">
        <head-guide guideHeight="100%" :sayingShow="false"></head-guide>
        <el-row type="flex" justify="center" class="login-row">
            <el-col class="login-form animated fadeInDownBig" :xl="{span: 8}" :lg="{span: 11}" :md="{span: 14}" :sm="{span: 18}" :xs="{span: 22}">
                <el-form :model="loginForm" :rules="rules" ref="loginForm" size="medium" label-width="100px" @keyup.enter.native="toLogin">
                    <el-row>
                        <el-col :span="24" class="u-f-auto">
                            <el-avatar class="head" src="../../../static/imgs/head.jpg"></el-avatar>
                        </el-col>
                        <el-col :span="20">
                            <el-form-item label="用户名" prop="username">
                                <el-input v-model="loginForm.username" clearable placeholder="请输入登录用户名"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="20">
                            <el-form-item label="密码" prop="password">
                                <el-input v-model="loginForm.password" show-password clearable placeholder="请输入登录密码"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" class="u-f-auto">
                            <byui-verify
                                ref="verifyImg"
                                :w="350"
                                :slider-text="text"
                                :h="175"
                                @success="handleSuccess"
                                @fail="handleError">
                            </byui-verify>
                        </el-col>
                        <el-col :span="24" class="u-f-auto">
                            <el-button @click="toLogin" class="login-btn" type="success" plain round>登 录</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import ByuiVerify from 'zx-verify'
import headGuide from '@/components/common/head-guide'
export default {
    name: 'login',
    components: {
        ByuiVerify,
        headGuide
    },
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            },
            text: '向右滑动',
            verifyCode: false,
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    created() {
    },
    activated() {
        this.loginForm = {
            username: '',
            password: ''
        }
        this.verifyCode = false
    },
    computed: {},
    watch: {},
    methods: {
        handleSuccess() {
            this.verifyCode = true
            this.$message({
                message: '图形校验成功！',
                type: 'success',
                duration: '1000'
            })
        },
        handleError() {
            this.verifyCode = false
            this.$message({
                message: '图形校验失败！',
                type: 'error',
                duration: '1000',
                onClose: () => {
                    this.$refs.verifyImg.reset()
                }
            })
        },
        toLogin () {
            this.$refs['loginForm'].validate(async (valid) => {
                if (valid && this.verifyCode) {
                    const {loginForm} = this
                    try {
                        const { code, data } = await this.$request('/api/user/login', 'POST', { ...loginForm })
                        if (code === 0) {
                            this.$store.commit('login', data.username)
                            this.$message({
                                message: '登录成功！',
                                type: 'success',
                                duration: '2000',
                                onClose: () => {
                                    this.$router.push({ name: 'admin' })
                                }
                            })
                        } else {
                            this.$message.error('用户名或密码错误！')
                        }
                    } catch (err) {
                        this.$message.error(err)
                    }
                } else {
                    this.$message({
                        message: '请正确输入登录信息和通过图形验证！',
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
.login {
    .login-row {
        margin: 0;
        position: absolute;
        top: 24%;
        width: 100%;
    }
    .login-form {
        background: #e2e2e2;
        border-radius: 10px;
    }
}
.head {
    width: 80px;
    height: 80px;
    margin: 30px 0;
}
.login-btn {
    margin: 30px 0;
}
</style>
