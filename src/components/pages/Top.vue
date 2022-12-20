<script setup>

</script>

<template>
  <div class="container">
    <div class="row">
      <h1 class="text-center offset-sm-3 col-sm-6 text-danger">Top</h1>
    </div>
    <div class="row">
      <a href="/post" class="text-center offset-sm-3 col-sm-6 text-danger">Post</a>
    </div>
    <div class="row mt-2">
      <div class="col-sm-6"><img src="../../assets/images/1.jpg"></div>
      <div class="col-sm-6">
        <a href="/menu">Menu2</a>
        <router-link to="/menu">Menu</router-link>
      </div>
    </div>
  </div>

</template>

<style scoped>
 p{
  color: red;
 }
 img {
  width: 100%;
 }
</style>
