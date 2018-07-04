<template>
    <div class="main-top clearfix">
        <div class="logo fl">
            <img class="logo-img" :src="logo_img" alt="象理数据，为数据而生">
        </div>
        <div class="options fr">
            <el-dropdown split-button>
            你好: {{username}}
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    export default {
        name:'mainTop',
        props:{
            username:{
                type:String,
                required:true
            }
        },
        data(){
            return {
                logo_img:require('@/assets/main-top/logo-white.png')
            }
        },
        methods:{
            handleLogout(){
                console.log('click me')
                this.$store.dispatch('common/LOGINOUT').then((res) => {
                    console.log(res);
                    this.$router.push({
                        path:'/login'
                    })
                }).catch(err => {
                    console.log(err);
                })
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .main-top{
        height: 50px;
        background: #adb5bd;
        padding: 0 5px;

        .logo-img{
            display: inline-block;
            height: 40px;
            margin-top: 5px;
            vertical-align: middle;
        }

        .options{
            height: 100%;
            
            .el-dropdown{
                height: 40px;
                margin-top: 4px;
            }
        }
    }
</style>
