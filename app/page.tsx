export default function Home() {
  return (
    <main className="min-h-screen bg-pulse-navy">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-white font-inter mb-4">
          Meeting Design Lab
        </h1>
        <p className="text-pulse-mint text-xl mb-8">
          Strategic Sync Framework Analyzer
        </p>
        
        {/* Your brand colors */}
        <div className="flex gap-4 mb-8">
          <div className="w-32 h-32 bg-pulse-coral rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">Coral</span>
          </div>
          <div className="w-32 h-32 bg-pulse-navy border-2 border-pulse-mint rounded-lg flex items-center justify-center">
            <span className="text-pulse-mint font-bold">Navy</span>
          </div>
          <div className="w-32 h-32 bg-pulse-mint rounded-lg flex items-center justify-center">
            <span className="text-pulse-navy font-bold">Mint</span>
          </div>
        </div>
        
        {/* Font tests */}
        <div className="space-y-4 text-white">
          <p className="font-inter text-2xl">Inter Font Test</p>
          <p className="font-dm-serif text-2xl italic">DM Serif Display Test</p>
          <p className="text-xl">IBM Plex Sans (Default)</p>
        </div>
      </div>
    </main>
  )
}