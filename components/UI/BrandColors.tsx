'use client'

export default function BrandColors() {
  const colors = [
    { name: 'Pulse Coral', class: 'bg-pulse-coral', hex: '#FF6B6B' },
    { name: 'Pulse Navy', class: 'bg-pulse-navy', hex: '#1A1C33' },
    { name: 'Pulse Mint', class: 'bg-pulse-mint', hex: '#B5EAD7' },
    { name: 'Pulse Cream', class: 'bg-pulse-cream', hex: '#FAF3E0' },
    { name: 'Pulse Orange', class: 'bg-pulse-orange', hex: '#FF9F40' },
    { name: 'Pulse Purple', class: 'bg-pulse-purple', hex: '#6C5CE7' },
  ]

  return (
    <div className="space-y-8 p-8">
      {/* Color Palette */}
      <section>
        <h2 className="text-2xl font-dm-serif mb-4">Brand Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {colors.map((color) => (
            <div key={color.name} className="space-y-2">
              <div 
                className={`${color.class} h-20 rounded-lg shadow-lg`} 
              />
              <p className="text-sm font-ibm-plex font-medium">{color.name}</p>
              <p className="text-xs text-gray-400">{color.hex}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-2xl font-dm-serif mb-4">Typography</h2>
        <div className="space-y-4">
          <div>
            <h1 className="text-4xl font-dm-serif text-gradient">
              DM Serif Display - Headlines
            </h1>
          </div>
          <div>
            <h3 className="text-xl font-ibm-plex font-semibold">
              IBM Plex Sans - Subheadings
            </h3>
          </div>
          <div>
            <p className="font-inter">
              Inter - Body text and general content
            </p>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="text-2xl font-dm-serif mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <button className="btn-primary">
            Primary Button
          </button>
          <button className="btn-secondary">
            Secondary Button
          </button>
          <button className="py-3 px-6 rounded-xl font-inter font-semibold 
                           bg-pulse-mint text-pulse-navy
                           active:scale-[0.98] transition-transform">
            Accent Button
          </button>
        </div>
      </section>

      {/* Cards */}
      <section>
        <h2 className="text-2xl font-dm-serif mb-4">Card Styles</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card-gradient">
            <h3 className="font-ibm-plex font-semibold mb-2">Gradient Card</h3>
            <p className="text-gray-300">This uses our glass morphism style</p>
          </div>
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
            <h3 className="font-ibm-plex font-semibold mb-2">Solid Card</h3>
            <p className="text-gray-300">Alternative solid background style</p>
          </div>
        </div>
      </section>

      {/* Effects */}
      <section>
        <h2 className="text-2xl font-dm-serif mb-4">Effects</h2>
        <div className="flex flex-wrap gap-6">
          <div className="w-20 h-20 bg-pulse-coral rounded-lg glow-coral" />
          <div className="w-20 h-20 bg-pulse-mint rounded-lg glow-mint" />
          <div className="w-20 h-20 bg-gradient-to-r from-pulse-coral to-pulse-orange rounded-lg animate-float" />
        </div>
      </section>
    </div>
  )
}