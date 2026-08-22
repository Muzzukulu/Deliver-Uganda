<script setup lang="ts">
import { ref } from 'vue'
import api from '../services/api'

const form = ref({
  pickup_address: 'Kampala Road',
  delivery_address: '',
  package_description: '',
  customer_name: '',
  customer_phone: ''
})
const loading = ref(false)
const success = ref('')
const error = ref('')

const createOrder = async () => {
  loading.value = true; error.value=''; success.value=''
  try {
    const res = await api.post('/orders', form.value)
    success.value = `Order Created! Code: ${res.data.order_code} - Driver will see it now!`
    form.value.delivery_address=''; form.value.package_description=''
  } catch (e:any) {
    error.value = e.response?.data?.message || 'Failed. Make sure you are logged in as customer.'
  } finally { loading.value=false }
}
</script>

<template>
  <div style="max-width:500px;margin:20px auto;padding:20px;font-family:sans-serif">
    <h1 style="color:#FF6B00">🛵 Deliver Uganda - Customer</h1>
    <p>Order a Boda Delivery</p>

    <div v-if="success" style="background:#d4edda;padding:12px;border-radius:8px;margin:10px 0">{{ success }}</div>
    <div v-if="error" style="background:#f8d7da;padding:12px;border-radius:8px;margin:10px 0">{{ error }}</div>

    <input v-model="form.customer_name" placeholder="Your Name" style="width:100%;padding:12px;margin:8px 0;border:1px solid #ccc;border-radius:8px" />
    <input v-model="form.customer_phone" placeholder="Phone 07XXXXXXXX" style="width:100%;padding:12px;margin:8px 0;border:1px solid #ccc;border-radius:8px" />
    <input v-model="form.pickup_address" placeholder="Pickup Location" style="width:100%;padding:12px;margin:8px 0;border:1px solid #ccc;border-radius:8px" />
    <input v-model="form.delivery_address" placeholder="Delivery Location (e.g., Ntinda)" style="width:100%;padding:12px;margin:8px 0;border:1px solid #ccc;border-radius:8px" />
    <textarea v-model="form.package_description" placeholder="What are we delivering?" style="width:100%;padding:12px;margin:8px 0;border:1px solid #ccc;border-radius:8px"></textarea>

    <button @click="createOrder" :disabled="loading" style="width:100%;padding:14px;background:#FF6B00;color:white;border:none;border-radius:8px;font-weight:bold;font-size:16px">
      {{ loading ? 'Sending...' : 'Order Now - Pay on Delivery' }}
    </button>

    <p style="margin-top:20px"><router-link to="/login">Customer Login / Register</router-link> | <a href="http://localhost:5173" target="_blank">Open Driver App</a></p>
  </div>
</template>