<template>
  <div id='header'>
      <div class='content_wrapper'>
      	<el-button type="text"   @click="showCgpwdDialog" style='margin-right:20px;'> 修改密码</el-button>
          欢迎您! <span class='username'>{{userName}}</span>
          <i class='el-icon-switch-button' title='退出登录' @click='goOut'></i>
      </div>
      <UpdatePassWord ref="cgpwdDialog" @afterRestore="afterCgpwd"></UpdatePassWord>
  </div>
</template>

<script>
	import UpdatePassWord from "@/components/UpdatePassWord"
  export default {
  	components:{
    UpdatePassWord
  	},
    data(){
      return {
        isCollapse:false,
        afterCgpwd:''
      }
    },
    computed:{
      userName() {
        return sessionStorage.getItem('userName');
      }
    },
    methods:{
    	//显示密码修改弹窗界面
    showCgpwdDialog: function() {
      this.$refs.cgpwdDialog.setCgpwdVisible(true)
    },
        goOut() {
          this.$confirm('确定要退出当前登录吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            sessionStorage.clear();
            this.$router.push('./login')
          })
        }
    }
  }
</script>

<style lang='less'>
  #header {
    height: 50px;
    background: #3c8dbc;
    line-height: 50px;
    padding: 0 30px;
    .content_wrapper {
      text-align: right;
      font-size: 14px;
       color: #333;
      .username {
        font-weight: 600;
      }
      i {
        color: #ed5565;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        margin-left: 5px;
      }
    }
  }
</style>
