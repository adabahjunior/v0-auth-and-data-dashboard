import { AuthForm } from '@/components/auth-form'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden relative">
      {/* Decorative doodles and shapes */}
      <div className="absolute top-10 left-5 opacity-20">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="text-primary">
          <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="2" />
          <path d="M30 60 Q 60 30 90 60 Q 60 90 30 60" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="absolute bottom-20 right-10 opacity-30">
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" className="text-purple-400">
          <rect x="20" y="20" width="110" height="110" stroke="currentColor" strokeWidth="3" transform="rotate(45 75 75)" />
          <circle cx="75" cy="75" r="30" fill="currentColor" opacity="0.3" />
        </svg>
      </div>

      <div className="absolute top-1/3 right-5 opacity-15">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor" className="text-blue-400">
          <path d="M50 10 L90 90 L10 90 Z" />
          <circle cx="50" cy="50" r="15" fill="white" opacity="0.5" />
        </svg>
      </div>

      <div className="absolute bottom-40 left-20 opacity-20">
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none" className="text-orange-400">
          <path d="M20 70 Q 70 20 120 70 Q 70 120 20 70" stroke="currentColor" strokeWidth="3" />
          <line x1="70" y1="20" x2="70" y2="120" stroke="currentColor" strokeWidth="2" />
          <line x1="20" y1="70" x2="120" y2="70" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center mb-8 max-w-2xl">
        <div className="inline-block mb-4 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-semibold text-primary">
          Welcome to the future of data trading
        </div>
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 leading-tight">
          BossuData Gh
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-lg mx-auto font-medium">
          Buy and resell premium data bundles and exam result checkers with ease. Your trusted marketplace for data trading.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-md mb-12">
        <AuthForm />
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
        <div className="p-6 rounded-2xl border-2 border-primary/20 bg-white/60 backdrop-blur hover:border-primary/40 transition-all group">
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 7H7v6h6V7z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Premium Data Bundles</h3>
          <p className="text-slate-600 text-sm">Access and resell curated data packages for maximum profit</p>
        </div>

        <div className="p-6 rounded-2xl border-2 border-primary/20 bg-white/60 backdrop-blur hover:border-primary/40 transition-all group">
          <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Exam Result Checkers</h3>
          <p className="text-slate-600 text-sm">Verify exam results instantly with our powerful checker tools</p>
        </div>

        <div className="p-6 rounded-2xl border-2 border-primary/20 bg-white/60 backdrop-blur hover:border-primary/40 transition-all group">
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.5 1.5H5.75A2.25 2.25 0 003.5 3.75v12.5A2.25 2.25 0 005.75 18.5h8.5a2.25 2.25 0 002.25-2.25V6.5m-11-5v5h5m-5-5L14 11" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Instant Delivery</h3>
          <p className="text-slate-600 text-sm">Get your bundles immediately after purchase and start earning</p>
        </div>
      </div>
    </main>
  )
}
