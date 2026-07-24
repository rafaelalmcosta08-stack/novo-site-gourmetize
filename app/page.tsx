import Link from "next/link"
import { ArrowRight, Mail, Lock } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <a href="#" className="font-medium text-[#1b4b3e] hover:text-[#12362c]">
            start your 14-day free trial
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="#">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  defaultValue="jamespass@emi.com"
                  className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border focus:ring-[#1b4b3e] focus:border-[#1b4b3e]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  defaultValue="password123"
                  className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border focus:ring-[#1b4b3e] focus:border-[#1b4b3e]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#1b4b3e] focus:ring-[#1b4b3e] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-[#1b4b3e] hover:text-[#12362c]">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <Link href="/dashboard" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1b4b3e] hover:bg-[#12362c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1b4b3e] transition-colors">
                Sign in
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
