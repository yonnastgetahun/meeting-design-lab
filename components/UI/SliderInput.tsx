import React from 'react';

interface SliderInputProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
  className?: string;
}

const SliderInput: React.FC<SliderInputProps> = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
  showValue = true,
  formatValue,
  className = '',
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className={`slider-container ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {/* Custom styled slider */}
        <div className="relative pt-1">
          {/* Track */}
          <div className="slider-track h-2 bg-gray-200 rounded-full shadow-inner">
            {/* Filled portion */}
            <div
              className="slider-track-filled absolute h-full bg-blue-600 rounded-full transition-all duration-200"
              style={{ width: `${percentage}%` }}
            />
          </div>
          
          {/* Native range input (invisible but functional) */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            className="absolute w-full h-2 opacity-0 cursor-pointer z-10"
            style={{ top: '4px' }}
          />
          
          {/* Custom thumb */}
          <div
            className="slider-thumb absolute w-6 h-6 bg-white border-[3px] border-blue-600 rounded-full shadow-lg transition-all duration-200 pointer-events-none"
            style={{
              left: `${percentage}%`,
              top: '-8px',
              transform: 'translateX(-50%)',
            }}
          >
            {/* Value tooltip on hover */}
            <div className="slider-value absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {formatValue ? formatValue(value) : value}
            </div>
          </div>
        </div>
        
        {/* Value display */}
        {showValue && (
          <div className="mt-2 text-center">
            <span className="text-lg font-semibold text-gray-900">
              {formatValue ? formatValue(value) : value}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SliderInput;

// Enhanced styles to add to globals.css:
/*
.slider-container {
  @apply relative;
}

.slider-track {
  @apply relative h-2 bg-gray-200 rounded-full;
  box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.slider-track-filled {
  @apply absolute h-full bg-blue-600 rounded-full transition-all duration-200;
}

.slider-thumb {
  @apply absolute w-6 h-6 bg-white rounded-full transition-all duration-200;
  border: 3px solid #3B82F6;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(59, 130, 246, 0.1);
}

.slider-thumb:hover {
  transform: translateX(-50%) scale(1.1);
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.15), 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.slider-container:hover .slider-value {
  @apply opacity-100;
}

input[type="range"]:focus + .slider-thumb {
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
}
*/