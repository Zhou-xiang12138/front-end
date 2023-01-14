<template>

    <div class="text-center logo">
      <img src="../assets/images/logo.png" style="height: 180px">
    </div>

  <div class="form-group col-5" style="margin: 0 auto; margin-top:20px">
    <div class="form-group" >
      <label>用户名</label>
      <input type="text" class="form-control" id="username" v-model="user.name" >
    </div>
    <div class="form-group">
      <label>密码</label>
      <input type="password" class="form-control" id="password" v-model="user.password">
    </div>



    <input name="admin" type="radio" value="0" v-model="user.role" > 用户
    <input name="doctor" type="radio" value="1" v-model="user.role" > 医生
    <input name="admin" type="radio" value="2" v-model="user.role" > 管理员
    <button id="toRegister" class="btn btn-primary c3-1 text-center" style="margin-left: 100px" @click="register">提交</button>

  </div>

</template>

<script>
import UserDataService from "@/services/UserDataService";

export default {
  name: "UserRegister",
    data() {
      return {
        toast_message: '',
        user : {
          name: "",
          password: "",
          role: "0"
        },
      };
  },
  methods: {
    register() {
      var data = {
        name: this.user.name,
        password: this.user.password,
        role: this.user.userType
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

@import '../css/UserRegister.css';

</style>