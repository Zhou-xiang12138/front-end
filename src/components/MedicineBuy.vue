<template>
    <br/>
    <h3> 自助选药 </h3>

    <div id="keywordDiv" class="" style="margin-top:20px">
  
        <input  v-model="keywords.keyword1" type="text" class="button-item form-control" id="keyword1"
        name="keyword1" style=";" placeholder="关键词1" />
        <input  v-model="keywords.keyword2" type="text" class="button-item form-control" id="keyword2"
        name="keyword2" style=";" placeholder="关键词2" />
        <input  v-model="keywords.keyword3" type="text" class="button-item form-control" id="keyword3"
        name="keyword3" style=";" placeholder="关键词3" />

   <button @click="this.submit_form" class="btn btn-success">提交 </button>
    </div>
     
  </template>

<script>

export default {
    data() {
        return {
            keywords: {
              keyword1: null,
              keyword2: null,
              keyword3: null
            }
          };
    },
    methods: {
        submit_form() {
        }
    },
    mounted() {
    }
};

</script>

<style>
@import '../css/editArticle.css';

.button-item {
  max-width: 300px;
  margin: auto;
  margin: 20px;
}

button {
    max-width: 300px;
    margin: 20px;
  }
</style>