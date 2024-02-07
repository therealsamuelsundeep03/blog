<template>
    <navbar />
  <div class="row">
    <div class="container"><div>Please check your mail and click on the link to sign in</div></div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar"
export default {
components:{Navbar},
name: 'checkmail'
}
</script>

<style scoped>
.container{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    overflow: hidden;
}

</style>