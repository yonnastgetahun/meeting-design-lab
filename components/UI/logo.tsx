// components/UI/Logo.tsx
export function Logo({ className = "h-8 w-auto" }) {
  return (
    <img 
      src="/logo.svg" 
      alt="Meeting Design Lab" 
      className={className}
    />
  )
}