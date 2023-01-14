<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-light bg-info">
      <router-link to="/" class="navbar-brand">在线医疗</router-link>
      <div class="navbar-nav mr-auto" style="display: flex;flex:1 0 auto" >
        <li class="nav-item ">
          <router-link to="/" class="nav-link">首页</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/treatment/list" class="nav-link">医疗记录列表</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/treatment/edit" class="nav-link">我的医疗版</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/treatment/buy" class="nav-link">自助买药</router-link>
        </li>

        <li class="nav-item" >
          <router-link to="/user/login" style="margin-left: 1100px" class="nav-link" >{{ loginItem }}</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/user/register" class="nav-link" v-show="registerVisible">注册</router-link>
        </li>

      </div>
    </nav>
    <div class="container" style="width: 1500px">
      <router-view/>
    </div>
  </div>
</template>
<script>


export default {
  name: "app",
  data() {
    return {
      loginUser: "",
      loginItem: "登陆",
      registerVisible: true
    }
  },


  methods: {
    updateBar(loginUser) {
      if (loginUser === "") {
        this.registerVisible = true;
        this.loginItem = "登陆"
      } else {
        this.registerVisible = false;
        this.loginItem = loginUser
      }
    },
  },

};
</script>