import { AuthForm } from '@/components/auth-form'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-teal-500 via-cyan-400 to-teal-400 overflow-hidden relative">
      {/* Decorative organic shapes - inspired by plantland design */}
      <div className="absolute top-0 left-0 opacity-40 pointer-events-none">
        <svg width="400" height="300" viewBox="0 0 400 300" fill="none" className="text-teal-300">
          <path
            d="M100 50 Q 150 30 180 80 Q 160 120 100 100 Z"
            fill="currentColor"
            opacity="0.6"
          />
          <path
            d="M50 150 Q 80 120 110 140 Q 100 180 60 170 Z"
            fill="currentColor"
            opacity="0.4"
          />
        </svg>
      </div>

      <div className="absolute bottom-20 right-10 opacity-30 pointer-events-none">
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none" className="text-teal-200">
          <circle cx="150" cy="150" r="80" fill="currentColor" opacity="0.3" />
          <path
            d="M120 80 Q 150 50 180 80 Q 160 120 120 100 Z"
            fill="currentColor"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Plant/Leaf illustration */}
      <div className="absolute bottom-0 right-20 opacity-40 pointer-events-none">
        <svg width="200" height="300" viewBox="0 0 200 300" fill="none">
          <ellipse cx="100" cy="250" rx="20" ry="30" fill="#14b8a6" opacity="0.6" />
          <path
            d="M100 250 Q 85 200 80 150 Q 75 100 90 60"
            stroke="#14b8a6"
            strokeWidth="8"
            fill="none"
            opacity="0.5"
          />
          <ellipse cx="70" cy="120" rx="15" ry="25" fill="#14b8a6" opacity="0.4" transform="rotate(-30 70 120)" />
          <ellipse cx="110" cy="100" rx="12" ry="22" fill="#14b8a6" opacity="0.4" transform="rotate(35 110 100)" />
          <ellipse cx="85" cy="160" rx="14" ry="28" fill="#14b8a6" opacity="0.3" transform="rotate(-40 85 160)" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 text-white">
          <h1 className="text-4xl font-bold mb-2">Hello!</h1>
          <p className="text-lg opacity-90">Welcome to BossuData Gh</p>
        </div>

        {/* Auth Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <AuthForm />
        </div>

        {/* Footer text */}
        <p className="text-center mt-8 text-white text-sm font-medium">
          Your trusted platform for data bundles and exam result checkers
        </p>
      </div>
    </main>
  )
}
