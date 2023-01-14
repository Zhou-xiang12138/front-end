<template>

    <div class="article-head">
      <h2 type="text" id="title"> {{article.title}}
      </h2>
    </div>

    <div class="article-content">
      <div class="form-group col=12">
        <p  >{{ article.content}}</p>
      </div>
    </div>

    <div class="article-status bg-light">
      <span> {{article.author}}  &nbsp;&nbsp;  {{article.publish_time}} </span>
    </div>

    <div class="article-apply">
      <button class=" form-control bg-danger"
        @click="applyPosition" v-show="isLogin">
        申请职位
      </button>
    </div>


</template>
<script>
import ArticleDataService from "../services/ArticleDataService";
export default {
  name: "articleDetail",
  data() {
    return {
      article: {
        title: "",
        content: "",
        author:"",
        publish_time:"",
      },
      message: '',
      isLogin: false,
      loginUser: null,
      applyed: false,
    };
  },
  methods: {
    getArticle(id) {
      ArticleDataService.get(id)
        .then(response => {
          this.article = response.data;
          console.log( this.article)
        })
        .catch(e => {
          console.log(e);
        });
    },
    applyPosition() {
      let id = this.article.id;
      if (this.isLogin === true) {
        let userId = this.loginUser.id;
        ArticleDataService.applyPosition(id, userId)
            .then(response => {
              if (response.data === "ok") {
                this.applyed = true;
              }
            })
            .catch(e => {
              console.log(e);
            });
      }
    }

  },
  mounted() {
    this.message = '';
    console.log("aaaaaa")
    this.getArticle(this.$route.params.id);

    if (this.loginUser !== '') {
      this.isLogin = true;
    }
  }
};
</script>
<style>

@import '../css/Article.css';
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>