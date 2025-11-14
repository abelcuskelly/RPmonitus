import EligibilityForm from '@/components/EligibilityForm'
import { ShieldCheckIcon } from '@heroicons/react/24/solid'

export default function EligibilityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pt-24 pb-12">
      <div className="container-custom">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <ShieldCheckIcon className="h-5 w-5" />
            HIPAA Secure & Medicare Approved
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Check Your Medicare Coverage
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Takes less than 2 minutes • No obligation • 100% free
          </p>
        </div>
        
        <EligibilityForm />

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Questions? Call us at{' '}
            <a href="tel:1-800-RPM-CARE" className="text-blue-600 font-medium">
              1-800-RPM-CARE
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

