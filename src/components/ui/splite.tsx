interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  // Extract the scene ID from the prod URL and create embed URL
  const match = scene.match(/spline\.design\/([^/]+)\//)
  const sceneId = match ? match[1] : ''
  const embedUrl = `https://my.spline.design/${sceneId}/`

  return (
    <iframe
      src={embedUrl}
      className={className}
      style={{ border: 'none' }}
      loading="lazy"
      title="3D Scene"
      allow="autoplay"
    />
  )
}
