import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

type Role = 'client' | 'transporter';

export default function Login() {
  const [form, setForm] = useState({ phone: '', password: '' });
  const [focused, setFocused] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<Role>('client');
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL as string;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedRole = localStorage.getItem('role');
    if (token) {
      navigate(savedRole === 'client'? '/orders' : '/dashboard');
    }
  }, [navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!API) { alert("VITE_API_URL not set in Vercel"); return; }
    try {
      // PURE SINGULAR - SAME OXYGEN AS YOUR Model & routes/api.php
      const url = role === 'client'
       ? `${API}/login`
        : `${API}/transporter/login`;

      const res = await axios.post(url, form);

      // PURE TRANSPORTER - matches Transporter.php
      const transporter = res.data.transporter;
      const user = res.data.user;

      const hasPermit = transporter?.driving_permit_verified || transporter?.permit_number? true : false;

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(transporter || user));
      localStorage.setItem('role', role);
      localStorage.setItem('hasPermit', String(hasPermit));
      localStorage.setItem('lastPhone', form.phone);

      navigate(role === 'client'? '/orders' : '/dashboard');
    } catch (err: any) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  //... rest of your JSX - just change the buttons text from Customer/Driver to Client/Transporter
  return (
    <div>
      <button onClick={() => setRole('client')}>Client</button>
      <button onClick={() => setRole('transporter')}>Transporter</button>
      {/* your form stays */}
    </div>
  )
}