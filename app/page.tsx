import { AuthForm } from '@/components/auth-form'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          DataHub
        </h1>
        <p className="text-xl text-slate-300 max-w-md">
          Discover and purchase high-quality datasets for your business needs
        </p>
      </div>

      <div className="w-full max-w-md">
        <AuthForm />
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        <div className="text-center">
          <div className="bg-blue-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 7H7v6h6V7z" />
            </svg>
          </div>
          <h3 className="text-white font-semibold mb-2">Curated Datasets</h3>
          <p className="text-slate-400 text-sm">Access verified and high-quality data</p>
        </div>

        <div className="text-center">
          <div className="bg-green-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-white font-semibold mb-2">Secure & Private</h3>
          <p className="text-slate-400 text-sm">Your data is encrypted and protected</p>
        </div>

        <div className="text-center">
          <div className="bg-purple-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.5 1.5H5.75A2.25 2.25 0 003.5 3.75v12.5A2.25 2.25 0 005.75 18.5h8.5a2.25 2.25 0 002.25-2.25V6.5m-11-5v5h5m-5-5L14 11" />
            </svg>
          </div>
          <h3 className="text-white font-semibold mb-2">Easy Access</h3>
          <p className="text-slate-400 text-sm">Download instantly after purchase</p>
        </div>
      </div>
    </main>
  )
}
