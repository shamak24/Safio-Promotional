import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import * as QRCode from 'qrcode.react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const [showQR, setShowQR] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  
  // Stats for the counter section
  const stats = [
    { label: 'Protected Users', value: 50000, suffix: '+' },
    { label: 'Threats Blocked', value: 1000000, suffix: '+' },
    { label: 'App Rating', value: 4.8, suffix: '/5' },
    { label: 'Countries', value: 25, suffix: '+' },
  ];

  useEffect(() => {
    // Hero animations
    const tl = gsap.timeline();
    tl.from('.hero-title', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
      .from('.hero-sub', { y: 20, opacity: 0, duration: 0.6 }, '-=0.5')
      .from('.hero-ctas', { scale: 0.95, opacity: 0, duration: 0.5 }, '-=0.4')
      .from('.hero-shape', { 
        scale: 0.8,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'elastic.out(1, 0.8)'
      }, '-=0.5');

    // Animate floating shapes
    gsap.to('.hero-shape', {
      y: 'random(-20, 20)',
      x: 'random(-20, 20)',
      rotation: 'random(-15, 15)',
      duration: 'random(2, 4)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        each: 0.2,
        from: 'random'
      }
    });

    // Feature cards animation
    gsap.utils.toArray('.feature-card').forEach((el, i) => {
      gsap.from(el, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        delay: i * 0.12,
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });
    });

    // Stats counter animation
    const statsElements = gsap.utils.toArray('.stat-value');
    statsElements.forEach((el) => {
      const target = parseFloat(el.getAttribute('data-value'));
      const suffix = el.getAttribute('data-suffix');
      
      gsap.to(el, {
        textContent: target,
        duration: 2,
        ease: 'power1.out',
        snap: { textContent: 0.1 },
        stagger: 1,
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 85%',
        },
        onUpdate: function() {
          el.textContent = this.targets()[0].textContent.slice(0, 4) + suffix;
        },
      });
    });
  }, []);

  const apkUrl = '/assets/safio.apk';
  const apkMeta = {
    size: '12.4 MB',
    version: '0.9.1',
    sha256: 'REPLACE_WITH_REAL_SHA256',
  };

  function handleDownload() {
    console.log('Download clicked');
    const t = document.createElement('div');
    t.className = 'fixed bottom-6 right-6 bg-black/80 text-white px-6 py-3 rounded-xl border border-white/10 shadow-lg';
    t.textContent = 'Download started — check your device';
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 4000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Background gradient orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-safioRed/30 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[128px] animate-pulse" />
        </div>

        <header className="relative max-w-7xl mx-auto px-6 py-8 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-safioRed to-red-700 flex items-center justify-center text-2xl font-bold shadow-lg shadow-safioRed/20">
            <span className="bg-gradient-to-br from-white to-gray-300 text-transparent bg-clip-text">S</span>
          </div>
          <div>
            <p className="text-sm text-white/80">Cyber Safety Made Simple</p>
          </div>
            </div>
            <nav className="hidden md:flex items-center gap-8">
          <a href="#how" className="hover:text-safioRed transition-all text-white">How it Works</a>
          <a href="#testimonials" className="hover:text-safioRed transition-all text-white">Testimonials</a>
          <a href="#download" className="hover:text-safioRed transition-all text-white">Download</a>
          <a
            href="mailto:hello@safio.app"
            className="px-5 py-2 bg-gradient-to-r from-white to-gray-200 text-black rounded-lg hover:from-safioRed hover:to-red-700 hover:text-white transition-all shadow-lg"
          >
            Contact
          </a>
            </nav>
            <button className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-all text-white">☰</button>
          </div>
        </header>

        <main className="relative max-w-7xl mx-auto px-6 z-10">
          <section ref={heroRef} className="relative py-16 text-center">
            <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            {/* Fix: Use span for gradient text and ensure text is visible */}
            <h1 className="hero-title text-5xl md:text-6xl font-black mb-6">
              <span className=" text-white bg-clip-text">Safio</span>
            </h1>
            <p className="hero-sub text-xl text-white/80 max-w-2xl mx-auto">
              <span>
          Safio is your trusted companion in the digital world, offering advanced cyber protection 
          to keep your family safe from online threats. Our AI-powered security system provides 
          real-time protection against malware, suspicious links, and harmful content.
              </span>
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
            <div className="flex flex-col items-center">
              <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-white/60">Version {apkMeta.version}</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">{apkMeta.size}</span>
            </div>
            <div className="text-white/80">Compatible with Android 8.0 and above</div>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mb-6">
            <a
              href={apkUrl}
              download
              onClick={handleDownload}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-safioRed to-red-700 text-white rounded-lg font-semibold hover:brightness-110 transition-all shadow-lg shadow-safioRed/25 transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download APK
            </a>
            <button
              onClick={() => setShowQR((s) => !s)}
              className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition-all transform hover:-translate-y-0.5 text-white"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
              Scan QR Code
            </button>
              </div>

              {showQR && (
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 shadow-xl">
              <QRCode.default
          value={window.location.origin + apkUrl}
          size={160}
          bgColor="#000000"
          fgColor="#ffffff"
          level="H"
          includeMargin={true}
              />
              <p className="mt-3 text-center text-white/80 text-sm">Scan to download</p>
            </div>
              )}
            </div>
          </div>
            </div>
          </section>

          {/* Stats Section */}
        <section ref={statsRef} className="py-16 border-t border-b border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div 
                  className="stat-value text-4xl font-black bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text mb-2"
                  data-value={stat.value}
                  data-suffix={stat.suffix}
                >
                  0
                </div>
                <div className="text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
        {/* Features Section */}
        <section id="features" className="py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Real-time Protection',
                desc: 'Instant detection and blocking of suspicious links, malware, and harmful content. Our AI analyzes threats in milliseconds.',
                emoji: '🛡️',
                color: 'from-blue-500 to-blue-700',
                detail: 'Blocks malicious URLs • Prevents data theft • Scans downloads'
              },
              {
                title: 'Smart Analysis',
                desc: 'Advanced AI algorithms constantly learn and adapt to new threats, providing proactive protection for your family.',
                emoji: '🤖',
                color: 'from-purple-500 to-purple-700',
                detail: 'Machine learning • Pattern recognition • Behavioral analysis'
              },
              {
                title: 'Privacy Control',
                desc: 'Take control of your digital privacy with granular app permissions and comprehensive tracking prevention.',
                emoji: '🔒',
                color: 'from-green-500 to-green-700',
                detail: 'App permissions • Data protection • Identity safeguards'
              },
              {
                title: 'Family Dashboard',
                desc: 'Monitor and manage safety settings for your entire family from one intuitive, easy-to-use dashboard.',
                emoji: '📱',
                color: 'from-amber-500 to-amber-700',
                detail: 'Activity monitoring • Screen time • Content filtering'
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="feature-card p-8 bg-white/5 backdrop-blur rounded-2xl border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform`}>
                    {feature.emoji}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
                      {feature.title}
                    </h4>
                    <p className="text-white/80 mb-4">{feature.desc}</p>
                    <div className="text-sm text-white/60">{feature.detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="how" className="py-24">
          <h3 className="text-4xl font-black text-center mb-4 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
            How It Works
          </h3>
          <p className="text-white/60 text-center mb-16 max-w-2xl mx-auto">
            Safio works seamlessly in the background to keep your family protected with our three-step protection system.
          </p>

          <div className="relative">
            {/* Connection lines */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-safioRed via-purple-500 to-blue-500 hidden md:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Scan', 'Analyze', 'Protect'].map((step, i) => (
                <div key={i} className="relative p-8 bg-white/5 backdrop-blur rounded-2xl border border-white/10 text-center group hover:border-white/20 transition-all">
                  <div className={`w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center text-3xl shadow-lg
                    ${i === 0 ? 'bg-gradient-to-br from-safioRed to-red-700' :
                      i === 1 ? 'bg-gradient-to-br from-purple-500 to-purple-700' :
                      'bg-gradient-to-br from-blue-500 to-blue-700'
                    } group-hover:scale-110 transition-transform`}
                  >
                    {['🔍', '💡', '🛡️'][i]}
                  </div>
                  <h4 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
                    {step}
                  </h4>
                  <p className="text-white/80 mb-4">
                    {[
                      'Continuous monitoring of online activity and app behavior',
                      'AI-powered threat detection and risk assessment',
                      'Real-time protection and instant notifications'
                    ][i]}
                  </p>
                  <div className="text-sm text-white/60">
                    {[
                      'URL scanning • App analysis • Content filtering',
                      'Machine learning • Pattern matching • Risk scoring',
                      'Threat blocking • Alert system • Reports'
                    ][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 border-t border-white/10">
          <h3 className="text-4xl font-black text-center mb-4 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
            What Parents Say
          </h3>
          <p className="text-white/60 text-center mb-16 max-w-2xl mx-auto">
            Join thousands of satisfied parents who trust Safio to protect their families online.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Safio gives me peace of mind knowing my kids are protected online. The real-time alerts are fantastic!",
                author: "Sarah M.",
                role: "Parent of 2",
                avatar: "👩"
              },
              {
                quote: "Easy to set up and very effective. It's caught several suspicious links that my teenager almost clicked.",
                author: "Michael R.",
                role: "Parent of 3",
                avatar: "👨"
              },
              {
                quote: "The family dashboard is intuitive and the protection is top-notch. Highly recommend to all parents!",
                author: "Jessica K.",
                role: "Parent of 1",
                avatar: "👩"
              }
            ].map((testimonial, i) => (
              <div key={i} className="p-8 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
                <div className="flex flex-col h-full">
                  <div className="text-2xl mb-6">⭐⭐⭐⭐⭐</div>
                  <p className="text-white/80 mb-6 flex-1">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-safioRed to-red-700 flex items-center justify-center text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-white/60">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 border-t border-white/10">
          <h3 className="text-4xl font-black text-center mb-4 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
            Frequently Asked Questions
          </h3>
          <p className="text-white/60 text-center mb-16 max-w-2xl mx-auto">
            Everything you need to know about Safio and how it protects your family.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                q: "How does Safio protect my family?",
                a: "Safio uses advanced AI to monitor online activity, block threats, and prevent access to harmful content in real-time."
              },
              {
                q: "Is Safio easy to set up?",
                a: "Yes! Installation takes less than 5 minutes, and our intuitive interface makes it easy to manage protection for the whole family."
              },
              {
                q: "What devices does Safio support?",
                a: "Safio works on Android devices (version 8.0 and up). iOS version coming soon!"
              },
              {
                q: "How much does Safio cost?",
                a: "Safio is free to try for 30 days. After that, plans start at $4.99/month for the whole family."
              }
            ].map((faq, i) => (
              <div key={i} className="p-6 bg-white/5 backdrop-blur rounded-xl border border-white/10">
                <h4 className="text-lg font-semibold mb-2">{faq.q}</h4>
                <p className="text-white/80">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Download Section */}
        <section id="download" className="py-24 border-t border-white/10">
          <div className="p-12 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur rounded-2xl border border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <h4 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
                  Protect Your Family Today
                </h4>
                <p className="text-white/80">Version {apkMeta.version} • {apkMeta.size}</p>
                <ul className="mt-4 text-white/60 text-sm">
                  <li className="flex items-center gap-2">✓ Free 30-day trial</li>
                  <li className="flex items-center gap-2">✓ Easy setup</li>
                  <li className="flex items-center gap-2">✓ 24/7 support</li>
                </ul>
              </div>
              <div className="flex gap-4">
                <a
                  href={apkUrl}
                  download
                  onClick={handleDownload}
                  className="px-8 py-3 bg-gradient-to-r from-safioRed to-red-700 text-white rounded-lg font-semibold hover:brightness-110 transition-all shadow-lg shadow-safioRed/25 transform hover:-translate-y-0.5"
                >
                  Download APK
                </a>
                <button
                  onClick={() => setShowQR((s) => !s)}
                  className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition-all transform hover:-translate-y-0.5"
                >
                  Show QR
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 mt-16 relative">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-safioRed to-red-700 flex items-center justify-center text-xl font-bold">
                  <span className="bg-gradient-to-br from-white to-gray-300 text-transparent bg-clip-text">S</span>
                </div>
                <div className="font-bold text-lg">Safio</div>
              </div>
              <p className="text-white/60 mb-4">Protecting families online with advanced AI technology.</p>
              <div className="flex gap-4">
                <a href="#" className="text-white/40 hover:text-white transition-all">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="text-white/40 hover:text-white transition-all">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="text-white/40 hover:text-white transition-all">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.891 18.166c-.214.41-.697.682-1.203.682H7.312c-.506 0-.989-.272-1.203-.682-.458-.878-.688-1.87-.688-2.832 0-3.536 2.914-6.424 6.424-6.424 3.51 0 6.424 2.888 6.424 6.424 0 .962-.23 1.954-.688 2.832zM12 4.93c1.409 0 2.553 1.144 2.553 2.553S13.409 10.036 12 10.036 9.447 8.892 9.447 7.483 10.591 4.93 12 4.93z"/></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Product</h5>
              <ul className="space-y-3">
                <li><a href="#features" className="text-white/60 hover:text-white transition-all">Features</a></li>
                <li><a href="#how" className="text-white/60 hover:text-white transition-all">How It Works</a></li>
                <li><a href="#pricing" className="text-white/60 hover:text-white transition-all">Pricing</a></li>
                <li><a href="#faq" className="text-white/60 hover:text-white transition-all">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-3">
                <li><a href="/about" className="text-white/60 hover:text-white transition-all">About Us</a></li>
                <li><a href="/blog" className="text-white/60 hover:text-white transition-all">Blog</a></li>
                <li><a href="/careers" className="text-white/60 hover:text-white transition-all">Careers</a></li>
                <li><a href="/contact" className="text-white/60 hover:text-white transition-all">Contact</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Legal</h5>
              <ul className="space-y-3">
                <li><a href="/terms" className="text-white/60 hover:text-white transition-all">Terms of Service</a></li>
                <li><a href="/privacy" className="text-white/60 hover:text-white transition-all">Privacy Policy</a></li>
                <li><a href="/cookies" className="text-white/60 hover:text-white transition-all">Cookie Policy</a></li>
                <li><a href="/licenses" className="text-white/60 hover:text-white transition-all">Licenses</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60">© {new Date().getFullYear()} Safio. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-white/60 focus:outline-none focus:border-white/20">
                <option>🇺🇸 English</option>
                <option>🇪🇸 Español</option>
                <option>🇫🇷 Français</option>
              </select>
              <a href="#" className="text-white/60 hover:text-safioRed transition-all text-sm">
                <span className="mr-2">↑</span> Back to top
              </a>
            </div>
          </div>
        </div>

        {/* Background gradient */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </footer>
    </div>
  );
}
