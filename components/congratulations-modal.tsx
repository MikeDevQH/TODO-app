"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PartyPopper } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"

interface CongratulationsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CongratulationsModal({ isOpen, onClose }: CongratulationsModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const confettiInstance = useRef<confetti.CreateTypes | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Create confetti instance
    confettiInstance.current = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    })

    return () => {
      if (confettiInstance.current) {
        confettiInstance.current.reset()
      }
    }
  }, [])

  useEffect(() => {
    if (!isOpen || !confettiInstance.current) return

    // Celebration animation
    const duration = 6000
    const end = Date.now() + duration
    const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#6366f1"]

    // Initial burst
    confettiInstance.current({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 },
      colors,
    })

    // Continuous confetti
    const interval = setInterval(() => {
      const timeLeft = end - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      // Reduce intensity as time passes
      const particleCount = Math.floor((timeLeft / duration) * 30) + 10

      // Random position from left or right
      const position = {
        x: Math.random(),
        y: Math.random() - 0.2,
      }

      confettiInstance.current?.({
        particleCount,
        angle: 60 * Math.random() + 60,
        spread: 80,
        origin: position,
        colors,
        startVelocity: 30,
        gravity: 1,
        ticks: 300,
        shapes: ["circle", "square"],
        scalar: 0.8,
      })

      confettiInstance.current?.({
        particleCount,
        angle: 120 * Math.random() + 120,
        spread: 80,
        origin: {
          x: 1 - position.x,
          y: position.y,
        },
        colors,
        startVelocity: 30,
        gravity: 1,
        ticks: 300,
        shapes: ["circle", "square"],
        scalar: 0.8,
      })
    }, 250)

    return () => {
      clearInterval(interval)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <canvas
            ref={canvasRef}
            className="fixed inset-0 z-50 pointer-events-none"
            style={{ width: "100%", height: "100%" }}
            aria-hidden="true"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Card className="w-full max-w-md overflow-hidden border-blue-500 shadow-xl modern-shadow">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 pointer-events-none rounded-lg" />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute -top-10 left-0 right-0 flex justify-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <PartyPopper className="h-10 w-10 text-white" />
                </div>
              </motion.div>
              <CardHeader className="pb-2 text-center pt-12">
                <CardTitle className="text-2xl gradient-text">Congratulations!</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4 py-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.5 }}
                  className="flex justify-center"
                >
                  <div className="p-4 rounded-full bg-blue-500/10">
                    <PartyPopper className="h-16 w-16 text-blue-500" />
                  </div>
                </motion.div>
                <p className="text-lg">You've completed all tasks in this category!</p>
                <p className="text-muted-foreground">Great job staying organized and productive.</p>
              </CardContent>
              <CardFooter className="flex justify-center pb-6">
                <Button
                  onClick={onClose}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all hover-scale px-8"
                >
                  Continue
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
