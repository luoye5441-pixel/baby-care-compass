import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart3, Salad, Camera, Shield, Baby, Heart } from "lucide-react"

function GrowthAnimation() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setScale((prev) => (prev === 1 ? 1.3 : 1))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        animate={{ scale }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="text-5xl"
      >
        📊
      </motion.div>
    </div>
  )
}

function NutritionAnimation() {
  const [layout, setLayout] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLayout((prev) => (prev + 1) % 3)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const layouts = ["grid-cols-2", "grid-cols-3", "grid-cols-1"]

  return (
    <div className="flex items-center justify-center h-full p-4">
      <div className={`grid ${layouts[layout]} gap-2 w-full max-w-[120px] transition-all duration-500`}>
        {["🥦", "🥕", "🍎"].map((emoji, i) => (
          <motion.div
            key={i}
            layout
            className="bg-muted rounded-lg aspect-square flex items-center justify-center text-lg"
          >
            {emoji}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function PhotoAnimation() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2">
      <div className="relative">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin"
            />
          ) : (
            <motion.div
              key="done"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold text-primary"
            >
              📸
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <span className="text-xs text-muted-foreground">AI识别</span>
      <div className="w-full max-w-[100px] h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-primary rounded-full"
        />
      </div>
    </div>
  )
}

function AllergenShields() {
  const [shields, setShields] = useState([
    { id: 1, active: false },
    { id: 2, active: false },
    { id: 3, active: false }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setShields(prev => {
        const nextIndex = prev.findIndex(s => !s.active)
        if (nextIndex === -1) {
          return prev.map(() => ({ id: Math.random(), active: false }))
        }
        return prev.map((s, i) => i === nextIndex ? { ...s, active: true } : s)
      })
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center gap-3">
      {shields.map((shield) => (
        <motion.div
          key={shield.id}
          animate={{ scale: shield.active ? 1 : 0.8, opacity: shield.active ? 1 : 0.3 }}
          className="text-primary"
        >
          <Shield className="size-6" />
        </motion.div>
      ))}
    </div>
  )
}

function HeartbeatAnimation() {
  const [pulses] = useState([0, 1, 2, 3, 4])

  return (
    <div className="relative flex items-center justify-center h-full">
      <Heart className="size-8 text-coral relative z-10" />
      {pulses.map((pulse) => (
        <motion.div
          key={pulse}
          className="absolute w-8 h-8 rounded-full border border-coral/30"
          animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: pulse * 0.4, ease: "easeOut" }}
        />
      ))}
    </div>
  )
}

export default function BentoFeatures() {
  return (
    <section id="features" className="py-16 md:py-24 bg-background">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-mint-light text-primary mb-4">
            核心功能
          </span>
          <h2 className="text-2xl md:text-3xl font-bold">为宝宝量身定制的健康方案</h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[180px]">

          {/* 1. 科学成长指标 - Tall */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 rounded-3xl border border-border bg-card p-6 flex flex-col overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="flex-1">
              <GrowthAnimation />
            </div>
            <div>
              <h3 className="text-base font-semibold mb-1">科学成长指标</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">基于WHO儿童生长标准，精准对比身高、体重、BMI等关键发育指标。</p>
            </div>
          </motion.div>

          {/* 2. 个性化营养方案 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 rounded-3xl border border-border bg-card p-6 flex flex-col overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="flex-1">
              <NutritionAnimation />
            </div>
            <div>
              <h3 className="text-base font-semibold mb-1">个性化营养方案</h3>
              <p className="text-xs text-muted-foreground">智能推荐每日膳食搭配。</p>
            </div>
          </motion.div>

          {/* 3. 全天候守护 - Tall */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 md:row-span-2 rounded-3xl border border-border bg-card p-6 flex flex-col overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="flex-1 flex items-center justify-center">
              <HeartbeatAnimation />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Heart className="size-4 text-coral" />
                <h3 className="text-base font-semibold">全天候守护</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">从营养到安全，全方位守护宝宝健康成长每一天。</p>
            </div>
          </motion.div>

          {/* 4. AI拍照分析 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 rounded-3xl border border-border bg-card p-6 flex flex-col overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="flex-1">
              <PhotoAnimation />
            </div>
            <div>
              <h3 className="text-base font-semibold mb-1">AI拍照分析</h3>
              <p className="text-xs text-muted-foreground">拍摄食物，AI智能分析营养。</p>
            </div>
          </motion.div>

          {/* 5. 过敏源守护 - Wide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-3 rounded-3xl border border-border bg-card p-6 flex flex-col overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="flex-1 flex items-center justify-center">
              <AllergenShields />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Shield className="size-4 text-primary" />
                <h3 className="text-base font-semibold">过敏源安全守护</h3>
              </div>
              <p className="text-xs text-muted-foreground">记录过敏史，选择食物时智能预警，守护宝宝饮食安全。</p>
            </div>
          </motion.div>

          {/* 6. 专业报告 - Wide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="md:col-span-3 rounded-3xl border border-border bg-card p-6 flex items-center gap-6 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="shrink-0">
              <Baby className="size-10 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-semibold mb-1">专业健康报告</h3>
              <p className="text-xs text-muted-foreground">一键生成详细的宝宝健康评估报告，给出个性化建议。</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
