<script setup>
import { reactive } from 'vue';
// https://blog.ojisan.io/firebase-v9-storage/
// https://qiita.com/hide8800kasu/items/e2c8c9d2945e9ee93398
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const data = reactive({
  image: "",
});

const storage = getStorage();
const fileUpload = async (e) => {
  let file = e.target.files[0];
  const storageRef =  ref(storage, "files/" + file.name);
  await uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("アップロードに成功しました");
        getDownloadURL(storageRef).then((url) => 
          {
            console.log(url);
            data.image = url;
          });
      })
      .catch((error) => {
        console.log("アップロードに失敗しました");
      });
}

</script>

<template>
  <h1>Upload Example</h1>

  <div class="container">
    <div class="bg-gray-100 p-2">
      <input type="file" @change="fileUpload" />
      <button
        class="bg-green-900 text-sm font-bold py-1 px-2 rounded"
        @click="sendMessage"
      >送信</button>
    </div>
    <img v-bind:src="data.image" style="width: 100px;">
  </div>  
</template>

<style scoped>
  .container {
    text-align: center;
  }
  .message-area {
    text-align: center;
  }
  .flex-container {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
</style>