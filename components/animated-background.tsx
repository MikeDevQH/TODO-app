"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create particles
    const particlesArray: Particle[] = []
    const numberOfParticles = 50

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.color = theme === "dark" ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)"
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create grid lines
    class GridLine {
      x: number
      y: number
      length: number
      angle: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.length = Math.random() * 30 + 10
        this.angle = Math.random() * 2 * Math.PI
        this.color = theme === "dark" ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.05)"
      }

      update() {
        this.x += 0.1
        if (this.x > canvas.width) this.x = 0
      }

      draw() {
        ctx.strokeStyle = this.color
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x + Math.cos(this.angle) * this.length, this.y + Math.sin(this.angle) * this.length)
        ctx.stroke()
      }
    }

    const gridLines: GridLine[] = []
    const numberOfLines = 100

    // Initialize particles and grid lines
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    for (let i = 0; i < numberOfLines; i++) {
      gridLines.push(new GridLine())
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid pattern
      const gridSize = 50
      ctx.strokeStyle = theme === "dark" ? "rgba(59, 130, 246, 0.03)" : "rgba(59, 130, 246, 0.02)"
      ctx.lineWidth = 1

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      // Update and draw grid lines
      for (let i = 0; i < gridLines.length; i++) {
        gridLines[i].update()
        gridLines[i].draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [theme])

  return (
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" aria-hidden="true" />
  )
}
