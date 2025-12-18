'use client';

import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '#home', shortcut: 'H', description: 'Jump to home section' },
  {
    label: 'Projects',
    href: '#projects',
    shortcut: 'P',
    description: 'View featured projects',
  },
  { label: 'About', href: '#about', shortcut: 'A', description: 'Learn more about me' },
  {
    label: 'Contact',
    href: '#contact',
    shortcut: 'C',
    description: 'Get in touch',
  },
];

/**
 * Command Palette for keyboard navigation
 * Inspired by Cursor/Windsurf developer tools
 * Press Cmd/Ctrl + K to open
 */
export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [mounted, setMounted] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Focus trap and auto-focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Focus trap: keep focus within palette when open
  useEffect(() => {
    if (!isOpen) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = containerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  const filteredItems = navItems.filter(
    (item) =>
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleNavigate = (href: string) => {
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
    setSearch('');
    setSelectedIndex(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to toggle
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setSearch('');
        setSelectedIndex(0);
      }

      // Escape to close
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSearch('');
      }

      // Arrow navigation when open
      if (isOpen) {
        const currentFilteredItems = navItems.filter(
          (item) =>
            item.label.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase())
        );

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < currentFilteredItems.length - 1 ? prev + 1 : prev
          );
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          if (currentFilteredItems[selectedIndex]) {
            handleNavigate(currentFilteredItems[selectedIndex].href);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, search]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Palette */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-xl bg-background-dark/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-top-4 duration-300"
      >
        {/* Search input */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 text-text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search or jump to..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedIndex(0);
              }}
              className="flex-1 bg-transparent text-text-primary placeholder:text-text-secondary outline-none text-lg"
              aria-label="Search navigation"
              aria-autocomplete="list"
              aria-controls="command-palette-results"
            />
          </div>
        </div>

        {/* Results */}
        <div id="command-palette-results" className="max-h-96 overflow-y-auto" role="listbox" aria-label="Navigation options">
          {filteredItems.length === 0 ? (
            <div className="px-4 py-8 text-center text-text-secondary">
              No results found
            </div>
          ) : (
            filteredItems.map((item, index) => (
              <button
                key={item.href}
                onClick={() => handleNavigate(item.href)}
                role="option"
                aria-selected={selectedIndex === index}
                className={cn(
                  'w-full px-4 py-3 flex items-center justify-between text-left transition-colors',
                  selectedIndex === index
                    ? 'bg-primary/20 border-l-2 border-primary'
                    : 'hover:bg-white/5 border-l-2 border-transparent'
                )}
              >
                <div className="flex-1">
                  <div className="text-text-primary font-medium">{item.label}</div>
                  <div className="text-text-secondary text-sm">{item.description}</div>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-white/10 text-text-secondary text-xs font-mono rounded border border-white/20">
                    {item.shortcut}
                  </kbd>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between text-xs text-text-secondary">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] font-mono">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] font-mono">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] font-mono">↵</kbd>
              Select
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] font-mono">ESC</kbd>
            Close
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
}
