'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const eligibilitySchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().regex(/^\d{10}$/, 'Valid 10-digit phone number required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  medicareId: z.string().regex(/^[0-9A-Z]{11}$/, 'Valid Medicare ID required (11 characters)'),
  zipCode: z.string().regex(/^\d{5}$/, 'Valid 5-digit ZIP code required'),
  hasHypertension: z.boolean(),
  hasDiabetes: z.boolean(),
  hasHeartDisease: z.boolean(),
  hasCOPD: z.boolean(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must consent to proceed',
  }),
})

type EligibilityFormData = z.infer<typeof eligibilitySchema>

export default function EligibilityForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<EligibilityFormData>({
    resolver: zodResolver(eligibilitySchema),
  })

  const onSubmit = async (data: EligibilityFormData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/check-eligibility', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.eligible) {
        toast.success('Great news! You qualify for the program!')
        // Store data in session storage for enrollment
        sessionStorage.setItem('eligibilityData', JSON.stringify(data))
        sessionStorage.setItem('eligibilityId', result.id || '')
        // Redirect to a success page or show enrollment form
        router.push('/eligibility?success=true')
      } else {
        toast.error('We need to verify your eligibility. A representative will call you.')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Check Your Eligibility</h2>
          <span className="text-sm text-gray-500">Step {step} of 3</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  {...register('firstName')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  {...register('lastName')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="john.doe@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                {...register('phone')}
                type="tel"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="5551234567"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                {...register('dateOfBirth')}
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-4">Medicare Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medicare ID Number
              </label>
              <input
                {...register('medicareId')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1EG4TE5MK72"
                maxLength={11}
              />
              <p className="text-xs text-gray-500 mt-1">
                11-character ID on your red, white, and blue Medicare card
              </p>
              {errors.medicareId && (
                <p className="text-red-500 text-sm mt-1">{errors.medicareId.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code
              </label>
              <input
                {...register('zipCode')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="12345"
                maxLength={5}
              />
              {errors.zipCode && (
                <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-4">Health Conditions</h3>
            
            <p className="text-sm text-gray-600 mb-4">
              Select all conditions that apply to you:
            </p>

            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  {...register('hasHypertension')}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <span className="ml-3">High Blood Pressure (Hypertension)</span>
              </label>

              <label className="flex items-center">
                <input
                  {...register('hasDiabetes')}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <span className="ml-3">Diabetes</span>
              </label>

              <label className="flex items-center">
                <input
                  {...register('hasHeartDisease')}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <span className="ml-3">Heart Disease</span>
              </label>

              <label className="flex items-center">
                <input
                  {...register('hasCOPD')}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <span className="ml-3">COPD or Breathing Problems</span>
              </label>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="flex items-start">
                <input
                  {...register('consent')}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded mt-1"
                />
                <span className="ml-3 text-sm text-gray-600">
                  I consent to RPmonitus verifying my Medicare eligibility and contacting me 
                  about enrollment in the Remote Patient Monitoring program. I understand this 
                  service is 100% covered by Medicare with no out-of-pocket costs.
                </span>
              </label>
              {errors.consent && (
                <p className="text-red-500 text-sm mt-2 ml-7">{errors.consent.message}</p>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Checking...' : 'Check Eligibility'}
              </button>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  )
}

