<template>
  <div class="home">
    <main-top :username="username"></main-top>
    <h1>{{ msg }}</h1>
    <h2>{{ msgs }}</h2>

    <el-button @click="getUser">request</el-button>
  </div>
</template>

<script>
import MainTop from '@/components/MainTop'
import Cookies from 'js-cookie'
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Home',
      username:Cookies.get('username')
    }
  },
  computed:{
    msgs(){
      return '123'
    }
  },
  components:{
    MainTop
  },
  methods:{
    getUser(){
      this.$http({
        url:'/sys/user/list',
        method:'get',
        params:''
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
