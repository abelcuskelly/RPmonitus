'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircleIcon, ShieldCheckIcon, HeartIcon, PhoneIcon } from '@heroicons/react/24/solid'

export default function Hero() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <ShieldCheckIcon className="h-5 w-5" />
              100% Covered by Medicare
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Get Your <span className="text-blue-600">Free</span> Blood Pressure Monitor Today
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Medicare covers 100% of Remote Patient Monitoring. No cost to you. 
              Monitor your health from home with 24/7 clinical support.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Free FDA-approved blood pressure monitor</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">24/7 monitoring by healthcare professionals</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Automatic alerts to your doctor</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Zero out-of-pocket costs</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/eligibility"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Check If You Qualify
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="tel:1-800-RPM-CARE"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-blue-600 bg-white border-2 border-blue-600 rounded-full hover:bg-blue-50 transition-all"
              >
                <PhoneIcon className="mr-2 h-5 w-5" />
                Call 1-800-RPM-CARE
              </a>
            </div>

            <div className="mt-8 flex items-center gap-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-600">Over 10,000+ patients enrolled</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <img
                src="/api/placeholder/600/600"
                alt="Happy senior using blood pressure monitor"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <HeartIcon className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl">120/80</p>
                    <p className="text-sm text-gray-600">Perfect Reading!</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

