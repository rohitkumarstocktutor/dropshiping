'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import {
  FaCheckCircle,
  FaLanguage,
  FaMoneyBillWave,
  FaLaptopCode,
} from 'react-icons/fa';
import { LuHourglass } from 'react-icons/lu';
import { HiOutlineUserGroup } from "react-icons/hi2";
import { BsGraphUpArrow } from "react-icons/bs";
import { formatDate_, timestamp } from '@/lib/utils';

// Declare fbq function for TypeScript
declare global {
  interface Window {
    fbq: (action: string, event: string, data?: Record<string, unknown>) => void;
  }
}

const stats = [
  { label: 'Events Completed Successfully', value: '1000+' },
  { label: 'Expert People Working', value: '50' },
  { label: 'Centers in New York', value: '100' },
  { label: 'Happy Customers', value: '2000' },
];

const strategies = [
  {
    icon: <BsGraphUpArrow size={30} className="text-orange-500" />,
    title: 'Advanced Facebook Ad Strategies',
    description: 'Master the art of high-converting ads to boost your store\'s growth exponentially.',
  },
  {
    icon: <FaMoneyBillWave size={30} className="text-orange-500" />,
    title: 'Financial Freedom',
    description: 'Ready to enjoy more financial and lifestyle freedom through automated dropshipping.',
  },
  {
    icon: <FaLaptopCode size={30} className="text-orange-500" />,
    title: 'Niche Selection',
    description: 'Identify profitable niches with low competition and high demand.',
  },
  {
    icon: <HiOutlineUserGroup size={30} className="text-orange-500" />,
    title: 'Supplier Relationships',
    description: 'Build strong networks with reliable suppliers to ensure product quality.',
  },
];

export default function Page() {
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [wDateTime, setWDateTime] = useState('');
  const [offerEnd, setOfferEnd] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone: string) => /^[0-9]{10}$/.test(phone);

  useEffect(() => {
    // Current date logic for workshop time (simulated for demo if API fails)
    const today = new Date();
    const workshopDate = new Date(today);
    workshopDate.setDate(today.getDate() + 2); // Workshop in 2 days
    workshopDate.setHours(19, 0, 0, 0); // 7 PM
    setWDateTime(formatDate_(workshopDate));

    // Offer end date
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Sep', 'Oct', 'Nov', 'December'];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setOfferEnd(`${months[tomorrow.getMonth()]} ${tomorrow.getDate()}, ${tomorrow.getFullYear()}`);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    const formData = {
      name: userName.trim(),
      email: userEmail.trim(),
      phone: userPhone.trim(),
    };

    let isValid = true;
    const errors: typeof formErrors = {};

    if (!formData.name) {
      errors.name = 'Name is required.';
      isValid = false;
    }
    if (!isValidEmail(formData.email)) {
      errors.email = 'Invalid email address.';
      isValid = false;
    }
    if (!isValidPhone(formData.phone)) {
      errors.phone = 'Invalid phone number.';
      isValid = false;
    }

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    const urlParams = new URLSearchParams(window.location.search);
    const data = {
      submittedAt: timestamp(),
      ...formData,
      WorkShopTime: wDateTime,
      landingPageUrl: window.location.href,
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
    };

    try {
      // Pabbly Webhook
      await fetch('https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTY4MDYzMzA0M2Q1MjZjNTUzZDUxMzMi_pc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      // Redirect to thank you page
      window.location.href = '/thankyou';
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '4050173501915831');fbq('track', 'PageView');`}
      </Script>

      <main className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        {/* Header Alert */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 py-3 text-white">
          <p className="text-center text-lg md:text-xl font-bold uppercase tracking-wide px-4">
            🚀 Join Our Masterclass : Learn, Earn & Grow
          </p>
        </div>

        {/* Hero Section */}
        <section className="bg-white py-8 lg:py-20 px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">

            {/* Left Content: Mentor & Headline */}
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
                Master Dropshipping <br /> <span className="text-orange-600">Build Your Empire</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                Helping individuals achieve financial freedom through dropshipping.
              </p>

              {/* Mentor Stats Box */}
              <div className="bg-gray-50 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 mx-auto md:mx-0">
                  {/* Placeholder for Mentor Image */}
                  <div className="w-full h-full rounded-full bg-gray-300 overflow-hidden relative">
                    <Image
                      src="/image.png"
                      alt="Mentor"
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="text-center md:text-left space-y-2">
                  <h3 className="text-2xl font-bold text-gray-800">Prabhu Selvaraj</h3>
                  <ul className="text-sm md:text-base text-gray-600 space-y-2 pt-2">
                    <li className="flex items-center justify-center md:justify-start gap-2"><FaCheckCircle className="text-green-500 shrink-0" /> Passionate entrepreneur with 10+ years exp.</li>
                    <li className="flex items-center justify-center md:justify-start gap-2"><FaCheckCircle className="text-green-500 shrink-0" /> Mentored 10,000+ aspiring business owners</li>
                    <li className="flex items-center justify-center md:justify-start gap-2"><FaCheckCircle className="text-green-500 shrink-0" /> Generated ₹50 Crore in revenue</li>
                  </ul>
                </div>
              </div>

              {/* Stats Grid - "Achievements" */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl text-center">
                    <div className="text-2xl md:text-3xl font-bold text-orange-600">{stat.value}</div>
                    <div className="text-xs md:text-sm text-gray-500 font-medium mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content: Lead Form */}
            <div className="w-full max-w-md shrink-0 bg-gray-50 rounded-2xl overflow-hidden relative z-10 mx-auto lg:mx-0" id="form">
              <div className="bg-gray-900 py-6 text-center text-white">
                <h3 className="text-2xl font-bold">Register for FREE</h3>
                <p className="text-gray-300 text-sm mt-1">Limited Seats Available!</p>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  {/* Date/Time Info inside form */}
                  <div className="flex items-center justify-between text-sm text-gray-600 bg-white p-3 rounded-lg">
                    <span className="flex items-center gap-2"><LuHourglass className="text-orange-500" /> Duration: 2 Hours</span>
                    <span className="flex items-center gap-2"><FaLanguage className="text-orange-500" /> Hindi + English</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="e.g. Rohit Kumar"
                      className="w-full px-4 py-3 border-b-2 border-gray-200 bg-transparent focus:border-orange-500 focus:outline-none transition"
                    />
                    {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="e.g. rohit@example.com"
                      className="w-full px-4 py-3 border-b-2 border-gray-200 bg-transparent focus:border-orange-500 focus:outline-none transition"
                    />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <div className="flex border-b-2 border-gray-200 focus-within:border-orange-500 transition">
                      <span className="inline-flex items-center px-4 text-gray-600 font-medium">
                        +91
                      </span>
                      <input
                        type="tel"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        placeholder="9876543210"
                        className="w-full px-4 py-3 bg-transparent focus:outline-none"
                      />
                    </div>
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-4 rounded-lg text-lg hover:from-orange-600 hover:to-red-700 transition transform hover:-translate-y-0.5"
                  >
                    {isSubmitting ? 'Processing...' : 'Secure My Spot Now'}
                  </button>
                  <p className="text-xs text-center text-gray-400">No payment required. 100% Free.</p>
                </form>
              </div>
            </div>

          </div>
        </section>

        {/* Strategies Section */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">What You Will Learn</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {strategies.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl hover:bg-orange-50 transition duration-300">
                  <div className="mb-4 text-orange-500 w-16 h-16 flex items-center justify-center mx-auto">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-center text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer/Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white py-4 px-4 lg:hidden border-t-2 border-gray-100">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div>
              <p className="text-xs text-gray-500">Offer ends: {offerEnd}</p>
              <p className="font-bold text-lg text-orange-600">FREE ENTRY</p>
            </div>
            <Link href="#form">
              <button className="bg-orange-600 text-white px-6 py-2.5 rounded-lg font-bold">Register Now</button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
