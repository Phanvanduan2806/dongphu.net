'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    console.log('Submit:', form)

    // TODO: call API ở đây
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-2xl font-semibold">Gửi tin nhắn</h2>

      <input
        type="text"
        name="name"
        placeholder="Họ và tên"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      />

      <textarea
        name="message"
        placeholder="Nội dung"
        value={form.message}
        onChange={handleChange}
        className="w-full border p-3 rounded h-32"
      />

      <button type="submit" className="bg-black text-white px-6 py-3 rounded">
        Gửi
      </button>
    </form>
  )
}
