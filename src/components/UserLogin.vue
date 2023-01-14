<template>

  <div class="form-group col-5 " style="margin: 0 auto; margin-top:100px">
    <div class="login-form">
      <div class="text-center">
        <img src="../assets/images/logo.png" style="height: 180px">
      </div>

      <div class="form-group" style="margin-top: 30px">
        <input type="text" class="form-control" id="username" placeholder="用户名" v-model="user.name" >
      </div>
      <div class="form-group">
        <input type="password" class="form-control" id="password" placeholder="密码" v-model="user.password">
      </div>
      <div class="c3-1 text-center">
        <button id="login" class="btn btn-primary" style="margin-right: 30px" @click="login">登录</button>
      </div>
    </div>
  </div>

</template>

<script>
import UserDataService from "@/services/UserDataService";

export default {
  name: "UserRegister",
  data() {
    return {
      user : {
        name: "",
        password: ""
      },
    };
  },
  props: ['day'],
  methods: {
    login() {
      var data = {
        name: this.user.name,
        password: this.user.password
      };

      UserDataService.login(data)
          .then(response => {
            if (response.data.code === 0) {
              this.$router.push('/article/list')
            }
          })
          .catch(e => {
            console.log(e);
          });
    },

    register() {
      var data = {
        userName: this.user.name,
        password: this.user.password
      };

      UserDataService.register(data)
          .then(response => {
            if (response.data.code === 0) {
              this.$router.push('/user/login')
            }
          })
          .catch(e => {
            console.log(e);
          });
    },
  },
  mounted() {
  }

}
</script>

<style scoped>

</style>