<template>
  <div class="login_container">
    <div class="login_box">
      <!-- logo区域 -->
      <div class="avater_box">
        <img src="~@/assets/img/logo.jpeg" alt />
      </div>
      <!-- 表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="login_form"
        :rules="loginFormRules"
        class="login_form"
        label-width="0"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="login_form.username" placeholder="用户名" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="login_form.password"
            type="password"
            placeholder="密码"
            prefix-icon="el-icon-unlock"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      // 登录表单数据绑定对象
      login_form: {
        username: 'admin',
        password: '123456'
      },
      // 表单验证
      loginFormRules: {
        // 验证用户名
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // 验证密码
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.login_form)
        if (res.meta.status !== 200) return this.$message.error('登录失败！')
        this.$message.success('登录成功')
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;

  .avater_box {
    position: relative;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 130px;
    height: 130px;
    border-radius: 50%;
    box-shadow: 0 0 10px #ddd;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>