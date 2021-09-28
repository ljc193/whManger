<template>
    <!-- 修改密码界面 -->
    <el-dialog title="修改密码" width="40%" :visible.sync="cgpwdVisible" :close-on-click-modal="false" :modal-append-to-body='false'>
        <el-form :model="dataForm" label-width="100px" :rules="dataFormRules" ref="dataForm" :size="size"
            label-position="right">
            <el-form-item label="旧密码" prop="oldPassWord">
                <el-input v-model="dataForm.oldPassWord" type="password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="passWord">
                <el-input v-model="dataForm.passWord" type="password" auto-complete="off"></el-input>
            </el-form-item>
             <el-form-item label="重复新密码" prop="rePassWord">
                <el-input v-model="dataForm.rePassWord" type="password" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="margin-top: 5px;">
            <el-button  @click.native="cgpwdVisible = false">取消</el-button>
            <el-button  type="primary" @click.native="submitForm" :loading="editLoading">确认修改</el-button>
        </div>
    </el-dialog>
</template>

<script>
import axios from 'axios';
import { updatePassWord}from "@/api/sys/user";
export default {
  data() {
    return {
      size: 'small',
            cgpwdVisible: false, // 编辑界面是否显示
      editLoading: false,   //载入图标
      //初始化数据
      dataForm: {
                oldPassWord: '',
                passWord: '',
                rePassWord:''
      },
      //设置属性
      dataFormRules: {
                oldPassWord: [
                    { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
                passWord: [
                    { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
           rePassWord: [
                    { required: true, message: '请再次输入新密码', trigger: 'blur' }
        ]
      },
      //获取全局url
      baseUrl: this.$baseUrl
    }
  },
  methods: {
  　// 设置可见性
    setCgpwdVisible: function (cgpwdVisible) {
      this.cgpwdVisible = cgpwdVisible
    },

      // 提交请求
    　submitForm: function () {
      //this.$refs.XXX 获取ref绑定的节点
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            let params = Object.assign({}, this.dataForm)
           updatePassWord(params).then(res => {
	         this.editLoading = true
              if(res.code == 200) {
                this.$message({ message:  res.msg, type: 'success' })
                this.cgpwdVisible = false       //隐藏该窗口
              }
              this.editLoading = false
              this.$refs['dataForm'].resetFields()    //重置表单

	        }
	      );
           
          })
        }
      })
     }
  },
//mounted： 在这发起后端请求，拿回数据，配合路由钩子做一些事情  （dom渲染完成 组件挂载完成 ）
  mounted() {
        
    }
}
</script>

<style scoped>

</style>