'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Section } from '@/components/sections/RootSection'
import RootButton from '@/components/sections/RootButton'
import { User, Mail, MessageSquare, Send, MapPin, Phone, Clock } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!form.name || !form.email || !form.message) {
      toast.error('Vui lòng nhập đầy đủ thông tin')
      return
    }

    try {
      setLoading(true)
      toast.loading('Đang gửi liên hệ...', { id: 'contact' })

      await new Promise((r) => setTimeout(r, 1200))

      toast.success('Gửi thành công!', { id: 'contact' })

      setForm({ name: '', email: '', message: '' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Section.Root className="py-24">
      {/* GLOW (only inside form) */}
      <div
        className="
                pointer-events-none
                absolute
                top-0
                -translate-y-1/2
    left-1/2
    -translate-x-1/2
                h-100 w-100
                rounded-full
                bg-primary/20
                blur-3xl
                opacity-70
              "
      />
      <div className="grid lg:grid-cols-12 gap-12 items-end">
        {/* ================= LEFT ================= */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <Section.Label>CONTACT</Section.Label>
            <Section.Title>Liên hệ với chúng tôi</Section.Title>
            <Section.Description>
              Hãy để lại thông tin, chúng tôi phản hồi trong 24h.
            </Section.Description>
          </div>

          <div className="space-y-3">
            {[
              { icon: MapPin, text: 'Da Nang, Viet Nam' },
              { icon: Mail, text: 'dongphudigital@gmail.com' },
              { icon: Phone, text: '0386037677' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  className="
                    flex items-center gap-3

                    rounded-2xl
                    border
                    border-border/60
                    dark:border-white/10

                    bg-white/60
                    dark:bg-white/[0.04]

                    px-4 py-4

                    backdrop-blur-xl

                    transition
                    hover:border-primary/40
                  "
                >
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>

                  <span className="text-sm text-muted-foreground">{item.text}</span>
                </div>
              )
            })}
          </div>

          <div className="flex gap-3 items-start rounded-2xl border border-border/60 dark:border-white/10 bg-muted/30 p-5">
            <Clock className="h-4 w-4 text-primary mt-1" />
            <div>
              <p className="font-medium">Working hours</p>
              <p className="text-muted-foreground text-sm">Mon - Fri: 8:00 - 17:30</p>
            </div>
          </div>
        </div>

        {/* ================= FORM ================= */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="
              relative overflow-hidden

              space-y-6

              rounded-3xl

              border
              border-border/60
              dark:border-white/10

              bg-white/70
              dark:bg-zinc-950/40

              backdrop-blur-2xl

              p-8

              shadow-xl
            "
          >
            <div className="relative z-10 space-y-6">
              <FloatingInput
                icon={User}
                name="name"
                label="Họ và tên"
                value={form.name}
                onChange={handleChange}
              />

              <FloatingInput
                icon={Mail}
                name="email"
                label="Email"
                value={form.email}
                onChange={handleChange}
              />

              <FloatingTextarea
                icon={MessageSquare}
                name="message"
                label="Nội dung"
                value={form.message}
                onChange={handleChange}
              />

              {/* ROOT BUTTON USED HERE */}
              <RootButton
                onClick={handleSubmit}
                showArrow
                icon={<Send className="h-4 w-4" />}
                className="w-full justify-center"
              >
                {loading ? 'Đang gửi...' : 'Gửi liên hệ'}
              </RootButton>
            </div>
          </form>
        </div>
      </div>
    </Section.Root>
  )
}

/* ================= FLOATING INPUT ================= */

function FloatingInput({ icon: Icon, label, ...props }: any) {
  return (
    <div className="relative z-10">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

      <input
        {...props}
        placeholder=" "
        className="
          peer
          w-full

          rounded-2xl

          border
          border-border/60
          dark:border-white/10

          bg-transparent

          px-4 pt-6 pb-2 pl-11

          text-foreground

          outline-none

          focus:border-primary
          focus:ring-2
          focus:ring-primary/10

          transition
        "
      />

      <label
        className="
          absolute left-11
          pointer-events-none

          text-sm text-muted-foreground

          transition-all duration-200

          top-1/2 -translate-y-1/2

          peer-focus:top-2
          peer-focus:text-xs
          peer-focus:text-primary
          peer-focus:translate-y-0

          peer-[&:not(:placeholder-shown)]:top-2
          peer-[&:not(:placeholder-shown)]:text-xs
          peer-[&:not(:placeholder-shown)]:translate-y-0
        "
      >
        {label}
      </label>
    </div>
  )
}

/* ================= FLOATING TEXTAREA ================= */

function FloatingTextarea({ icon: Icon, label, ...props }: any) {
  return (
    <div className="relative">
      <Icon className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />

      <textarea
        {...props}
        placeholder=" "
        rows={5}
        className="
          peer
          w-full

          rounded-2xl

          border
          border-border/60
          dark:border-white/10

          bg-transparent

          px-4 pt-6 pb-2 pl-11

          text-foreground

          outline-none

          resize-none

          focus:border-primary
          focus:ring-2
          focus:ring-primary/10

          transition
        "
      />

      <label
        className="
          absolute left-11 top-4
          pointer-events-none

          text-sm text-muted-foreground

          transition-all duration-200

          peer-focus:top-2
          peer-focus:text-xs
          peer-focus:text-primary

          peer-[&:not(:placeholder-shown)]:top-2
          peer-[&:not(:placeholder-shown)]:text-xs
        "
      >
        {label}
      </label>
    </div>
  )
}
