'use client'

import * as Slider from '@radix-ui/react-slider'
import { useState } from 'react'

interface SliderInputProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  label?: string
  formatValue?: (value: number) => string
}

export default function SliderInput({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  formatValue = (v) => `${v}%`
}: SliderInputProps) {
  const [localValue, setLocalValue] = useState(value)

  const handleChange = (values: number[]) => {
    const newValue = values[0]
    setLocalValue(newValue)
    onChange(newValue)
  }

  return (
    <div className="w-full space-y-8">
      <div className="text-center">
        <div className="text-6xl font-bold bg-gradient-to-r from-pulse-coral to-pulse-mint 
                        bg-clip-text text-transparent font-inter">
          {formatValue(localValue)}
        </div>
        {label && (
          <p className="text-gray-400 mt-2">{label}</p>
        )}
      </div>
      
      <div className="px-3">
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          value={[localValue]}
          onValueChange={handleChange}
          max={max}
          min={min}
          step={step}
        >
          <Slider.Track className="bg-gray-800 relative grow rounded-full h-2">
            <Slider.Range className="absolute bg-gradient-to-r from-pulse-coral to-pulse-mint 
                                   rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb
            className="block w-12 h-12 bg-white shadow-lg rounded-full 
                       hover:shadow-xl focus:outline-none focus:shadow-xl
                       border-4 border-pulse-coral"
            aria-label="Value"
          />
        </Slider.Root>
        
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>{min}%</span>
          <span>{max}%</span>
        </div>
      </div>
    </div>
  )
}