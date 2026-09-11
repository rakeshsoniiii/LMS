import React, { type ComponentType, type ReactNode, useMemo, useState, createContext, useContext } from 'react';
import { Link, Route, Switch, useLocation, useParams } from 'wouter';
import { 
  type LucideIcon, ArrowLeft, ArrowRight, Award, BarChart3, BookOpen, 
  BriefcaseBusiness, Check, CheckCircle2, ChevronDown, Clock3, Code2, 
  Compass, Download, FileText, Flame, Globe, Heart, HelpCircle, Laptop2, 
  LayoutGrid, Lightbulb, ListFilter, Lock, Menu, MessageCircle, Play, 
  QrCode, Search, Share2, ShieldCheck, Sparkles, Star, Target, TrendingUp, 
  Users, X, Zap, Building2, Smartphone, CreditCard, Terminal, Eye, Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { PaymentModal, type PaymentItem } from '@/components/PaymentModal';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

// Payment Context for Global Triggering
interface PaymentContextType {
  openCheckout: (item: PaymentItem) => void;
}
const PaymentContext = createContext<PaymentContextType>({ openCheckout: () => {} });
export const usePayment = () => useContext(PaymentContext);

type Lesson = { title: string; duration: string; free?: boolean };
type Module = { title: string; lessons: Lesson[] };
export type Course = {
  id: string; title: string; category: string; level: string; instructor: string; rating: number;
  learners: string; duration: string; price: number; originalPrice: number; badge: string;
  image: string; description: string; accent: string; modules: Module[];
};

const images = {
  web: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1200',
  data: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200',
  design: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
  react: 'https://images.pexels.com/photos/1181279/pexels-photo-1181279.jpeg?auto=compress&cs=tinysrgb&w=1200',
  marketing: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1200',
  business: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200',
  graphic: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1200',
  communication: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1200',
};

const lessonSets = (first: string): Module[] => [
  { title: '01 / Foundations & Architecture', lessons: [{ title: `Welcome to ${first}`, duration: '08:42', free: true }, { title: 'The Mental Model & Design Choices', duration: '14:20' }, { title: 'Setting Up Your Modern Workspace', duration: '11:06' }] },
  { title: '02 / Project Execution', lessons: [{ title: 'Hands-on Implementation Phase 1', duration: '18:40' }, { title: 'Working with Production Constraints', duration: '16:12' }, { title: 'Refactoring & Code Reviews', duration: '12:08' }] },
  { title: '03 / Production Shipping', lessons: [{ title: 'From Local Draft to Deployed Asset', duration: '21:18' }, { title: 'A Systematic Workflow You Can Repeat', duration: '15:38' }] },
];

export const courses: Course[] = [
  { id: 'web-development', title: 'Complete Web Development Bootcamp', category: 'Development', level: 'Beginner', instructor: 'Arjun Mehta', rating: 4.8, learners: '13.2K', duration: '62h', price: 1499, originalPrice: 2999, badge: 'BEST SELLER', image: images.web, accent: 'navy', description: 'Go from a blank editor to shipping responsive, accessible web experiences with HTML, CSS, JavaScript and the modern web platform.', modules: lessonSets('Web Development') },
  { id: 'data-science', title: 'Python for Data Science & Machine Learning', category: 'Data Science', level: 'Intermediate', instructor: 'Dr. Angela Yu', rating: 4.9, learners: '8.7K', duration: '48h', price: 1299, originalPrice: 2599, badge: 'POPULAR', image: images.data, accent: 'lime', description: 'Turn messy data into decisions. Learn Python, statistics, visualisation and machine learning through real-world datasets.', modules: lessonSets('Data Science') },
  { id: 'ui-ux-design', title: 'UI/UX Design Masterclass & Systems', category: 'Design', level: 'Beginner', instructor: 'Jacob Jones', rating: 4.7, learners: '6.3K', duration: '38h', price: 1399, originalPrice: 2799, badge: 'NEW', image: images.design, accent: 'cream', description: 'Build a sharp product design practice: research, interaction, visual systems, prototypes and a portfolio that commands industry attention.', modules: lessonSets('UI/UX Design') },
  { id: 'react-typescript', title: 'Advanced React & TypeScript Patterns', category: 'Development', level: 'Advanced', instructor: 'Rohan Kapoor', rating: 4.9, learners: '4.2K', duration: '31h', price: 1799, originalPrice: 3599, badge: 'STAFF PICK', image: images.react, accent: 'navy', description: 'Write React that scales. Modern composition, state machines, type-safe APIs, testing and clean architecture for serious frontends.', modules: lessonSets('React & TypeScript') },
  { id: 'digital-marketing', title: 'Digital Marketing & Growth Engine', category: 'Marketing', level: 'Intermediate', instructor: 'Nisha Verma', rating: 4.6, learners: '5.8K', duration: '24h', price: 999, originalPrice: 1999, badge: 'POPULAR', image: images.marketing, accent: 'lime', description: 'Build an evidence-led growth engine across content, search, paid media, email marketing and performance measurement.', modules: lessonSets('Digital Marketing') },
  { id: 'business-analytics', title: 'Business Analytics: Think in Systems', category: 'Business', level: 'Intermediate', instructor: 'Maya Iyer', rating: 4.8, learners: '3.9K', duration: '27h', price: 1199, originalPrice: 2399, badge: 'NEW', image: images.business, accent: 'cream', description: 'See the signal in the noise. Learn dashboards, KPI frameworks, scenario planning and the critical questions great analysts ask.', modules: lessonSets('Business Analytics') },
  { id: 'graphic-design', title: 'Graphic Design Fundamentals & Direction', category: 'Design', level: 'Beginner', instructor: 'Kavya Rao', rating: 4.7, learners: '7.1K', duration: '21h', price: 899, originalPrice: 1799, badge: 'BEST SELLER', image: images.graphic, accent: 'navy', description: 'A practical visual foundation in typography, composition, colour theory and creative direction — with real project briefs you can showcase.', modules: lessonSets('Graphic Design') },
  { id: 'communication', title: 'Executive Communication & Leadership', category: 'Personal Growth', level: 'All levels', instructor: 'Sameer Joshi', rating: 4.8, learners: '9.4K', duration: '16h', price: 799, originalPrice: 1599, badge: 'POPULAR', image: images.communication, accent: 'lime', description: 'Speak with authority, lead with clarity and make your best ideas easy for cross-functional stakeholders to adopt.', modules: lessonSets('Communication') },
];

export const categories: { name: string; description: string; count: string; icon: LucideIcon; tone: string }[] = [
  { name: 'Development', description: 'Full-stack, APIs & cloud systems', count: '1,250+ lessons', icon: Code2, tone: 'navy' },
  { name: 'Design', description: 'Product, UI/UX & design systems', count: '850+ lessons', icon: LayoutGrid, tone: 'cream' },
  { name: 'Data Science', description: 'Analytics, ML & AI models', count: '680+ lessons', icon: BarChart3, tone: 'cream' },
  { name: 'Business', description: 'Strategy, product ops & finance', count: '980+ lessons', icon: BriefcaseBusiness, tone: 'cream' },
  { name: 'Marketing', description: 'Growth, SEO & customer acquisition', count: '760+ lessons', icon: Target, tone: 'cream' },
  { name: 'Personal Growth', description: 'Leadership, habits & speaking', count: '590+ lessons', icon: Sparkles, tone: 'cream' },
];

// Testimonials Data
const testimonials = [
  {
    name: 'Aarav Mehta',
    role: 'SDE-2 at Swiggy',
    company: 'Swiggy',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
    course: 'Advanced React & TypeScript Patterns',
    rating: 5,
    text: 'I went from tutorial hell to architecting production micro-frontends. The module on state machines and type-safe APIs was identical to the technical interview questions that landed me my SDE-2 role.'
  },
  {
    name: 'Sneha Sen',
    role: 'Product Designer at Zerodha',
    company: 'Zerodha',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&h=200&q=80',
    course: 'UI/UX Design Masterclass & Systems',
    rating: 5,
    text: 'Most design courses just teach Figma hotkeys. Neo Gyaan taught me design systems, component tokens, accessibility heuristics, and cross-functional dev handoffs. It directly got me hired at Zerodha.'
  },
  {
    name: 'Kunal Roy',
    role: 'Frontend Engineer at CRED',
    company: 'CRED',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    course: 'Complete Web Development Bootcamp',
    rating: 5,
    text: 'The project-first curriculum is exceptional. You don’t just watch videos; you submit real pull requests and get genuine code reviews. That standard of discipline set me apart from other applicants.'
  },
  {
    name: 'Meera Joshi',
    role: 'Data Analyst at Razorpay',
    company: 'Razorpay',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80',
    course: 'Python for Data Science & Machine Learning',
    rating: 5,
    text: 'The statistical modeling and real-time dashboard lessons gave me the confidence to transition from operations into core business intelligence at Razorpay within 4 months.'
  }
];

// Logo Component with User's Felcon/Emblem and Capitalized Neo Gyaan
export function Logo({ inverse = false, size = 'default' }: { inverse?: boolean; size?: 'default' | 'large' }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group" data-testid="link-logo">
      <div className={`relative overflow-hidden rounded-xl border transition-transform duration-300 group-hover:scale-105 ${
        inverse ? 'border-[#c7f000]/40 bg-[#0c2340]' : 'border-[#071a33]/15 bg-[#fffefa]'
      } ${size === 'large' ? 'h-11 w-11 p-1' : 'h-9 w-9 p-0.5'}`}>
        <img 
          src="/logo.png" 
          alt="Neo Gyaan Logo" 
          className="h-full w-full object-contain"
        />
      </div>
      <div className="flex flex-col">
        <span className={`font-display font-bold tracking-tight leading-none ${
          size === 'large' ? 'text-2xl' : 'text-xl'
        } ${inverse ? 'text-[#f7f6f1]' : 'text-[#071a33]'}`}>
          Neo Gyaan
        </span>
        <span className={`text-[10px] font-mono-custom tracking-wider uppercase font-semibold mt-0.5 ${
          inverse ? 'text-[#c7f000]' : 'text-[#708100]'
        }`}>
          LMS • Academy
        </span>
      </div>
    </Link>
  );
}

// Navigation Header
function Header() {
  const [location, setLocation] = useLocation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const submitSearch = () => { 
    setOpen(false); 
    setLocation(`/courses${query ? `?search=${encodeURIComponent(query)}` : ''}`); 
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#071a33]/10 bg-[#f7f6f1]/90 backdrop-blur-md">
      <div className="page-shell flex h-[72px] items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-5 lg:gap-7 md:flex" aria-label="Main navigation">
          <Link href="/courses" className={`text-sm transition-colors hover:text-[#536300] ${location.startsWith('/courses') ? 'font-bold text-[#071a33]' : 'text-[#5e6670]'}`} data-testid="link-courses">Courses</Link>
          <Link href="/#why-us" className="text-sm text-[#5e6670] transition-colors hover:text-[#536300]">Why Us</Link>
          <Link href="/#testimonials" className="text-sm text-[#5e6670] transition-colors hover:text-[#536300]">Testimonials</Link>
          <Link href="/pricing" className={`text-sm transition-colors hover:text-[#536300] ${location === '/pricing' ? 'font-bold text-[#071a33]' : 'text-[#5e6670]'}`} data-testid="link-pricing">Pricing</Link>
          <Link href="/certificates" className={`text-sm transition-colors hover:text-[#536300] ${location === '/certificates' ? 'font-bold text-[#071a33]' : 'text-[#5e6670]'}`} data-testid="link-certificates">Certificates</Link>
          <Link href="/dashboard" className={`text-sm transition-colors hover:text-[#536300] ${location === '/dashboard' ? 'font-bold text-[#071a33]' : 'text-[#5e6670]'}`} data-testid="link-dashboard">My Desk</Link>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <div className="flex h-10 w-[180px] lg:w-[220px] items-center gap-2 rounded-full border border-[#071a33]/15 bg-[#fffefa] px-3.5 shadow-sm">
            <Search size={14} className="text-[#7b8188]" />
            <input 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && submitSearch()} 
              className="w-full bg-transparent text-xs outline-none placeholder:text-[#9da1a4]" 
              placeholder="Search skills, topics..." 
              aria-label="Search courses" 
              data-testid="input-header-search" 
            />
          </div>
          <Link href="/login" className="px-2 text-xs font-semibold text-[#071a33]" data-testid="link-login">Log in</Link>
          <Link href="/signup" className="rounded-full bg-[#071a33] px-5 py-2.5 text-xs font-bold text-[#f7f6f1] transition-transform hover:-translate-y-0.5 shadow-sm" data-testid="link-get-started">Get started</Link>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <button onClick={submitSearch} aria-label="Search courses" className="grid h-10 w-10 place-items-center rounded-full border border-[#071a33]/15" data-testid="button-mobile-search"><Search size={18} /></button>
          <button onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} className="grid h-10 w-10 place-items-center rounded-full bg-[#071a33] text-[#f7f6f1]" data-testid="button-mobile-menu">{open ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
      </div>
      {open && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="border-t border-[#071a33]/10 bg-[#f7f6f1] px-5 pb-6 pt-4 md:hidden shadow-lg"
        >
          <div className="mb-4 flex items-center gap-2 rounded-full border border-[#071a33]/15 bg-[#fffefa] px-4 py-3">
            <Search size={16} />
            <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submitSearch()} className="w-full bg-transparent text-sm outline-none" placeholder="Find your next skill" aria-label="Search courses mobile" data-testid="input-mobile-search" />
          </div>
          <nav className="grid gap-1" aria-label="Mobile navigation">
            {[
              ['Courses Library', '/courses'],
              ['Why Neo Gyaan', '/#why-us'],
              ['Alumni Testimonials', '/#testimonials'],
              ['Pricing & Plans', '/pricing'],
              ['Verified Certificates', '/certificates'],
              ['My Learning Desk', '/dashboard'],
              ['Sign In', '/login'],
              ['Create Account', '/signup']
            ].map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="border-b border-[#071a33]/10 py-3 text-sm font-semibold text-[#071a33] flex items-center justify-between">
                <span>{label}</span>
                <ArrowRight size={14} className="text-[#728500]" />
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
}

// Global Footer
function Footer() {
  return (
    <footer className="mt-20 bg-[#071a33] text-[#f7f6f1]">
      <div className="page-shell grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-20">
        <div>
          <Logo inverse size="large" />
          <p className="mt-6 max-w-[280px] text-sm leading-6 text-[#c9d0d5]">
            Practical skill acceleration for builders, engineers and designers who shape the modern web.
          </p>
          <div className="mt-8 flex items-center gap-2 text-[#c7f000]">
            <span className="h-px w-10 bg-[#c7f000]" />
            <span className="eyebrow">Learn • Build • Ship</span>
          </div>
        </div>
        <FooterCol title="Academy" links={[['All Courses', '/courses'], ['Learning Paths', '/#paths'], ['Featured Masterclasses', '/#courses'], ['Verified Certificates', '/certificates']]} />
        <FooterCol title="Student Hub" links={[['Learning Desk', '/dashboard'], ['Pricing & Plans', '/pricing'], ['Alumni Testimonials', '/#testimonials'], ['Community Discord', '/']]} />
        <FooterCol title="Company" links={[['About Neo Gyaan', '/'], ['Instructor Network', '/'], ['Privacy & Terms', '/'], ['Support & Help', '/']]} />
      </div>
      <div className="border-t border-[#f7f6f1]/15">
        <div className="page-shell flex flex-col gap-3 py-6 text-xs text-[#aab4bc] sm:flex-row sm:items-center sm:justify-between">
          <span>© 2025 Neo Gyaan LMS. Built for ambitious craftspeople worldwide.</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-[#c7f000]" /> Secure Payments</span>
            <span className="font-mono-custom text-[#c7f000]">NG / 2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <p className="eyebrow mb-5 text-[#c7f000]">{title}</p>
      <div className="grid gap-3">
        {links.map(([label, href]) => (
          <Link key={label} href={href} className="w-fit text-sm text-[#d3d9dc] transition-colors hover:text-[#c7f000]" data-testid={`link-footer-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</Link>
        ))}
      </div>
    </div>
  );
}

function Button({ children, href, variant = 'dark', onClick, testId }: { children: ReactNode; href?: string; variant?: 'dark' | 'lime' | 'outline'; onClick?: () => void; testId?: string }) {
  const style = variant === 'lime' 
    ? 'bg-[#c7f000] text-[#071a33] hover:bg-[#b5db00]' 
    : variant === 'outline' 
      ? 'border border-[#071a33]/20 text-[#071a33] hover:bg-[#071a33] hover:text-[#f7f6f1]' 
      : 'bg-[#071a33] text-[#f7f6f1] hover:bg-[#122e50]';
  const cls = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 shadow-sm ${style}`;
  return href ? <Link href={href} className={cls} data-testid={testId}>{children}</Link> : <button onClick={onClick} className={cls} data-testid={testId}>{children}</button>;
}

function SectionHeading({ eyebrow, title, body, action }: { eyebrow: string; title: string; body?: string; action?: ReactNode }) {
  return (
    <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="eyebrow mb-2 text-[#6f7e00]">{eyebrow}</p>
        <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-[-.05em] text-[#071a33] sm:text-5xl">{title}</h2>
        {body && <p className="mt-3 max-w-[560px] text-sm leading-6 text-[#697177]">{body}</p>}
      </div>
      {action}
    </div>
  );
}

function Rating({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#071a33]">
      <Star size={13} fill="currentColor" className="text-[#a5c900]" /> {value.toFixed(1)}
    </span>
  );
}

// Course Card (Bento Styling with Instant Checkout Trigger)
function CourseCard({ course }: { course: Course }) {
  const [fav, setFav] = useState(false);
  const { openCheckout } = usePayment();

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="bento-card group flex flex-col justify-between overflow-hidden p-4" 
      data-testid={`card-course-${course.id}`}
    >
      <div>
        <div className="relative aspect-[1.55] overflow-hidden rounded-2xl bg-[#dfe3e4]">
          <img src={course.image} alt={course.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider ${
            course.accent === 'lime' ? 'bg-[#c7f000] text-[#071a33]' : 'bg-[#071a33] text-[#f7f6f1]'
          }`}>
            {course.badge}
          </span>
          <button 
            onClick={() => setFav(!fav)} 
            aria-label={fav ? 'Remove from favourites' : 'Add to favourites'} 
            className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-[#f7f6f1]/90 text-[#071a33] transition-transform hover:scale-110 shadow-sm"
          >
            <Heart size={15} fill={fav ? 'currentColor' : 'none'} className={fav ? 'text-[#b3d800]' : ''} />
          </button>
          <span className="absolute bottom-3 left-3 grid h-8 w-8 place-items-center rounded-full bg-[#071a33]/70 text-[#f7f6f1] backdrop-blur-sm">
            <Play size={13} fill="currentColor" />
          </span>
        </div>

        <div className="pt-4">
          <div className="flex items-center justify-between text-[11px] text-[#78828a]">
            <span className="eyebrow">{course.category}</span>
            <span className="inline-flex items-center gap-1"><Clock3 size={12} /> {course.duration}</span>
          </div>
          <Link href={`/courses/${course.id}`} className="mt-2 block font-display text-base font-bold leading-snug tracking-tight text-[#071a33] hover:underline">
            {course.title}
          </Link>
          <p className="mt-1 text-xs text-[#6e757b]">Instructor: <strong className="text-[#071a33]">{course.instructor}</strong></p>
          <div className="mt-3 flex items-center justify-between text-xs">
            <Rating value={course.rating} />
            <span className="text-[11px] text-[#7d858b]">{course.learners} enrolled</span>
          </div>
        </div>
      </div>

      <div className="mt-5 border-t border-[#071a33]/10 pt-3.5 flex items-center justify-between gap-2">
        <div>
          <span className="font-display text-lg font-bold text-[#071a33]">₹{course.price.toLocaleString('en-IN')}</span>
          <del className="ml-1.5 text-xs text-[#8b9094]">₹{course.originalPrice.toLocaleString('en-IN')}</del>
        </div>
        <div className="flex items-center gap-1.5">
          <Link href={`/courses/${course.id}`} className="rounded-full border border-[#071a33]/15 px-3 py-1.5 text-[11px] font-bold text-[#071a33] hover:bg-[#f0efe9]">
            Details
          </Link>
          <button 
            onClick={() => openCheckout({ title: course.title, price: course.price, type: 'course', courseId: course.id, badge: course.badge })}
            className="inline-flex items-center gap-1 rounded-full bg-[#c7f000] px-3.5 py-1.5 text-[11px] font-bold text-[#071a33] transition-transform hover:scale-105 shadow-sm"
          >
            <span>Enroll</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

// ----------------------------------------------------
// HOME PAGE: BENTO GRID MASTERPIECE WITH SCROLL ANIMATIONS
// ----------------------------------------------------
function Home() {
  const { openCheckout } = usePayment();
  const [selectedRoute, setSelectedRoute] = useState<'code' | 'design' | 'data'>('code');
  const [annualBilling, setAnnualBilling] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [simulatedCount, setSimulatedCount] = useState(42);

  const routeDetails = {
    code: {
      title: 'Full-Stack Modern Web Engineering',
      duration: '84 Hours / 12 Real Projects',
      avgSalary: '₹14 - 28 LPA',
      skills: ['React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
      recommendedId: 'web-development'
    },
    design: {
      title: 'Digital Product & UI/UX Systems',
      duration: '62 Hours / 8 Portfolio Case Studies',
      avgSalary: '₹12 - 24 LPA',
      skills: ['Figma Tokens', 'Design Systems', 'Usability Audits', 'Framer'],
      recommendedId: 'ui-ux-design'
    },
    data: {
      title: 'Python for AI, Analytics & Modeling',
      duration: '76 Hours / 10 Applied Data Pipelines',
      avgSalary: '₹15 - 32 LPA',
      skills: ['Python', 'Pandas', 'SQL', 'Predictive Modeling', 'ML Pipelines'],
      recommendedId: 'data-science'
    }
  };

  return (
    <>
      <Header />
      <main className="overflow-hidden relative">
        {/* Ambient Blurred Glow Orbs */}
        <div className="absolute top-20 left-1/4 -z-10 h-96 w-96 rounded-full bg-[#c7f000]/10 blur-[120px] pointer-events-none animate-glow" />
        <div className="absolute top-80 right-10 -z-10 h-[450px] w-[450px] rounded-full bg-[#071a33]/5 blur-[100px] pointer-events-none" />

        {/* ========================================================== */}
        {/* HERO SECTION: MODERN BENTO GRID HERO */}
        {/* ========================================================== */}
        <section className="page-shell pt-6 sm:pt-10 md:pt-14 pb-12 sm:pb-16">
          <div className="grid gap-4 lg:grid-cols-12">
            
            {/* Bento Card 1: Main Spanning Headline (Span 8) */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bento-card relative flex flex-col justify-between overflow-hidden p-6 sm:p-9 lg:p-10 lg:col-span-8 bg-gradient-to-br from-[#fffefa] via-[#fffefa] to-[#f3f9d2]/40"
            >
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#071a33]/15 bg-[#f0efe9] px-3.5 py-1 text-[11px] font-bold text-[#071a33] mb-5 sm:mb-6 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-[#c7f000] animate-pulse" />
                  <span>2025 MASTERCLASS COHORT • ENROLLMENT LIVE</span>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-[4.3rem] font-bold leading-[.98] tracking-[-.06em] text-[#071a33]">
                  Practical Knowledge.<br />
                  <span className="text-[#728500]">Build What’s Next.</span>
                </h1>

                <p className="mt-4 sm:mt-5 max-w-[540px] text-xs sm:text-sm md:text-base leading-relaxed text-[#59646c]">
                  Stop watching endless passive tutorials. Master modern software engineering, product design, and AI systems through rigorous, portfolio-grade project checkpoints.
                </p>

                <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3">
                  <Button href="/courses" variant="lime" testId="button-hero-explore">
                    <span>Explore 100+ Courses</span>
                    <ArrowRight size={16} />
                  </Button>
                  <Button href="/pricing" variant="outline" testId="button-hero-pricing">
                    <span>View Pro Plans</span>
                  </Button>
                </div>
              </div>

              {/* Interactive Sandbox Mini-Preview Widget inside Hero */}
              <div className="relative z-10 mt-8 rounded-2xl border border-[#071a33]/10 bg-[#f7f6f1] p-3 sm:p-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#071a33]/10 pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    <span className="text-[11px] font-mono-custom text-[#717b82] ml-2">AppSandbox.tsx</span>
                  </div>
                  <div className="flex gap-1 rounded-lg bg-white p-0.5 border border-[#071a33]/10 text-[10px] font-bold">
                    <button 
                      onClick={() => setActiveTab('preview')}
                      className={`flex items-center gap-1 rounded-md px-2 py-0.5 transition-colors ${
                        activeTab === 'preview' ? 'bg-[#071a33] text-white' : 'text-[#717b82]'
                      }`}
                    >
                      <Eye size={11} /> Live Demo
                    </button>
                    <button 
                      onClick={() => setActiveTab('code')}
                      className={`flex items-center gap-1 rounded-md px-2 py-0.5 transition-colors ${
                        activeTab === 'code' ? 'bg-[#071a33] text-white' : 'text-[#717b82]'
                      }`}
                    >
                      <Terminal size={11} /> Code
                    </button>
                  </div>
                </div>

                {activeTab === 'preview' ? (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white rounded-xl p-3.5 border border-[#071a33]/10">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-[#c7f000] grid place-items-center text-[#071a33] font-display font-bold">
                        NG
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#071a33]">Interactive State Machine</p>
                        <p className="text-[10px] text-[#717b82]">Click button to test active reactivity</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono-custom text-xs font-bold text-[#728500]">Count: {simulatedCount}</span>
                      <button 
                        onClick={() => setSimulatedCount(c => c + 1)} 
                        className="rounded-full bg-[#071a33] px-3 py-1 text-[11px] font-bold text-white hover:bg-[#183658] transition-all active:scale-95"
                      >
                        + Trigger
                      </button>
                    </div>
                  </div>
                ) : (
                  <pre className="overflow-x-auto rounded-xl bg-[#071a33] p-3 text-[11px] font-mono-custom text-[#c7f000] leading-relaxed">
                    <code>{`export function Counter() {\n  const [val, setVal] = useState(${simulatedCount});\n  return <Button onClick={() => setVal(v => v + 1)}>Count: {val}</Button>;\n}`}</code>
                  </pre>
                )}
              </div>

              {/* Bottom Trust Strip */}
              <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#071a33]/10 pt-5">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2.5">
                    {testimonials.map((t, idx) => (
                      <img key={idx} src={t.avatar} alt={t.name} className="h-8 w-8 rounded-full border-2 border-[#fffefa] object-cover" />
                    ))}
                  </div>
                  <div className="text-xs">
                    <div className="flex items-center gap-1 font-bold text-[#071a33]">
                      <Star size={13} fill="currentColor" className="text-[#a5c900]" />
                      <span>4.9 / 5 Rating</span>
                    </div>
                    <span className="text-[11px] text-[#717c84]">50,000+ engineers & designers enrolled</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono-custom text-xs font-bold text-[#728500]">
                  <ShieldCheck size={16} />
                  <span>VERIFIED CERTIFICATES INCLUDED</span>
                </div>
              </div>
            </motion.div>

            {/* Bento Card 2: Featured Course Spotlight (Span 4) */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bento-card-dark relative flex flex-col justify-between overflow-hidden p-6 sm:p-7 lg:col-span-4"
            >
              <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[#c7f000]/15 blur-3xl pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-[#c7f000]">COURSE OF THE WEEK</span>
                  <span className="rounded-full bg-[#c7f000] px-2.5 py-0.5 text-[10px] font-bold text-[#071a33]">STAFF PICK</span>
                </div>

                <div className="relative mt-4 aspect-video overflow-hidden rounded-xl border border-white/10 group">
                  <img src={images.react} alt="Advanced React" className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071a33] to-transparent opacity-80" />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-[#c7f000] text-[#071a33] shadow-lg animate-float">
                      <Play size={20} fill="currentColor" />
                    </span>
                  </div>
                </div>

                <h3 className="mt-4 font-display text-xl font-bold leading-snug text-[#f7f6f1]">
                  Advanced React & TypeScript Patterns
                </h3>
                <p className="mt-2 text-xs text-[#b8c4cb] line-clamp-2">
                  Composition, state machines, type-safe RPCs, testing and scalable enterprise frontend architecture.
                </p>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between">
                <div>
                  <span className="font-display text-xl font-bold text-[#c7f000]">₹1,799</span>
                  <del className="ml-2 text-xs text-[#8c9ba5]">₹3,599</del>
                </div>
                <button
                  onClick={() => openCheckout({ title: 'Advanced React & TypeScript Patterns', price: 1799, type: 'course', courseId: 'react-typescript', badge: 'STAFF PICK' })}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#c7f000] px-4 py-2 text-xs font-bold text-[#071a33] transition-transform hover:scale-105 shadow-sm"
                >
                  <span>Enroll Now</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>

            {/* Bento Card 3: Interactive Learning Streak (Span 4) */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="bento-card p-6 lg:col-span-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-[#728500]">STUDENT STREAK</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#fff4cc] px-2.5 py-0.5 text-[11px] font-bold text-[#946200]">
                    <Flame size={14} className="text-[#e06d00] animate-pulse" /> 7 Day Streak
                  </span>
                </div>
                <p className="mt-4 font-display text-3xl font-bold text-[#071a33]">12.4 Hours</p>
                <p className="text-xs text-[#717b82]">Logged by active learners this week</p>

                {/* Day Dots */}
                <div className="mt-5 grid grid-cols-7 gap-1.5 text-center">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1">
                      <span className="text-[10px] text-[#8c949a] font-mono-custom">{day}</span>
                      <div className={`h-8 w-full rounded-lg flex items-center justify-center text-[10px] font-bold ${
                        idx < 5 ? 'bg-[#c7f000] text-[#071a33]' : 'bg-[#e7e6e0] text-[#7b848a]'
                      }`}>
                        {idx < 5 ? <Check size={12} /> : '—'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-[11px] text-[#717b82] flex items-center gap-1">
                <TrendingUp size={14} className="text-[#728500]" />
                Top 5% consistency milestone reached!
              </p>
            </motion.div>

            {/* Bento Card 4: Interactive Skill Recommender (Span 5) */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bento-card p-6 lg:col-span-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-[#728500]">CAREER ACCELERATOR</span>
                  <span className="text-[11px] font-mono-custom text-[#717b82]">AVG: {routeDetails[selectedRoute].avgSalary}</span>
                </div>

                <div className="mt-3 flex gap-2">
                  {(['code', 'design', 'data'] as const).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSelectedRoute(key)}
                      className={`rounded-xl px-3 py-1.5 text-xs font-bold capitalize transition-all ${
                        selectedRoute === key
                          ? 'bg-[#071a33] text-[#f7f6f1] shadow-sm'
                          : 'bg-[#f0efe9] text-[#636e76] hover:bg-[#e4e2d8]'
                      }`}
                    >
                      {key === 'code' ? '💻 Engineering' : key === 'design' ? '🎨 UI/UX' : '📊 Data & AI'}
                    </button>
                  ))}
                </div>

                <div className="mt-4 rounded-xl bg-[#f7f6f1] p-3.5">
                  <h4 className="font-display text-sm font-bold text-[#071a33]">{routeDetails[selectedRoute].title}</h4>
                  <p className="mt-1 text-xs text-[#717b82]">{routeDetails[selectedRoute].duration}</p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {routeDetails[selectedRoute].skills.map((s) => (
                      <span key={s} className="rounded-md bg-[#fffefa] px-2 py-0.5 text-[10px] font-semibold text-[#071a33] border border-[#071a33]/10">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Link href={`/courses/${routeDetails[selectedRoute].recommendedId}`} className="text-xs font-bold text-[#728500] hover:underline flex items-center gap-1">
                  View Syllabus & Roadmaps <ArrowRight size={13} />
                </Link>
                <button
                  onClick={() => {
                    const c = courses.find((item) => item.id === routeDetails[selectedRoute].recommendedId);
                    if (c) openCheckout({ title: c.title, price: c.price, type: 'course', courseId: c.id });
                  }}
                  className="rounded-full bg-[#071a33] px-3.5 py-1.5 text-xs font-bold text-[#f7f6f1] hover:bg-[#122e50]"
                >
                  Quick Enroll
                </button>
              </div>
            </motion.div>

            {/* Bento Card 5: Verified Credential Preview (Span 3) */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="bento-card-accent p-6 lg:col-span-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-[#071a33]">PROOF OF WORK</span>
                  <Award size={20} className="text-[#071a33]" />
                </div>
                <h4 className="mt-3 font-display text-2xl font-bold tracking-tight text-[#071a33]">
                  Verified Digital Certificate
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-[#404c00]">
                  Shareable on LinkedIn, GitHub, and resumes with cryptographically verifiable QR IDs.
                </p>
              </div>

              <div className="mt-5 rounded-xl border border-[#071a33]/20 bg-white/40 p-3 backdrop-blur-sm">
                <div className="flex items-center justify-between text-[11px] font-mono-custom font-bold text-[#071a33]">
                  <span>ID: NG-84F2-91A</span>
                  <span>ACCREDITED</span>
                </div>
                <Link href="/certificates" className="mt-2.5 block w-full rounded-lg bg-[#071a33] py-2 text-center text-xs font-bold text-[#f7f6f1] hover:bg-[#122e50]">
                  View Certificate Demo
                </Link>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ========================================================== */}
        {/* STATS BENTO ROW (SCROLL-TRIGGERED) */}
        {/* ========================================================== */}
        <section className="page-shell pb-14">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 gap-3 md:grid-cols-4"
          >
            <div className="bento-card p-5 text-center sm:p-6">
              <p className="font-display text-3xl sm:text-4xl font-bold text-[#071a33]">100+</p>
              <p className="mt-1 text-xs text-[#717b82]">Practical Masterclasses</p>
            </div>
            <div className="bento-card p-5 text-center sm:p-6">
              <p className="font-display text-3xl sm:text-4xl font-bold text-[#728500]">50,000+</p>
              <p className="mt-1 text-xs text-[#717b82]">Active Enrolled Builders</p>
            </div>
            <div className="bento-card p-5 text-center sm:p-6">
              <p className="font-display text-3xl sm:text-4xl font-bold text-[#071a33]">94%</p>
              <p className="mt-1 text-xs text-[#717b82]">Career Switch / Promo Rate</p>
            </div>
            <div className="bento-card p-5 text-center sm:p-6">
              <p className="font-display text-3xl sm:text-4xl font-bold text-[#728500]">4.9 / 5</p>
              <p className="mt-1 text-xs text-[#717b82]">Average Student Rating</p>
            </div>
          </motion.div>
        </section>

        {/* ========================================================== */}
        {/* WHY NEO GYAAN: BENTO FEATURES (SCROLL-TRIGGERED) */}
        {/* ========================================================== */}
        <section id="why-us" className="page-shell py-12 md:py-20">
          <SectionHeading 
            eyebrow="THE NEO GYAAN METHOD / 02" 
            title="Engineered for real capability."
            body="Most online courses are passive video playlists. Neo Gyaan is built around verifiable checkpoints, interactive sandboxes, and senior mentor code reviews."
          />

          <div className="grid gap-4 md:grid-cols-12">
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bento-card p-7 md:col-span-7 flex flex-col justify-between bg-gradient-to-br from-[#fffefa] to-[#f4f7dc]/50"
            >
              <div>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#071a33] text-[#c7f000] mb-5">
                  <Laptop2 size={20} />
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#071a33]">
                  Integrated Project Sandboxes
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#59646c] max-w-[480px]">
                  Write real code, tweak Figma tokens, and query live PostgreSQL databases inside structured, browser-based environments. You leave every module with working artifacts you can ship.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-2 text-xs font-semibold text-[#071a33]">
                <span className="rounded-full bg-white px-3 py-1 border border-[#071a33]/10">✓ Automated Unit Tests</span>
                <span className="rounded-full bg-white px-3 py-1 border border-[#071a33]/10">✓ Real Pull Request Workflows</span>
                <span className="rounded-full bg-white px-3 py-1 border border-[#071a33]/10">✓ Instant Live Previews</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bento-card-dark p-7 md:col-span-5 flex flex-col justify-between"
            >
              <div>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#c7f000] text-[#071a33] mb-5">
                  <Users size={20} />
                </span>
                <h3 className="font-display text-2xl font-bold text-[#f7f6f1]">
                  1-on-1 Mentor Pull Request Reviews
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#adb9c1]">
                  Senior engineers from high-growth companies review your actual GitHub pull requests, giving line-by-line feedback on edge cases, naming, and architectural hygiene.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-mono-custom text-[#c7f000]">
                <CheckCircle2 size={16} />
                <span>Industry Practitioners, Not Actors</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bento-card p-6 md:col-span-4"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#f0efe9] text-[#728500] mb-4">
                <Download size={18} />
              </span>
              <h4 className="font-display text-lg font-bold text-[#071a33]">Offline Lesson Sync</h4>
              <p className="mt-2 text-xs leading-relaxed text-[#6d777f]">
                Download modules, project workbooks, and templates to keep learning uninterrupted on commutes or flights.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bento-card p-6 md:col-span-4"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#f0efe9] text-[#728500] mb-4">
                <Clock3 size={18} />
              </span>
              <h4 className="font-display text-lg font-bold text-[#071a33]">Lifetime Access</h4>
              <p className="mt-2 text-xs leading-relaxed text-[#6d777f]">
                Enroll once and keep permanent access. All curriculum updates and newly added lessons are included without recurring fees.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="bento-card p-6 md:col-span-4"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#f0efe9] text-[#728500] mb-4">
                <ShieldCheck size={18} />
              </span>
              <h4 className="font-display text-lg font-bold text-[#071a33]">Accredited Credentials</h4>
              <p className="mt-2 text-xs leading-relaxed text-[#6d777f]">
                Receive verifiable certificate IDs backed by student identity verification, recognized by top tech recruiters.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* COURSES CATALOG: BENTO GRID SHOWCASE (SCROLL-TRIGGERED) */}
        {/* ========================================================== */}
        <section id="courses" className="page-shell py-12 md:py-20">
          <SectionHeading 
            eyebrow="FEATURED MASTERCLASSES / 03" 
            title="Curated for maximum leverage."
            body="High-impact curricula designed for fast mastery. Explore our highest-rated masterclasses and enroll with instant dummy checkout."
            action={
              <Button href="/courses" variant="outline" testId="button-view-all-library">
                <span>Browse All Courses</span>
                <ArrowRight size={15} />
              </Button>
            }
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {courses.slice(0, 4).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-[#071a33]/10 bg-[#f0efe9] p-6 text-center">
            <p className="text-sm font-semibold text-[#071a33]">
              Looking for specialized tracks? We have masterclasses across React, AI, Python, Figma, System Design and Strategy.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {categories.map((c) => (
                <Link
                  key={c.name}
                  href={`/courses?category=${encodeURIComponent(c.name)}`}
                  className="rounded-full bg-[#fffefa] px-3.5 py-1.5 text-xs font-bold text-[#071a33] hover:bg-[#c7f000] transition-colors border border-[#071a33]/10 shadow-sm"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* TESTIMONIALS SECTION: BENTO REVIEWS (SCROLL-TRIGGERED) */}
        {/* ========================================================== */}
        <section id="testimonials" className="bg-[#071a33] py-20 text-[#f7f6f1]">
          <div className="page-shell">
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
            >
              <div>
                <p className="eyebrow text-[#c7f000]">STUDENT SUCCESS / 04</p>
                <h2 className="mt-2 font-display text-3xl sm:text-5xl font-bold tracking-[-.05em] text-[#f7f6f1]">
                  Real careers.<br />
                  <span className="text-[#c7f000]">Measurable momentum.</span>
                </h2>
              </div>
              <p className="max-w-[440px] text-xs sm:text-sm text-[#b9c6ce]">
                Hear how our alumni used Neo Gyaan to transition careers, secure promotions, and ship serious commercial products.
              </p>
            </motion.div>

            {/* Alumni Companies Strip */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
            >
              <p className="text-center text-[11px] font-mono-custom uppercase tracking-wider text-[#a0afb8] mb-3">
                Our Alumni Build & Lead At Top Tech Companies
              </p>
              <div className="flex flex-wrap items-center justify-around gap-6 opacity-80">
                {['Google', 'Microsoft', 'Swiggy', 'Zerodha', 'CRED', 'Razorpay', 'Flipkart'].map((company) => (
                  <span key={company} className="font-display text-sm font-bold tracking-wider text-white">
                    {company}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Testimonials Bento Cards */}
            <div className="grid gap-4 md:grid-cols-2">
              {testimonials.map((t, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="rounded-3xl border border-white/10 bg-[#0d223a] p-6 sm:p-7 flex flex-col justify-between transition-all hover:border-[#c7f000]/40 hover:-translate-y-1 shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full border border-[#c7f000]/30 object-cover" />
                        <div>
                          <h4 className="font-display text-base font-bold text-white">{t.name}</h4>
                          <p className="text-xs text-[#a0afb8]">{t.role}</p>
                        </div>
                      </div>
                      <div className="flex text-[#c7f000]">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-[#d4dde2]">
                      “{t.text}”
                    </p>
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between text-xs text-[#a0afb8]">
                    <span>Course: <strong className="text-[#c7f000]">{t.course}</strong></span>
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold text-white">VERIFIED ALUM</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* PRICING SECTION: BENTO TIERS (SCROLL-TRIGGERED) */}
        {/* ========================================================== */}
        <section id="pricing" className="page-shell py-20">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-[700px] text-center mb-12"
          >
            <p className="eyebrow text-[#728500]">TRANSPARENT PRICING / 05</p>
            <h2 className="mt-3 font-display text-4xl sm:text-6xl font-bold tracking-[-.06em] text-[#071a33]">
              Invest in your craft.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#616c74]">
              Zero long-term lock-in. Choose the pace that suits your professional goals.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#071a33]/15 bg-[#fffefa] p-1.5 shadow-sm">
              <button
                onClick={() => setAnnualBilling(false)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                  !annualBilling ? 'bg-[#071a33] text-[#f7f6f1]' : 'text-[#616c74] hover:text-[#071a33]'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setAnnualBilling(true)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                  annualBilling ? 'bg-[#071a33] text-[#f7f6f1]' : 'text-[#616c74] hover:text-[#071a33]'
                }`}
              >
                <span>Annual Billing</span>
                <span className="rounded-full bg-[#c7f000] px-2 py-0.5 text-[10px] font-bold text-[#071a33]">
                  SAVE 30%
                </span>
              </button>
            </div>
          </motion.div>

          <div className="grid gap-4 lg:grid-cols-3">
            {/* Plan 1: Free Starter */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bento-card flex flex-col justify-between p-7"
            >
              <div>
                <span className="eyebrow text-[#728500]">FREE STARTER</span>
                <div className="mt-4 flex items-baseline">
                  <span className="font-display text-4xl font-bold text-[#071a33]">₹0</span>
                  <span className="ml-2 text-xs text-[#78838b]">/ forever</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#68737c]">
                  Essential introductory lessons to test our curriculum and interactive tools.
                </p>

                <div className="mt-6 border-t border-[#071a33]/10 pt-6 space-y-3 text-xs font-medium text-[#071a33]">
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#728500]" /> 5 free masterclass lessons</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#728500]" /> Community Discord access</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#728500]" /> All course syllabi & previews</div>
                  <div className="flex items-center gap-2 text-[#9da6ad]"><X size={14} /> Verified certificates</div>
                  <div className="flex items-center gap-2 text-[#9da6ad]"><X size={14} /> 1-on-1 mentor code reviews</div>
                </div>
              </div>

              <div className="mt-8">
                <Button href="/signup" variant="outline" testId="button-plan-free">
                  Start Free Now
                </Button>
              </div>
            </motion.div>

            {/* Plan 2: Pro All-Access (Highlighted) */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bento-card-dark relative flex flex-col justify-between p-7 border-2 border-[#c7f000] shadow-xl"
            >
              <span className="absolute right-6 top-6 rounded-full bg-[#c7f000] px-3 py-1 text-[10px] font-bold tracking-wider text-[#071a33]">
                MOST POPULAR
              </span>

              <div>
                <span className="eyebrow text-[#c7f000]">PRO ALL-ACCESS</span>
                <div className="mt-4 flex items-baseline">
                  <span className="font-display text-4xl sm:text-5xl font-bold text-white">
                    {annualBilling ? '₹699' : '₹999'}
                  </span>
                  <span className="ml-2 text-xs text-[#a4b1b9]">/ month</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#b4c1c9]">
                  {annualBilling ? 'Billed annually at ₹8,388 (Save ₹3,600/year)' : 'Flexible month-to-month builder membership'}
                </p>

                <div className="mt-6 border-t border-white/10 pt-6 space-y-3 text-xs font-medium text-[#f7f6f1]">
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#c7f000]" /> Unlimited access to all 100+ masterclasses</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#c7f000]" /> Verified blockchain certificates</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#c7f000]" /> Downloadable offline video sync</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#c7f000]" /> 2 Monthly mentor PR reviews</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#c7f000]" /> Priority career advisory & resume audits</div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => openCheckout({
                    title: 'Pro All-Access Membership',
                    price: annualBilling ? 8388 : 999,
                    type: 'plan',
                    badge: 'PRO'
                  })}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#c7f000] text-sm font-bold text-[#071a33] transition-transform hover:-translate-y-0.5 shadow-lg"
                >
                  <span>Upgrade to Pro</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>

            {/* Plan 3: Lifetime Master */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bento-card flex flex-col justify-between p-7"
            >
              <div>
                <span className="eyebrow text-[#728500]">LIFETIME MASTER</span>
                <div className="mt-4 flex items-baseline">
                  <span className="font-display text-4xl font-bold text-[#071a33]">₹3,999</span>
                  <span className="ml-2 text-xs text-[#78838b]">/ one-time</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#68737c]">
                  Permanent, unrestricted access to all current and future Neo Gyaan releases.
                </p>

                <div className="mt-6 border-t border-[#071a33]/10 pt-6 space-y-3 text-xs font-medium text-[#071a33]">
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#728500]" /> Lifetime access to all present & future courses</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#728500]" /> Unlimited verified credentials</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#728500]" /> 1-on-1 strategy call with tech lead</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#728500]" /> Exclusive Private Founders & Alum Discord</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-[#728500]" /> VIP early access to beta curricula</div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => openCheckout({
                    title: 'Lifetime Master Membership',
                    price: 3999,
                    type: 'plan',
                    badge: 'LIFETIME'
                  })}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#071a33] text-sm font-bold text-[#f7f6f1] transition-transform hover:-translate-y-0.5 shadow-sm"
                >
                  <span>Get Lifetime Access</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

// ----------------------------------------------------
// COURSES CATALOG PAGE
// ----------------------------------------------------
function CoursesPage() {
  const [location] = useLocation();
  const initialSearch = new URLSearchParams(location.split('?')[1] ?? '').get('search') ?? '';
  const initialCategory = new URLSearchParams(location.split('?')[1] ?? '').get('category') ?? 'All';
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState('Featured');
  const [level, setLevel] = useState('All levels');

  const filtered = useMemo(() => courses.filter((course) => 
    (category === 'All' || course.category === category) && 
    (level === 'All levels' || course.level === level) && 
    `${course.title} ${course.category} ${course.instructor}`.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    if (sort === 'Popular') return Number(b.learners.replace('K', '')) - Number(a.learners.replace('K', ''));
    if (sort === 'Newest') return (a.badge === 'NEW' ? -1 : 1);
    if (sort === 'Price: Low to High') return a.price - b.price;
    if (sort === 'Price: High to Low') return b.price - a.price;
    return 0;
  }), [category, level, search, sort]);

  return (
    <>
      <Header />
      <main className="page-shell py-12 md:py-16">
        <div className="max-w-[720px]">
          <p className="eyebrow text-[#708100]">THE CURRICULUM LIBRARY</p>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl font-bold leading-[.94] tracking-[-.06em] text-[#071a33]">
            Practical Masterclasses for Builders.
          </h1>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#687279]">
            Filter by your desired career path. Every course is reviewed by engineering leads and includes verifiable credentials.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-10 grid gap-3 rounded-2xl border border-[#071a33]/10 bg-[#fffefa] p-3 md:grid-cols-[1fr_auto_auto]">
          <label className="flex items-center gap-3 rounded-xl bg-[#f0efe9] px-4 py-2.5">
            <Search size={17} className="text-[#717b82]" />
            <input 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              className="w-full bg-transparent text-xs sm:text-sm outline-none placeholder:text-[#91999e]" 
              placeholder="Search by title, topic or instructor..." 
              aria-label="Search courses" 
              data-testid="input-course-search" 
            />
          </label>
          <label className="flex items-center gap-2 rounded-xl border border-[#071a33]/10 px-4 py-2.5 text-xs font-semibold">
            <ListFilter size={15} />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-transparent outline-none cursor-pointer" aria-label="Filter by category">
              <option>All</option>
              {categories.map((item) => <option key={item.name}>{item.name}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-2 rounded-xl border border-[#071a33]/10 px-4 py-2.5 text-xs font-semibold">
            <ChevronDown size={15} />
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-transparent outline-none cursor-pointer" aria-label="Sort courses">
              {['Featured', 'Popular', 'Newest', 'Price: Low to High', 'Price: High to Low'].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>

        {/* Level Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="eyebrow text-[#7c858a]">{filtered.length} COURSES FOUND</p>
          <div className="flex flex-wrap gap-2">
            {['All levels', 'Beginner', 'Intermediate', 'Advanced'].map((item) => (
              <button 
                key={item} 
                onClick={() => setLevel(item)} 
                className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all ${
                  level === item ? 'border-[#071a33] bg-[#071a33] text-[#f7f6f1]' : 'border-[#071a33]/15 text-[#636e76] hover:bg-[#f0efe9]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-8 rounded-3xl border border-dashed border-[#071a33]/20 py-20 text-center">
            <Compass className="mx-auto text-[#708100] h-10 w-10 mb-3" />
            <h3 className="font-display text-2xl font-bold">No matching courses found</h3>
            <p className="mt-1 text-sm text-[#6d767c]">Try searching for broader keywords like 'React', 'Python', or 'Design'.</p>
            <button onClick={() => { setSearch(''); setCategory('All'); setLevel('All levels'); }} className="mt-4 text-xs font-bold underline text-[#071a33]">
              Clear filters
            </button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

// ----------------------------------------------------
// COURSE DETAIL PAGE
// ----------------------------------------------------
function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { openCheckout } = usePayment();
  const course = courses.find((item) => item.id === id) ?? courses[0];

  return (
    <>
      <Header />
      <main>
        <section className="bg-[#071a33] text-[#f7f6f1]">
          <div className="page-shell grid gap-10 py-12 md:grid-cols-[1.1fr_.9fr] md:items-center md:py-20">
            <div>
              <Link href="/courses" className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-[#b4bec3] hover:text-[#c7f000]">
                <ArrowLeft size={14} /> Back to all courses
              </Link>
              <div className="flex items-center gap-2 mb-3">
                <span className="eyebrow text-[#c7f000]">{course.category}</span>
                <span className="text-white/40">•</span>
                <span className="eyebrow text-white/70">{course.level}</span>
              </div>
              <h1 className="font-display text-4xl sm:text-6xl font-bold leading-[.96] tracking-[-.06em]">
                {course.title}
              </h1>
              <p className="mt-5 max-w-[620px] text-sm sm:text-base leading-relaxed text-[#c4cdd1]">
                {course.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs sm:text-sm">
                <Rating value={course.rating} />
                <span className="text-[#adb8bd]">{course.learners} learners enrolled</span>
                <span className="inline-flex items-center gap-1 text-[#adb8bd]"><Clock3 size={14} /> {course.duration} on-demand</span>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => openCheckout({ title: course.title, price: course.price, type: 'course', courseId: course.id, badge: course.badge })}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c7f000] px-6 text-sm font-bold text-[#071a33] transition-transform hover:-translate-y-0.5 shadow-lg"
                >
                  <span>Enroll for ₹{course.price.toLocaleString('en-IN')}</span>
                  <ArrowRight size={16} />
                </button>
                <Link href={`/learn/${course.id}`} className="rounded-full border border-white/20 px-5 py-3 text-xs font-bold text-white hover:bg-white/10">
                  Preview Free Lesson
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-[#f7f6f1]/15 shadow-2xl">
              <img src={course.image} alt={course.title} className="aspect-[1.3] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071a33] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
                <span className="rounded-full bg-[#c7f000] px-3 py-1 text-xs font-bold text-[#071a33]">{course.badge}</span>
                <div>
                  <span className="font-display text-3xl font-bold">₹{course.price.toLocaleString('en-IN')}</span>
                  <del className="ml-2 text-xs text-[#8c9ba5]">₹{course.originalPrice.toLocaleString('en-IN')}</del>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Modules & Details */}
        <div className="page-shell grid gap-12 py-14 md:grid-cols-[1fr_340px]">
          <div>
            <section className="bento-card p-6 sm:p-8">
              <p className="eyebrow text-[#708100]">WHAT YOU'LL BUILD</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-[#071a33]">Core Learning Outcomes</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  'Build complete end-to-end projects from a blank canvas',
                  'Follow production git branch & pull request best practices',
                  'Pass technical interviews with defensible architectural reasoning',
                  'Earn a shareable, cryptographically verified digital credential'
                ].map((item) => (
                  <div key={item} className="flex gap-2.5 rounded-xl bg-[#f7f6f1] p-3.5 text-xs leading-relaxed text-[#071a33]">
                    <Check size={16} className="shrink-0 text-[#718500] mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <p className="eyebrow text-[#708100]">SYLLABUS</p>
                  <h3 className="mt-1 font-display text-2xl font-bold text-[#071a33]">Course Curriculum</h3>
                </div>
                <span className="text-xs text-[#778087]">{course.modules.length} modules • {course.duration}</span>
              </div>

              <div className="space-y-3">
                {course.modules.map((module, i) => (
                  <details key={module.title} open={i === 0} className="group rounded-2xl border border-[#071a33]/10 bg-[#fffefa] overflow-hidden">
                    <summary className="flex cursor-pointer list-none items-center justify-between p-5 font-display font-bold text-sm text-[#071a33]">
                      <span>{module.title}</span>
                      <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="border-t border-[#071a33]/10 px-5 pb-3 pt-2">
                      {module.lessons.map((lesson, j) => (
                        <div key={lesson.title} className="flex items-center justify-between border-b border-[#071a33]/8 py-3 text-xs last:border-0">
                          <span className="flex items-center gap-3">
                            <span className="font-mono-custom text-[#718000]">{String(j + 1).padStart(2, '0')}</span>
                            <span className="font-medium text-[#071a33]">{lesson.title}</span>
                            {lesson.free && <span className="rounded-full bg-[#c7f000] px-2 py-0.5 text-[9px] font-bold text-[#071a33]">FREE PREVIEW</span>}
                          </span>
                          <span className="text-[#7d858b]">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-3xl border border-[#071a33]/12 bg-[#fffefa] p-6 md:sticky md:top-24 shadow-sm">
            <p className="eyebrow text-[#708100]">THIS MASTERCLASS INCLUDES</p>
            <div className="mt-5 space-y-3 text-xs text-[#071a33]">
              <div className="flex justify-between border-b border-[#071a33]/10 pb-2.5">
                <span className="text-[#69737a]">Total Video Runtime</span>
                <strong>{course.duration}</strong>
              </div>
              <div className="flex justify-between border-b border-[#071a33]/10 pb-2.5">
                <span className="text-[#69737a]">Hands-on Projects</span>
                <strong>6 Production Projects</strong>
              </div>
              <div className="flex justify-between border-b border-[#071a33]/10 pb-2.5">
                <span className="text-[#69737a]">Downloadable Workbooks</span>
                <strong>18 Guides & Templates</strong>
              </div>
              <div className="flex justify-between border-b border-[#071a33]/10 pb-2.5">
                <span className="text-[#69737a]">Verified Certificate</span>
                <strong>Included on Completion</strong>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-[#69737a]">Access Duration</span>
                <strong>Lifetime Access</strong>
              </div>
            </div>

            <div className="mt-6 border-t border-[#071a33]/10 pt-5">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-display text-3xl font-bold text-[#071a33]">₹{course.price.toLocaleString('en-IN')}</span>
                <del className="text-xs text-[#8b9297]">₹{course.originalPrice.toLocaleString('en-IN')}</del>
              </div>
              <button
                onClick={() => openCheckout({ title: course.title, price: course.price, type: 'course', courseId: course.id, badge: course.badge })}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#071a33] text-sm font-bold text-[#f7f6f1] transition-transform hover:-translate-y-0.5 shadow-md"
              >
                <span>Instant Checkout</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}

// ----------------------------------------------------
// LEARN PAGE (VIDEO DESK & CHECKLIST)
// ----------------------------------------------------
function LearnPage() {
  const { id } = useParams<{ id: string }>();
  const course = courses.find((item) => item.id === id) ?? courses[3];
  const allLessons = course.modules.flatMap((module, moduleIndex) => 
    module.lessons.map((lesson, lessonIndex) => ({ ...lesson, moduleIndex, lessonIndex }))
  );
  const [current, setCurrent] = useState(0);
  const [notes, setNotes] = useState('');
  const [notice, setNotice] = useState('');
  const lesson = allLessons[current] ?? allLessons[0];

  const complete = () => { 
    setNotice('✓ Lesson marked complete!'); 
    setCurrent(Math.min(current + 1, allLessons.length - 1)); 
    setTimeout(() => setNotice(''), 3000);
  };

  return (
    <>
      <Header />
      <main className="min-h-[calc(100dvh-72px)] bg-[#e8e7e2]">
        <div className="page-shell py-6 md:py-10">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <Link href={`/courses/${course.id}`} className="inline-flex items-center gap-2 text-xs font-bold text-[#071a33] hover:underline" data-testid="link-learn-back">
                <ArrowLeft size={14} /> Back to {course.title}
              </Link>
              <p className="mt-1.5 text-xs text-[#6c767d]">Module {lesson.moduleIndex + 1} / Lesson {current + 1} of {allLessons.length}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden h-2.5 w-36 overflow-hidden rounded-full bg-[#c9cbc4] sm:block">
                <div className="h-full rounded-full bg-[#728500] transition-all duration-300" style={{ width: `${((current + 1) / allLessons.length) * 100}%` }} />
              </div>
              <span className="font-mono-custom text-xs font-bold text-[#071a33]">{Math.round(((current + 1) / allLessons.length) * 100)}% COMPLETE</span>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1fr_330px]">
            <div>
              <div className="relative aspect-video overflow-hidden rounded-3xl bg-[#071a33] shadow-lg">
                <img src={course.image} alt="" className="h-full w-full object-cover opacity-40" />
                <div className="absolute inset-0 grid place-items-center">
                  <button onClick={() => setNotice('Playing lesson stream...')} className="grid h-16 w-16 place-items-center rounded-full bg-[#c7f000] text-[#071a33] transition-transform hover:scale-110 shadow-xl" aria-label="Play lesson" data-testid="button-play-lesson">
                    <Play size={25} fill="currentColor" />
                  </button>
                </div>
                <span className="absolute bottom-4 left-4 rounded-full bg-[#071a33]/80 px-3 py-1 text-xs text-[#f7f6f1] font-mono-custom">
                  Lesson {String(current + 1).padStart(2, '0')} • {lesson.duration}
                </span>
              </div>

              <div className="mt-5 rounded-3xl border border-[#071a33]/10 bg-[#fffefa] p-6 sm:p-8 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="eyebrow text-[#708100]">NOW PLAYING</p>
                    <h1 className="mt-1.5 font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#071a33]">{lesson.title}</h1>
                  </div>
                  <button onClick={complete} className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#c7f000] px-4 text-xs font-bold text-[#071a33] transition-transform hover:scale-105" data-testid="button-complete-lesson">
                    <Check size={14} /> Mark as Complete
                  </button>
                </div>

                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#626d73]">
                  In this lesson, we break down real implementation trade-offs. You will work directly with constraints, understand edge cases, and commit functional code.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-[#f0efe9] p-4">
                    <p className="eyebrow text-[#708100]">RESOURCES & CODE</p>
                    <div className="mt-3 space-y-2">
                      <button onClick={() => setNotice('Downloading project workbook...')} className="flex items-center gap-2 text-xs font-bold text-[#071a33] hover:underline" data-testid="button-download-workbook">
                        <Download size={14} /> Lesson Workbook <span className="text-[10px] text-[#7c858a]">PDF</span>
                      </button>
                      <button onClick={() => setNotice('Opening starter repository...')} className="flex items-center gap-2 text-xs font-bold text-[#071a33] hover:underline" data-testid="button-open-template">
                        <FileText size={14} /> Starter Template <span className="text-[10px] text-[#7c858a]">GIT</span>
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#f0efe9] p-4">
                    <p className="eyebrow text-[#708100]">PERSONAL LESSON NOTES</p>
                    <textarea 
                      value={notes} 
                      onChange={(e) => setNotes(e.target.value)} 
                      className="mt-2 min-h-14 w-full resize-none bg-transparent text-xs outline-none placeholder:text-[#8b9297]" 
                      placeholder="Type quick takeaways or code snippets here..." 
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#071a33]/10 pt-4">
                  {current > 0 ? (
                    <button onClick={() => setCurrent(current - 1)} className="inline-flex items-center gap-2 text-xs font-bold text-[#071a33]">
                      <ArrowLeft size={14} /> Previous Lesson
                    </button>
                  ) : <span />}
                  {current < allLessons.length - 1 && (
                    <button onClick={complete} className="inline-flex items-center gap-2 text-xs font-bold text-[#728500]">
                      Next Lesson <ArrowRight size={14} />
                    </button>
                  )}
                </div>

                {notice && <p className="mt-4 text-xs font-bold text-[#728500]" role="status">{notice}</p>}
              </div>
            </div>

            {/* Course Playlist Sidebar */}
            <aside className="h-fit overflow-hidden rounded-3xl border border-[#071a33]/10 bg-[#fffefa] lg:sticky lg:top-24 shadow-sm">
              <div className="border-b border-[#071a33]/10 p-5 bg-[#f7f6f1]">
                <p className="eyebrow text-[#708100]">COURSE PLAYLIST</p>
                <p className="mt-1 font-display text-sm font-bold text-[#071a33]">{course.title}</p>
              </div>
              <div className="max-h-[600px] overflow-auto p-3 space-y-4">
                {course.modules.map((module) => (
                  <div key={module.title}>
                    <p className="px-2 py-1 text-[11px] font-bold text-[#65717a] uppercase tracking-wider">{module.title}</p>
                    <div className="mt-1 space-y-1">
                      {module.lessons.map((item) => {
                        const lessonIndex = allLessons.findIndex((candidate) => candidate.title === item.title);
                        const isActive = lessonIndex === current;
                        return (
                          <button 
                            key={item.title} 
                            onClick={() => setCurrent(lessonIndex)} 
                            className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-xs transition-colors ${
                              isActive ? 'bg-[#c7f000] font-bold text-[#071a33]' : 'hover:bg-[#f0efe9] text-[#556068]'
                            }`}
                          >
                            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#071a33]/20 text-[9px]">
                              {lessonIndex < current ? <Check size={11} /> : lessonIndex + 1}
                            </span>
                            <span className="min-w-0 flex-1 truncate">{item.title}</span>
                            <span className="text-[10px] text-[#7d858b] font-mono-custom">{item.duration}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}

// ----------------------------------------------------
// DASHBOARD (LEARNER'S DESK)
// ----------------------------------------------------
function Dashboard() {
  const currentCourse = courses[3];
  return (
    <>
      <Header />
      <main className="page-shell py-10 md:py-16">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-[#708100]">STUDENT LEARNING DESK</p>
            <h1 className="mt-2 font-display text-4xl sm:text-6xl font-bold tracking-[-.06em]">
              Welcome back,<br /><span className="text-[#728500]">Riya.</span>
            </h1>
          </div>
          <Button href="/courses" variant="outline" testId="button-find-next-course">
            <span>Explore Library</span>
            <ArrowRight size={15} />
          </Button>
        </div>

        <section className="mt-10 grid gap-4 lg:grid-cols-[1.3fr_.7fr]">
          <div className="bento-card-dark relative overflow-hidden p-6 sm:p-9">
            <div className="absolute right-[-70px] top-[-70px] h-56 w-56 rounded-full border-[28px] border-[#c7f000]/20" />
            <div className="relative">
              <p className="eyebrow text-[#c7f000]">CURRENT PROGRESS</p>
              <h2 className="mt-3 max-w-[500px] font-display text-3xl sm:text-5xl font-bold leading-tight">
                {currentCourse.title}
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-[#b9c3c8]">Module 02 / Working with Constraints</p>
              
              <div className="mt-6 flex items-center gap-4">
                <div className="h-2.5 max-w-[280px] flex-1 overflow-hidden rounded-full bg-[#40505b]">
                  <div className="h-full w-[78%] bg-[#c7f000]" />
                </div>
                <span className="font-mono-custom text-xs font-bold text-[#c7f000]">78% Done</span>
              </div>

              <div className="mt-8">
                <Button href={`/learn/${currentCourse.id}`} variant="lime" testId="button-continue-learning">
                  <span>Resume Lesson</span>
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>

          <div className="bento-card-accent p-6 sm:p-9 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <p className="eyebrow text-[#071a33]">THIS MONTH'S LEARNING</p>
              <TrendingUp size={22} className="text-[#071a33]" />
            </div>
            <div>
              <p className="font-display text-5xl sm:text-6xl font-bold text-[#071a33]">12.4<span className="text-2xl">h</span></p>
              <p className="mt-1 text-xs text-[#4c5900] font-semibold">Active study time logged</p>
            </div>
            <div className="mt-6 flex items-end gap-1.5 h-16">
              {[36, 50, 28, 62, 42, 76, 55, 88, 64, 80, 71, 94].map((height, index) => (
                <span key={index} className={`flex-1 rounded-t-sm ${index === 11 ? 'bg-[#071a33]' : 'bg-[#90a900]'}`} style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
        </section>

        {/* My Enrolled Courses */}
        <section className="mt-14">
          <SectionHeading eyebrow="ENROLLED TRACKS" title="Keep the momentum" action={<Link href="/courses" className="text-xs font-bold underline">Browse more</Link>} />
          <div className="grid gap-4 md:grid-cols-3">
            {courses.slice(1, 4).map((course, index) => (
              <div key={course.id} className="bento-card overflow-hidden p-4">
                <div className="flex gap-4">
                  <img src={course.image} alt="" className="h-16 w-20 rounded-xl object-cover" />
                  <div className="min-w-0">
                    <p className="eyebrow text-[#728500]">{index === 0 ? 'ACTIVE' : 'SAVED'}</p>
                    <p className="mt-1 truncate font-display font-bold text-sm text-[#071a33]">{course.title}</p>
                    <p className="mt-1 text-[11px] text-[#707a81]">{course.duration}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href={`/learn/${course.id}`} className="block w-full rounded-lg bg-[#f0efe9] py-1.5 text-center text-xs font-bold text-[#071a33] hover:bg-[#c7f000]">
                    Launch Lesson
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// ----------------------------------------------------
// CERTIFICATES PAGE
// ----------------------------------------------------
function Certificates() {
  const [selected, setSelected] = useState<string | null>(null);
  const [notice, setNotice] = useState('');
  const certificateCourse = courses[3];

  return (
    <>
      <Header />
      <main className="page-shell py-12 md:py-16">
        <div className="max-w-[650px]">
          <p className="eyebrow text-[#708100]">CREDENTIAL VERIFICATION / 06</p>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl font-bold tracking-[-.06em]">
            Credentials worth putting your name on.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#687279]">
            Certificates on Neo Gyaan are not decorative participation trophies. They are backed by verified project checkpoints and recruiter-ready verification hashes.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_.8fr]">
          {/* Certificate Mockup */}
          <div className="bento-card-accent p-6 sm:p-9 shadow-lg">
            <div className="border-2 border-[#071a33] bg-[#f7f6f1] p-6 sm:p-8 rounded-2xl shadow-inner">
              <div className="flex items-start justify-between">
                <Logo size="large" />
                <Award size={32} className="text-[#071a33]" />
              </div>
              <p className="eyebrow mt-10 text-[#728500]">OFFICIAL CERTIFICATE OF COMPLETION</p>
              <p className="mt-2 text-xs text-[#6d767c]">This certifies that</p>
              <h2 className="mt-1 font-display text-3xl font-bold text-[#071a33]">Riya Sharma</h2>
              <p className="mt-4 text-xs text-[#59646b]">has rigorously satisfied all curriculum checkpoints for</p>
              <p className="mt-1 font-display text-xl font-bold text-[#071a33]">{certificateCourse.title}</p>
              
              <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-[#071a33]/15 pt-4 text-[11px] font-mono-custom text-[#546067]">
                <span>Issued: 14 June 2025</span>
                <span className="font-bold text-[#071a33]">VERIFICATION HASH: NG-84F2-91A</span>
              </div>
            </div>
          </div>

          <div className="bento-card-dark p-7 sm:p-8 flex flex-col justify-between">
            <div>
              <p className="eyebrow text-[#c7f000]">YOUR CREDENTIALS</p>
              <div className="mt-5 space-y-3">
                {courses.slice(0, 3).map((course, index) => (
                  <button
                    key={course.id}
                    onClick={() => setSelected(course.id)}
                    className={`flex w-full items-center gap-3.5 rounded-2xl border p-3.5 text-left transition-all ${
                      selected === course.id 
                        ? 'border-[#c7f000] bg-white/10' 
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <img src={course.image} alt="" className="h-12 w-16 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <strong className="block truncate text-xs text-white">{course.title}</strong>
                      <span className="text-[10px] text-[#aeb9bf]">{index === 0 ? 'Issued 14 June 2025' : 'Ready to unlock'}</span>
                    </div>
                    {index === 0 ? <Check size={16} className="text-[#c7f000]" /> : <ArrowRight size={15} className="text-white/60" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-5">
              <p className="text-xs text-[#a0afb8]">Certificates include permanent public URLs and direct 1-click LinkedIn additions.</p>
              <div className="mt-4 flex gap-2">
                <button onClick={() => setNotice('Certificate PDF generated successfully.')} className="rounded-full bg-[#c7f000] px-4 py-2.5 text-xs font-bold text-[#071a33]">
                  <Download size={13} className="inline mr-1" /> Download PDF
                </button>
                <button onClick={() => setNotice('Verifiable link copied to clipboard!')} className="rounded-full border border-white/20 px-4 py-2.5 text-xs font-bold text-white">
                  <Share2 size={13} className="inline mr-1" /> Share Credential
                </button>
              </div>
              {notice && <p className="mt-3 text-xs font-semibold text-[#c7f000]">{notice}</p>}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// ----------------------------------------------------
// PRICING PAGE
// ----------------------------------------------------
function PricingPage() {
  const { openCheckout } = usePayment();
  const [annualBilling, setAnnualBilling] = useState(false);

  return (
    <>
      <Header />
      <main className="page-shell py-14 md:py-20">
        <div className="mx-auto max-w-[700px] text-center mb-12">
          <p className="eyebrow text-[#708100]">TRANSPARENT TUITION</p>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#071a33]">
            Simple, honest pricing.
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#687279]">
            Unlock the complete Neo Gyaan curriculum with zero hidden fees. Switch or cancel anytime.
          </p>

          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#071a33]/15 bg-[#fffefa] p-1.5 shadow-sm">
            <button
              onClick={() => setAnnualBilling(false)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                !annualBilling ? 'bg-[#071a33] text-[#f7f6f1]' : 'text-[#616c74] hover:text-[#071a33]'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setAnnualBilling(true)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                annualBilling ? 'bg-[#071a33] text-[#f7f6f1]' : 'text-[#616c74] hover:text-[#071a33]'
              }`}
            >
              <span>Annual Billing</span>
              <span className="rounded-full bg-[#c7f000] px-2 py-0.5 text-[10px] font-bold text-[#071a33]">
                SAVE 30%
              </span>
            </button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3 max-w-[1100px] mx-auto">
          {/* Starter */}
          <div className="bento-card p-7 flex flex-col justify-between">
            <div>
              <span className="eyebrow text-[#728500]">FREE STARTER</span>
              <p className="mt-4 font-display text-4xl font-bold text-[#071a33]">₹0</p>
              <p className="mt-2 text-xs text-[#68737c]">Free access to trial modules</p>
              <div className="mt-6 border-t border-[#071a33]/10 pt-5 space-y-3 text-xs text-[#071a33]">
                <div className="flex items-center gap-2"><Check size={14} className="text-[#728500]" /> 5 free masterclass lessons</div>
                <div className="flex items-center gap-2"><Check size={14} className="text-[#728500]" /> Community forum & study groups</div>
                <div className="flex items-center gap-2"><Check size={14} className="text-[#728500]" /> All curriculum roadmaps</div>
              </div>
            </div>
            <div className="mt-8">
              <Button href="/signup" variant="outline">Start Free</Button>
            </div>
          </div>

          {/* Pro */}
          <div className="bento-card-dark p-7 flex flex-col justify-between border-2 border-[#c7f000] relative">
            <span className="absolute right-6 top-6 rounded-full bg-[#c7f000] px-2.5 py-0.5 text-[9px] font-bold text-[#071a33]">
              RECOMMENDED
            </span>
            <div>
              <span className="eyebrow text-[#c7f000]">PRO MEMBERSHIP</span>
              <p className="mt-4 font-display text-4xl font-bold text-white">
                {annualBilling ? '₹699' : '₹999'}<span className="text-sm font-normal text-white/60"> / mo</span>
              </p>
              <p className="mt-2 text-xs text-[#b4c1c9]">
                {annualBilling ? 'Billed annually at ₹8,388' : 'Billed monthly, cancel anytime'}
              </p>
              <div className="mt-6 border-t border-white/10 pt-5 space-y-3 text-xs text-white">
                <div className="flex items-center gap-2"><Check size={14} className="text-[#c7f000]" /> All 100+ masterclasses</div>
                <div className="flex items-center gap-2"><Check size={14} className="text-[#c7f000]" /> Verifiable digital certificates</div>
                <div className="flex items-center gap-2"><Check size={14} className="text-[#c7f000]" /> Offline downloads on mobile & desktop</div>
                <div className="flex items-center gap-2"><Check size={14} className="text-[#c7f000]" /> 2 monthly mentor PR reviews</div>
              </div>
            </div>
            <div className="mt-8">
              <button
                onClick={() => openCheckout({ title: 'Pro All-Access Membership', price: annualBilling ? 8388 : 999, type: 'plan', badge: 'PRO' })}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#c7f000] text-sm font-bold text-[#071a33] shadow-md"
              >
                <span>Upgrade to Pro</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Lifetime */}
          <div className="bento-card p-7 flex flex-col justify-between">
            <div>
              <span className="eyebrow text-[#728500]">LIFETIME PASS</span>
              <p className="mt-4 font-display text-4xl font-bold text-[#071a33]">₹3,999<span className="text-sm font-normal text-[#717b82]"> / one-time</span></p>
              <p className="mt-2 text-xs text-[#68737c]">Permanent access forever</p>
              <div className="mt-6 border-t border-[#071a33]/10 pt-5 space-y-3 text-xs text-[#071a33]">
                <div className="flex items-center gap-2"><Check size={14} className="text-[#728500]" /> Lifetime full access to all tracks</div>
                <div className="flex items-center gap-2"><Check size={14} className="text-[#728500]" /> 1-on-1 mentor strategy session</div>
                <div className="flex items-center gap-2"><Check size={14} className="text-[#728500]" /> Private Founders & Builders Discord</div>
                <div className="flex items-center gap-2"><Check size={14} className="text-[#728500]" /> Early access to all future curricula</div>
              </div>
            </div>
            <div className="mt-8">
              <button
                onClick={() => openCheckout({ title: 'Lifetime Master Pass', price: 3999, type: 'plan', badge: 'LIFETIME' })}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#071a33] text-sm font-bold text-[#f7f6f1] shadow-sm"
              >
                <span>Get Lifetime Pass</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// ----------------------------------------------------
// AUTH PAGE (LOGIN & SIGNUP)
// ----------------------------------------------------
function AuthPage({ mode }: { mode: 'login' | 'signup' | 'forgot' }) {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => { 
    e.preventDefault(); 
    if (!values.email.includes('@')) { 
      setError('Please enter a valid email address.'); 
      return; 
    } 
    if (mode !== 'forgot' && values.password.length < 6) { 
      setError('Password must contain at least 6 characters.'); 
      return; 
    } 
    setError(''); 
    setSubmitted(true); 
  };

  const title = mode === 'login' ? 'Welcome Back.' : mode === 'signup' ? 'Start Your Next Chapter.' : 'Reset Your Password.';

  return (
    <div className="grid min-h-[100dvh] lg:grid-cols-[.9fr_1.1fr]">
      <div className="flex flex-col bg-[#071a33] p-6 text-[#f7f6f1] sm:p-10 lg:p-14">
        <Logo inverse size="large" />
        <div className="my-auto max-w-[480px] py-14">
          <p className="eyebrow text-[#c7f000]">NEO GYAAN • {mode.toUpperCase()}</p>
          <h1 className="mt-4 font-display text-4xl sm:text-6xl font-bold leading-[.92] tracking-[-.06em] text-white">
            {title}
          </h1>
          <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#bdc7cc]">
            {mode === 'forgot' 
              ? 'Enter your registered email address and we’ll dispatch a secure recovery link.' 
              : 'Join 50,000+ ambitious developers, designers, and creators advancing their technical craft.'}
          </p>
          <div className="mt-10 flex items-center gap-3 text-xs font-mono-custom text-[#9eabb2]">
            <span className="h-px w-10 bg-[#c7f000]" />
            <span>LEARN • BUILD • SHIP</span>
          </div>
        </div>
        <p className="text-xs text-[#89979e]">© 2025 Neo Gyaan LMS</p>
      </div>

      <div className="flex items-center justify-center bg-[#f7f6f1] p-6 sm:p-10">
        <div className="w-full max-w-[420px]">
          {submitted ? (
            <div className="bento-card p-8 text-center shadow-lg">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#c7f000] text-[#071a33]">
                <Check size={28} />
              </div>
              <h2 className="font-display text-2xl font-bold text-[#071a33]">
                {mode === 'forgot' ? 'Check Your Inbox' : 'You’re In!'}
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-[#667078]">
                {mode === 'forgot' 
                  ? 'A password recovery link was dispatched.' 
                  : 'Your personal learning desk is ready. Pick a course to begin.'}
              </p>
              <div className="mt-6">
                <Button href={mode === 'forgot' ? '/login' : '/dashboard'} variant="dark">
                  <span>{mode === 'forgot' ? 'Back to Log In' : 'Go to Learning Desk'}</span>
                  <ArrowRight size={15} />
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8 lg:hidden"><Logo /></div>
              <p className="eyebrow text-[#708100]">YOUR ACCOUNT</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#071a33]">
                {mode === 'login' ? 'Log in to continue' : mode === 'signup' ? 'Create your account' : 'Password assistance'}
              </h2>
              <p className="mt-2 text-xs text-[#707980]">
                {mode === 'signup' ? 'Sign up free in seconds. No credit card required.' : 'Pick up exactly where you left off.'}
              </p>

              <form onSubmit={submit} className="mt-7 space-y-4" noValidate>
                {mode === 'signup' && (
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-[#071a33]">Your Full Name</label>
                    <input 
                      value={values.name} 
                      onChange={(e) => setValues({ ...values, name: e.target.value })} 
                      className="h-11 w-full rounded-xl border border-[#071a33]/15 bg-[#fffefa] px-3.5 text-xs outline-none focus:border-[#708100]" 
                      placeholder="Riya Sharma" 
                    />
                  </div>
                )}
                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#071a33]">Email Address</label>
                  <input 
                    type="email" 
                    value={values.email} 
                    onChange={(e) => setValues({ ...values, email: e.target.value })} 
                    className="h-11 w-full rounded-xl border border-[#071a33]/15 bg-[#fffefa] px-3.5 text-xs outline-none focus:border-[#708100]" 
                    placeholder="riya@example.com" 
                  />
                </div>
                {mode !== 'forgot' && (
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-[#071a33]">Password</label>
                    <input 
                      type="password" 
                      value={values.password} 
                      onChange={(e) => setValues({ ...values, password: e.target.value })} 
                      className="h-11 w-full rounded-xl border border-[#071a33]/15 bg-[#fffefa] px-3.5 text-xs outline-none focus:border-[#708100]" 
                      placeholder="At least 6 characters" 
                    />
                  </div>
                )}

                {error && <p className="text-xs font-semibold text-[#b34235]" role="alert">{error}</p>}

                <button 
                  type="submit" 
                  className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#071a33] text-xs font-bold text-[#f7f6f1] transition-transform hover:-translate-y-0.5 shadow-md"
                >
                  <span>{mode === 'login' ? 'Log in' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}</span>
                  <ArrowRight size={14} />
                </button>
              </form>

              <div className="mt-6 flex flex-wrap justify-between gap-2 text-xs text-[#6e777d]">
                {mode === 'login' ? (
                  <>
                    <Link href="/forgot-password" className="font-semibold underline">Forgot password?</Link>
                    <Link href="/signup" className="font-semibold text-[#071a33] underline">Create free account</Link>
                  </>
                ) : mode === 'signup' ? (
                  <>
                    <span>Already a member?</span>
                    <Link href="/login" className="font-semibold text-[#071a33] underline">Log in</Link>
                  </>
                ) : (
                  <Link href="/login" className="font-semibold text-[#071a33] underline">Back to Log In</Link>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// ROUTER & APP ROOT
// ----------------------------------------------------
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/courses" component={CoursesPage} />
      <Route path="/courses/:id" component={CourseDetail} />
      <Route path="/learn/:id" component={LearnPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/certificates" component={Certificates} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/login">{() => <AuthPage mode="login" />}</Route>
      <Route path="/signup">{() => <AuthPage mode="signup" />}</Route>
      <Route path="/forgot-password">{() => <AuthPage mode="forgot" />}</Route>
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const [, setLocation] = useLocation();
  const [paymentItem, setPaymentItem] = useState<PaymentItem | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const openCheckout = (item: PaymentItem) => {
    setPaymentItem(item);
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = (courseId?: string) => {
    if (courseId) {
      setLocation(`/learn/${courseId}`);
    } else {
      setLocation('/dashboard');
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PaymentContext.Provider value={{ openCheckout }}>
          <ErrorBoundary>
            <Router />
            <PaymentModal 
              isOpen={isPaymentOpen}
              onClose={() => setIsPaymentOpen(false)}
              item={paymentItem}
              onSuccess={handlePaymentSuccess}
            />
          </ErrorBoundary>
          <Toaster />
        </PaymentContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}