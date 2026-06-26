import { useEffect, useRef } from 'react'

const RarityIcon = ({ src, color, size = 52, className = '' }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const img = new Image()
    img.src = src

    img.onload = () => {
      const targetCanvas = canvasRef.current

      if (!targetCanvas) {
        return
      }

      const targetCtx = targetCanvas.getContext('2d')

      if (!targetCtx) {
        return
      }

      const sourceCanvas = document.createElement('canvas')
      const sourceCtx = sourceCanvas.getContext('2d')

      if (!sourceCtx) {
        return
      }

      sourceCanvas.width = img.naturalWidth
      sourceCanvas.height = img.naturalHeight

      sourceCtx.imageSmoothingEnabled = false
      sourceCtx.drawImage(img, 0, 0)

      const imageData = sourceCtx.getImageData(
        0,
        0,
        sourceCanvas.width,
        sourceCanvas.height
      )

      const pixels = imageData.data
      const rarityColor = hexToRgb(color)

      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i]
        const g = pixels[i + 1]
        const b = pixels[i + 2]
        const a = pixels[i + 3]

        // Remove semi-transparent edge pixels if needed
        if (a < 20) {
          pixels[i + 3] = 0
          continue
        }

        const brightness = (r + g + b) / 3 / 255

        pixels[i] = Math.round(rarityColor.r * brightness)
        pixels[i + 1] = Math.round(rarityColor.g * brightness)
        pixels[i + 2] = Math.round(rarityColor.b * brightness)
        pixels[i + 3] = a
      }

      sourceCtx.putImageData(imageData, 0, 0)

      const displayCanvas = canvasRef.current
      const displayCtx = displayCanvas.getContext('2d')

      displayCanvas.width = size
      displayCanvas.height = size

      displayCtx.imageSmoothingEnabled = false
      displayCtx.clearRect(0, 0, size, size)
      displayCtx.drawImage(sourceCanvas, 0, 0, size, size)
    }
  }, [src, color, size])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      width={size}
      height={size}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        imageRendering: 'pixelated'
      }}
    />
  )
}

const hexToRgb = (hex) => {
  const cleanHex = hex.replace('#', '')

  return {
    r: parseInt(cleanHex.substring(0, 2), 16),
    g: parseInt(cleanHex.substring(2, 4), 16),
    b: parseInt(cleanHex.substring(4, 6), 16)
  }
}

export default RarityIcon