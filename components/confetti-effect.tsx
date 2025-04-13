"use client"

import { useEffect, useRef } from "react"

interface ConfettiEffectProps {
  isActive: boolean
}

export function ConfettiEffect({ isActive }: ConfettiEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!isActive) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Confetti particles
    const confettiCount = 200
    const confetti: Confetti[] = []

    const colors = [
      "#3b82f6", // blue
      "#10b981", // green
      "#f59e0b", // amber
      "#ef4444", // red
      "#8b5cf6", // violet
      "#ec4899", // pink
      "#6366f1", // indigo
    ]

    class Confetti {
      x: number
      y: number
      size: number
      color: string
      speedX: number
      speedY: number
      rotation: number
      rotationSpeed: number
      shape: "circle" | "square" | "triangle"

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height - canvas.height
        this.size = Math.random() * 10 + 5
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.speedX = Math.random() * 5 - 2.5
        this.speedY = Math.random() * 3 + 2
        this.rotation = Math.random() * 360
        this.rotationSpeed = Math.random() * 10 - 5
        this.shape = ["circle", "square", "triangle"][Math.floor(Math.random() * 3)] as "circle" | "square" | "triangle"
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.rotation += this.rotationSpeed

        if (this.y > canvas.height) {
          this.y = -this.size
          this.x = Math.random() * canvas.width
        }
      }

      draw() {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate((this.rotation * Math.PI) / 180)
        ctx.fillStyle = this.color

        if (this.shape === "circle") {
          ctx.beginPath()
          ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2)
          ctx.fill()
        } else if (this.shape === "square") {
          ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size)
        } else if (this.shape === "triangle") {
          ctx.beginPath()
          ctx.moveTo(0, -this.size / 2)
          ctx.lineTo(-this.size / 2, this.size / 2)
          ctx.lineTo(this.size / 2, this.size / 2)
          ctx.closePath()
          ctx.fill()
        }

        ctx.restore()
      }
    }

    // Initialize confetti
    for (let i = 0; i < confettiCount; i++) {
      confetti.push(new Confetti())
    }

    // Animation loop
    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < confetti.length; i++) {
        confetti[i].update()
        confetti[i].draw()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Stop animation after 6 seconds
    const timeout = setTimeout(() => {
      cancelAnimationFrame(animationId)
    }, 6000)

    return () => {
      cancelAnimationFrame(animationId)
      clearTimeout(timeout)
    }
  }, [isActive])

  if (!isActive) return null

  return <canvas ref={canvasRef} className="fixed inset-0 z-50 pointer-events-none" aria-hidden="true" />
}
