<!--招聘信息 -->
<template>
  <div class="app-container">

 <!-- <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form> -->
    <!-- <el-row :gutter="10" class="mb8 operation_row">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
    </el-row> -->

    <!-- <el-table v-loading="loading" :data="recruitList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="描述内容" align="center" prop="introduce">

      </el-table-column>




      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
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
      </el-table-column>
    </el-table> -->

    <!-- <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    /> -->

    <!-- 添加或修改招聘信息对话框 -->
    <!-- <el-dialog :title="title" :visible.sync="open" width="1200px"> -->
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">

        <el-form-item label="招聘描述" prop="introduce">
            <Editor v-model="form.introduce" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer" style='text-align: center;'>
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    <!-- </el-dialog> -->
  </div>
</template>

<script>
import { listRecruit,pageRecruit, getRecruit, delRecruit, addRecruit, updateRecruit, exportRecruit } from "@/api/mh/recruit";
import Editor from '@/components/Editor';
export default {
 components: {
 			Editor,
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
      // 招聘信息表格数据
      recruitList: [],
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
    /** 查询招聘信息列表 */
    getList() {
      this.loading = true;
      pageRecruit(this.queryParams).then(response => {
        this.recruitList = response.data.list;
        this.handleUpdate(this.recruitList[0])
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
        introduce: undefined,
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
      this.title = "添加招聘信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getRecruit(id).then(response => {
        this.form = response.data;
                this.imgInit();
        this.open = true;
        this.title = "修改招聘信息";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
        let form = JSON.parse(JSON.stringify(this.form));
          if (form.id != undefined) {
            updateRecruit(form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addRecruit(form).then(response => {
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
      this.$confirm('是否确认删除招聘信息选中的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delRecruit(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    }
  }
};
</script>
