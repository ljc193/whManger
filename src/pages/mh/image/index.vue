<!--图片 -->
<template>
  <div class="app-container">
    
  <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px" class='publicFprm'>

      <el-form-item label="图片名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入图片名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
 


    
	  <el-form-item label="所属项目" prop="project">
        <el-select v-model="queryParams.projectFKID" placeholder="请选择所属项目" clearable size="small">
          <el-option
            v-for="item in selecttableProjectList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
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

    <el-table v-loading="loading" :data="imageList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="图片名称" align="center" prop="name" />

      <el-table-column label="图片描述" align="center" prop="content" />


      <el-table-column label="排序" align="center" prop="sort" />

	<el-table-column   label="所属项目" align="center" prop="project" :formatter="formartByProject" />




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

    <!-- 添加或修改图片对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">

        <el-form-item label="图片名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入图片名称" />
        </el-form-item>


        <el-form-item label="图片描述" prop="content">
          <el-input v-model="form.content" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      
 
    		<el-form-item label="图片地址" prop="src">
					<el-upload :action="$uploadUrl"
					 list-type="picture-card"
					 :on-preview="srcHandlePictureCardPreview" 
					 :headers="headers" :on-success="srcOnSuccess" :file-list="this.srcDatas" :on-remove="srcHandleRemove">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="srcDialogVisible">
						<img width="100%" :src="srcDialogImageUrl" alt="">
					</el-dialog>
				</el-form-item>

		<el-form-item label="排序">
					<el-input-number  v-model="form.sort" :precision="0" :step="1" controls-position="right"></el-input-number>
				</el-form-item>

	
	        <el-form-item  v-if="form.project" label="所属项目" >
        <el-select v-model="form.project.id" placeholder="请选择所属项目">
          <el-option
            v-for="item in selecttableProjectList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
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
import { listImage,pageImage, getImage, delImage, addImage, updateImage, exportImage } from "@/api/mh/image";
import { listProject } from "@/api/mh/project";
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
      // 图片表格数据
      imageList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      headers: {
		token: this.$getToken()
		},



	srcDialogImageUrl: '',
	srcDialogVisible: false,
	srcDatas: [],


	selecttableProjectList:[],



      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: undefined,
        content: undefined,
        src: undefined,
		 projectFKID: "",
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
 this.getlistProject();
  },
  methods: {
    /** 查询图片列表 */
    getList() {
      this.loading = true;
      pageImage(this.queryParams).then(response => {
        this.imageList = response.data.list;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    	srcHandleRemove(file, fileList) {
				if(file) {
					let url1 = "";
					 if(file.response) {//如果是新上传的
					 		url1 = file.response.fileName;//找出当前删除的url
					}else if(file.url && file.url.indexOf(this.$baseUrl) > -1) { //如果是已有的图片
						 url1 = file.url.replace(this.$baseUrl, "");//找出当前删除的url
					} 
					
					if(url1) {
						this.form.src = this.form.src.replace(url1, "");
						this.form.src = this.form.src.replace(",,", ",");
						if (this.form.src.substr(0,1)==',') this.form.src=this.form.src.substr(1);
						var reg=/,$/gi;
  					this.form.src=this.form.src.replace(reg,"");
					}
				}
			},
			srcHandlePictureCardPreview(file) {
				this.srcDialogImageUrl = file.url;
				this.srcDialogVisible = true;
			},
			srcOnSuccess(response, file, fileList) {
				let imgs = [];
				if(this.form.src) {
					imgs = this.form.src.split(",")
					console.log(imgs)
				}
				if(response&&response.fileName){
					let imgData = response.fileName
					imgs.push(imgData);
				}
				this.form.src = imgs.toString();
			},
			
			
			
			
			
		async getlistProject(){
			let response = await listProject();
			this.selecttableProjectList=response.data
		},
		formartByProject(row, column) {
		if(!row.project){
			return "";
		}
    		let obj = this.selectObjectById(this.selecttableProjectList, row.project.id);
     		 return obj.name;
    	},
	imgInit() {
		this.srcDatas = this.$imgUrlchange(this.form.src)
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
        content: undefined,
        src: undefined,
        sort: undefined,
		 project: {
			 id:""
		 },		 
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
      this.title = "添加图片";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getImage(id).then(response => {
        this.form = response.data;
        		if(!this.form.project){
		this.form.project={id:""}
		}
        this.imgInit();
        this.open = true;
        this.title = "修改图片";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
        let form = JSON.parse(JSON.stringify(this.form));
        	if(!form.project||!form.project.id){
        		form.project=undefined;
        	}
          if (form.id != undefined) {
            updateImage(form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addImage(form).then(response => {
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
      this.$confirm('是否确认删除图片选中的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delImage(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    }
  }
};
</script>