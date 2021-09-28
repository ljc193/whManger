<template>
	<div class= "login_wrapper">
    <div id='login'>
    	<el-form>
        <h3 style = "font-weight: 600;color: #666;">吾和网站后台系统</h3>
    		<el-form-item label='用户名'>
    			<el-input v-model="param.userName" placeholder="请输入用户名"></el-input>
    		</el-form-item>
    		<el-form-item label='密码'>
    			<el-input type="password" v-model="param.passWord" placeholder="请输入用户密码"></el-input>
    		</el-form-item>
    		<div>
    			<el-button type='primary' size='small' class='buttons' @click='handleLogin'>登录</el-button>
    		</div>
    	</el-form>
    </div>
    <div class = "login_bg">
        <img src="/static/img/wh_loginBg.jpg" alt="" class = "login_bg-img">
    </div>
  </div>
</template>

<script>
	import { login } from "@/api/login";
	import { setToken } from '@/utils/auth'
	export default {
		data() {
			return {
				param: {
					userName: "",
					passWord: ""
				}
			}
		},
		methods: {
			handleLogin() {
//    sessionStorage.setItem('token',"666")
//      this.$router.push('./home')
//      return
        return login(this.param).then(res => {
          if(res.code == 200) {
            setToken(res.token);
            sessionStorage.setItem('userName',this.param.userName)
            this.$router.push('./home')
          }

				});
			}
		}
	}
</script>

<style lang='less'>
  .login_wrapper {
    idth: 100%;
    height: 100%;
  }
  .login_bg {
    width: 100%;
    height: 100%;
    &-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
       user-select: none;
    }
  }
	#login {
		width: 300px;
		height: 300px;
    background: #fff;
		border-radius: 15px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
		top: 50%;
		left: 50%;
		position: absolute;
		padding: 30px;
		transform: translate(-50%, -50%);
		text-align: center;
		.buttons {
			width: 160px;
		}
	}
</style>
