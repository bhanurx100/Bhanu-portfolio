'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import type { IconType } from 'react-icons';

interface ConfettiButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'glass' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode | IconType;
  onSuccess?: () => void;
  confettiColors?: string[];
}

/**
 * Button with confetti celebration effect
 * Inspired by CRED's playful micro-interactions
 * Triggers confetti on click
 */
export function ConfettiButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  icon,
  onClick,
  onSuccess,
  confettiColors = ['#713cbc', '#00F0FF', '#FF006E'],
  ...props
}: ConfettiButtonProps) {
  const baseStyles =
    'font-medium rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2';

  const variants = {
    primary:
      'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/50 hover:shadow-primary/70 hover:scale-105',
    secondary:
      'bg-secondary hover:bg-secondary-dark text-background-dark shadow-lg shadow-secondary/50 hover:shadow-secondary/70 hover:scale-105',
    glass:
      'bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-white/20 text-text-primary',
    ghost: 'hover:bg-white/5 text-text-primary',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Trigger confetti
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y },
      colors: confettiColors,
    });

    // Call original onClick if provided
    if (onClick) {
      onClick(e);
    }

    // Call onSuccess callback
    if (onSuccess) {
      setTimeout(onSuccess, 300);
    }
  };

  const renderIcon = () => {
    if (!icon) return null;

    if (typeof icon === 'function') {
      const IconComponent = icon as IconType;
      return <IconComponent className="text-lg" />;
    }

    return <span className="text-lg">{icon}</span>;
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      onClick={handleClick}
      {...props}
    >
      {renderIcon()}
      {children}
    </button>
  );
}
