<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm">
      <h3 class="title">象理数据-为数据而生</h3>
      <el-form-item prop="username">
        <el-input name="username" type="text" v-model="loginForm.username">
          <template slot="prepend">用户名</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input name="password" :type="pwdType" v-model="loginForm.password">
          <template slot="prepend">密码</template>
          <el-button slot="append" icon="el-icon-view" @click="showPwd"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" class="login-submit" @click.native.prevent="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const validateUsername = (rule, value, callback) => {
  if (!value.trim()) {
    callback(new Error('请输入正确的用户名'))
  } else {
    callback()
  }
}
const validatePass = (rule, value, callback) => {
  if (value.trim().length < 6) {
    callback(new Error('密码不能小于6位'))
  } else {
    callback()
  }
}
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Login',
      pwdType:'password',
      loading: false,
      loginForm:{
        username:'admin',
        password:'12345678'
      },
      loginRules:{
        username:[
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password:[
          { required: true, trigger: 'blur', validator: validatePass }
        ]
      }
    }
  },
  mounted() {
      console.log(this.$store.state.common.token)
  },
  methods:{
      changeLogin(){
          this.$store.commit('common/CHANGE_LOGIN');
          this.$router.push({
            path:'/'
          })
      },
      showPwd(){
        if (this.pwdType == 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin(){
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('common/LOGIN',this.loginForm).then((res) => {
              console.log(res)
              this.loading = false
              this.$router.push({
                path: '/'
              })
            }).catch((err) => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss">
  $bg: #fff;
  .login-container{
    background: $bg;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;

    h3.title{
      color: #495057;
    }

    .el-input{
      border: 1px solid #adb5bd;

      .el-input-group__prepend{
        border: 0;
        width: 40px;
      }
      .el-input-group__append{
        border: 0;
        padding: 0 10px;
      }
      input{
        border: 0;
      }
    }

    .login-submit{
      width: 50%;

      &:hover,&focus{
        color: #adb5bd;
        border-color: #868e96;
        background-color: #ecf5ff;
      }
      &:active{
        color: #868e96;
        border-color: #495057;
        background-color: #ecf5ff;
      }
    }
    

    .login-form{
      width: 300px;
      height: 240px;
      margin: 0 auto;
      text-align: center;
      background: #fff;
      padding: 30px;
      border-radius: 3px;
      box-shadow: 0 0 1px #868e96;
    }
  }
</style>
