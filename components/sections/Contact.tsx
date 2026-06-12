'use client';

/**
 * Contact Section — High-Performance Full-Stack Profile
 * ──────────────────────────────────────────────────────────────
 * Changes:
 * 1. Fixed module build errors by importing brand handles from 'react-icons/fa6'.
 * 2. Explicitly added WhatsApp to the communication datasets.
 * 3. Pivoted profile descriptions globally to reflect Full-Stack roles.
 * 4. Adjusted viewport animation margins to guarantee immediate text execution on load.
 */

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiSend,
} from 'react-icons/fi';
import { FaXTwitter, FaWhatsapp } from 'react-icons/fa6';

/* Animation variants */
const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.08 },
  }),
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/* Zod validation schema */
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

/* Contact channels data — Full Stack Optimized with WhatsApp Added */
const contactChannels = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'bhanuprasad.0921@gmail.com',
    href: 'mailto:bhanuprasad.0921@gmail.com',
    color: 'text-sky-400',
  },
  {
    icon: FiGithub,
    label: 'GitHub',
    value: '@bhanurx100',
    href: 'https://github.com/bhanurx100',
    color: 'text-cyan-400',
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    value: '/bhanurx100',
    href: 'https://www.linkedin.com/in/bhanurx100',
    color: 'text-sky-400',
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    value: 'Direct Connect',
    href: 'https://wa.me/919948515012',
    color: 'text-emerald-400',
  },
  {
    icon: FaXTwitter,
    label: 'Twitter (X)',
    value: '@bhanurx100',
    href: 'https://x.com/Bhanu_rx100',
    color: 'text-zinc-300',
  },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 px-5 md:px-8 bg-transparent"
    >
      {/* Ambient top line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2
          w-full max-w-[700px] h-px bg-gradient-to-r from-transparent via-sky-400/25 to-transparent"
      />

      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
          className="space-y-4 max-w-2xl"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
              border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm
              text-xs uppercase tracking-[0.35em] text-zinc-400 font-mono"
          >
            Contact
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold leading-tight"
          >
            <span className="text-white">Let's build</span>
            <br />
            <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-pink-500 bg-clip-text text-transparent">
              something together.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-zinc-300 leading-relaxed"
          >
            Have an application design, API system, or project framework you want to deploy? 
            Drop me a line—let's build an end-to-end full-stack solution.
          </motion.p>
        </motion.div>

        {/* Double-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Side - Contact Channels */}
          <motion.div 
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-120px' }}
            className="space-y-6"
          >
            <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-mono px-1">
              Direct Channels
            </p>

            <div className="space-y-3">
              {contactChannels.map((channel, index) => (
                <motion.div
                  key={channel.label}
                  custom={index}
                  variants={fadeUp}
                >
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 rounded-2xl
                      border border-zinc-800/50 bg-zinc-900/30
                      hover:border-sky-500/50 hover:bg-zinc-900/50
                      transition-all duration-300"
                  >
                    <span
                      className={`flex items-center justify-center w-10 h-10 rounded-xl
                      bg-zinc-800/50 ${channel.color} group-hover:scale-110
                      transition-transform duration-300`}
                    >
                      <channel.icon className="w-5 h-5" />
                    </span>
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-wider text-zinc-400 font-mono font-medium mb-0.5">
                        {channel.label}
                      </p>
                      <p className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                        {channel.value}
                      </p>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Availability Card — Updated to Full Stack */}
            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden rounded-2xl
                border border-emerald-500/30 bg-emerald-500/10 p-5"
            >
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-emerald-300">
                    Available — Immediate Joiner
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Open to Full-Stack / Backend / Frontend roles · Remote or Bengaluru
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-120px' }}
            variants={fadeUp}
          >
            <div className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-white mb-2">Send a Message</h3>
              <p className="text-sm text-zinc-400 mb-6">
                Fill out the form and I'll respond within 24 hours.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-zinc-400 mb-2">
                    Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name')}
                    className="w-full px-4 py-3 rounded-xl
                      bg-zinc-900/60 border border-zinc-800
                      text-white placeholder-zinc-500
                      focus:outline-none focus:border-sky-500/50 focus:ring-sky-500/20
                      transition-all duration-300"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-rose-500 text-xs font-mono mt-1.5">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-zinc-400 mb-2">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className="w-full px-4 py-3 rounded-xl
                      bg-zinc-900/60 border border-zinc-800
                      text-white placeholder-zinc-500
                      focus:outline-none focus:border-sky-500/50 focus:ring-sky-500/20
                      transition-all duration-300"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-rose-500 text-xs font-mono mt-1.5">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-medium text-zinc-400 mb-2">
                    Subject *
                  </label>
                  <input
                    id="subject"
                    type="text"
                    {...register('subject')}
                    className="w-full px-4 py-3 rounded-xl
                      bg-zinc-900/60 border border-zinc-800
                      text-white placeholder-zinc-500
                      focus:outline-none focus:border-sky-500/50 focus:ring-sky-500/20
                      transition-all duration-300"
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <p className="text-rose-500 text-xs font-mono mt-1.5">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-zinc-400 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register('message')}
                    className="w-full px-4 py-3 rounded-xl
                      bg-zinc-900/60 border border-zinc-800
                      text-white placeholder-zinc-500
                      focus:outline-none focus:border-sky-500/50 focus:ring-sky-500/20
                      transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && (
                    <p className="text-rose-500 text-xs font-mono mt-1.5">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Premium CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3.5 rounded-xl
                    border border-sky-500/20 bg-zinc-900/50
                    text-zinc-300 font-semibold
                    hover:border-pink-500/60 hover:text-white
                    hover:shadow-[0_0_25px_rgba(244,63,94,0.25)]
                    hover:scale-[1.02]
                    focus:outline-none focus:ring-2 focus:ring-pink-500/20
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-300
                    flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm"
                  >
                    Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm"
                  >
                    Failed to send message. Please try again or email me directly.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}