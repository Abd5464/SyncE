import Link from "next/link";
import { Mail, Globe, Linkedin, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-primary/20 text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-2 text-white font-heading font-extrabold text-2xl">
            Sync <span className="text-primary-light">Energy</span>
          </Link>
          <p className="max-w-sm text-sm text-muted">
            Transforming Waste into a Sustainable Energy Future. Deploying next-generation cleantech across Africa's high-impact industrial clusters.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-primary/20 text-white transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-primary/20 text-white transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-primary/20 text-white transition-colors">
              <Instagram size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-heading font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/solutions" className="hover:text-primary-light transition-colors">Solutions</Link></li>
            <li><Link href="/how-it-works" className="hover:text-primary-light transition-colors">How It Works</Link></li>
            <li><Link href="/impact" className="hover:text-primary-light transition-colors">Impact & SDGs</Link></li>
            <li><Link href="/about" className="hover:text-primary-light transition-colors">About Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-heading font-semibold mb-4">Contact Info</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-primary-light" />
              <a href="mailto:SyncEnergy@gmail.com" className="hover:text-white">SyncEnergy@gmail.com</a>
            </li>
            <li className="flex items-center gap-2">
              <Globe size={16} className="text-primary-light" />
              <a href="https://www.biogas-pilot.io" target="_blank" rel="noreferrer" className="hover:text-white">www.biogas-pilot.io</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 text-center text-xs text-muted flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>© 2026 Sync Energy. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
