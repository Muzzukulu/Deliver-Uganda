<script setup lang="ts">
import { ref } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLogin = ref(true)
const form = ref({ name:'', email:'', phone:'', password:'' })
const error = ref('')

const submit = async () => {
  error.value=''
  try {
    const url = isLogin.value ? '/login' : '/register'
    const res = await api.post(url, form.value)
    localStorage.setItem('customer_token', res.data.token)
    router.push('/')
  } catch (e:any) { error.value = e.response?.data?.message || 'Error' }
}
</script>

<template>
  <div style="max-width:400px;margin:40px auto;padding:20px">
    <h2>{{ isLogin ? 'Customer Login' : 'Customer Register' }}</h2>
    <div v-if="error" style="background:#f8d7da;padding:10px">{{ error }}</div>
    <input v-if="!isLogin" v-model="form.name" placeholder="Full Name" style="width:100%;padding:10px;margin:6px 0" />
    <input v-model="form.email" placeholder="Email" style="width:100%;padding:10px;margin:6px 0" />
    <input v-if="!isLogin" v-model="form.phone" placeholder="Phone" style="width:100%;padding:10px;margin:6px 0" />
    <input v-model="form.password" type="password" placeholder="Password" style="width:100%;padding:10px;margin:6px 0" />
    <button @click="submit" style="width:100%;padding:12px;background:#FF6B00;color:white;border:none;margin-top:10px">{{ isLogin ? 'Login' : 'Register' }}</button>
    <p @click="isLogin=!isLogin" style="color:blue;cursor:pointer;margin-top:10px">{{ isLogin ? 'No account? Register' : 'Have account? Login' }}</p>
  </div>
</template>