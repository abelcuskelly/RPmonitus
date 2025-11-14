'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: 'Is this really free? What\'s the catch?',
    answer: 'Yes, it\'s completely free for Medicare beneficiaries! There\'s no catch. Medicare Part B covers Remote Patient Monitoring (RPM) services under CPT codes 99453, 99454, 99457, 99458, and 99091. We bill Medicare directly, so you pay nothing out of pocket.',
  },
  {
    question: 'What conditions qualify for RPM?',
    answer: 'Common qualifying conditions include high blood pressure (hypertension), diabetes, heart disease, COPD, and other chronic conditions. During your eligibility check, we\'ll verify that you meet Medicare\'s requirements.',
  },
  {
    question: 'How does the blood pressure monitor work?',
    answer: 'The FDA-approved device automatically takes your blood pressure reading and wirelessly sends it to our secure platform. You don\'t need WiFi or a smartphone - the device has built-in cellular connectivity.',
  },
  {
    question: 'How often do I need to take readings?',
    answer: 'Medicare requires at least 16 days of readings per month, which is about every other day. We recommend daily readings for better health tracking, but you choose what works best for your routine.',
  },
  {
    question: 'Will my doctor see my readings?',
    answer: 'Yes! Your readings are shared with your primary care physician. If we detect concerning readings, we immediately notify your doctor. You\'ll also receive monthly reports showing your trends.',
  },
  {
    question: 'What if I need help setting up the device?',
    answer: 'We provide complete setup support! The device comes with simple instructions, and our support team is available by phone to walk you through setup. Most patients are taking readings within 5 minutes of unboxing.',
  },
  {
    question: 'Can I travel with my device?',
    answer: 'Absolutely! The device works anywhere in the United States with cellular coverage. Take it with you when visiting family or on vacation to maintain continuous monitoring.',
  },
  {
    question: 'How do I know if I have Medicare Part B?',
    answer: 'If you have the red, white, and blue Medicare card, you have Part B. Most Medicare beneficiaries have Part B as it covers doctor visits and outpatient care. We\'ll verify your coverage during enrollment.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about RPmonitus
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <ChevronDownIcon
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-4 text-gray-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center bg-blue-50 rounded-xl p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-4">
            Our friendly support team is here to help
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1-800-RPM-CARE"
              className="inline-flex items-center justify-center px-6 py-3 text-blue-600 bg-white border-2 border-blue-600 rounded-full hover:bg-blue-50 transition-colors"
            >
              Call 1-800-RPM-CARE
            </a>
            <a
              href="mailto:support@rpmonitus.com"
              className="inline-flex items-center justify-center px-6 py-3 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
            >
              Email Support
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

