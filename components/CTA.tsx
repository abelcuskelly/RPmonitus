'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your Free Health Monitoring Today
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join thousands of Medicare beneficiaries who are taking control of their health 
            with free remote monitoring. No cost, no catch, just better health.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5" />
              <span>100% Medicare Covered</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5" />
              <span>Free Device</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5" />
              <span>24/7 Monitoring</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5" />
              <span>No Hidden Fees</span>
            </div>
          </div>

          <Link
            href="/eligibility"
            className="inline-flex items-center justify-center px-10 py-5 text-xl font-medium text-blue-600 bg-white rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
          >
            Check Your Eligibility Now
            <svg className="ml-3 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <p className="mt-6 text-sm opacity-75">
            Takes less than 2 minutes • No obligation • Instant results
          </p>
        </motion.div>
      </div>
    </section>
  )
}

