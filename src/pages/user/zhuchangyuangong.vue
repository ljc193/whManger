<!--猪场员工管理-->
<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="pushList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />

      <el-table-column label="客户名称" align="center" prop="name" />

      <el-table-column label="登录名(电话号码)" align="center" prop="loginName" />

  <el-table-column label="最后登陆时间" align="center" prop="loginDate" />

  <el-table-column label="最后登陆IP" align="center" prop="loginIp" />

<el-table-column label="微信名称" align="center" prop="wechatUser.nickName" />
<el-table-column label="性别" align="center" prop="wechatUser.gender" />
<el-table-column label="语言" align="center" prop="wechatUser.language" />
<el-table-column label="城市" align="center" prop="wechatUser.city" />
<el-table-column label="省份" align="center" prop="wechatUser.province" />
<el-table-column label="国家" align="center" prop="wechatUser.country" />
<el-table-column label="头像" align="center" prop="wechatUser.avatarUrl" >
	<template slot-scope="scope">
		<img src="wechatUser.avatarUrl" />
	</template>
</el-table-column>


      <!--<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>-->
    </el-table>
   
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改推送表对话框 -->
   
  </div>
</template>

<script>
import { pageUser } from "@/api/sys/user";
export default {
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 推送表表格数据
      pushList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        platform: "3",//获取客户列表
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询推送表列表 */
    getList() {
      this.loading = true;
      pageUser(this.queryParams).then(response => {
        this.pushList = response.data.list;
        this.total = response.data.total;
        this.loading = false;
      });
    },

    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除推送表选中的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delPush(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    }
  }
};
</script>
