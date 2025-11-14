import Link from 'next/link'
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon 
} from '@heroicons/react/24/outline'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">RPmonitus</h3>
            <p className="text-sm mb-4">
              Medicare-approved Remote Patient Monitoring services with zero cost to patients.
            </p>
            <div className="flex items-center gap-2 text-xs bg-blue-900 text-blue-200 px-3 py-1 rounded-full inline-flex">
              Medicare Approved Provider
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/#benefits" className="hover:text-white transition-colors">Benefits</Link></li>
              <li><Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/eligibility" className="hover:text-white transition-colors">Check Eligibility</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/hipaa" className="hover:text-white transition-colors">HIPAA Notice</Link></li>
              <li><Link href="/medicare-compliance" className="hover:text-white transition-colors">Medicare Compliance</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4" />
                <a href="tel:1-800-RPM-CARE" className="hover:text-white transition-colors">
                  1-800-RPM-CARE
                </a>
              </li>
              <li className="flex items-center gap-2">
                <EnvelopeIcon className="h-4 w-4" />
                <a href="mailto:support@rpmonitus.com" className="hover:text-white transition-colors">
                  support@rpmonitus.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPinIcon className="h-4 w-4 mt-0.5" />
                <span>
                  123 Healthcare Blvd<br />
                  Suite 100<br />
                  Denver, CO 80202
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p className="mb-2">
            © 2024 RPmonitus. All rights reserved. | NPI: 1234567890
          </p>
          <p className="text-xs text-gray-500">
            RPmonitus is a Medicare-enrolled provider offering Remote Patient Monitoring services 
            under CPT codes 99453, 99454, 99457, 99458, and 99091.
          </p>
        </div>
      </div>
    </footer>
  )
}

