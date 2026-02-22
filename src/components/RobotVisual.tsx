import { motion } from "framer-motion"
import { Bot } from "lucide-react"

export function RobotVisual({ className }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Ambient glow */}
      <div className="absolute w-48 h-48 rounded-full bg-foreground/5 blur-3xl" />
      
      {/* Robot body */}
      <motion.div
        className="relative"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Head */}
        <div className="relative mx-auto w-24 h-20 rounded-2xl border border-border bg-card flex items-center justify-center mb-2">
          {/* Eyes */}
          <div className="flex gap-4">
            <motion.div
              className="w-3 h-3 rounded-full bg-foreground"
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
            <motion.div
              className="w-3 h-3 rounded-full bg-foreground"
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
          </div>
          {/* Antenna */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <motion.div
              className="w-2 h-2 rounded-full bg-foreground/60"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="w-px h-3 bg-border" />
          </div>
        </div>

        {/* Body */}
        <div className="mx-auto w-28 h-24 rounded-2xl border border-border bg-card flex items-center justify-center">
          <div className="grid grid-cols-3 gap-1.5">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 rounded-sm bg-foreground/20"
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </div>

        {/* Arms */}
        <motion.div
          className="absolute top-24 -left-4 w-4 h-12 rounded-full border border-border bg-card"
          animate={{ rotate: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-24 -right-4 w-4 h-12 rounded-full border border-border bg-card"
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </motion.div>

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-foreground/20"
          style={{
            left: `${30 + i * 10}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
          }}
        />
      ))}
    </div>
  )
}
