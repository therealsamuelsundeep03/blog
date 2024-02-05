<template>
  <Navbar />
  <div class="register">
    <div class="register-container">
      <h2>Sign In</h2>
      <!-- signin form -->
      <form @submit.prevent="submitForm">
        <div class="error-message common-error">{{error}}</div>
        <div class="mb-3">
          <TextField
            label="Name"
            placeholder="Enter Name"
            type="text"
            name="name"
            v-model="name"
            @update:modelValue="handleInput"
            @validate="validateInput"
          />
          <span class="error-message">{{ nameError }}</span>
        </div>
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
        <div class="mb-3">
         <TextField
            label="Confirm Password"
            placeholder="Confirm password"
            type="password"
            name="confirmPassword"
            v-model="confirmPassword"
            @update:modelValue="handleInput"
            @validate="validateInput"
          />
          <span class="error-message">{{ confirmPasswordError }}</span>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <hr />
      <div class="login-link">
        Already have an account?
        <router-link to="/login">Log in</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import TextField from "@/components/TextField.vue";
import axios from "../api/axios";

export default {
  components: { Navbar, TextField },
  name: "signin",
   data() {
    return {
      name: "",
      email: "",
      password: "",
      nameError: "",
      error: "",
      confirmPassword: "",
      emailError: "",
      passwordError: "",
      confirmPasswordError: ""
    };
  },
  methods: {
    // to handle the user input
    handleInput(name, value) {
      this.emailError = "";
      this.passwordError = "";
      this.confirmPasswordError = "";
      this.nameError = "";
      this.error = "";
      if (name === "email") {
        this.email = value;
      } else if(name === "password"){
        this.password = value;
      } else if(name === "name"){
        this.name = value;
      } else if(name === "confirmPassword"){
        this.confirmPassword = value;
      }
    },
    // to handle the validate input
    validateInput(name, value) {
      if(name === "name"){
        this.nameError = value.length > 0 ? "" : "Enter Name";
      }
      if (name === "email") {
        const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        this.emailError = regex.test(value) ? "" : "Enter valid Email";
      } else if (name === "password") {
        this.passwordError = value.length > 0 ? "" : "Enter password";
      }else if(name === "confirmPassword"){
        this.confirmPasswordError = this.password === this.confirmPassword ? "": "Password does not match";
      }
    },
    async submitForm() {
      try {
        // if there are no errors then send an error message
        if (!this.name.length)
          return (this.nameError = "Enter Name");
        if (!this.email.length) return (this.emailError = "Enter Email");
        if (!this.password.length)
          return (this.passwordError = "Enter password");
        if (!this.confirmPassword.length)
          return (this.confirmPasswordError = "Enter password");
        if (this.emailError === "" && this.passwordError === "" && this.nameError=== "" && this.confirmPasswordError=== "") {
          const { data } = await axios.post("/auth/register", {
            userName:this.name,
            email: this.email,
            password: this.password,
          });
          // if the user is created then send an alert message
          if(data.status){
            alert('user created')
            this.$router.push({ name: "login" });
          }
        }
      } catch (error) {
        // handling error from the backend
        if (error.response.data.message === "user exists") {
          this.emailError = "user exists";
        } else if (error.response.data.message === "Password is Required") {
          this.passwordError = "Password is Required";
        } else if(error.response.data.message === "user exists"){
          this.emailError = "user exists";
        } else if(error.response.data.message === "Name is Required"){
          this.nameError = "Name is Required";
        }else if(error.response.status === 500 || !error?.response){
          this.error = "Please try again"
        }
      }
    },
  },
};
</script>

<style scoped>
.register {
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.register-container {
  background: #fff;
  padding: 50px;
  border-radius: 10px;
  min-width: 520px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}
.register-container h2 {
  margin-bottom: 30px;
}
.btn {
  width: 100%;
}
.login-link {
  text-align: center;
  font-size: 0.8rem;
}
.error-message {
  color: red;
  font-size: 0.8rem;
  font-weight: 600;
}
.common-error{
  text-align: center;
  text-transform: uppercase;
  margin: 20px
}
</style>
