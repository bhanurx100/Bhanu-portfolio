'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface BlurImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  blurDataURL?: string;
}

/**
 * Image with blur-up loading effect
 * Inspired by Netflix's image loading pattern
 * Smoothly transitions from blurred to sharp
 */
export function BlurImage({ src, alt, className, blurDataURL, ...props }: BlurImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={src}
        alt={alt}
        className={cn(
          'object-cover transition-all duration-700',
          isLoading ? 'scale-110 blur-xl' : 'scale-100 blur-0'
        )}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
}
