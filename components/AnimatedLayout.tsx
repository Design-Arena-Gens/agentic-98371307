'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

type AnimatedLayoutProps = {
  children: ReactNode;
};

export function AnimatedLayout({ children }: AnimatedLayoutProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-6 pb-14 pt-10 sm:px-10"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
