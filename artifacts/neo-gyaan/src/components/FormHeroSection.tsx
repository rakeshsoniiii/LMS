import React from 'react';
import { Link } from 'wouter';
import { 
  ArrowRight, LayoutGrid, Compass, BarChart3, Sparkles, 
  Layers, Copy, Check, Smartphone, Tablet, Star, ShieldCheck, 
  Zap, Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import { IsometricHeroGraphic } from './IsometricHeroGraphic';

export function FormHeroSection() {
  return (
    <div className="w-full border-b border-[#071a33]/10 bg-[#fbfaf6] text-[#071a33] overflow-hidden">
      {/* ========================================================== */}
      {/* 1. HERO TOP SPLIT — FULL BLEED, SCREEN FILLING, ZERO GAPS */}
      {/* ========================================================== */}
      <section className="relative w-full border-b border-[#071a33]/10">
        
        {/* Subtle architectural dot grid background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(#071a33 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient atmospheric glows */}
        <div className="absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full bg-[#c7f000]/12 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 right-8 w-[550px] h-[550px] rounded-full bg-[#071a33]/5 blur-[130px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px] lg:min-h-[520px] xl:min-h-[550px]">
          
          {/* ---------------------------------------------------- */}
          {/* LEFT COLUMN: Premium Typography, LMS Value, CTAs    */}
          {/* ---------------------------------------------------- */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-between px-6 sm:px-10 lg:px-14 xl:px-18 py-8 sm:py-10 lg:py-12 relative z-10 border-b lg:border-b-0 lg:border-r border-[#071a33]/10 bg-[#fbfaf6]">
            <div>
              {/* Live Academy Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#071a33]/15 bg-white px-3.5 py-1.5 text-[11px] font-mono-custom font-bold text-[#071a33] mb-5 shadow-xs">
                <span className="h-2 w-2 rounded-full bg-[#829900] animate-pulse" />
                <span className="tracking-wider uppercase">NEO GYAAN • ACADEMY FOR BUILDERS</span>
              </div>

              {/* Iconic Headline */}
              <h1 className="font-display text-[2.6rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[4.2rem] xl:text-[4.8rem] font-bold leading-[0.94] tracking-[-0.045em] text-[#071a33]">
                Everything<br />
                in its place
              </h1>

              {/* Subtitle */}
              <p className="mt-5 text-sm sm:text-base leading-[1.65] text-[#4d5b66] max-w-[480px]">
                Neo Gyaan is an engineering & digital craft academy for ambitious creators. Modular curricula. Production-grade projects. Built to help your work stand out.
              </p>

              {/* CTA Group matching reference style */}
              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <Link 
                  href="/courses"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#c7f000] px-6 py-3 text-sm font-bold text-[#071a33] transition-all duration-300 hover:bg-[#d5fb2b] hover:shadow-[0_8px_24px_rgba(199,240,0,0.38)] hover:-translate-y-0.5"
                  data-testid="button-hero-explore-work"
                >
                  <span className="tracking-tight">Explore our courses</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 stroke-[2.4]" />
                </Link>

                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-full border border-[#071a33]/20 bg-white hover:bg-[#f6f5ef] px-5 py-3 text-sm font-bold text-[#071a33] transition-all duration-200 hover:border-[#071a33]/35 shadow-xs"
                  data-testid="button-hero-view-pricing"
                >
                  <span>View pricing</span>
                </Link>
              </div>
            </div>

            {/* Bottom Social Proof Bar with strong contrast */}
            <div className="mt-8 pt-5 border-t border-[#071a33]/12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              {/* Avatars Stack */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces" alt="Student" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces" alt="Student" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces" alt="Student" />
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#071a33] text-[10px] font-bold text-[#c7f000] ring-2 ring-white shadow-sm">
                    +50k
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[#071a33]">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} className="fill-[#bceb00] text-[#718500]" />
                      ))}
                    </div>
                    <span className="text-[13px] font-extrabold text-[#071a33]">4.9 / 5</span>
                  </div>
                  <p className="text-[11px] font-semibold text-[#3b4751]">14,200+ verified alumni</p>
                </div>
              </div>

              {/* Fast Feature Tags */}
              <div className="flex items-center gap-2.5 font-mono-custom text-[11px] font-bold text-[#071a33]">
                <span className="inline-flex items-center gap-1 rounded-md bg-[#071a33]/5 px-2.5 py-1">
                  <Check size={13} className="text-[#647500] stroke-[3]" /> 100+ Courses
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-[#071a33]/5 px-2.5 py-1">
                  <Check size={13} className="text-[#647500] stroke-[3]" /> Diplomas
                </span>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* RIGHT COLUMN: 3D Isometric Visual Board + Floating UI */}
          {/* ---------------------------------------------------- */}
          <div className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center p-6 sm:p-8 lg:p-10 xl:p-12 bg-[#f3f2eb] overflow-hidden">
            
            {/* Subtle architectural cross grid */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage: `radial-gradient(#071a33 1.5px, transparent 1.5px)`,
                backgroundSize: '24px 24px'
              }}
            />

            {/* Glowing radial backdrop behind the 3D graphic */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-[#c7f000]/14 blur-[100px] pointer-events-none" />

            {/* Main Scaled 3D Isometric Illustration */}
            <div className="relative z-10 w-full max-w-[660px] xl:max-w-[700px] transition-transform duration-500">
              <IsometricHeroGraphic />
            </div>

            {/* Floating Badge 1: Live Masterclass (Top-Left) */}
            <div className="absolute top-5 sm:top-7 left-5 sm:left-8 z-20 hidden sm:flex items-center gap-2 rounded-full border border-[#071a33]/15 bg-white px-3.5 py-1.5 shadow-md">
              <span className="h-2 w-2 rounded-full bg-[#728500] animate-pulse" />
              <span className="text-[11px] font-bold text-[#071a33]">Architecture & System Design</span>
              <span className="rounded-full bg-[#071a33] text-[9px] font-bold uppercase tracking-wider text-[#c7f000] px-2 py-0.5">Live Cohort</span>
            </div>

            {/* Floating Badge 2: Career Stat Badge (Top-Right) */}
            <div className="absolute top-5 sm:top-7 right-5 sm:right-8 z-20 hidden sm:flex items-center gap-2 rounded-full border border-white/20 bg-[#071a33] px-3.5 py-1.5 text-white shadow-lg">
              <Zap size={13} className="text-[#c7f000]" />
              <span className="text-[11px] font-bold tracking-tight">94% Placement Rate</span>
            </div>

            {/* Floating Badge 3: Industry Verified (Bottom-Right) */}
            <div className="absolute bottom-5 sm:bottom-7 right-5 sm:right-8 z-20 hidden md:flex items-center gap-2.5 rounded-xl border border-[#071a33]/15 bg-white px-3 py-2 shadow-lg">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#c7f000] text-[#071a33]">
                <ShieldCheck size={16} />
              </span>
              <div>
                <p className="text-[11px] font-bold text-[#071a33] leading-none">Industry Verified</p>
                <p className="text-[10px] font-medium text-[#4f5c66] mt-0.5">Verifiable on LinkedIn</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================== */}
      {/* 2. THREE BENTO CARDS ROW — FULL BLEED, ZERO WASTED SPACE   */}
      {/* ========================================================== */}
      <section className="hidden md:grid md:grid-cols-3 border-b border-[#071a33]/10 bg-[#fbfaf6]">
        
        {/* Card 1: Modular by design (Dark Navy) */}
        <Link 
          href="/courses" 
          className="group p-8 lg:p-9 bg-[#071a33] text-[#f7f6f1] flex flex-col justify-between border-r border-white/10 hover:bg-[#0c2444] transition-all duration-300"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[#c7f000] grid h-10 w-10 place-items-center rounded-xl bg-white/5 border border-white/10">
                <LayoutGrid size={22} />
              </span>
              <span className="text-white/40 group-hover:text-[#c7f000] transition-all duration-300 group-hover:translate-x-1">
                <ArrowRight size={18} />
              </span>
            </div>
            <h3 className="mt-7 font-display text-2xl font-bold tracking-tight text-white">
              Modular by design
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[#a1b1bd] max-w-[340px]">
              Flexible curricula, isolated modules, and production projects that adapt to your schedule and goals.
            </p>
          </div>

          {/* Blueprint wireframe UI visualization */}
          <div className="mt-8 border border-white/15 rounded-xl p-3 bg-white/5 space-y-2 transition-transform duration-300 group-hover:scale-[1.02]">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-4 h-6 rounded-lg border border-white/15 bg-white/5" />
              <div className="col-span-8 h-6 rounded-lg border border-white/15 bg-white/5" />
            </div>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-4 h-7 rounded-lg bg-[#c7f000] shadow-[0_0_20px_rgba(199,240,0,0.25)] flex items-center justify-center">
                <span className="h-1.5 w-8 rounded-full bg-[#071a33]/40" />
              </div>
              <div className="col-span-5 h-7 rounded-lg border border-white/15 bg-white/5" />
              <div className="col-span-3 h-7 rounded-lg border border-dashed border-white/30" />
            </div>
          </div>
        </Link>

        {/* Card 2: Crafted for clarity (Porcelain Light) */}
        <Link 
          href="/courses" 
          className="group p-8 lg:p-9 bg-[#fbfaf6] text-[#071a33] flex flex-col justify-between border-r border-[#071a33]/10 hover:bg-[#f6f5ef] transition-all duration-300"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[#728500] grid h-10 w-10 place-items-center rounded-xl bg-[#071a33]/5 border border-[#071a33]/10">
                <Compass size={22} />
              </span>
              <span className="text-[#071a33]/30 group-hover:text-[#728500] transition-all duration-300 group-hover:translate-x-1">
                <ArrowRight size={18} />
              </span>
            </div>
            <h3 className="mt-7 font-display text-2xl font-bold tracking-tight text-[#071a33]">
              Crafted for clarity
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[#596670] max-w-[340px]">
              Clean mental models, zero video filler, balanced spacing, and purposeful visual architecture.
            </p>
          </div>

          {/* Typography specimen & hierarchy bars */}
          <div className="mt-8 flex items-center gap-6 transition-transform duration-300 group-hover:scale-[1.02]">
            <span className="font-display text-6xl lg:text-7xl font-bold text-[#071a33] tracking-tighter leading-none select-none">
              Ag
            </span>
            <div className="flex-1 space-y-2">
              <div className="h-2.5 rounded-full bg-[#c7f000] w-full shadow-xs" />
              <div className="h-2.5 rounded-full bg-[#c2c6cb] w-[75%]" />
              <div className="h-2.5 rounded-full bg-[#e2e5e8] w-[45%]" />
            </div>
          </div>
        </Link>

        {/* Card 3: Structured to scale (Porcelain Light) */}
        <Link 
          href="/courses" 
          className="group p-8 lg:p-9 bg-[#fbfaf6] text-[#071a33] flex flex-col justify-between hover:bg-[#f6f5ef] transition-all duration-300"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[#728500] grid h-10 w-10 place-items-center rounded-xl bg-[#071a33]/5 border border-[#071a33]/10">
                <BarChart3 size={22} />
              </span>
              <span className="text-[#071a33]/30 group-hover:text-[#728500] transition-all duration-300 group-hover:translate-x-1">
                <ArrowRight size={18} />
              </span>
            </div>
            <h3 className="mt-7 font-display text-2xl font-bold tracking-tight text-[#071a33]">
              Structured to scale
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[#596670] max-w-[340px]">
              Built on battle-tested engineering patterns so your knowledge grows with industry standards.
            </p>
          </div>

          {/* Growth curve trend visual */}
          <div className="mt-8 transition-transform duration-300 group-hover:scale-[1.02]">
            <svg viewBox="0 0 240 64" className="w-full h-14 overflow-visible">
              <line x1="0" y1="18" x2="240" y2="18" stroke="#071a33" strokeOpacity="0.08" strokeDasharray="3 3" />
              <line x1="0" y1="38" x2="240" y2="38" stroke="#071a33" strokeOpacity="0.08" strokeDasharray="3 3" />
              <line x1="0" y1="58" x2="240" y2="58" stroke="#071a33" strokeOpacity="0.08" />
              <path 
                d="M 8,54 Q 55,50 95,40 T 165,28 T 232,8" 
                stroke="#071a33" 
                strokeWidth="2.4" 
                fill="none" 
                strokeLinecap="round" 
              />
              <circle cx="8" cy="54" r="3.5" fill="#fff" stroke="#071a33" strokeWidth="2" />
              <circle cx="95" cy="40" r="3.5" fill="#fff" stroke="#071a33" strokeWidth="2" />
              <circle cx="165" cy="28" r="3.5" fill="#fff" stroke="#071a33" strokeWidth="2" />
              <circle cx="232" cy="8" r="5.5" fill="#c7f000" stroke="#071a33" strokeWidth="2" className="animate-pulse" />
            </svg>
          </div>
        </Link>
      </section>

      {/* ========================================================== */}
      {/* 3. MOBILE BENTO CARDS                                      */}
      {/* ========================================================== */}
      <section className="md:hidden px-4 py-6 space-y-3 bg-[#f3f2eb]">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-[#071a33]/10 bg-white p-4 flex flex-col justify-between shadow-xs">
            <div>
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#c7f000] text-[#071a33] mb-3">
                <LayoutGrid size={18} />
              </span>
              <h4 className="font-display text-sm font-bold text-[#071a33]">Modular Curricula</h4>
              <p className="mt-1 text-[11px] leading-snug text-[#65717a]">Flexible sections that keep content structured.</p>
            </div>
            <div className="mt-4 flex justify-end">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#c7f000] text-[#071a33]">
                <ArrowRight size={12} />
              </span>
            </div>
          </div>

          <div className="rounded-2xl bg-[#071a33] p-4 text-white flex flex-col justify-between shadow-xs">
            <div>
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#c7f000] text-[#071a33] mb-3">
                <Layers size={18} />
              </span>
              <h4 className="font-display text-sm font-bold text-white">Modular by design</h4>
              <p className="mt-1 text-[11px] leading-snug text-[#a4b3be]">Reusable components that scale with you.</p>
            </div>
            <div className="mt-4 flex justify-end">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#c7f000] text-[#071a33]">
                <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-[#071a33] p-5 text-white shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#c7f000] text-[#071a33]">
              <Compass size={18} />
            </span>
            <div>
              <h4 className="font-display text-sm font-bold text-white">Crafted for clarity</h4>
              <p className="text-[11px] text-[#a0aeb8]">Consistent styles, tokens, and senior reviews.</p>
            </div>
          </div>
          <div className="rounded-xl bg-[#0d2642] p-3 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-display text-2xl font-bold text-white">Ag</span>
              <div className="space-y-1">
                <div className="h-1.5 w-12 rounded-full bg-[#c7f000]" />
                <div className="h-1.5 w-8 rounded-full bg-white/30" />
              </div>
            </div>
            <span className="rounded-lg bg-[#c7f000] px-2.5 py-1 text-[10px] font-bold text-[#071a33] flex items-center gap-1">
              <Check size={12} /> Verified
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================== */}
      {/* 4. BOTTOM STRIP — 4 HIGHLIGHT PILLARS (FULL WIDTH)         */}
      {/* ========================================================== */}
      <section className="hidden lg:grid lg:grid-cols-4 bg-[#071a33] text-[#f7f6f1]">
        
        {/* Item 1 */}
        <div className="px-8 py-5 flex items-center gap-4 border-r border-white/10">
          <span className="text-[#c7f000] shrink-0">
            <Sparkles size={20} />
          </span>
          <div>
            <h4 className="font-display text-[13px] font-bold text-white tracking-tight">Original curricula</h4>
            <p className="text-[11px] text-[#9db0bb]">Designed for builders, crafted for you.</p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="px-8 py-5 flex items-center gap-4 border-r border-white/10">
          <span className="text-[#c7f000] shrink-0">
            <Copy size={19} />
          </span>
          <div>
            <h4 className="font-display text-[13px] font-bold text-white tracking-tight">Interactive sandboxes</h4>
            <p className="text-[11px] text-[#9db0bb]">Code, test, and ship in real-time.</p>
          </div>
        </div>

        {/* Item 3 */}
        <div className="px-8 py-5 flex items-center gap-4 border-r border-white/10">
          <span className="text-[#c7f000] shrink-0">
            <Layers size={19} />
          </span>
          <div>
            <h4 className="font-display text-[13px] font-bold text-white tracking-tight">Consistent everywhere</h4>
            <p className="text-[11px] text-[#9db0bb]">Keep your learning experience tight.</p>
          </div>
        </div>

        {/* Item 4 (CTA Link) */}
        <Link 
          href="/courses" 
          className="px-8 py-5 flex items-center justify-between hover:bg-[#0d2644] transition-colors group"
        >
          <div className="flex items-center gap-3.5">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#c7f000] text-[#071a33] transition-transform duration-300 group-hover:scale-110 shadow-md">
              <ArrowRight size={14} />
            </span>
            <div>
              <h4 className="font-display text-[13px] font-bold text-white tracking-tight">View all courses</h4>
              <p className="text-[11px] text-[#c7f000]">Browse the full academy.</p>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
