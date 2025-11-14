'use client'

import { motion } from 'framer-motion'
import { 
  ClipboardDocumentCheckIcon,
  TruckIcon,
  HeartIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline'

const steps = [
  {
    number: '1',
    title: 'Check Eligibility',
    description: 'Complete our simple 2-minute form to verify your Medicare coverage. We handle all the paperwork.',
    icon: ClipboardDocumentCheckIcon,
    color: 'bg-blue-500',
  },
  {
    number: '2',
    title: 'Receive Your Device',
    description: 'Your free FDA-approved blood pressure monitor arrives at your door within 2-3 business days.',
    icon: TruckIcon,
    color: 'bg-green-500',
  },
  {
    number: '3',
    title: 'Start Monitoring',
    description: 'Take readings from the comfort of your home. Data automatically syncs with your care team.',
    icon: HeartIcon,
    color: 'bg-red-500',
  },
  {
    number: '4',
    title: 'Stay Healthy',
    description: 'Your healthcare team monitors your readings 24/7 and alerts your doctor if needed.',
    icon: ChartBarIcon,
    color: 'bg-purple-500',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting started with RPmonitus is simple. No complicated setup, no hidden fees, 
            just better health monitoring in 4 easy steps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-24 left-32 right-32 h-0.5 bg-gray-300" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`${step.color} w-20 h-20 rounded-full flex items-center justify-center text-white mb-4 relative z-10`}>
                  <step.icon className="h-10 w-10" />
                </div>
                <div className="absolute -top-2 -left-2 bg-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-gray-800 border-2 border-gray-300">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <a
              href="/eligibility"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Get Started Now
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

