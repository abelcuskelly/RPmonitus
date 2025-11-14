'use client'

import { motion } from 'framer-motion'
import { 
  HeartIcon, 
  ClockIcon, 
  ShieldCheckIcon, 
  UserGroupIcon,
  ChartBarIcon,
  BellAlertIcon 
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: HeartIcon,
    title: 'Free Medical Device',
    description: 'FDA-approved blood pressure monitor shipped directly to your home at no cost.',
    color: 'text-red-600',
    bgColor: 'bg-red-100'
  },
  {
    icon: ClockIcon,
    title: '24/7 Monitoring',
    description: 'Round-the-clock monitoring by certified healthcare professionals.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    icon: ShieldCheckIcon,
    title: '100% Medicare Covered',
    description: 'Fully covered by Medicare Part B with no copays or hidden fees.',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    icon: UserGroupIcon,
    title: 'Care Team Support',
    description: 'Dedicated nurses and doctors reviewing your readings daily.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    icon: ChartBarIcon,
    title: 'Health Insights',
    description: 'Track trends and receive personalized health recommendations.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  },
  {
    icon: BellAlertIcon,
    title: 'Instant Alerts',
    description: 'Automatic notifications to your doctor if readings are concerning.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100'
  }
]

export default function Features() {
  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose RPmonitus?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We make it easy to monitor your health from home with comprehensive support and zero cost.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className={`${feature.bgColor} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className={`h-8 w-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

