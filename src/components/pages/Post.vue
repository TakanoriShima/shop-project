<script setup>
import { reactive } from 'vue';
import { getDatabase, onValue, push, ref as dRef } from "firebase/database";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import moment from "moment";
// moment.locale("ja");

const data = reactive({
  input_name: "",
  input_email: '',
  input_title: '',
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
  if (data.input_name === "" || data.input_email === "" || data.input_title === "" || data.input_content === "") return;
  
  let today_str = new Date().toString();
  console.log(today_str);
  
  push(dRef(db, "posts"), {name: data.input_name, email: data.input_email, image_url: data.image_url, title: data.input_title, content: data.input_content, date: today_str}); // 追加
  data.input_name = "";
  data.input_email = "";
  data.input_title = "";
  data.input_content = "";
  document.getElementById('send').disabled = true;

  // メール送信
  //下記はデータをPHPに投げる時の1セットだと思ってください。
  let params = new URLSearchParams();
  params.append('name', data.input_name);
  params.append('email', data.input_email);
  params.append('title', data.input_title);
  params.append('content', data.input_content);
  //axiosという機能を使いデータを投げます。
  axios.post('http://quark2galaxy.php.xdomain.jp/mail/send.php', params)
  //PHPで処理された結果がresponseに帰ってきます。
  .then(function (response) {
      //PHPで処理された結果はresponse.dataで呼び出せます。
      //今回は、送信完了メッセージが入っています。
      //詳しくはPHPファイルを確認してみてください。
      //alertで送信完了メッセージを出します。
      alert(response.data)
      //フォームのトップページにリダイレクトします。
      document.location = "./Post"
  })
  .catch(function (error) {
      //何かエラーが起きたらconsole.logにエラーを表示させます。
      console.log("error");
  })
}
</script>

<template>
  <h1>Post Example</h1>

  <div class="container">
    <div class="message-area">
        <table class="table table-bordered table-striped">
          <tr>
            <th>送信番号</th>
            <th>お名前</th>
            <th>プロフィール画像</th>
            <th>メールアドレス</th>
            <th>タイトル</th>
            <th>問い合わせ内容</th>
            <th>送信日時</th>
          </tr>
          <tr v-for="(post, index) in data.posts " :key="index">
            <td>{{index + 1}}</td>
            <td>{{post.name}}</td>
            <td><img v-bind:src="post.image_url" style="width: 100px;"/></td>
            <td>{{post.email}}</td>
            <td>{{post.title}}</td>
            <td>{{post.content}}</td>
            <td>{{post.date}}</td>
          </tr>
      </table>
    </div>


    <div class="input-area">
      <p class="input-title">
        お名前
      </p>
      <input type="text" name="name" v-model="data.input_name"/>
      <p class="input-title">
        メールアドレス
      </p>
      <input type="email" name="email" v-model="data.input_email"/>
      <p class="input-title">
        プロフィール画像を選択
      </p>
      <input type="file" id="image" @change="uploadFile" />
      <img v-bind:src="data.image_url" style="width: 100px;"/>
      <p class="input-title">
        タイトル
      </p>
      <input type="text" name="title" v-model="data.input_title"/>
      <p class="input-title">
        お問い合わせ内容
      </p>
      <input type="text" name="content" v-model="data.input_content"/>

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