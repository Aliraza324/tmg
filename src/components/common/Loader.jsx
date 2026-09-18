import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Heart, Stethoscope, ShieldCheck } from "lucide-react";
import { cn } from "../../utils/cn";

/**
 * Animated ECG Pulse Line Loader with Framer Motion
 */
export function MedicalECGLoader({
  size = "md",
  color = "text-primary-700",
  showPulse = true,
  className = ""
}) {
  const sizeMap = {
    sm: { width: 80, height: 32, stroke: 2 },
    md: { width: 140, height: 48, stroke: 2.5 },
    lg: { width: 220, height: 64, stroke: 3 }
  };

  const { width, height, stroke } = sizeMap[size] || sizeMap.md;

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 200 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Background faint guide track */}
        <path
          d="M0 30 L40 30 L55 30 L65 8 L75 52 L85 20 L95 38 L105 30 L115 30 L125 15 L135 45 L145 30 L200 30"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-slate-200"
        />

        {/* Dynamic Glowing ECG Wave */}
        <motion.path
          d="M0 30 L40 30 L55 30 L65 8 L75 52 L85 20 L95 38 L105 30 L115 30 L125 15 L135 45 L145 30 L200 30"
          stroke="url(#ecgGradient)"
          strokeWidth={stroke + 0.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
          animate={{
            pathLength: [0.15, 0.45, 0.25, 0.15],
            pathOffset: [0, 0.5, 0.85, 1],
            opacity: [0.6, 1, 1, 0.6]
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <defs>
          <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0d9488" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#0f766e" stopOpacity="1" />
            <stop offset="85%" stopColor="#0284c7" stopOpacity="1" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>

      {/* Pulsing center node */}
      {showPulse && (
        <motion.div
          className="absolute w-2.5 h-2.5 rounded-full bg-teal-500 shadow-md shadow-teal-500/50"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.7, 0.2, 0.7]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </div>
  );
}

/**
 * Modern Circular Gradient Spinner with Framer Motion
 */
export function SpinnerLoader({ size = "md", className = "" }) {
  const sizeMap = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-3",
    xl: "w-16 h-16 border-4"
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <motion.div
        className={cn(
          "rounded-full border-slate-200 border-t-primary-700 border-r-teal-500",
          sizeMap[size] || sizeMap.md
        )}
        animate={{ rotate: 360 }}
        transition={{
          duration: 0.9,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}

/**
 * Animated Bouncing Stagger Dots Loader
 */
export function DotsLoader({ className = "", dotSize = "w-2 h-2" }) {
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.16,
        repeat: Infinity
      }
    }
  };

  const dotVariants = {
    initial: { y: 0, opacity: 0.4 },
    animate: {
      y: [-4, 4, -4],
      opacity: [0.4, 1, 0.4],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className={cn("flex items-center gap-1.5", className)}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.span className={cn("rounded-full bg-teal-600", dotSize)} variants={dotVariants} />
      <motion.span className={cn("rounded-full bg-primary-700", dotSize)} variants={dotVariants} />
      <motion.span className={cn("rounded-full bg-sky-500", dotSize)} variants={dotVariants} />
    </motion.div>
  );
}

/**
 * Full Page / Section Healthcare Branded Loader
 */
export function PageLoader({
  title = "TMG Healthcare Platform",
  subtitle = "Synchronizing patient records & clinical services...",
  fullScreen = false,
  className = ""
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center",
        fullScreen
          ? "fixed inset-0 z-50 bg-white/90 backdrop-blur-md"
          : "min-h-[360px] w-full bg-slate-50/50 rounded-2xl border border-slate-100",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center max-w-sm"
      >
        {/* Glowing Logo / Cross Badge */}
        <div className="relative mb-5">
          <motion.div
            className="absolute -inset-2 rounded-2xl bg-teal-500/15 blur-lg"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-700 to-teal-800 text-white flex items-center justify-center shadow-lg shadow-teal-900/10 border border-teal-600/30">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Activity className="w-8 h-8 text-teal-200" />
            </motion.div>
          </div>
        </div>

        {/* ECG Heartbeat Line */}
        <MedicalECGLoader size="md" className="my-2" />

        {/* Brand & Loading Status */}
        <motion.h3
          className="text-sm font-bold text-slate-900 mt-2 tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          {title}
        </motion.h3>

        <motion.p
          className="text-xs text-slate-500 mt-1 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          {subtitle}
        </motion.p>

        {/* Staggered Loading Dots */}
        <div className="mt-4">
          <DotsLoader dotSize="w-2 h-2" />
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Universal Loader Component supporting multiple variants
 */
export default function Loader({
  variant = "ecg", // "ecg" | "spinner" | "dots" | "page"
  size = "md",
  text,
  subtitle,
  fullScreen = false,
  className = ""
}) {
  if (variant === "page" || fullScreen) {
    return (
      <PageLoader
        title={text || "TMG Healthcare Platform"}
        subtitle={subtitle || "Preparing secure medical workspace..."}
        fullScreen={fullScreen}
        className={className}
      />
    );
  }

  if (variant === "spinner") {
    return (
      <div className={cn("inline-flex items-center gap-2.5", className)}>
        <SpinnerLoader size={size} />
        {text && <span className="text-xs text-slate-600 font-medium">{text}</span>}
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className={cn("inline-flex items-center gap-2", className)}>
        <DotsLoader />
        {text && <span className="text-xs text-slate-600 font-medium">{text}</span>}
      </div>
    );
  }

  // Default ECG wave pulse
  return (
    <div className={cn("flex flex-col items-center justify-center p-4 gap-2", className)}>
      <MedicalECGLoader size={size} />
      {text && <span className="text-xs text-slate-600 font-medium">{text}</span>}
      {subtitle && <span className="text-[11px] text-slate-400">{subtitle}</span>}
    </div>
  );
}
