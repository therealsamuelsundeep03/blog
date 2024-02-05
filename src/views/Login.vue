<template>
  <Navbar />
  <div class="login">
    <div class="login-container">
      <h2>Login</h2>
      <!-- form for login submission -->
      <form @submit.prevent="submitForm">
        <div class="error-message common-error">{{error}}</div>
        <div class="mb-3">
          <TextField
            label="Email"
            placeholder="Enter Email"
            type="email"
            name="email"
            v-model="email"
            @update:modelValue="handleInput"
            @validate="validateInput"
          />
          <span class="error-message">{{ emailError }}</span>
        </div>
        <div class="mb-3">
          <TextField
            label="Password"
            placeholder="Enter Password"
            type="password"
            name="password"
            v-model="password"
            @update:modelValue="handleInput"
            @validate="validateInput"
          />
          <span class="error-message">{{ passwordError }}</span>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <hr />
      <div class="register-link">
        Dont have an account?
        <router-link to="/signin">Sign in</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import TextField from "@/components/TextField.vue";
import axios from "../api/axios";

export default {
  components: { Navbar, TextField },
  name: "login",
  data() {
    return {
      error:"",
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
    };
  },
  methods: {
    // to handle the user input
    handleInput(name, value) {
      this.emailError = "";
      this.passwordError = "";
      if (name === "email") {
        this.email = value;
      } else {
        this.password = value;
      }
    },
    // to validate the user input
    validateInput(name, value) {
      if (name === "email") {
        const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        this.emailError = regex.test(value) ? "" : "Enter valid Email";
      } else if (name === "password") {
        this.passwordError = value.length > 0 ? "" : "Enter password";
      }
    },
    async submitForm() {
      try {
        // if no errors or if the fields are not empty then send the form to the backend
        if (!this.email.length) return (this.emailError = "Enter Email");
        if (!this.password.length)
          return (this.passwordError = "Enter password");
        if (this.emailError === "" && this.passwordError === "" && this.error === "") {
          const { data } = await axios.post("/auth/login", {
            email: this.email,
            password: this.password,
          });
          // if the user is created then redirect the user to the login page
          if(data.status){
            localStorage.setItem('user',data.id);
            this.$router.push({ name: 'allblogs' });
          }
        }
      } catch (error) {
        if (error.response.data.message === "user does not exists") {
          this.emailError = "User does not exists";
        } else if (error.response.data.message === "Password is incorrect") {
          this.passwordError = "Password is incorrect";
        } else if (error.response.data.message === "Email is Required") {
          this.emailError = "Email is Required";
        } else if (error.response.data.message === "Password is Required") {
          this.passwordError = "Password is Required";
        }else if (error.response.status = 500 || !error.response.message){
          this.error = "Please try again"
        }
      }
    },
  },
};
</script>

<style scoped>
.common-error{
  text-align: center;
  text-transform: uppercase;
  margin: 20px
}
.login {
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-container {
  background: #fff;
  padding: 50px;
  border-radius: 10px;
  min-width: 420px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}
.login-container h2 {
  margin-bottom: 30px;
}
.btn {
  width: 100%;
}
.register-link {
  text-align: center;
  font-size: 0.8rem;
}
.error-message {
  color: red;
  font-size: 0.8rem;
}
</style>
