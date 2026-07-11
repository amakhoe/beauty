'use client';

import Image from 'next/image';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import Bg1 from '@/Images/IMG_20250519_161508.jpg';
/**
 * TrustGallery
 * ------------------------------------------------------------------
 * Hero-adjacent proof section: an oversized center photo flanked by
 * two edge-bleeding side photos, with floating glass-pill badges
 * ("Best Service", "Expert Teams") layered over the center image.
 *
 * Usage:
 *   <TrustGallery />
 *   // or override the photography:
 *   <TrustGallery
 *     images={{
 *       left:   { src: '/images/gallery/patient-1.jpg', alt: 'Patient at reception' },
 *       center: { src: '/images/gallery/wrist-brace.jpg', alt: 'Doctor fitting a wrist brace' },
 *       right:  { src: '/images/gallery/patient-2.jpg', alt: 'Patient in consultation' },
 *     }}
 *   />
 *
 * Setup:
 *   - Swap the DEFAULT_IMAGES below for your real photography (drop
 *     files in /public/images/gallery and point src at them — that
 *     avoids any next.config.js changes).
 *   - If you keep remote placeholder URLs, add the host to
 *     next.config.js -> images.remotePatterns.
 */

interface GalleryImage {
  src: string;
  alt: string;
}

interface TrustGalleryProps {
  images?: {
    left: GalleryImage;
    center: GalleryImage;
    right: GalleryImage;
  };
  badges?: {
    top: string;
    bottom: string;
  };
}

const DEFAULT_IMAGES: TrustGalleryProps['images'] = {
  left: {
    src: 'https://picsum.photos/seed/ngobati-side-a/600/700',
    alt: 'Patient at the clinic reception',
  },
  center: {
    src: 'https://picsum.photos/seed/ngobati-center/1400/900',
    alt: 'Doctor carefully fitting a wrist brace on a patient',
  },
  right: {
    src: 'https://picsum.photos/seed/ngobati-side-b/600/700',
    alt: 'Patient during a follow-up consultation',
  },
};

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05,
    },
  },
};

const sideVariants: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const sideVariantsRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const centerVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: 0.35 },
  },
};

function Badge({
  label,
  position,
  reduceMotion,
}: {
  label: string;
  position: 'top-right' | 'bottom-left';
  reduceMotion: boolean;
}) {
  const placement =
    position === 'top-right'
      ? 'top-5 right-5 md:top-6 md:right-6'
      : 'bottom-5 left-5 md:bottom-6 md:left-6';

  return (
    <motion.div variants={badgeVariants} className={`absolute ${placement} z-10`}>
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
        }
        className="flex items-center gap-2 rounded-full border border-white/15 bg-slate-900/40 px-4 py-2 backdrop-blur-md"
      >
        <span className="relative flex h-2 w-2 shrink-0">
          {!reduceMotion && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
          )}
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
        <span className="text-sm font-medium text-white whitespace-nowrap">
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function SlideGallery({
  images = DEFAULT_IMAGES,
  badges = { top: 'Expert Teams', bottom: 'Best Service' },
}: TrustGalleryProps) {
  const shouldReduceMotion = useReducedMotion();
  const { left, center, right } = images!;

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      {/* ambient background gradient, matches the soft blush/sky wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 45% at 15% 0%, rgba(230, 200, 255, 0.28), transparent 70%), radial-gradient(45% 40% at 85% 8%, rgba(180, 215, 255, 0.25), transparent 70%)',
        }}
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        variants={containerVariants}
        className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-5 px-4 md:grid-cols-[0.85fr_2.3fr_0.85fr] md:gap-6 md:px-8"
      >
        {/* left image — bleeds toward the viewport edge, fades into the bg */}
        <motion.div
          variants={sideVariants}
          className="relative hidden h-[240px] overflow-hidden rounded-[28px] md:-ml-10 md:block md:h-[320px] lg:-ml-24"
        >
          <Image
            src={Bg1}
            alt="Patient at the clinic reception"
            fill
            sizes="(min-width: 768px) 22vw, 0px"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to left, transparent 55%, rgba(255,255,255,0.9) 100%)',
            }}
          />
        </motion.div>

        {/* center image — the focal point, holds both badges */}
        <motion.div
          variants={centerVariants}
          className="relative z-[1] h-[320px] overflow-hidden rounded-[32px] shadow-2xl shadow-slate-900/15 md:h-[420px]"
        >
          <Image
            src={Bg1}
            alt="Patient at the clinic reception"
            fill
            priority
            sizes="(min-width: 768px) 56vw, 100vw"
            className="object-cover"
          />
          <Badge label={badges.top} position="top-right" reduceMotion={!!shouldReduceMotion} />
          <Badge label={badges.bottom} position="bottom-left" reduceMotion={!!shouldReduceMotion} />
        </motion.div>

        {/* right image — mirrors the left treatment */}
        <motion.div
          variants={sideVariantsRight}
          className="relative hidden h-[240px] overflow-hidden rounded-[28px] md:-mr-10 md:block md:h-[320px] lg:-mr-24"
        >
          <Image
            src={Bg1}
            alt="Patient at the clinic reception"
            fill
            sizes="(min-width: 768px) 22vw, 0px"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, transparent 55%, rgba(255,255,255,0.9) 100%)',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}