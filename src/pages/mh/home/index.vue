<!--首页信息 -->
<template>
  <div class="app-container">

  <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px" class='publicFprm'>

      <el-form-item label="描述搜索" prop="contentOne">
        <el-input
          v-model="queryParams.contentOne"
          placeholder="请输入描述内容"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8 operation_row">
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
    </el-row>

    <el-table v-loading="loading" :data="homeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />

      <el-table-column label="描述" align="center" prop="contentOne" />

      <el-table-column label="标题" align="center" prop="contentTwo" />
      <el-table-column label="图片" align="center">
        <template slot-scope="scope">
            <el-image
                style="width: 60px; height: 60px"
                :src="$baseUrl + scope.row.img"
                :preview-src-list="[$baseUrl + scope.row.img]">
            </el-image>
        </template>
      </el-table-column>

      <el-table-column label="排序" align="center" prop="sort" />




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
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改首页信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">

    		<el-form-item label="图片" prop="img">
					<el-upload :action="$uploadUrl"
					 list-type="picture-card"
				   :on-change="handleEditChange"
				   :class="{hide:hideUploadEdit}"
					 :on-preview="imgHandlePictureCardPreview"
					 :headers="headers" :on-success="imgOnSuccess" :file-list="this.imgDatas" :on-remove="imgHandleRemove">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="imgDialogVisible">
						<img width="100%" :src="imgDialogImageUrl" alt="">
					</el-dialog>
				</el-form-item>

        <el-form-item label="描述" prop="contentOne">
          <el-input v-model="form.contentOne" placeholder="回车可提行显示" type="textarea" />
        </el-form-item>


        <el-form-item label="标题" prop="contentTwo">
          <el-input v-model="form.contentTwo"  placeholder="请输入标题" />
        </el-form-item>


		<el-form-item label="排序">
					<el-input-number  v-model="form.sort" :precision="0" :step="1" controls-position="right"></el-input-number>
				</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listHome,pageHome, getHome, delHome, addHome, updateHome, exportHome } from "@/api/mh/home";
export default {
 components: {
 	  },
  data() {
    return {
      hideUploadEdit:false,
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
      // 首页信息表格数据
      homeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      headers: {
		token: this.$getToken()
		},

	imgDialogImageUrl: '',
	imgDialogVisible: false,
	imgDatas: [],






      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        contentOne: undefined,
        contentTwo: undefined,
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
    handleEditChange(file, fileList) {
      let vm = this
      vm.hideUploadEdit = fileList.length >= 1
    },
    /** 查询首页信息列表 */
    getList() {
      this.loading = true;
      pageHome(this.queryParams).then(response => {
        this.homeList = response.data.list;
        if(this.homeList.length) {
          this.hideUploadEdit = true;
        }
        this.total = response.data.total;
        this.loading = false;
      });
    },
    	imgHandleRemove(file, fileList) {
        let vm = this
        vm.hideUploadEdit = fileList.length >= 1
				if(file) {
					let url1 = "";
					 if(file.response) {//如果是新上传的
					 		url1 = file.response.fileName;//找出当前删除的url
					}else if(file.url && file.url.indexOf(this.$baseUrl) > -1) { //如果是已有的图片
						 url1 = file.url.replace(this.$baseUrl, "");//找出当前删除的url
					}

					if(url1) {
						this.form.img = this.form.img.replace(url1, "");
						this.form.img = this.form.img.replace(",,", ",");
						if (this.form.img.substr(0,1)==',') this.form.img=this.form.img.substr(1);
						var reg=/,$/gi;
  					this.form.img=this.form.img.replace(reg,"");
					}
				}
			},
			imgHandlePictureCardPreview(file) {
				this.imgDialogImageUrl = file.url;
				this.imgDialogVisible = true;
			},
			imgOnSuccess(response, file, fileList) {
				let imgs = [];
				if(this.form.img) {
					imgs = this.form.img.split(",")
					console.log(imgs)
				}
				if(response&&response.fileName){
					let imgData = response.fileName
					imgs.push(imgData);
				}
				this.form.img = imgs.toString();
			},





	imgInit() {
		this.imgDatas = this.$imgUrlchange(this.form.img)
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
        img: undefined,
        contentOne: undefined,
        contentTwo: undefined,
        sort: undefined,
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
      this.hideUploadEdit = false;
      this.reset();
      this.open = true;
      this.title = "添加首页信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getHome(id).then(response => {
        this.form = response.data;
                this.imgInit();
        this.open = true;
        this.title = "修改首页信息";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
        let form = JSON.parse(JSON.stringify(this.form));
          if (form.id != undefined) {
            updateHome(form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addHome(form).then(response => {
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
      this.$confirm('是否确认删除首页信息选中的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delHome(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    }
  }
};
</script>
