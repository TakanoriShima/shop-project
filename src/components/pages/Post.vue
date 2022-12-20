<script setup>
import { reactive } from 'vue';
import { getDatabase, onValue, push, ref } from "firebase/database";

const data = reactive({
  input_title: "",
  input_content: "",
  posts: []
})

// DBコネクションを確立
const db = getDatabase();
onValue(ref(db, 'posts'), (snapshot) => {
  data.posts = [];
  for (const i in snapshot.val()) {
    data.posts.push(snapshot.val()[i])
  }
});

const sendMessage = () => {
  if (data.input_title === "" || data.input_content === "") return;
  push(ref(db, "posts"), [data.input_title, data.input_content]) // 追加
  data.input_title = "";
  data.input_content = "";
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
          {{post[0]}} : {{post[1]}}
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
      <button class="send-message" @click="sendMessage">送信</button>
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