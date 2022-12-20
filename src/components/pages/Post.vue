<script setup>
import { reactive } from 'vue';
import { getDatabase, onValue, push, ref as dRef } from "firebase/database";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const data = reactive({
  input_title: "",
  input_content: "",
  image_url: "",
  posts: []
})

// DBコネクションを確立
const db = getDatabase();
const storage = getStorage();

onValue(dRef(db, 'posts'), (snapshot) => {
  data.posts = [];
  for (const i in snapshot.val()) {
    data.posts.push(snapshot.val()[i])
  }
});

const uploadFile =  (e) => {
  let file = e.target.files[0];
  const storageRef =  ref(storage, "files/" + file.name);
  uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("アップロードに成功しました");
        getDownloadURL(storageRef).then((url) => 
          {
            console.log(url);
            data.image_url = url;
            document.getElementById('send').disabled = false;
          });
      })
      .catch((error) => {
        console.log("アップロードに失敗しました");
      })
}

const sendMessage = () => {
  if (data.input_title === "" || data.input_content === "") return;
  push(dRef(db, "posts"), {title: data.input_title, content: data.input_content, image_url: data.image_url}); // 追加
  data.input_title = "";
  data.input_content = "";
  document.getElementById('send').disabled = true;
}
</script>

<template>
  <h1>Post Example</h1>

  <div class="container">
    <div class="message-area">
      <div class="flex-container" v-for="(post, index) in data.posts " :key="index">
        <div class="number">
          {{index + 1}}
        </div>
        <div class="message">
          {{post.title}} : {{post.content}}: <img v-bind:src="post.image_url" style="width: 100px;"/>
        </div>
      </div>
    </div>

    <div class="input-area">
      <p class="input-title">
        テキストを入力
      </p>
      <input type="text" name="title" v-model="data.input_title">
      <p class="input-title">
        内容を入力
      </p>
      <input type="text" name="content" v-model="data.input_content">
      <p class="input-title">
        画像を選択
      </p>
      <input type="file" id="image" @change="uploadFile" />
      <button class="send-message" @click="sendMessage" id="send" disabled>送信</button>
    </div>
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