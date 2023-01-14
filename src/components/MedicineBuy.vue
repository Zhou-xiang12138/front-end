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

    <div class="col-md-10">
        <ul class="list-group">
          <li class="list-group-item"
              v-for="(medicine, index) in recoomend_res "
              v-bind:key="index"
          >
            {{ medicine.key }} :   {{ medicine.value }}
          </li>
        </ul>
      </div>

     

  </template>

<script>
import RecommendService from "../services/RecommendService";

export default {
    data() {
        return {
            keywords: {
              keyword1: null,
              keyword2: null,
              keyword3: null
            },
            recoomend_res: []
        };
    },
    methods: {
        submit_form() {
            var d = "";
            if (this.keywords.keyword1 != null && this.keywords.keyword1 != "") {
                d = this.keywords.keyword1;
            }
            if (this.keywords.keyword2 != null && this.keywords.keyword2 != "") {
                if (d != "") {
                    d += ","
                }
                d += this.keywords.keyword2;
            }
            if (this.keywords.keyword3 != null && this.keywords.keyword3 != "") {
                if (d != "") {
                    d += ","
                }
                d += this.keywords.keyword3;
            }
            RecommendService.medicine(d)
                .then(response => {
                if (response.data != null) {
                    var dd = response.data.data
                    this.recoomend_res = []
                    
                    for (var key in dd) {

                        this.recoomend_res.push({"key": key, "value": dd[key]})
                    }
                    console.log(this.recoomend_res)
                }
                })
                .catch(e => {
                console.log(e);
                });
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