<template>
    <div class="container">
      <h1>用户留言</h1>
      <form @submit.prevent="submitMessage">
        <div>
          <label for="name">姓名:</label>
          <input v-model="name" type="text" id="name" required />
        </div>
        <div>
          <label for="message">留言内容:</label>
          <textarea v-model="message" id="message" required></textarea>
        </div>
        <button type="submit" @click="dianji">提交留言</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const name = ref('');
  const message = ref('');
  const messages = ref([]);
  
  const dianji = () =>{
    if (name.value && message.value) {
        ElMessage({
                type:'success',message:'提交成功'
            })
        }
  }
  
  const submitMessage = async () => {
    if (name.value && message.value) {
      try {
        const response = await axios.post('http://localhost:3000/messages', {
          name: name.value,
          message: message.value
        });
        messages.value.push({
          ...response.data,
          timestamp: new Date()
        });
        name.value = '';
        message.value = '';
      } catch (error) {
        console.error('Error submitting message:', error);
      }
    }
  };
  
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h1,
  h2 {
    text-align: center;
  }
  
  form div {
    margin-bottom: 10px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    height: 30px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;

  }
  textarea {
    width: 100%;
    height: 100px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .timestamp {
    font-size: 0.8em;
    color: #888;
  }
  </style>
      