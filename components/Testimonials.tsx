'use client'

import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'

const testimonials = [
  {
    name: 'Margaret Thompson',
    age: 72,
    location: 'Phoenix, AZ',
    image: '/api/placeholder/100/100',
    rating: 5,
    quote: 'RPmonitus has been a lifesaver! My doctor caught my high blood pressure spike before I even felt symptoms. The device was free and so easy to use.',
    condition: 'Hypertension',
  },
  {
    name: 'Robert Chen',
    age: 68,
    location: 'San Diego, CA',
    image: '/api/placeholder/100/100',
    rating: 5,
    quote: 'No more weekly trips to the doctor just for blood pressure checks. I love that Medicare covers everything - truly $0 out of pocket!',
    condition: 'Heart Disease',
  },
  {
    name: 'Dorothy Williams',
    age: 75,
    location: 'Miami, FL',
    image: '/api/placeholder/100/100',
    rating: 5,
    quote: 'The peace of mind knowing someone is always monitoring my health is priceless. My daughter loves that she gets updates too.',
    condition: 'Diabetes & Hypertension',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Patients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of Medicare beneficiaries who are taking control of their health with RPmonitus
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">
                    Age {testimonial.age} • {testimonial.location}
                  </p>
                  <p className="text-xs text-blue-600 font-medium">
                    {testimonial.condition}
                  </p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-700 italic">
                "{testimonial.quote}"
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-2xl p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-600">10,000+</p>
              <p className="text-gray-600">Active Patients</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">4.9/5</p>
              <p className="text-gray-600">Average Rating</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">$0</p>
              <p className="text-gray-600">Patient Cost</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">24/7</p>
              <p className="text-gray-600">Monitoring</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

