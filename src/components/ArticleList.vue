<template>

  <div class="col-md-8 list-search ">
    <div class="input-group">
      <input type="text" class="form-control" v-model="search_title" placeholder="Search by title"/>
      <div class="input-group-append bg-white">
        <button class="btn btn-outline-secondary" type="button"
                @click="searchTitle">
          搜索
        </button>
      </div>
    </div>
  </div>

  <div class="button-list">
    <button @click="sortByTime" class="btn btn-primary button-item">最新</button>
    <button @click="sortByHot" class="btn btn-primary button-item">最热</button>

    <select id="selectPosition" v-model="filter_position" @change='filerPosition'
            class="button-item form-control form-control-placeholder">
      <option value="-1" style="color: black;">病情</option>
      <option value="0" style="color: black;">轻病</option>
      <option value="1" style="color: black;">中等</option>
      <option value="2" style="color: black;">重病</option>
      <option value="3" style="color: black;">急诊</option>
    </select>

    <select id="selectSalary" v-model="filter_salary"  @change='filerSalary'
            class="button-item form-control form-control-placeholder">
      <option value="-1" style="color: black;">目前情况</option>
      <option value="0" style="color: black;">完成检查</option>
      <option value="1" style="color: black;">治疗期</option>
      <option value="2" style="color: black;">恢复期</option>
      <option value="3" style="color: black;">出院</option>
    </select>

  </div>

  <div class="col-md-10">
    <ul class="list-group">
      <li class="list-group-item"
          v-for="(article, index) in this.showArticle "
          v-bind:key="index"
          @click="toArticle(article)"
      ><a href="#">
        {{ article.title }}
      </a>
      </li>
    </ul>
  </div>

  <br><br>
  <div class="list row">
    <ul class="pagination">
      <li
          v-for="(pageIndex) in pageIndexList"
          v-bind:key="pageIndex"
          @click="updatePageShow(pageIndex - 1)"
      ><a href="#">{{ pageIndex }} &nbsp; &nbsp;&nbsp;&nbsp;</a>
      </li>
    </ul>
  </div>

</template>
<script>
import ArticleDataService from "../services/ArticleDataService";

export default {
  name: "article-list",
  data() {
    return {
      articles: [],
      showArticle: [],
      currentArticle: null,
      currentIndex: -1,
      search_title: "",
      pageIndexList: [],
      pageIndex: 0,
      isLogin: true,
      filter_position: -1,
      filter_salary: -1
    };
  },
  methods: {
    toArticle(article) {

      if (this.isLogin) {
        this.$router.push('/treatment/edit/' + article.id);
      } else {
        this.$router.push('/treatment/get/' + article.id);
      }
    },
    sortByTime() {

      console.log(this.articles)
      this.articles.sort(function (a, b) {
        return Date.parse(a.publish_time) < Date.parse(b.publish_time) ? 1 : -1;
      })

      this.updatePageShow(0)
    },
    sortByHot() {
      this.articles.sort(function (a, b) {
        return a.apply_count < b.apply_count;
      })
    },
    filerPosition() {
      if (this.filter_position === "-1") {
        for (let i = 0; i < this.articles.length; i ++) {
          this.articles[i].filter_position = false
        }
      } else {
        console.log(this.articles.length)
        console.log(this.articles)
        for (let i = 0; i < this.articles.length; i ++) {
          console.log(this.articles[i].position)
          console.log(this.filter_position)
          console.log('hhhhhhh')
          if (this.articles[i].position == this.filter_position) {
            this.articles[i].filter_position = false
          } else {
            this.articles[i].filter_position = true
          }
        }
      }

      console.log(this.articles);

      this.pageIndex = 0
      this.updatePageIndexList()
      this.updatePageShow(0)
    },
    filerSalary() {
      if (this.filter_salary === "-1") {
        for (let i = 0; i < this.articles.length; i ++) {
          this.articles[i].filter_salary = false
        }
      } else {
          for (let i = 0; i < this.articles.length; i ++) {
            if (this.articles[i].salary === this.filter_salary) {
              this.articles[i].filter_salary = false;
            } else {
              this.articles[i].filter_salary = true;
            }

          }
      }
      this.pageIndex = 0
      this.updatePageIndexList()
      this.updatePageShow(0)
    },
    retrieveArticles() {
      ArticleDataService.getAll()
          .then(response => {
            this.articles = response.data;
            for(let i = 0;i < this.articles.length;i++) {
              this.articles[i].filter_salary = false;
              this.articles[i].filter_position = false;
            }

            this.pageIndex = 0
            this.updatePageIndexList();
            this.updatePageShow(0);
          })
          .catch(e => {
            console.log(e);
          });
    },
    searchTitle() {
      if (this.search_title != null && this.search_title !== "") {

        ArticleDataService.findByTitle(this.search_title)
            .then(response => {
              this.articles = response.data;
              console.log(response.data);

              for(let i = 0;i < this.articles.length;i++) {
                this.articles[i].filter_salary = false;
                this.articles[i].filter_position = false;
              }
              this.pageIndex = 0;
              this.updatePageIndexList();
              this.updatePageShow(0);
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
      } else {
        this.retrieveArticles();
      }
    },
    updatePageIndexList() {
      this.pageIndexList = []
      let article_num = 0
      let page_num = 0
      for (let i = 0; i < this.articles.length; i ++) {
        if (this.articles[i].filter_position === false &&
            this.articles[i].filter_salary === false) {
          article_num++;
          if (article_num === 10) {
            article_num = 0
            this.pageIndexList.push(page_num + 1);
            page_num++;
          }
        }
      }
      if (article_num != 0) {
        this.pageIndexList.push(page_num + 1);
      }
    },
    updatePageShow(pageIndex) {
      this.showArticle = [];
      let showed_num = 0
      for (let i = 0; i < this.articles.length; i++) {

        if (this.articles[i].filter_position === false && this.articles[i].filter_salary === false) {

          if (showed_num >= pageIndex * 10 && showed_num < (pageIndex + 1) * 10) {
            this.showArticle.push(this.articles[i]);
          }
          showed_num ++;
        }
      }
    },
  },
  mounted() {
    console.log("bbbbb")
    this.retrieveArticles();
  }
};
</script>
<style>

@import '../css/ArticleList.css';

.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>