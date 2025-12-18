'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import emailjs from '@emailjs/browser';

import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiMapPin,
  FiClock,
  FiSend,
  FiCheck,
  FiCopy,
  FiTwitter,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

import { Button } from '@/components/ui/Button';
import { RevealCard } from '@/components/ui/RevealCard';

/* animations */
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

/* validation */
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

type ContactFormData = z.infer<typeof contactSchema>;

/* data */
const contactMethods = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'bhanuprasad.0921@gmail.com',
    action: 'Copy email',
    copyable: true,
    color: 'text-primary',
  },
  {
    icon: FiMapPin,
    label: 'Location',
    value: 'Bengaluru, India',
    copyable: false,
    color: 'text-secondary',
  },
  {
    icon: FiClock,
    label: 'Response Time',
    value: 'Within 24 hours',
    copyable: false,
    color: 'text-primary',
  },
];

const socialLinks = [
  {
    icon: FiGithub,
    label: 'GitHub',
    username: '@bhanurx100',
    href: 'https://github.com/bhanurx100',
    color: 'from-gray-500 to-gray-700',
    hoverColor: 'group-hover:from-gray-400 group-hover:to-gray-600',
  },
  {
    icon: FiTwitter,
    label: 'Twitter',
    username: '@Bhanu_rx100',
    href: 'https://x.com/Bhanu_rx100',
    color: 'from-sky-400 to-sky-600',
    hoverColor: 'group-hover:from-sky-300 group-hover:to-sky-500',
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    username: '/bhanurx100',
    href: 'https://www.linkedin.com/in/bhanurx100',
    color: 'from-blue-500 to-blue-700',
    hoverColor: 'group-hover:from-blue-400 group-hover:to-blue-600',
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    username: '+91 99485 15012',
    href: 'https://wa.me/919948515012',
    color: 'from-green-500 to-green-600',
    hoverColor: 'group-hover:from-green-400 group-hover:to-green-500',
  },
  {
    icon: FiMail,
    label: 'Email',
    username: 'bhanuprasad.0921@gmail.com',
    href: 'mailto:bhanuprasad.0921@gmail.com',
    color: 'from-primary to-primary-dark',
    hoverColor: 'group-hover:from-primary-light group-hover:to-primary',
  },
];

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] =
    useState<'idle' | 'success' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const formValues = watch();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
        },
        PUBLIC_KEY
      );

      setSubmitStatus('success');
      reset();
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText('bhanuprasad.0921@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section
      id="contact"
      className="py-20 px-6 bg-background dark:bg-gradient-to-b dark:from-background-dark dark:via-background-dark/95 dark:to-background-dark"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' } as any}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-400 dark:border-slate-500 bg-surface-1/50 px-4 py-1 text-xs uppercase tracking-[0.35em] text-foreground/70 backdrop-blur-sm">
              LET'S CONNECT
            </span>
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                <span className="bg-gradient-to-r from-primary via-secondary to-foreground bg-clip-text text-transparent">
                  Ready to Build Something Amazing?
                </span>
              </h2>
              <p className="text-text-secondary text-lg md:text-xl max-w-3xl mx-auto">
                Whether you have a project in mind, want to collaborate, or just want to say hi — I'd love to hear from you.
              </p>
            </div>
          </motion.div>

          {/* Main Content - Split Layout */}
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12">
            {/* Left Side - Contact Info & Social */}
            <motion.div variants={fadeInUp} className="space-y-8">
              {/* Contact Methods */}
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.2em] text-foreground/60">Contact Methods</p>
                {contactMethods.map((method, index) => (
                  <RevealCard
                    key={index}
                    className="p-5 border border-gray-400 dark:border-slate-500 bg-surface-1/40 group cursor-pointer"
                    onClick={method.copyable ? copyEmail : undefined}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-2xl bg-surface-2/60 ${method.color} transition-all duration-300 group-hover:scale-110`}>
                        <method.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs uppercase tracking-wide text-foreground/60 mb-1">{method.label}</p>
                        <p className="text-base font-semibold text-foreground mb-1">{method.value}</p>
                        {method.copyable && (
                          <button
                            onClick={copyEmail}
                            className="text-xs text-primary hover:text-primary-dark transition-colors flex items-center gap-1"
                          >
                            {copiedEmail ? (
                              <>
                                <FiCheck className="w-3 h-3" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <FiCopy className="w-3 h-3" />
                                {method.action}
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </RevealCard>
                ))}
              </div>

              {/* Availability Status */}
              <div className="relative overflow-hidden rounded-3xl border border-gray-400 dark:border-slate-500 bg-surface-1/40 p-6 backdrop-blur-xl">
                <div className="absolute inset-0 opacity-60" style={{
                  background: 'radial-gradient(circle at 20% 20%, rgba(68,38,217,0.15), transparent 50%), radial-gradient(circle at 80% 80%, rgba(61,132,194,0.1), transparent 50%)',
                }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping opacity-75"></div>
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">Currently Available</h4>
                  </div>
                  <p className="text-foreground/70 leading-relaxed">
                    Open to remote or Bengaluru-based full-time roles as a{' '}
                    <span className="text-primary font-semibold">Frontend Engineer</span>,{' '}
                    <span className="text-secondary font-semibold">Software Developer</span>, or{' '}
                    <span className="text-primary font-semibold">Full Stack Engineer</span>
                  </p>
                  <div className="mt-4 pt-4 border-t border-border/10">
                    <p className="text-sm text-foreground/60">
                      <span className="font-semibold text-green-500">Immediate Joiner</span> • Timezone: IST (UTC+5:30)
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.2em] text-foreground/60">Connect on Social</p>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden rounded-2xl border border-gray-400 dark:border-slate-500 bg-surface-1/40 p-5 transition-all duration-300 hover:shadow-glow-sm"
                    >
                      <div className="relative z-10 flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${social.color} ${social.hoverColor} text-white transition-all duration-300 group-hover:scale-110`}>
                          <social.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                            {social.label}
                          </p>
                          <p className="text-xs text-foreground/60">{social.username}</p>
                        </div>
                      </div>
                      <div
                        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                        style={{
                          background: 'radial-gradient(circle at 50% 50%, rgba(68,38,217,0.1), transparent 70%)',
                        }}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div variants={fadeInUp}>
              <div className="relative overflow-hidden rounded-3xl border border-gray-400 dark:border-slate-500 bg-surface-1/40 p-6 md:p-8 backdrop-blur-xl">
                <div className="absolute inset-0 opacity-60" style={{
                  background: 'radial-gradient(circle at 80% 20%, rgba(68,38,217,0.15), transparent 50%), radial-gradient(circle at 20% 80%, rgba(61,132,194,0.1), transparent 50%)',
                }} />

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Send a Message</h3>
                  <p className="text-foreground/60 mb-8">Fill out the form below and I'll get back to you within 24 hours.</p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* ARIA live region for form status announcements */}
                    <div aria-live="polite" aria-atomic="true" className="sr-only">
                      {submitStatus === 'success' && 'Message sent successfully'}
                      {submitStatus === 'error' && 'Failed to send message. Please try again.'}
                      {isSubmitting && 'Sending message...'}
                    </div>
                    {/* Name - Floating Label */}
                    <div className="relative">
                      <input
                        id="name"
                        type="text"
                        {...register('name')}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className="peer w-full px-4 pt-6 pb-2 rounded-2xl bg-surface-2/50 border border-border/15 text-foreground placeholder-transparent focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                        placeholder="Your Name"
                      />
                      <label
                        htmlFor="name"
                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                          focusedField === 'name' || formValues.name
                            ? 'top-2 text-xs text-primary'
                            : 'top-4 text-base text-foreground/60'
                        } peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary`}
                      >
                        Your Name *
                      </label>
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1 ml-1 animate-pulse">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email - Floating Label */}
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        {...register('email')}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="peer w-full px-4 pt-6 pb-2 rounded-2xl bg-surface-2/50 border border-border/15 text-foreground placeholder-transparent focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                        placeholder="Your Email"
                      />
                      <label
                        htmlFor="email"
                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                          focusedField === 'email' || formValues.email
                            ? 'top-2 text-xs text-primary'
                            : 'top-4 text-base text-foreground/60'
                        } peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary`}
                      >
                        Your Email *
                      </label>
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1 ml-1 animate-pulse">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Subject - Floating Label */}
                    <div className="relative">
                      <input
                        id="subject"
                        type="text"
                        {...register('subject')}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField(null)}
                        className="peer w-full px-4 pt-6 pb-2 rounded-2xl bg-surface-2/50 border border-border/15 text-foreground placeholder-transparent focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                        placeholder="Subject"
                      />
                      <label
                        htmlFor="subject"
                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                          focusedField === 'subject' || formValues.subject
                            ? 'top-2 text-xs text-primary'
                            : 'top-4 text-base text-foreground/60'
                        } peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary`}
                      >
                        Subject *
                      </label>
                      {errors.subject && (
                        <p className="text-red-400 text-xs mt-1 ml-1 animate-pulse">{errors.subject.message}</p>
                      )}
                    </div>

                    {/* Message - Floating Label */}
                    <div className="relative">
                      <textarea
                        id="message"
                        rows={5}
                        {...register('message')}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        className="peer w-full px-4 pt-6 pb-2 rounded-2xl bg-surface-2/50 border border-border/15 text-foreground placeholder-transparent focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                        placeholder="Message"
                      />
                      <label
                        htmlFor="message"
                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                          focusedField === 'message' || formValues.message
                            ? 'top-2 text-xs text-primary'
                            : 'top-4 text-base text-foreground/60'
                        } peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary`}
                      >
                        Your Message *
                      </label>
                      {errors.message && (
                        <p className="text-red-400 text-xs mt-1 ml-1 animate-pulse">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="glass"
                      size="lg"
                      icon={FiSend}
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-3"
                      >
                        <FiCheck className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm">Message sent successfully! I'll get back to you soon.</p>
                      </motion.div>
                    )}
                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400"
                      >
                        <p className="text-sm">Failed to send message. Please try again or email me directly at bhanuprasad.0921@gmail.com</p>
                      </motion.div>
                    )}
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
