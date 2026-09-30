import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

type Role = 'customer' | 'driver';

export default function Login() {
  const [form, setForm] = useState({ phone: '', password: '' });
  const [focused, setFocused] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<Role>('customer');
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL as string; // Set this in Vercel!

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedRole = localStorage.getItem('role');
    if (token) {
      navigate(savedRole === 'customer'? '/orders' : '/dashboard');
    }
  }, [navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if(!API){ alert("VITE_API_URL not set in Vercel"); return; }
    try {
      const url = role === 'customer'? `${API}/login` : `${API}/driver/login`;
      const res = await axios.post(url, form);

      const driver = res.data.driver;
      // PERMIT PRIORITY LOGIC
      const hasPermit = driver?.driving_permit_verified || driver?.permit_number? true : false;

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(driver || res.data.user));
      localStorage.setItem('role', role);
      localStorage.setItem('hasPermit', String(hasPermit)); // 👈 For priority queue
      localStorage.setItem('lastPhone', form.phone);

      navigate(role === 'customer'? '/orders' : '/dashboard');
    } catch (err: any) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };
  //... rest of your JSX stays same
}