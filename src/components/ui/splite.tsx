import { useState } from "react"
import { motion } from "framer-motion"

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [loaded, setLoaded] = useState(false)

  const match = scene.match(/spline\.design\/([^/]+)\//)
  const sceneId = match ? match[1] : ''
  const embedUrl = `https://my.spline.design/${sceneId}/`

  return (
    <div className={`relative ${className}`}>
      {/* Loading placeholder */}
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div className="relative w-12 h-12">
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-foreground/10 border-t-foreground/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <motion.p
            className="text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            3D 场景加载中...
          </motion.p>
        </div>
      )}

      <iframe
        src={embedUrl}
        className={`w-full h-full transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
        style={{ border: 'none' }}
        loading="lazy"
        title="3D Scene"
        allow="autoplay"
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
