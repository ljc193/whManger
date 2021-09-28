<!--项目信息 -->
<template>
  <div class="app-container">

    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px" class='publicFprm'>

      <el-form-item label="项目名称" prop="name">
        <el-input v-model="queryParams.name" placeholder="请输入项目名称" clearable size="small" @keyup.enter.native="handleQuery" />
      </el-form-item>

      <!-- 类型（1图片，2视频，3项目组）typeList -->
      <el-form-item label="类型" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择类型" clearable size="small">
          <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>




      <el-form-item label="标签" prop="projectlabel">
        <el-input v-model="queryParams.projectlabel" placeholder="请输入标签" clearable size="small" @keyup.enter.native="handleQuery" />
      </el-form-item>


      <el-form-item label="所属类型" prop="category">
        <el-select v-model="queryParams.categoryFKID" placeholder="请选择所属类型" clearable size="small">
          <el-option v-for="item in selecttableCategoryList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
      <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8 operation_row">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete">删除</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="projectList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="项目名称" align="center" prop="name" />

      <el-table-column label="描述内容" align="center" prop="content" />
      <!-- 类型（1图片，2视频，3项目组）typeList -->
      <el-table-column label="类型" align="center" prop="type">
        <template slot-scope="scope">
          {{ scope.row.type==1?"图片":scope.row.type==2?"视频":"项目组" }}
        </template>

      </el-table-column>
      <el-table-column label="标签" align="center" prop="projectlabel" />

      <el-table-column label="排序" align="center" prop="sort" />

      <el-table-column label="所属类型" align="center" prop="category" :formatter="formartByCategory" />




      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改项目信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">

        <el-form-item label="项目名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入项目名称" />
        </el-form-item>


        <el-form-item label="描述内容" prop="content">
          <el-input v-model="form.content" type="textarea" placeholder="请输入内容" />
        </el-form-item>


        <el-form-item label="类型">
          <el-select v-model="form.type" placeholder="请选择类型" clearable size="small">
            <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="封面" prop="cover">
          <el-upload :action="$uploadUrl" list-type="picture-card" :class="{hide:hideUploadEdit}" :on-change="handleEditChange"
            :on-preview="coverHandlePictureCardPreview" :headers="headers" :on-success="coverOnSuccess" :file-list="this.coverDatas"
            :on-remove="coverHandleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="coverDialogVisible">
            <img width="100%" :src="coverDialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>

        <el-form-item label="视频上传" prop="video" v-if='form.type==2'>
          <el-upload :action="$uploadUrl" list-type="picture-card" :on-preview="videoHandlePictureCardPreview" :headers="headers"
            :on-success="videoOnSuccess" :file-list="this.videoDatas" :on-remove="videoHandleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="videoDialogVisible">
            <img width="100%" :src="videoDialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>

        <el-form-item label="标签" prop="projectlabel">
          <el-input v-model="form.projectlabel" placeholder="请输入标签" />
        </el-form-item>


        <el-form-item label="排序">
          <el-input-number v-model="form.sort" :precision="0" :step="1" controls-position="right"></el-input-number>
        </el-form-item>


        <el-form-item v-if="form.category" label="所属类型">
          <el-select v-model="form.category.id" placeholder="请选择所属类型">
            <el-option v-for="item in selecttableCategoryList" :key="item.id" :label="item.name" :value="item.id" />
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
  import {
    listProject,
    pageProject,
    getProject,
    delProject,
    addProject,
    updateProject,
    exportProject
  } from "@/api/mh/project";
  import {
    listCategory
  } from "@/api/mh/category";
  export default {
    components: {},
    data() {
      return {
        hideUploadEdit: false,
        typeList: [ // （1图片，2视频，3项目组）
          {
            value: 1,
            label: "图片"
          }, {
            value: 2,
            label: "视频"
          }, {
            value: 3,
            label: "图片集"
          }
        ],
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
        // 项目信息表格数据
        projectList: [],
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


        videoDialogImageUrl: '',
        videoDialogVisible: false,
        videoDatas: [],



        selecttableCategoryList: [],



        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          name: undefined,
          content: undefined,
          type: undefined,
          cover: undefined,
          video: undefined,
          projectlabel: undefined,
          categoryFKID: "",
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {}
      };
    },
    created() {
      this.reset();
      this.getList();
      this.getlistCategory();
    },
    methods: {
      /** 查询项目信息列表 */
      getList() {
        this.loading = true;
        pageProject(this.queryParams).then(response => {
          this.projectList = response.data.list;
          this.total = response.data.total;
          this.loading = false;
        });
      },
      handleEditChange(file, fileList) {
        if (this.form.type == 3) {
          this.hideUploadEdit = false;
        } else {
          this.hideUploadEdit = true;
        }
      },
      coverHandleRemove(file, fileList) {
        this.hideUploadEdit = false;
        if (file) {
          let url1 = "";
          if (file.response) { //如果是新上传的
            url1 = file.response.fileName; //找出当前删除的url
          } else if (file.url && file.url.indexOf(this.$baseUrl) > -1) { //如果是已有的图片
            url1 = file.url.replace(this.$baseUrl, ""); //找出当前删除的url
          }

          if (url1) {
            this.form.cover = this.form.cover.replace(url1, "");
            this.form.cover = this.form.cover.replace(",,", ",");
            if (this.form.cover.substr(0, 1) == ',') this.form.cover = this.form.cover.substr(1);
            var reg = /,$/gi;
            this.form.cover = this.form.cover.replace(reg, "");
          }
        }
      },
      coverHandlePictureCardPreview(file) {
        this.coverDialogImageUrl = file.url;
        this.coverDialogVisible = true;
      },
      coverOnSuccess(response, file, fileList) {
        let imgs = [];
        if (this.form.cover) {
          imgs = this.form.cover.split(",")
        }
        if (response && response.fileName) {
          let imgData = response.fileName
          imgs.push(imgData);
        }
        this.form.cover = imgs.toString();
      },





      videoHandleRemove(file, fileList) {
        if (file) {
          let url1 = "";
          if (file.response) { //如果是新上传的
            url1 = file.response.fileName; //找出当前删除的url
          } else if (file.url && file.url.indexOf(this.$baseUrl) > -1) { //如果是已有的图片
            url1 = file.url.replace(this.$baseUrl, ""); //找出当前删除的url
          }

          if (url1) {
            this.form.video = this.form.video.replace(url1, "");
            this.form.video = this.form.video.replace(",,", ",");
            if (this.form.video.substr(0, 1) == ',') this.form.video = this.form.video.substr(1);
            var reg = /,$/gi;
            this.form.video = this.form.video.replace(reg, "");
          }
        }
      },
      videoHandlePictureCardPreview(file) {
        this.videoDialogImageUrl = file.url;
        this.videoDialogVisible = true;
      },
      videoOnSuccess(response, file, fileList) {
        let imgs = [];
        if (this.form.video) {
          imgs = this.form.video.split(",")
        }
        if (response && response.fileName) {
          let imgData = response.fileName
          imgs.push(imgData);
        }
        this.form.video = imgs.toString();
      },





      async getlistCategory() {
        let response = await listCategory();
        this.selecttableCategoryList = response.data
      },
      formartByCategory(row, column) {
        if (!row.category) {
          return "";
        }
        let obj = this.selectObjectById(this.selecttableCategoryList, row.category.id);
        return obj.name;
      },
      imgInit() {
        this.coverDatas = this.$imgUrlchange(this.form.cover)
        this.videoDatas = this.$imgUrlchange(this.form.video)
      },
      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.form = {
          id: '',
          name: undefined,
          content: undefined,
          type: undefined,
          cover: undefined,
          imgs: undefined,
          video: undefined,
          projectlabel: undefined,
          sort: undefined,
          category: {
            id: ""
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
        this.single = selection.length != 1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加项目信息";
        this.hideUploadEdit = false;
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        getProject(id).then(response => {
          if (this.form.type == 3) {
            this.hideUploadEdit = false;
          } else {
            this.hideUploadEdit = true;
          }
          this.form = response.data;
          if (!this.form.category) {
            this.form.category = {
              id: ""
            }
          }
          this.imgInit();
          this.open = true;
          this.title = "修改项目信息";

        });


      },
      /** 提交按钮 */
      submitForm: function() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            let form = JSON.parse(JSON.stringify(this.form));
            if (!form.category || !form.category.id) {
              form.category = undefined;
            }
            if (form.id != undefined) {
              updateProject(form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                } else {
                  this.msgError(response.msg);
                }
              });
            } else {
              addProject(form).then(response => {
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
        this.$confirm('是否确认删除项目信息选中的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delProject(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
      }
    }
  };
</script>
