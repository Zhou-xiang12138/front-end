<template>
  <div class="" style="margin-top:20px">

    <div class="form-group">
      <label for="title">标题</label>
      <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="article.title"
          name="title"
      />
    </div>

    <div class="button-list bg-">

      <select v-model="article.illState" id="selectPosition" class="form-control form-control-placeholder button-item">
        <option value="-1" disabled selected hidden>病情</option>
        <option value="0" style="color: black;">病情</option>
        <option value="0" style="color: black;">轻病</option>
        <option value="1" style="color: black;">中等</option>
        <option value="2" style="color: black;">重病</option>
        <option value="3" style="color: black;">急诊</option>
      </select>

      <select v-model="article.illType" id="selectSalary" class="form-control form-control-placeholder button-item">
        <option value="-1" style="color: black;">目前情况</option>
      <option value="0" style="color: black;">完成检查</option>
      <option value="1" style="color: black;">治疗期</option>
      <option value="2" style="color: black;">恢复期</option>
      <option value="3" style="color: black;">出院</option>
      </select>

      <input  v-model="article.medicineCnt" type="text" class="button-item form-control" id="require_count"
              name="medicineCnt" style=";" placeholder="用药种类" />

    </div>

    <div class="form-group" aria-colcount="10">
      <label for="text">内容</label>
      <textarea
          class="form-control"
          rows="20"
          id="description"
          required
          v-model="article.content"
          name="ontent"
      />
    </div>
    <button id="updateArticle" @click="this.submitAritcle" class="btn btn-success">Submit</button>
    <button id="deleteArticle" @click="this.deleteArticle" class="btn btn-danger">Delete</button>
  </div>

</template>
<script>
import ArticleDataService from "../services/ArticleDataService";

console.log("sssss")
export default {
  name: "edit-article",


  data() {
    return {
      article: {
        id: null,
        title: "",
        author: "",
        publish_time: "",
        illType: -1,
        illState: -1,
        content: "",
        medicineCnt: "",
        published: false,
      },
    };
  },
  methods: {
    getArticle(id) {
      ArticleDataService.get(id)
          .then(response => {
            if (response.data != null) {
              console.log(response.data);
              this.article = response.data;
            }
          })
          .catch(e => {
            console.log(e);
          });
    },
    submitAritcle() {
      if (this.article.id == null) {
        this.createArticle();
      } else {
        this.updateArticle();
      }
    },
    createArticle() {
      let data = {
        id: null,
        title: this.article.title,
        content: this.article.content,
        author: "",
        illType: this.article.illType,
        illState: this.article.illState,
        publish_time: "",
        medicineCnt: this.article.medicineCnt,
      };
      ArticleDataService.create(data)
          .then(response => {
            if (response.data === "ok") {
              this.$router.push('/article/list')
            }
          })
          .catch(e => {
            console.log(e);
          });
    },
    updateArticle() {
      let data = {
        id: this.article.id,
        title: this.article.title,
        content: this.article.content,
        illType: this.article.illType,
        illState: this.article.illState,
        medicineCnt: this.article.medicineCnt,
      };
      ArticleDataService.update(this.article.id, data)
          .then(response => {
            if (response.data === "ok") {
              this.$router.push('/article/list')
            }
          })
          .catch(e => {
            console.log(e);
          });
    },
    deleteArticle() {
      ArticleDataService.delete(this.article.id)
          .then(response => {
            if (response.data === "ok") {
              this.$router.push('/article/list')
            }
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.message = '';

    if (this.$route.params.id != null) {
      this.getArticle(this.$route.params.id);
     }
  }
};
</script>
<style>
@import '../css/editArticle.css';

.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>