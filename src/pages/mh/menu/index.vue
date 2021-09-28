<!--网站菜单信息 -->
<template>
  <div class="app-container">

  <!-- <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form> -->
    <el-row :gutter="10" class="mb8 ">
     <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col> -->
     <!-- <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col> -->
     <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col> -->
    </el-row>
<!-- @selection-change="handleSelectionChange" -->
    <el-table v-loading="loading" :data="menuList" >
     <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="菜单名称" align="center" prop="name" />

      <el-table-column label="菜单英文名称" align="center" prop="englishName" />

      <el-table-column label="菜单排序" align="center" prop="sort" />

       <el-table-column label="是否启用" align="center" prop="isEnable" >
        <template slot-scope="scope">
          <span :style='{ color:scope.row.isEnable?"green":"rgb(250, 100, 0)" }'>{{scope.row.isEnable?"是":"否"}}</span>
      </template>
      </el-table-column>

     <!-- <el-table-column label="菜单类型" align="center" prop="webType" /> -->

      <!-- <el-table-column label="菜单跳转连接  webType为0时 有用" align="center" prop="url" /> -->




      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
         <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改网站菜单信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">

        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入菜单名称" size='small' disabled />
        </el-form-item>


        <el-form-item label="英文名称" prop="englishName">
          <el-input v-model="form.englishName" placeholder="请输入菜单英文名称" size='small' disabled/>
        </el-form-item>


		<el-form-item label="菜单排序">
					<el-input-number  v-model="form.sort" :precision="0" :step="1" controls-position="right" size='small'></el-input-number>
				</el-form-item>

        <el-form-item label="是否启用" prop="isEnable">
       <el-switch
		  v-model="form.isEnable">
		</el-switch>
      </el-form-item>

	<!-- 	<el-form-item label="菜单类型">
					<el-input-number  v-model="form.webType" :precision="0" :step="1" controls-position="right"></el-input-number>
				</el-form-item> -->

      <!--  <el-form-item label="菜单跳转连接  webType为0时 有用" prop="url">
          <el-input v-model="form.url" placeholder="请输入菜单跳转连接  webType为0时 有用" />
        </el-form-item> -->

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm" size='small'>确 定</el-button>
        <el-button @click="cancel" size='small'>取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listMenu,pageMenu, getMenu, delMenu, addMenu, updateMenu, exportMenu } from "@/api/mh/menu";
export default {
 components: {
 	  },
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
      // 网站菜单信息表格数据
      menuList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      headers: {
		token: this.$getToken()
		},









      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
  this.reset();
    this.getList();
  },
  methods: {
    /** 查询网站菜单信息列表 */
    getList() {
      this.loading = true;
      pageMenu(this.queryParams).then(response => {
        this.menuList = response.data.list;
        this.total = response.data.total;
        this.loading = false;
      });
    },
	imgInit() {
	},
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
      		id:'',
        name: undefined,
        englishName: undefined,
        sort: undefined,
        isEnable: undefined,
        webType: undefined,
        url: undefined,
        delFlag: undefined,
        createTime: undefined,
        updateTime: undefined
      };
      this.resetForm("form");
      this.imgInit();
    },
    /** 搜索按钮操作 */
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
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加网站菜单信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMenu(id).then(response => {
        this.form = response.data;
                this.imgInit();
        this.open = true;
        this.title = "修改网站菜单信息";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
        let form = JSON.parse(JSON.stringify(this.form));
          if (form.id != undefined) {
            updateMenu(form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addMenu(form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除网站菜单信息选中的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delMenu(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    }
  }
};
</script>
