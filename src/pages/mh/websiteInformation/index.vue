<!--网站基础信息 -->
<template>
  <div class="app-container" >

<!--  <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px" class='publicFprm'>

      <el-form-item label="官网名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入官网名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
         <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form> -->
   <!-- <el-row :gutter="10" class="mb8 operation_row" >
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

   <!-- <el-table v-loading="loading" :data="websiteInformationList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="官网名称" align="center" prop="name" />






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
 --><!--
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    /> -->

    <!-- 添加或修改网站基础信息对话框 -->
    <!-- <el-dialog :title="title" :visible.sync="open" width="500px"> -->
     <div class='form_wrapper'>
       <div class='form_wrapper-title'>
         基础设置
       </div>
       <el-form ref="form" :model="form" :rules="rules" label-width="80px">

         <el-form-item label="官网名称" prop="name">
           <el-input v-model="form.name" placeholder="请输入官网名称" size='small' />
         </el-form-item>


       	<el-form-item label="进入页面" prop="entryPage">
       		<el-upload :action="$uploadUrl"
       		 list-type="picture-card"
           :on-change="handleEditChange"
           :class="{hide:hideUploadEdit}"
       		 :on-preview="entryPageHandlePictureCardPreview"
       		 :headers="headers" :on-success="entryPageOnSuccess" :file-list="this.entryPageDatas" :on-remove="entryPageHandleRemove">
       			<i class="el-icon-plus"></i>
       		</el-upload>
       		<el-dialog :visible.sync="entryPageDialogVisible">
       			<img width="100%" :src="entryPageDialogImageUrl" alt="">
       		</el-dialog>
       	</el-form-item>

       	<el-form-item label="LOGO" prop="logo">
       		<el-upload :action="$uploadUrl"
       		 list-type="picture-card"
           :on-change="handleEditChanges"
           :class="{hide:hideUploadEdits}"
       		 :on-preview="logoHandlePictureCardPreview"
       		 :headers="headers" :on-success="logoOnSuccess" :file-list="this.logoDatas" :on-remove="logoHandleRemove">
       			<i class="el-icon-plus"></i>
       		</el-upload>
       		<el-dialog :visible.sync="logoDialogVisible">
       			<img width="100%" :src="logoDialogImageUrl" alt="">
       		</el-dialog>
       	</el-form-item>
       </el-form>
       <div slot="footer" class="dialog-footer">
         <el-button type="primary" @click="submitForm" size='small'>确定修改</el-button>
         <!-- <el-button @click="cancel" size='small'>取 消</el-button> -->
       </div>
     </div>
   <!-- </el-dialog> -->
  </div>
</template>

<script>
import { listWebsiteInformation,pageWebsiteInformation, getWebsiteInformation, delWebsiteInformation, addWebsiteInformation, updateWebsiteInformation, exportWebsiteInformation } from "@/api/mh/websiteInformation";
export default {
 components: {
 	  },
  data() {
    return {
      hideUploadEdit:false,
      hideUploadEdits:false,
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
      // 网站基础信息表格数据
      websiteInformationList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      headers: {
		token: this.$getToken()
		},


	entryPageDialogImageUrl: '',
	entryPageDialogVisible: false,
	entryPageDatas: [],

	logoDialogImageUrl: '',
	logoDialogVisible: false,
	logoDatas: [],



      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: undefined,
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
    handleEditChanges(file, fileList) {
      let vm = this
      vm.hideUploadEdits = fileList.length >= 1
    },
    /** 查询网站基础信息列表 */
    getList() {
      //this.loading = true;
      pageWebsiteInformation(this.queryParams).then(response => {
        this.websiteInformationList = response.data.list;
        this.total = response.data.total;
        if(this.websiteInformationList.length) {
          this.handleUpdate(this.websiteInformationList[0]);
          let vm = this
          vm.hideUploadEdit = true
          vm.hideUploadEdits = true
        }
       // this.loading = false;
      });
    },
    	entryPageHandleRemove(file, fileList) {
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
						this.form.entryPage = this.form.entryPage.replace(url1, "");
						this.form.entryPage = this.form.entryPage.replace(",,", ",");
						if (this.form.entryPage.substr(0,1)==',') this.form.entryPage=this.form.entryPage.substr(1);
						var reg=/,$/gi;
  					this.form.entryPage=this.form.entryPage.replace(reg,"");
					}
				}
			},
			entryPageHandlePictureCardPreview(file) {
				this.entryPageDialogImageUrl = file.url;
				this.entryPageDialogVisible = true;
			},
			entryPageOnSuccess(response, file, fileList) {
				let imgs = [];
				if(this.form.entryPage) {
					imgs = this.form.entryPage.split(",")
					console.log(imgs)
				}
				if(response&&response.fileName){
					let imgData = response.fileName
					imgs.push(imgData);
				}
				this.form.entryPage = imgs.toString();
			},





    	logoHandleRemove(file, fileList) {
        let vm = this
        vm.hideUploadEdits = fileList.length >= 1
				if(file) {
					let url1 = "";
					 if(file.response) {//如果是新上传的
					 		url1 = file.response.fileName;//找出当前删除的url
					}else if(file.url && file.url.indexOf(this.$baseUrl) > -1) { //如果是已有的图片
						 url1 = file.url.replace(this.$baseUrl, "");//找出当前删除的url
					}

					if(url1) {
						this.form.logo = this.form.logo.replace(url1, "");
						this.form.logo = this.form.logo.replace(",,", ",");
						if (this.form.logo.substr(0,1)==',') this.form.logo=this.form.logo.substr(1);
						var reg=/,$/gi;
  					this.form.logo=this.form.logo.replace(reg,"");
					}
				}
			},
			logoHandlePictureCardPreview(file) {
				this.logoDialogImageUrl = file.url;
				this.logoDialogVisible = true;
			},
			logoOnSuccess(response, file, fileList) {
				let imgs = [];
				if(this.form.logo) {
					imgs = this.form.logo.split(",")
					console.log(imgs)
				}
				if(response&&response.fileName){
					let imgData = response.fileName
					imgs.push(imgData);
				}
				this.form.logo = imgs.toString();
			},





	imgInit() {
		this.entryPageDatas = this.$imgUrlchange(this.form.entryPage)
		this.logoDatas = this.$imgUrlchange(this.form.logo)
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
        entryPage: undefined,
        logo: undefined,
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
      this.title = "添加网站基础信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getWebsiteInformation(id).then(response => {
        this.form = response.data;
                this.imgInit();
        this.open = true;
        this.title = "修改网站基础信息";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
        let form = JSON.parse(JSON.stringify(this.form));
          if (form.id != undefined) {
            updateWebsiteInformation(form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addWebsiteInformation(form).then(response => {
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
      this.$confirm('是否确认删除网站基础信息选中的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delWebsiteInformation(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    }
  }
};
</script>
