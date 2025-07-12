interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`w-full max-w-lg mx-auto px-4 ${className}`}>
      {children}
    </div>
  )
}