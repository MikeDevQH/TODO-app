"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PartyPopper } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ConfettiEffect } from "@/components/confetti-effect"

interface CongratulationsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CongratulationsModal({ isOpen, onClose }: CongratulationsModalProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
    } else {
      setShowConfetti(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <ConfettiEffect isActive={showConfetti} />

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
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all button-transition px-8"
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
