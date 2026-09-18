import React, { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../features/ui/uiSlice";
import { PUBLIC_NAV_LINKS } from "../constants/navigation";
import Button from "../components/ui/Button";
import {
  Menu,
  X,
  Globe,
  PhoneCall,
  Shield,
  HeartHandshake,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { cn } from "../utils/cn";

export default function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const language = useSelector((state) => state.ui.language);
  const dispatch = useDispatch();
  const location = useLocation();

  const toggleLanguage = () => {
    dispatch(setLanguage(language === "en" ? "my" : "en"));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900 w-full overflow-x-hidden">
      {/* Top Clinical & Trust Advisory Bar */}
      <div className="bg-primary-950 text-white text-xs py-1.5 sm:py-2 px-2.5 sm:px-4 border-b border-primary-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2">
          <div className="flex items-start sm:items-center gap-1.5 sm:gap-2 text-center sm:text-left justify-center sm:justify-start">
            <Shield className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5 sm:mt-0" />
            <span className="text-slate-300 text-[10px] sm:text-xs leading-tight sm:leading-normal">
              TMG Medical Guidance Platform — Independent patient coordination &amp; hospital matching for Myanmar patients in Thailand.
            </span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 text-slate-300 text-[11px] sm:text-xs">
            <span className="hidden md:inline-flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-teal-400" />
              Direct Support: +66 82 491 5821
            </span>
            <Link
              to="/auth/login"
              className="text-teal-300 hover:text-white transition-colors text-[11px] sm:text-xs font-medium flex items-center gap-1"
            >
              <span>Staff Portal</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 w-full">
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-15 sm:h-18 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 shrink min-w-0 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary-700 text-white flex items-center justify-center font-black text-xs sm:text-sm tracking-tight shadow-sm group-hover:bg-primary-800 transition shrink-0 select-none whitespace-nowrap leading-none">
              TMG
            </div>
            <div className="min-w-0">
              <span className="font-bold text-slate-900 text-sm sm:text-lg tracking-tight block leading-tight truncate">
                TMG Healthcare
              </span>
              <span className="text-[9px] sm:text-[11px] text-slate-500 font-medium tracking-wide block uppercase truncate">
                Thailand Medical Guidance
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600">
            {PUBLIC_NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "px-3.5 py-2 rounded-md transition-colors",
                    isActive
                      ? "text-primary-800 bg-primary-50 font-semibold"
                      : "hover:text-slate-900 hover:bg-slate-50"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Header Actions */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition cursor-pointer"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{language === "en" ? "မြန်မာစာ" : "English"}</span>
            </button>

            <Link to="/guidance-request">
              <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right">
                Get Free Guidance
              </Button>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={toggleLanguage}
              className="px-2 py-1 sm:p-2 text-slate-600 border border-slate-200 rounded-md text-[11px] sm:text-xs font-semibold hover:bg-slate-50 transition"
              aria-label="Toggle language"
            >
              {language === "en" ? "MY" : "EN"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
            <div className="flex flex-col space-y-1">
              {PUBLIC_NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition",
                      isActive
                        ? "bg-primary-50 text-primary-800 font-semibold"
                        : "text-slate-700 hover:bg-slate-50"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link to="/guidance-request" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="md" className="w-full">
                  Get Free Guidance
                </Button>
              </Link>
              <Link to="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="secondary" size="md" className="w-full">
                  Staff Portal Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Page Body */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Clinical Disclaimer & Medical Ethics Notice */}
      <section className="bg-slate-100 border-t border-slate-200 py-6 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex items-start gap-3">
          <HeartHandshake className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-700">Important Medical UX Notice:</strong> TMG Healthcare is an independent cross-border patient assistance and healthcare navigation facilitator. TMG is not a licensed hospital or telehealth clinic, does not provide medical diagnoses, prescriptions, treatment plans, or emergency triage. All medical opinions, examinations, and surgical procedures are executed directly by accredited healthcare institutions and physicians in Thailand.
          </p>
        </div>
      </section>

      {/* Comprehensive Footer */}
      <footer className="bg-primary-950 text-slate-300 pt-12 pb-8 border-t border-primary-900 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded bg-teal-600 text-white font-black flex items-center justify-center text-xs whitespace-nowrap leading-none shrink-0 select-none">
                TMG
              </div>
              <span className="font-bold text-white text-base">TMG Healthcare</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Empathetic healthcare coordination and language-barrier-free medical guidance for Myanmar families seeking trusted medical care across Thailand.
            </p>
            <div className="text-xs text-slate-400 space-y-1">
              <p>Bangkok Liaison Desk: Watthana, Bangkok</p>
              <p>Yangon Patient Center: Bahan, Yangon</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Clinical Specialties</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/specialties/oncology" className="hover:text-white transition">Medical Oncology</Link></li>
              <li><Link to="/specialties/cardiology" className="hover:text-white transition">Cardiology &amp; Cardiac Surgery</Link></li>
              <li><Link to="/specialties/orthopedics" className="hover:text-white transition">Robotic Spine &amp; Orthopedics</Link></li>
              <li><Link to="/specialties/neurology" className="hover:text-white transition">Interventional Neurology</Link></li>
              <li><Link to="/specialties/organ-transplant" className="hover:text-white transition">Living Donor Organ Transplant</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Hospital Network</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/hospitals/bumrungrad-international" className="hover:text-white transition">Bumrungrad International Hospital</Link></li>
              <li><Link to="/hospitals/bangkok-hospital-headquarters" className="hover:text-white transition">Bangkok Hospital HQ (BDMS)</Link></li>
              <li><Link to="/hospitals/medpark-hospital" className="hover:text-white transition">MedPark Hospital</Link></li>
              <li><Link to="/hospitals/samitivej-sukhumvit" className="hover:text-white transition">Samitivej Sukhumvit Hospital</Link></li>
              <li><Link to="/hospitals/vejthani-hospital" className="hover:text-white transition">Vejthani Bone &amp; Spine</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Patient Trust &amp; Legal</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/guidance-request" className="hover:text-white transition">Request Free Medical Guidance</Link></li>
              <li><Link to="/consent" className="hover:text-white transition">Informed Consent Disclosure</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition">Patient Privacy &amp; Data Security</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About TMG Medical Advisory</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Emergency Help &amp; Offices</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-primary-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© 2026 TMG Healthcare Services Co., Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/consent" className="hover:text-white">Consent Agreement</Link>
            <Link to="/contact" className="hover:text-white">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
