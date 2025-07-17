'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SliderInputProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  label?: string
  showValue?: boolean
  isFirstSlider?: boolean
}

export default function SliderInput({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  isFirstSlider = false
}: SliderInputProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [showHelper, setShowHelper] = useState(true)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [showDemo, setShowDemo] = useState(false)
  const sliderRef = useRef<HTMLInputElement>(null)
  
  const percentage = ((value - min) / (max - min)) * 100

  // Check if user has seen the demo before
  useEffect(() => {
    if (isFirstSlider && typeof window !== 'undefined') {
      const hasSeenDemo = localStorage.getItem('sliderDemoSeen')
      if (!hasSeenDemo) {
        setShowDemo(true)
        setTimeout(() => {
          runDemoAnimation()
        }, 500)
      }
    }
  }, [isFirstSlider])

  // Hide helper text after delay or interaction
  useEffect(() => {
    if (hasInteracted) {
      setShowHelper(false)
    } else {
      const timer = setTimeout(() => {
        setShowHelper(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [hasInteracted])

  // Demo animation
  const runDemoAnimation = () => {
    if (!sliderRef.current) return
    
    const startValue = value
    const demoValue = min + (max - min) * 0.75
    
    // Animate to 75%
    let progress = 0
    const animationDuration = 1000
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      progress = Math.min(elapsed / animationDuration, 1)
      
      // Ease in-out curve
      const easeProgress = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2
      
      const currentValue = startValue + (demoValue - startValue) * easeProgress
      onChange(Math.round(currentValue))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Animate back
        setTimeout(() => {
          animateBack()
        }, 300)
      }
    }
    
    const animateBack = () => {
      const startTime = Date.now()
      let progress = 0
      
      const animateReturn = () => {
        const elapsed = Date.now() - startTime
        progress = Math.min(elapsed / animationDuration, 1)
        
        const easeProgress = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2
        
        const currentValue = demoValue + (startValue - demoValue) * easeProgress
        onChange(Math.round(currentValue))
        
        if (progress < 1) {
          requestAnimationFrame(animateReturn)
        } else {
          setShowDemo(false)
          localStorage.setItem('sliderDemoSeen', 'true')
        }
      }
      
      animateReturn()
    }
    
    animate()
  }

  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true)
      setShowHelper(false)
    }
  }

  return (
    <div className="w-full space-y-2">
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showValue && (
            <motion.span 
              key={value}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3 }}
              className="text-sm font-medium text-pulse-coral"
            >
              {value}
            </motion.span>
          )}
        </div>
      )}
      
      <div className="relative">
        {/* Helper text */}
        <AnimatePresence>
          {showHelper && !showDemo && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -top-8 left-1/2 transform -translate-x-1/2"
            >
              <span className="text-xs text-gray-500 whitespace-nowrap">
                Drag to adjust
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Demo indicator */}
        {showDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2"
          >
            <span className="text-xs text-pulse-coral whitespace-nowrap">
              ✨ Watch me move!
            </span>
          </motion.div>
        )}
        
        <div className="relative w-full h-12 flex items-center">
          {/* Track markers */}
          <div className="absolute w-full h-2 top-1/2 transform -translate-y-1/2">
            {[25, 50, 75].map((mark) => (
              <div
                key={mark}
                className="absolute w-1 h-1 bg-gray-300 rounded-full top-1/2 transform -translate-y-1/2"
                style={{ left: `${mark}%` }}
              />
            ))}
          </div>
          
          {/* Background track */}
          <div className="absolute w-full h-2 bg-gray-200 rounded-full" />
          
          {/* Filled track */}
          <motion.div 
            className="absolute h-2 bg-gradient-to-r from-pulse-coral to-pulse-orange rounded-full"
            style={{ width: `${percentage}%` }}
            animate={isDragging ? { boxShadow: '0 0 12px rgba(255, 107, 107, 0.5)' } : {}}
          />
          
          {/* Slider input (invisible) */}
          <input
            ref={sliderRef}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => {
              onChange(Number(e.target.value))
              handleInteraction()
            }}
            onMouseDown={() => {
              setIsDragging(true)
              handleInteraction()
            }}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => {
              setIsDragging(true)
              handleInteraction()
            }}
            onTouchEnd={() => setIsDragging(false)}
            className="absolute w-full h-12 opacity-0 cursor-grab active:cursor-grabbing z-10"
          />
          
          {/* Handle */}
          <motion.div
            className="absolute bg-white rounded-full shadow-md transform -translate-x-1/2 pointer-events-none border border-gray-200"
            style={{ 
              left: `${percentage}%`, 
              top: '50%',
              translateY: '-50%'
            }}
            animate={{
              scale: isDragging ? 1.2 : 1,
              boxShadow: isDragging 
                ? '0 0 20px rgba(255, 107, 107, 0.5)' 
                : '0 2px 10px rgba(0, 0, 0, 0.1)'
            }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="w-6 h-6" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}