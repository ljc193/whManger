<!--新闻信息 -->
<template>
  <div class="app-container">

  <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px" class='publicFprm' label-position='left'>

      <el-form-item label="标题" prop="titleOne">
        <el-input
          v-model="queryParams.titleOne"
          placeholder="请输入标题"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

    <!-- <el-form-item label="标题" prop="titleTow">
        <el-input
          v-model="queryParams.titleTow"
          placeholder="请输入标题"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->

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

    <el-table v-loading="loading" :data="newsList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="标题" align="center" prop="titleOne" />
      <!-- <el-table-column label="标题2" align="center" prop="titleTow" /> -->
     <el-table-column label="封面" align="center"  >
        <template slot-scope="scope">
            <el-image
                style="width: 60px; height: 60px"
                :src="baseUrl + scope.row.cover"
                :preview-src-list="[baseUrl + scope.row.cover]">
            </el-image>
        </template>
     </el-table-column>

      <el-table-column label="排序" align="center" prop="sort" />

       <el-table-column label="是否发布" align="center" prop="isRelease" >
        <template slot-scope="scope">
          <span :style='{ color:scope.row.isRelease?"green":"rgb(250, 100, 0)" }'>{{scope.row.isRelease?"是":"否"}}</span>
        </template>
      </el-table-column>

      <el-table-column label="发布时间" align="center" prop="releaseDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.releaseDate) }}</span>
        </template>
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
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改新闻信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1200px" :close-on-click-modal='false' top='30px'>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">

        <el-form-item label="标题" prop="titleOne">
          <el-input v-model="form.titleOne" placeholder="请输入标题1" />
        </el-form-item>
       <!-- <el-form-item label="标题2" prop="titleTow">
          <el-input v-model="form.titleTow" placeholder="请输入标题2" />
        </el-form-item> -->
    		<el-form-item label="封面" prop="cover">
					<el-upload :action="$uploadUrl"
					 list-type="picture-card"
           :on-change="handleEditChange"
           :class="{hide:hideUploadEdit}"
					 :on-preview="coverHandlePictureCardPreview"
					 :headers="headers" :on-success="coverOnSuccess" :file-list="this.coverDatas" :on-remove="coverHandleRemove">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="coverDialogVisible">
						<img width="100%" :src="coverDialogImageUrl" alt="">
					</el-dialog>
				</el-form-item>

        <el-form-item label="内容" prop="content">
            <Editor v-model="form.content" />
        </el-form-item>


		<el-form-item label="排序">
					<el-input-number  v-model="form.sort" :precision="0" :step="1" controls-position="right"></el-input-number>
				</el-form-item>

        <el-form-item label="是否发布" prop="isRelease">
       <el-switch
		  v-model="form.isRelease">
		</el-switch>
      </el-form-item>

        <el-form-item label="发布时间" prop="releaseDate">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.releaseDate"
            type="date"
            value-format="yyyy/MM/dd HH:mm:ss"
            placeholder="选择发布时间">
          </el-date-picker>
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
import { listNews,pageNews, getNews, delNews, addNews, updateNews, exportNews } from "@/api/mh/news";
import Editor from '@/components/Editor';
export default {
 components: {
 			Editor,
	  },
  data() {
    return {
      baseUrl:"https://www.we-arch.cn/whjz",
      hideUploadEdit: false,
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
      // 新闻信息表格数据
      newsList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      headers: {
		token: this.$getToken()
		},



	coverDialogImageUrl: '',
	coverDialogVisible: false,
	coverDatas: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        titleOne: undefined,
        titleTow: undefined,
        cover: undefined,
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
    /** 查询新闻信息列表 */
    getList() {
      this.loading = true;
      pageNews(this.queryParams).then(response => {
        this.newsList = response.data.list;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    	coverHandleRemove(file, fileList) {
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
						this.form.cover = this.form.cover.replace(url1, "");
						this.form.cover = this.form.cover.replace(",,", ",");
						if (this.form.cover.substr(0,1)==',') this.form.cover=this.form.cover.substr(1);
						var reg=/,$/gi;
  					this.form.cover=this.form.cover.replace(reg,"");
					}
				}
			},
			coverHandlePictureCardPreview(file) {
				this.coverDialogImageUrl = file.url;
				this.coverDialogVisible = true;
			},
			coverOnSuccess(response, file, fileList) {
				let imgs = [];
        let vm = this
        vm.hideUploadEdit = fileList.length >= 1
				if(this.form.cover) {
					imgs = this.form.cover.split(",")
					console.log(imgs)
				}
				if(response&&response.fileName){
					let imgData = response.fileName
					imgs.push(imgData);
				}
				this.form.cover = imgs.toString();
			},





	imgInit() {
		this.coverDatas = this.$imgUrlchange(this.form.cover)
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
        titleOne: undefined,
        titleTow: undefined,
        cover: undefined,
        content: undefined,
        sort: undefined,
        isRelease: undefined,
        releaseDate: undefined,
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
       this.hideUploadEdit = false;
      this.title = "添加新闻信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getNews(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改新闻信息";
        if(this.form.cover) {
          this.imgInit();
          this.hideUploadEdit = true;
        }else {
          this.hideUploadEdit = false;
        }
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
        let form = JSON.parse(JSON.stringify(this.form));
          if (form.id != undefined) {
            updateNews(form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addNews(form).then(response => {
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
      this.$confirm('是否确认删除新闻信息选中的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delNews(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    }
  }
};
</script>
