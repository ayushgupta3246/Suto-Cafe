import { useState, useEffect } from "react";
import {
  ShoppingCart, X, Plus, Minus, Phone, MapPin, Clock, Star,
  ChevronUp, Menu as MenuIcon, MessageCircle, 
  ChevronDown, Leaf, Shield, Coffee, Heart, Send, ArrowRight,
  CheckCircle, Award, Zap
} from "lucide-react";

/* ─── FONTS ─────────────────────────────────────────────────────── */
const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Dancing+Script:wght@600&display=swap"
    rel="stylesheet"
  />
);

/* ─── CUSTOM SVGS FOR SOCIAL ICONS (To fix lucide-react export issues) ── */
const InstagramIcon = ({ size = 24, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ size = 24, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

/* ─── TOKENS ─────────────────────────────────────────────────────
   Cream       #F8F5F0  — page background
   WarmWhite   #EDE8E0  — alternate section bg
   CardWhite   #FFFFFF  — card bg
   Coffee      #6F4E37  — primary / footer bg
   Espresso    #4A3728  — deep brown accents
   Latte       #C8A27C  — secondary / borders
   Amber       #D97706  — accent / prices / active
   Charcoal    #1F2937  — body text
   Mocha       #7A5C4A  — muted text
   Shadow      rgba(111,78,55,0.12) — warm card shadow
──────────────────────────────────────────────────────────────── */

/* ─── GLOBAL STYLES ─────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background: #F8F5F0;
      color: #1F2937;
      font-family: 'DM Sans', sans-serif;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #EDE8E0; }
    ::-webkit-scrollbar-thumb { background: #C8A27C; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #6F4E37; }

    .font-display { font-family: 'Cormorant Garamond', serif; }
    .font-body    { font-family: 'DM Sans', sans-serif; }
    .font-script  { font-family: 'Dancing Script', cursive; }

    /* ── Keyframes ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes gentleFloat {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(-8px); }
    }
    @keyframes grainSpin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes shimmerWarm {
      0%   { background-position: -300% 0; }
      100% { background-position: 300% 0; }
    }
    @keyframes expandLine {
      from { width: 0; }
      to   { width: 64px; }
    }
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(40px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes faqOpen {
      from { opacity: 0; transform: translateY(-8px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── Animation helpers ── */
    .anim-fadeup  { animation: fadeUp 0.7s ease both; }
    .anim-fadein  { animation: fadeIn 0.6s ease both; }
    .anim-float   { animation: gentleFloat 5s ease-in-out infinite; }
    .anim-slideright { animation: slideInRight 0.7s ease both; }

    /* ── Warm card shadow system ── */
    .card-shadow  { box-shadow: 0 4px 24px rgba(111,78,55,0.10); }
    .card-shadow-md { box-shadow: 0 8px 32px rgba(111,78,55,0.13); }
    .card-shadow-lg { box-shadow: 0 16px 52px rgba(111,78,55,0.18); }

    /* ── Section backgrounds ── */
    .bg-cream     { background: #F8F5F0; }
    .bg-warm      { background: #EDE8E0; }
    .bg-coffee    { background: #6F4E37; }
    .bg-card      { background: #FFFFFF; }

    /* ── Buttons ── */
    .btn-coffee {
      background: #6F4E37;
      color: #F8F5F0;
      border: none;
      cursor: pointer;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      letter-spacing: 0.4px;
      transition: background 0.25s, transform 0.2s, box-shadow 0.2s;
      display: inline-flex; align-items: center; gap: 6px;
    }
    .btn-coffee:hover {
      background: #4A3728;
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(111,78,55,0.30);
    }
    .btn-amber {
      background: #D97706;
      color: #FFFFFF;
      border: none;
      cursor: pointer;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      letter-spacing: 0.4px;
      transition: background 0.25s, transform 0.2s, box-shadow 0.2s;
      display: inline-flex; align-items: center; gap: 6px;
    }
    .btn-amber:hover {
      background: #B45309;
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(217,119,6,0.35);
    }
    .btn-outline {
      background: transparent;
      color: #6F4E37;
      border: 1.5px solid #6F4E37;
      cursor: pointer;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      transition: all 0.25s;
      display: inline-flex; align-items: center; gap: 6px;
    }
    .btn-outline:hover {
      background: #6F4E37;
      color: #F8F5F0;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(111,78,55,0.25);
    }
    .btn-wa {
      background: linear-gradient(135deg, #25D366, #128C7E);
      color: #fff;
      border: none;
      cursor: pointer;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      transition: transform 0.2s, box-shadow 0.2s;
      display: inline-flex; align-items: center; gap: 6px;
    }
    .btn-wa:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(37,211,102,0.40);
    }
    .btn-latte {
      background: #C8A27C;
      color: #4A3728;
      border: none;
      cursor: pointer;
      font-family: 'DM Sans', sans-serif;
      font-weight: 700;
      transition: all 0.25s;
      display: inline-flex; align-items: center; gap: 6px;
    }
    .btn-latte:hover {
      background: #B8906A;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(200,162,124,0.40);
    }

    /* ── Navbar ── */
    .navbar { transition: background 0.35s, box-shadow 0.35s; }
    .navbar-scrolled {
      background: rgba(248,245,240,0.97) !important;
      box-shadow: 0 2px 24px rgba(111,78,55,0.12);
      backdrop-filter: blur(10px);
    }

    /* ── Menu Card ── */
    .menu-card {
      background: #FFFFFF;
      border-radius: 18px;
      overflow: hidden;
      transition: transform 0.35s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.35s;
      cursor: pointer;
    }
    .menu-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 24px 56px rgba(111,78,55,0.20) !important;
    }
    .menu-card .card-img { transition: transform 0.45s ease; }
    .menu-card:hover .card-img { transform: scale(1.06); }

    /* ── Review Card ── */
    .review-card {
      background: #FFFFFF;
      border-radius: 18px;
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .review-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 48px rgba(111,78,55,0.18) !important;
    }

    /* ── Feature Card ── */
    .feature-card {
      background: #FFFFFF;
      border-radius: 18px;
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 16px 40px rgba(111,78,55,0.16) !important;
    }

    /* ── Gallery ── */
    .gallery-item { overflow: hidden; border-radius: 16px; cursor: pointer; }
    .gallery-item img { transition: transform 0.5s ease, filter 0.4s; width:100%; height:100%; object-fit:cover; }
    .gallery-item:hover img { transform: scale(1.1); filter: brightness(0.85); }
    .gallery-overlay {
      position: absolute; inset: 0;
      background: rgba(111,78,55,0.72);
      opacity: 0; transition: opacity 0.35s;
      display: flex; align-items: flex-end; padding: 20px;
      border-radius: 16px;
    }
    .gallery-item:hover .gallery-overlay { opacity: 1; }

    /* ── Section heading system ── */
    .eyebrow {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #D97706;
    }
    .section-heading {
      font-family: 'Cormorant Garamond', serif;
      color: #1F2937;
      line-height: 1.12;
    }
    .amber-rule {
      height: 3px;
      border-radius: 2px;
      background: linear-gradient(90deg, #D97706, #C8A27C);
      animation: expandLine 0.6s ease both;
    }

    /* ── Warm divider ── */
    .warm-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, #C8A27C, transparent);
    }

    /* ── Category filter pills ── */
    .pill {
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      font-size: 0.84rem;
      cursor: pointer;
      border-radius: 24px;
      transition: all 0.22s;
      letter-spacing: 0.3px;
    }
    .pill-active {
      background: #6F4E37 !important;
      color: #F8F5F0 !important;
      border-color: #6F4E37 !important;
      box-shadow: 0 4px 16px rgba(111,78,55,0.28);
    }

    /* ── Form inputs ── */
    .form-field {
      background: #FFFFFF;
      border: 1.5px solid #EDE8E0;
      color: #1F2937;
      font-family: 'DM Sans', sans-serif;
      transition: border-color 0.22s, box-shadow 0.22s;
      width: 100%;
    }
    .form-field:focus {
      outline: none;
      border-color: #D97706;
      box-shadow: 0 0 0 3px rgba(217,119,6,0.12);
    }
    .form-field::placeholder { color: #B8A090; }

    /* ── Floating WA ── */
    .wa-float {
      position: fixed; bottom: 80px; right: 24px; z-index: 999;
      width: 56px; height: 56px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      background: linear-gradient(135deg, #25D366, #128C7E);
      box-shadow: 0 6px 28px rgba(37,211,102,0.45);
      cursor: pointer;
      transition: transform 0.25s, box-shadow 0.25s;
    }
    .wa-float:hover {
      transform: scale(1.1);
      box-shadow: 0 10px 36px rgba(37,211,102,0.6);
    }

    /* ── Back to top ── */
    .back-top {
      position: fixed; bottom: 24px; right: 24px; z-index: 999;
      width: 44px; height: 44px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      background: #6F4E37;
      box-shadow: 0 4px 18px rgba(111,78,55,0.35);
      cursor: pointer; border: none;
      transition: all 0.25s;
    }
    .back-top:hover {
      background: #4A3728;
      transform: translateY(-3px);
      box-shadow: 0 8px 28px rgba(111,78,55,0.50);
    }

    /* ── Cart Drawer ── */
    .cart-drawer {
      position: fixed; top: 0; right: 0; height: 100vh; z-index: 1100;
      background: #FFFFFF;
      border-left: 1px solid #EDE8E0;
      box-shadow: -8px 0 48px rgba(111,78,55,0.18);
      transition: transform 0.4s cubic-bezier(0.25,0.8,0.25,1);
    }
    .cart-overlay {
      position: fixed; inset: 0;
      background: rgba(111,78,55,0.25);
      z-index: 1099;
      backdrop-filter: blur(3px);
    }

    /* ── Popular badge ── */
    .pop-badge {
      background: #D97706;
      color: #fff;
      font-size: 0.62rem;
      font-weight: 700;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      padding: 2px 9px;
      border-radius: 20px;
      font-family: 'DM Sans', sans-serif;
    }

    /* ── Veg indicator ── */
    .veg-ring {
      width: 18px; height: 18px;
      border: 1.5px solid #25D366;
      border-radius: 3px;
      display: inline-flex; align-items: center; justify-content: center;
    }
    .veg-dot { width: 8px; height: 8px; border-radius: 50%; background: #25D366; }

    /* ── Offer banner shimmer ── */
    .offer-shimmer {
      background: linear-gradient(
        100deg,
        transparent 30%,
        rgba(255,255,255,0.07) 50%,
        transparent 70%
      );
      background-size: 300% 100%;
      animation: shimmerWarm 2.5s linear infinite;
    }

    /* ── FAQ ── */
    .faq-row { border-bottom: 1px solid #EDE8E0; cursor: pointer; }
    .faq-body { overflow: hidden; transition: max-height 0.4s ease, opacity 0.3s; }
    .faq-body.open { animation: faqOpen 0.3s ease both; }

    /* ── Star amber ── */
    .star-amber { color: #D97706; }
    .star-empty  { color: #E5D5C5; }

    /* ── Coffee ring SVG signature ── */
    .coffee-ring { pointer-events: none; position: absolute; }

    /* ── Responsive ── */
    @media (max-width: 900px) {
      .hero-grid  { grid-template-columns: 1fr !important; }
      .hero-img   { display: none !important; }
      .about-grid { grid-template-columns: 1fr !important; }
      .about-img  { display: none !important; }
      .menu-grid  { grid-template-columns: 1fr 1fr !important; }
      .feat-grid  { grid-template-columns: 1fr 1fr !important; }
      .rev-grid   { grid-template-columns: 1fr !important; }
      .foot-grid  { grid-template-columns: 1fr 1fr !important; }
      .order-grid { grid-template-columns: 1fr !important; }
      .order-summary-sticky { position: static !important; }
    }
    @media (max-width: 600px) {
      .menu-grid  { grid-template-columns: 1fr !important; }
      .feat-grid  { grid-template-columns: 1fr !important; }
      .foot-grid  { grid-template-columns: 1fr !important; }
      .stats-grid { grid-template-columns: 1fr 1fr !important; }
      .hide-sm { display: none !important; }
    }
  `}</style>
);

/* ─── DATA ──────────────────────────────────────────────────────── */
const PHONE = "+917985685451";
const PHONE_DISPLAY = "+91 79856 85451";
const WA = (msg = "Hi! I'm interested in Suto Cafe.") =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;

const menuItems = [
  { id:1,  name:"Cheese Corn Pizza",       cat:"pizza",       price:139, popular:true,  desc:"Sweet corn & triple cheese on hand-stretched golden crust",     img:"https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80" },
  { id:2,  name:"Margherita Pizza",         cat:"pizza",       price:159, popular:false, desc:"Classic San Marzano tomato, fresh mozzarella & basil oil",      img:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80" },
  { id:3,  name:"Paneer Tikka Pizza",       cat:"pizza",       price:179, popular:true,  desc:"Spiced cottage cheese, roasted peppers & smoky onion blend",    img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80" },
  { id:4,  name:"Veggie Supreme Pizza",     cat:"pizza",       price:189, popular:false, desc:"Garden-fresh vegetables with herb-infused tomato sauce",        img:"https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=500&q=80" },
  { id:5,  name:"Grilled Cheese Sandwich",  cat:"sandwiches",  price:111, popular:true,  desc:"Golden-pressed with melting layers of premium aged cheese",     img:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&q=80" },
  { id:6,  name:"Club Sandwich",            cat:"sandwiches",  price:129, popular:false, desc:"Triple-decker with fresh greens, cheese & house-made mayo",     img:"https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?w=500&q=80" },
  { id:7,  name:"Paneer Grilled Sandwich",  cat:"sandwiches",  price:139, popular:false, desc:"Spiced cottage cheese with mint chutney & crunchy peppers",     img:"https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500&q=80" },
  { id:8,  name:"Veggie Delight Sandwich",  cat:"sandwiches",  price:119, popular:false, desc:"Seasonal vegetables with house-made herb sauce",               img:"https://images.unsplash.com/photo-1497990025-8b9bfcaa085e?w=500&q=80" },
  { id:9,  name:"Cold Coffee",              cat:"beverages",   price:89,  popular:true,  desc:"Creamy blended coffee crowned with fresh whipped cream",         img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80" },
  { id:10, name:"Masala Chai",              cat:"beverages",   price:39,  popular:true,  desc:"Aromatic spiced chai with fresh ginger & green cardamom",       img:"https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80" },
  { id:11, name:"Fresh Lime Soda",          cat:"beverages",   price:59,  popular:false, desc:"Zesty fresh lime with sparkling soda — sweet or salted",        img:"https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&q=80" },
  { id:12, name:"Mango Shake",              cat:"beverages",   price:79,  popular:false, desc:"Thick Alphonso mango milkshake — pure summer nostalgia",        img:"https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&q=80" },
  { id:13, name:"French Fries",             cat:"snacks",      price:79,  popular:true,  desc:"Crispy golden fries with signature house seasoning blend",      img:"https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=500&q=80" },
  { id:14, name:"Veg Momos",               cat:"snacks",      price:89,  popular:true,  desc:"Handcrafted dumplings with fiery house dipping sauce",         img:"https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&q=80" },
  { id:15, name:"Garlic Bread",             cat:"snacks",      price:69,  popular:false, desc:"Toasted sourdough with herb butter & roasted garlic",           img:"/images/suto_garlic.png" },
  { id:16, name:"Loaded Nachos",            cat:"snacks",      price:99,  popular:false, desc:"Crispy nachos with cheese dip, salsa & pickled jalapeños",     img:"https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=500&q=80" },
];

const reviews = [
  { name:"Priya Sharma",  init:"PS", rating:5, time:"2 weeks ago",  text:"Absolutely love Suto Cafe! The Grilled Cheese Sandwich is unlike anything else in Ayodhya. Staff is warm, ambiance is beautiful. My go-to spot after temple visits." },
  { name:"Rahul Verma",   init:"RV", rating:5, time:"1 month ago",  text:"Came here after Ram Mandir darshan — the cold coffee was so refreshing! Cheese Corn Pizza is heavenly. Prices are very fair for such quality. Highly recommended!" },
  { name:"Ananya Singh",  init:"AS", rating:4, time:"3 weeks ago",  text:"Premium cafe experience in Ayodhya. Loved the warm, modern ambiance. Food is fresh and hygienic. The momos and chai combo is our family favourite now!" },
  { name:"Vikram Mishra", init:"VM", rating:5, time:"5 days ago",   text:"Perfect hangout spot. Ordered via WhatsApp and the delivery was super fast. Paneer Tikka Pizza was restaurant-quality. Will definitely be back!" },
  { name:"Kavya Gupta",   init:"KG", rating:5, time:"1 week ago",   text:"Best cafe in Niyawan, no doubt. The interiors are so Instagram-worthy! Loved every bite. Staff remembered my usual order on the second visit — that personal touch matters!" },
  { name:"Arjun Tiwari",  init:"AT", rating:4, time:"2 months ago", text:"Great place for family dining. Garlic bread was excellent. Cold coffee was thick and creamy. Budget-friendly with a genuinely premium feel. Suto sets a new standard." },
];

const galleryImages = [
  { img:"https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80", label:"Cheese Corn Pizza",  cat:"food"  },
  { img:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80", label:"Grilled Sandwich",   cat:"food"  },
  { img:"https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80", label:"Artisan Coffee",     cat:"drinks"},
  { img:"https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&q=80", label:"Cafe Ambiance",      cat:"cafe"  },
  { img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80", label:"Cold Coffee",        cat:"drinks"},
  { img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80", label:"Paneer Pizza",       cat:"food"  },
  { img:"https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&q=80", label:"Steamed Momos",      cat:"food"  },
  { img:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80", label:"Warm Interiors",     cat:"cafe"  },
  { img:"https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=600&q=80", label:"Golden Fries",       cat:"food"  },
];

const faqs = [
  { q:"What are your opening hours?",          a:"We are open every day — 10:00 AM to 11:00 PM, including all weekends, public holidays, and festival days. We are always here for you." },
  { q:"How do I order via WhatsApp?",          a:"Tap any WhatsApp button on this page or message us at +91 79856 85451. Share your order and address and we will confirm in minutes." },
  { q:"What is the average cost per person?",  a:"A satisfying meal with a beverage typically costs ₹200–₹400 per person. We believe great food should never feel expensive." },
  { q:"Do you offer home delivery?",           a:"Yes! We deliver within Niyawan and nearby Faizabad areas. Contact us on WhatsApp for delivery zones and estimated time." },
  { q:"Is Suto Cafe 100% vegetarian?",         a:"Absolutely. Suto Cafe is a proudly and completely vegetarian cafe. Every ingredient is carefully sourced and our kitchen is strictly vegetarian." },
  { q:"Can I reserve a table in advance?",     a:"Yes! Call us or WhatsApp with your preferred date, time, and party size. We recommend booking on weekends and festival days." },
];

/* ─── HELPERS ───────────────────────────────────────────────────── */
const Stars = ({ n }) => (
  <span style={{ display:"flex", gap:2 }}>
    {[1,2,3,4,5].map(i => (
      <Star key={i} size={13} fill={i<=n?"#D97706":"none"}
        className={i<=n?"star-amber":"star-empty"} />
    ))}
  </span>
);

const VegBadge = () => (
  <span className="veg-ring"><span className="veg-dot" /></span>
);

/* ─── COFFEE RING SVG (signature element) ───────────────────────── */
const CoffeeRing = ({ size=400, opacity=0.05, style={} }) => (
  <svg width={size} height={size} viewBox="0 0 400 400"
    style={{ ...style, pointerEvents:"none", flexShrink:0 }} aria-hidden>
    <circle cx="200" cy="200" r="178" fill="none" stroke="#6F4E37"
      strokeWidth="28" strokeDasharray="4 3" opacity={opacity * 1.2}/>
    <circle cx="200" cy="200" r="150" fill="none" stroke="#6F4E37"
      strokeWidth="8" opacity={opacity * 0.7}/>
    <circle cx="200" cy="200" r="195" fill="none" stroke="#C8A27C"
      strokeWidth="4" strokeDasharray="8 12" opacity={opacity}/>
  </svg>
);

/* ─── NAVBAR ────────────────────────────────────────────────────── */
function Navbar({ activePage, navigateTo, cartCount, setCartOpen, isScrolled }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [
    {id:"home",label:"Home"},{id:"menu",label:"Menu"},{id:"about",label:"About"},
    {id:"gallery",label:"Gallery"},{id:"order",label:"Order Online"},{id:"contact",label:"Contact"},
  ];
  const li = { color:"#1F2937", fontWeight:500, fontSize:"0.9rem", fontFamily:"DM Sans, sans-serif",
    background:"none", border:"none", cursor:"pointer", paddingBottom:2,
    borderBottom:"2px solid transparent", transition:"color 0.2s, border-color 0.2s" };
  const liActive = { ...li, color:"#6F4E37", borderBottomColor:"#D97706" };

  return (
    <nav className={`navbar ${isScrolled?"navbar-scrolled":""}`}
      style={{ position:"fixed", top:0, left:0, right:0, zIndex:1000,
        background: isScrolled ? undefined : "rgba(248,245,240,0.85)", padding:"0 24px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center",
        justifyContent:"space-between", height:70 }}>
        {/* Logo */}
        <button onClick={()=>navigateTo("home")}
          style={{background:"none",border:"none",cursor:"pointer",textAlign:"left",padding:0}}>
          <span className="font-script" style={{fontSize:"1.9rem",color:"#6F4E37",lineHeight:1}}>Suto Cafe</span>
          <span className="font-body" style={{display:"block",fontSize:"0.6rem",color:"#C8A27C",
            letterSpacing:"3.5px",fontWeight:700,textTransform:"uppercase",marginTop:1}}>AYODHYA</span>
        </button>

        {/* Desktop links */}
        <div className="hide-sm" style={{display:"flex",gap:28,alignItems:"center"}}>
          {links.map(l=>(
            <button key={l.id} onClick={()=>navigateTo(l.id)}
              style={activePage===l.id?liActive:li}>{l.label}</button>
          ))}
        </div>

        {/* Controls */}
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <button onClick={()=>setCartOpen(true)}
            style={{position:"relative",background:"#F8F5F0",border:"1.5px solid #EDE8E0",
              borderRadius:10,padding:"7px 14px",cursor:"pointer",display:"flex",
              alignItems:"center",gap:6,color:"#6F4E37",fontFamily:"DM Sans, sans-serif",
              fontWeight:600,fontSize:"0.85rem",transition:"all 0.2s"}}>
            <ShoppingCart size={17}/> Cart
            {cartCount>0&&(
              <span style={{position:"absolute",top:-6,right:-6,background:"#D97706",
                color:"#fff",borderRadius:"50%",width:19,height:19,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:"0.68rem",fontWeight:700}}>{cartCount}</span>
            )}
          </button>
          <button className="btn-wa" onClick={()=>window.open(WA("Hi! I'd like to order from Suto Cafe."),"_blank")}
            style={{padding:"8px 16px",borderRadius:10,fontSize:"0.85rem"}}>
            <MessageCircle size={15}/> Order
          </button>
          <button onClick={()=>setMobileOpen(!mobileOpen)}
            style={{background:"none",border:"none",cursor:"pointer",color:"#6F4E37",
              display:"none"}} className="hide-sm">
            <MenuIcon size={22}/>
          </button>
        </div>
      </div>
      {mobileOpen&&(
        <div style={{background:"rgba(248,245,240,0.98)",borderTop:"1px solid #EDE8E0",
          padding:"16px 24px 20px"}}>
          {links.map(l=>(
            <button key={l.id} onClick={()=>{navigateTo(l.id);setMobileOpen(false);}}
              style={{display:"block",width:"100%",textAlign:"left",background:"none",border:"none",
                cursor:"pointer",color:activePage===l.id?"#6F4E37":"#1F2937",fontFamily:"DM Sans, sans-serif",
                fontWeight:500,fontSize:"1rem",padding:"12px 0",
                borderBottom:"1px solid #EDE8E0"}}>{l.label}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─── CART DRAWER ───────────────────────────────────────────────── */
function CartDrawer({ cart, cartOpen, setCartOpen, updateQty, removeFromCart, cartTotal, cartCount, onWhatsApp }) {
  if (!cartOpen) return null;
  return (
    <>
      <div className="cart-overlay" onClick={()=>setCartOpen(false)}/>
      <div className="cart-drawer" style={{width:370}}>
        <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
          <div style={{padding:"22px 20px 16px",borderBottom:"1px solid #EDE8E0",
            display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div>
              <div className="font-display" style={{fontSize:"1.4rem",fontWeight:700,color:"#1F2937"}}>
                Your Order
              </div>
              <div style={{fontSize:"0.8rem",color:"#7A5C4A",marginTop:2}}>
                {cartCount} item{cartCount!==1?"s":""}
              </div>
            </div>
            <button onClick={()=>setCartOpen(false)}
              style={{background:"#F8F5F0",border:"1px solid #EDE8E0",borderRadius:8,
                padding:8,cursor:"pointer",color:"#6F4E37",display:"flex"}}>
              <X size={17}/>
            </button>
          </div>

          <div style={{flex:1,overflowY:"auto",padding:"16px 20px"}}>
            {cart.length===0?(
              <div style={{textAlign:"center",padding:"56px 20px"}}>
                <div style={{fontSize:"3rem",marginBottom:12}}>☕</div>
                <div className="font-display" style={{fontSize:"1.2rem",color:"#6F4E37",marginBottom:6}}>
                  Your cart is empty
                </div>
                <div style={{color:"#7A5C4A",fontSize:"0.85rem"}}>Add something delicious!</div>
              </div>
            ):cart.map(item=>(
              <div key={item.id} style={{display:"flex",gap:12,marginBottom:14,
                padding:12,background:"#F8F5F0",borderRadius:12,
                border:"1px solid #EDE8E0"}}>
                <img src={item.img} alt={item.name}
                  style={{width:58,height:58,borderRadius:8,objectFit:"cover",flexShrink:0}}/>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:"0.88rem",color:"#1F2937",marginBottom:4}}>{item.name}</div>
                  <div style={{color:"#D97706",fontWeight:700,fontSize:"0.9rem"}}>₹{item.price}</div>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginTop:8}}>
                    <button onClick={()=>updateQty(item.id,-1)}
                      style={{width:26,height:26,borderRadius:6,background:"#EDE8E0",
                        border:"none",color:"#6F4E37",cursor:"pointer",
                        display:"flex",alignItems:"center",justifyContent:"center"}}><Minus size={12}/></button>
                    <span style={{minWidth:18,textAlign:"center",fontWeight:700,color:"#1F2937"}}>{item.qty}</span>
                    <button onClick={()=>updateQty(item.id,1)}
                      style={{width:26,height:26,borderRadius:6,background:"#EDE8E0",
                        border:"none",color:"#6F4E37",cursor:"pointer",
                        display:"flex",alignItems:"center",justifyContent:"center"}}><Plus size={12}/></button>
                    <button onClick={()=>removeFromCart(item.id)}
                      style={{marginLeft:"auto",background:"none",border:"none",
                        cursor:"pointer",color:"#C8A27C"}}><X size={13}/></button>
                  </div>
                </div>
                <div style={{fontWeight:700,color:"#6F4E37",fontSize:"0.95rem",alignSelf:"center"}}>
                  ₹{item.price*item.qty}
                </div>
              </div>
            ))}
          </div>

          {cart.length>0&&(
            <div style={{padding:"16px 20px",borderTop:"1px solid #EDE8E0"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <span style={{color:"#7A5C4A",fontWeight:500}}>Subtotal</span>
                <span style={{color:"#1F2937",fontWeight:600}}>₹{cartTotal}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
                <span style={{color:"#7A5C4A",fontWeight:500}}>Delivery</span>
                <span style={{color:"#25D366",fontWeight:600}}>As per area</span>
              </div>
              <button className="btn-wa" onClick={onWhatsApp}
                style={{width:"100%",padding:"13px",borderRadius:12,fontSize:"0.95rem",
                  justifyContent:"center"}}>
                <MessageCircle size={17}/> WhatsApp Checkout — ₹{cartTotal}
              </button>
              <div style={{textAlign:"center",marginTop:8,fontSize:"0.73rem",color:"#C8A27C"}}>
                You'll be redirected to WhatsApp to confirm
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ─── HERO ──────────────────────────────────────────────────────── */
function Hero({ navigateTo }) {
  return (
    <section style={{background:"#F8F5F0",paddingTop:70,overflow:"hidden",minHeight:"90vh",
      display:"flex",alignItems:"center",position:"relative"}}>
      {/* Coffee ring background decoration */}
      <div style={{position:"absolute",left:-80,bottom:-80,opacity:0.07,pointerEvents:"none"}}>
        <CoffeeRing size={380}/>
      </div>
      <div style={{position:"absolute",right:-60,top:"10%",opacity:0.05,pointerEvents:"none"}}>
        <CoffeeRing size={280}/>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"60px 32px",width:"100%"}}>
        <div className="hero-grid" style={{display:"grid",gridTemplateColumns:"55% 45%",
          gap:48,alignItems:"center"}}>
          {/* Text side */}
          <div>
            <div className="eyebrow anim-fadeup" style={{marginBottom:16,animationDelay:"0.1s"}}>
              ☕ Niyawan's Favourite Café · Ayodhya
            </div>
            <h1 className="font-display anim-fadeup"
              style={{fontSize:"clamp(3rem,5.5vw,5.2rem)",fontWeight:700,
                lineHeight:1.05,color:"#1F2937",marginBottom:24,animationDelay:"0.25s"}}>
              Where Every<br/>
              Bite Feels{" "}
              <em style={{color:"#6F4E37",fontStyle:"italic"}}>Special</em>
            </h1>
            <p className="anim-fadeup"
              style={{fontSize:"1.05rem",color:"#7A5C4A",lineHeight:1.85,
                maxWidth:500,marginBottom:36,animationDelay:"0.45s"}}>
              Handcrafted pizzas, golden sandwiches & artisan beverages — prepared fresh and
              served with heart in the sacred city of Ayodhya. 100% vegetarian.
            </p>

            <div className="anim-fadeup" style={{display:"flex",gap:14,flexWrap:"wrap",
              marginBottom:40,animationDelay:"0.6s"}}>
              <button className="btn-wa"
                onClick={()=>window.open(WA("Hi! I'd like to place an order from Suto Cafe."),"_blank")}
                style={{padding:"13px 26px",borderRadius:12,fontSize:"0.95rem"}}>
                <MessageCircle size={17}/> Order on WhatsApp
              </button>
              <button className="btn-outline" onClick={()=>navigateTo("menu")}
                style={{padding:"13px 26px",borderRadius:12,fontSize:"0.95rem"}}>
                Explore Menu <ArrowRight size={15}/>
              </button>
            </div>

            {/* Info chips */}
            <div className="anim-fadeup" style={{display:"flex",gap:10,flexWrap:"wrap",
              animationDelay:"0.75s"}}>
              {[
                {icon:<Clock size={13}/>,label:"10 AM – 11 PM"},
                {icon:<MapPin size={13}/>,label:"Niyawan, Ayodhya"},
                {icon:<Star size={13} fill="#D97706"/>,label:"4.8★ Rated"},
                {icon:<Leaf size={13}/>,label:"100% Veg"},
              ].map((c,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:5,
                  padding:"5px 13px",borderRadius:20,
                  background:"#FFFFFF",border:"1px solid #EDE8E0",
                  boxShadow:"0 2px 8px rgba(111,78,55,0.07)",
                  fontSize:"0.78rem",color:"#6F4E37",fontWeight:500}}>
                  <span style={{color:"#D97706"}}>{c.icon}</span>{c.label}
                </div>
              ))}
            </div>
          </div>

          {/* Image side */}
          <div className="hero-img anim-slideright" style={{position:"relative",
            animationDelay:"0.3s"}}>
            {/* Coffee ring behind image — signature */}
            <div style={{position:"absolute",top:-40,right:-40,zIndex:0}}>
              <CoffeeRing size={420} opacity={0.09}/>
            </div>
            {/* Latte shadow blob */}
            <div style={{position:"absolute",bottom:-20,right:-20,
              width:"85%",height:"85%",borderRadius:32,
              background:"#C8A27C",opacity:0.18,zIndex:0,
              transform:"rotate(3deg)"}}/>
            <div style={{position:"relative",zIndex:1}}>
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
                alt="Suto Cafe Ayodhya"
                style={{width:"100%",height:520,objectFit:"cover",
                  borderRadius:28,display:"block",
                  boxShadow:"0 24px 64px rgba(111,78,55,0.25)"}}/>
              {/* Floating rating badge */}
              <div style={{position:"absolute",bottom:24,left:-20,
                background:"#FFFFFF",borderRadius:16,padding:"12px 18px",
                boxShadow:"0 8px 32px rgba(111,78,55,0.20)",
                display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:40,height:40,borderRadius:10,
                  background:"linear-gradient(135deg,#D97706,#C8A27C)",
                  display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <Star size={20} fill="#fff" color="#fff"/>
                </div>
                <div>
                  <div style={{fontFamily:"Cormorant Garamond, serif",
                    fontWeight:700,fontSize:"1.3rem",color:"#1F2937",lineHeight:1}}>4.8</div>
                  <div style={{fontSize:"0.72rem",color:"#7A5C4A",fontWeight:500,marginTop:2}}>
                    Google Rating
                  </div>
                </div>
              </div>
              {/* Open badge */}
              <div style={{position:"absolute",top:20,right:20,
                background:"#6F4E37",borderRadius:10,padding:"6px 12px",
                display:"flex",alignItems:"center",gap:5}}>
                <div style={{width:7,height:7,borderRadius:"50%",background:"#4ADE80"}}/>
                <span style={{color:"#F8F5F0",fontSize:"0.75rem",fontWeight:600,
                  fontFamily:"DM Sans, sans-serif"}}>Open Now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── STATS BAR ─────────────────────────────────────────────────── */
function StatsBar() {
  const stats = [
    {val:"2,500+",label:"Happy Guests",     emoji:"😊"},
    {val:"4.8 ★",  label:"Google Rating",   emoji:"⭐"},
    {val:"50+",    label:"Menu Items",       emoji:"🍕"},
    {val:"365",    label:"Days Open / Year", emoji:"📅"},
  ];
  return (
    <div style={{background:"#6F4E37",padding:"36px 24px"}}>
      <div className="stats-grid" style={{maxWidth:1200,margin:"0 auto",
        display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24}}>
        {stats.map((s,i)=>(
          <div key={i} style={{textAlign:"center"}}>
            <div style={{fontSize:"1.5rem",marginBottom:4}}>{s.emoji}</div>
            <div className="font-display" style={{fontSize:"2.1rem",fontWeight:700,
              color:"#F8F5F0",lineHeight:1}}>{s.val}</div>
            <div style={{fontSize:"0.8rem",color:"#C8A27C",marginTop:4,fontWeight:500}}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── POPULAR DISHES ────────────────────────────────────────────── */
function PopularDishes({ addToCart, navigateTo }) {
  const popular = menuItems.filter(i=>i.popular);
  return (
    <section style={{padding:"88px 24px",background:"#F8F5F0"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:56}}>
          <p className="eyebrow" style={{marginBottom:12}}>OUR BESTSELLERS</p>
          <h2 className="section-heading" style={{fontSize:"clamp(2rem,3.5vw,3rem)",
            fontWeight:700,marginBottom:16}}>
            Most Loved Dishes
          </h2>
          <div className="amber-rule" style={{width:64,margin:"0 auto 16px"}}/>
          <p style={{color:"#7A5C4A",maxWidth:480,margin:"0 auto",lineHeight:1.8,fontSize:"0.95rem"}}>
            Handpicked by our guests — the dishes that bring Ayodhya back again and again.
          </p>
        </div>

        <div className="menu-grid" style={{display:"grid",
          gridTemplateColumns:"repeat(4,1fr)",gap:24}}>
          {popular.map(item=>(
            <div key={item.id} className="menu-card card-shadow">
              <div style={{position:"relative",height:190,overflow:"hidden"}}>
                <img src={item.img} alt={item.name} className="card-img"
                  style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                <div style={{position:"absolute",inset:0,
                  background:"linear-gradient(to top, rgba(30,15,5,0.55) 0%, transparent 55%)"}}/>
                <span className="pop-badge" style={{position:"absolute",top:10,left:10}}>
                  🔥 Popular
                </span>
                <span style={{position:"absolute",top:10,right:10}}><VegBadge/></span>
              </div>
              <div style={{padding:"18px"}}>
                <h3 className="font-display" style={{fontSize:"1.08rem",fontWeight:700,
                  color:"#1F2937",marginBottom:6,lineHeight:1.3}}>{item.name}</h3>
                <p style={{fontSize:"0.79rem",color:"#7A5C4A",lineHeight:1.55,marginBottom:14,
                  minHeight:34}}>{item.desc}</p>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <span className="font-display" style={{fontSize:"1.3rem",fontWeight:700,
                    color:"#D97706"}}>₹{item.price}</span>
                  <button className="btn-coffee" onClick={()=>addToCart(item)}
                    style={{padding:"7px 15px",borderRadius:8,fontSize:"0.8rem"}}>
                    <Plus size={12}/> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{textAlign:"center",marginTop:44}}>
          <button className="btn-outline" onClick={()=>navigateTo("menu")}
            style={{padding:"12px 32px",borderRadius:10,fontSize:"0.95rem"}}>
            View Full Menu <ArrowRight size={15}/>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── OFFER BANNER ──────────────────────────────────────────────── */
function OfferBanner() {
  return (
    <div style={{padding:"0 24px",background:"#F8F5F0"}}>
      <div style={{maxWidth:1200,margin:"0 auto",marginBottom:0,paddingBottom:88}}>
        <div className="offer-shimmer" style={{borderRadius:24,overflow:"hidden",
          background:"linear-gradient(135deg,#6F4E37 0%,#4A3728 100%)",
          padding:"44px 52px",position:"relative",
          boxShadow:"0 20px 56px rgba(111,78,55,0.30)"}}>
          <div style={{position:"absolute",right:-60,top:-60,
            width:220,height:220,borderRadius:"50%",
            background:"rgba(200,162,124,0.12)"}}/>
          <div style={{position:"absolute",right:120,bottom:-80,
            width:160,height:160,borderRadius:"50%",
            background:"rgba(217,119,6,0.10)"}}/>
          <div style={{display:"flex",alignItems:"center",
            justifyContent:"space-between",flexWrap:"wrap",gap:28,position:"relative"}}>
            <div>
              <div className="font-script" style={{fontSize:"1.2rem",color:"#C8A27C",marginBottom:8}}>
                🎉 Limited Time Offer
              </div>
              <h3 className="font-display" style={{fontSize:"2rem",fontWeight:700,
                color:"#F8F5F0",marginBottom:10,lineHeight:1.2}}>
                Pizza + Cold Coffee Combo
              </h3>
              <p style={{color:"rgba(248,245,240,0.72)",fontSize:"0.95rem",
                maxWidth:460,lineHeight:1.75}}>
                Order any pizza + cold coffee via WhatsApp and mention{" "}
                <strong style={{color:"#D97706"}}>&#34;SUTO10&#34;</strong> for{" "}
                ₹30 off your total bill!
              </p>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:14}}>
              <div className="font-display" style={{fontSize:"3.5rem",fontWeight:700,
                color:"#D97706",lineHeight:1}}>
                ₹30 <span style={{fontSize:"1.1rem",color:"#C8A27C"}}>OFF</span>
              </div>
              <button className="btn-latte"
                onClick={()=>window.open(WA("Hi! Combo Deal please. Code: SUTO10"),"_blank")}
                style={{padding:"12px 26px",borderRadius:12,fontSize:"0.92rem"}}>
                <MessageCircle size={16}/> Claim on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── FEATURES ──────────────────────────────────────────────────── */
function Features() {
  const features = [
    {icon:<Leaf size={26}/>,       title:"Farm-Fresh Ingredients",  desc:"Every dish starts with ingredients sourced daily. No preservatives, no shortcuts — ever."},
    {icon:<Shield size={26}/>,     title:"Hygienic Kitchen",        desc:"Our kitchen is held to the highest cleanliness standards. Your health is our responsibility."},
    {icon:<Zap size={26}/>,        title:"Fast Service",            desc:"Your food is served hot and fresh within minutes. Because great food shouldn't make you wait."},
    {icon:<Heart size={26}/>,      title:"Budget Friendly",         desc:"Premium cafe experience at honest prices. ₹200–₹400 for a full, satisfying meal."},
    {icon:<Coffee size={26}/>,     title:"Cozy Ambiance",           desc:"A warm, modern space for dates, family lunches, and post-darshan refreshment."},
    {icon:<Award size={26}/>,      title:"100% Vegetarian",         desc:"Proudly and purely vegetarian. Safe, ethical, and deeply satisfying for every guest."},
  ];
  return (
    <section style={{padding:"88px 24px",background:"#EDE8E0"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:56}}>
          <p className="eyebrow" style={{marginBottom:12}}>WHY CHOOSE US</p>
          <h2 className="section-heading" style={{fontSize:"clamp(2rem,3.5vw,3rem)",
            fontWeight:700,marginBottom:16}}>Built Around Your Experience</h2>
          <div className="amber-rule" style={{width:64,margin:"0 auto"}}/>
        </div>
        <div className="feat-grid" style={{display:"grid",
          gridTemplateColumns:"repeat(3,1fr)",gap:24}}>
          {features.map((f,i)=>(
            <div key={i} className="feature-card card-shadow" style={{padding:"32px 26px"}}>
              <div style={{width:58,height:58,borderRadius:14,
                background:"rgba(217,119,6,0.10)",
                border:"1.5px solid rgba(217,119,6,0.2)",
                display:"flex",alignItems:"center",justifyContent:"center",
                color:"#D97706",marginBottom:20}}>
                {f.icon}
              </div>
              <h3 className="font-display" style={{fontSize:"1.15rem",fontWeight:700,
                color:"#1F2937",marginBottom:10}}>{f.title}</h3>
              <p style={{color:"#7A5C4A",fontSize:"0.87rem",lineHeight:1.75}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── REVIEWS ───────────────────────────────────────────────────── */
function Reviews() {
  return (
    <section style={{padding:"88px 24px",background:"#F8F5F0"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:56}}>
          <p className="eyebrow" style={{marginBottom:12}}>GUEST REVIEWS</p>
          <h2 className="section-heading" style={{fontSize:"clamp(2rem,3.5vw,3rem)",
            fontWeight:700,marginBottom:16}}>Loved by Ayodhya</h2>
          <div className="amber-rule" style={{width:64,margin:"0 auto 16px"}}/>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
              alt="Google" style={{height:18,filter:"saturate(0) brightness(0.6) contrast(1.2)"}}/>
            <span style={{color:"#7A5C4A",fontSize:"0.82rem"}}>Reviews via Google</span>
            <Stars n={5}/>
            <span style={{color:"#D97706",fontWeight:700}}>4.8 / 5</span>
          </div>
        </div>
        <div className="rev-grid" style={{display:"grid",
          gridTemplateColumns:"repeat(3,1fr)",gap:22}}>
          {reviews.map((r,i)=>(
            <div key={i} className="review-card card-shadow" style={{padding:"26px"}}>
              {/* Large decorative quote */}
              <div className="font-display" style={{fontSize:"5rem",lineHeight:0.5,
                color:"#6F4E37",opacity:0.10,marginBottom:20,fontStyle:"italic",
                userSelect:"none"}}>&#8220;</div>
              <p style={{color:"#4A3728",fontSize:"0.88rem",lineHeight:1.78,
                marginBottom:20,fontStyle:"italic"}}>
                &#8220;{r.text}&#8221;
              </p>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:42,height:42,borderRadius:"50%",
                  background:"linear-gradient(135deg,#6F4E37,#C8A27C)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontWeight:700,fontSize:"0.85rem",color:"#F8F5F0",flexShrink:0}}>
                  {r.init}
                </div>
                <div>
                  <div style={{fontWeight:600,color:"#1F2937",fontSize:"0.9rem"}}>{r.name}</div>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginTop:3}}>
                    <Stars n={r.rating}/>
                    <span style={{color:"#C8A27C",fontSize:"0.73rem"}}>{r.time}</span>
                  </div>
                </div>
                <div style={{marginLeft:"auto",opacity:0.4}}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                    alt="G" style={{height:13,filter:"saturate(0) brightness(0.6)"}}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── GALLERY PREVIEW ───────────────────────────────────────────── */
function GalleryPreview({ navigateTo }) {
  const preview = galleryImages.slice(0,6);
  return (
    <section style={{padding:"88px 24px",background:"#EDE8E0"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <p className="eyebrow" style={{marginBottom:12}}>INSTAGRAM</p>
          <h2 className="section-heading" style={{fontSize:"clamp(2rem,3.5vw,3rem)",
            fontWeight:700,marginBottom:16}}>Food Worth Sharing</h2>
          <div className="amber-rule" style={{width:64,margin:"0 auto"}}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
          {preview.map((g,i)=>(
            <div key={i} className="gallery-item" style={{height:i===0||i===3?280:200,position:"relative"}}>
              <img src={g.img} alt={g.label}/>
              <div className="gallery-overlay">
                <div>
                  <div style={{color:"#C8A27C",fontSize:"0.68rem",fontWeight:700,
                    letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:2}}>{g.cat}</div>
                  <div style={{color:"#F8F5F0",fontWeight:600}}>{g.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:32}}>
          <button className="btn-outline" onClick={()=>navigateTo("gallery")}
            style={{padding:"12px 32px",borderRadius:10,fontSize:"0.95rem"}}>
            <InstagramIcon size={15}/> View Full Gallery
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── HOME CTA ──────────────────────────────────────────────────── */
function HomeCTA({ navigateTo }) {
  return (
    <section style={{padding:"88px 24px",background:"#F8F5F0",textAlign:"center",
      position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",left:"50%",top:"50%",
        transform:"translate(-50%,-50%)",zIndex:0,opacity:0.05,pointerEvents:"none"}}>
        <CoffeeRing size={500}/>
      </div>
      <div style={{maxWidth:700,margin:"0 auto",position:"relative",zIndex:1}}>
        <p className="eyebrow" style={{marginBottom:12}}>COME VISIT US</p>
        <h2 className="section-heading" style={{fontSize:"clamp(2rem,3.8vw,3.2rem)",
          fontWeight:700,marginBottom:20,lineHeight:1.15}}>
          Ayodhya's Most Loved Café Awaits You
        </h2>
        <p style={{color:"#7A5C4A",lineHeight:1.85,marginBottom:36,fontSize:"0.98rem",maxWidth:520,margin:"0 auto 36px"}}>
          From the sacred ghats of Saryu to your favourite table at Suto Cafe — 
          make every visit to Ayodhya complete.
        </p>
        <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
          <button className="btn-coffee" onClick={()=>navigateTo("order")}
            style={{padding:"13px 30px",borderRadius:12,fontSize:"0.95rem"}}>
            <ShoppingCart size={17}/> Order Now
          </button>
          <button className="btn-amber" onClick={()=>navigateTo("contact")}
            style={{padding:"13px 30px",borderRadius:12,fontSize:"0.95rem"}}>
            <MapPin size={17}/> Find Us
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── HOME PAGE ─────────────────────────────────────────────────── */
function HomePage({ navigateTo, addToCart }) {
  return (
    <div>
      <Hero navigateTo={navigateTo}/>
      <StatsBar/>
      <PopularDishes addToCart={addToCart} navigateTo={navigateTo}/>
      <OfferBanner/>
      <Features/>
      <Reviews/>
      <GalleryPreview navigateTo={navigateTo}/>
      <HomeCTA navigateTo={navigateTo}/>
    </div>
  );
}

/* ─── MENU PAGE ─────────────────────────────────────────────────── */
function MenuPage({ addToCart }) {
  const [cat,setCat] = useState("all");
  const catData = [
    {id:"all",label:"All Items"},
    {id:"pizza",label:"🍕 Pizza"},
    {id:"sandwiches",label:"🥪 Sandwiches"},
    {id:"beverages",label:"☕ Beverages"},
    {id:"snacks",label:"🍟 Snacks"},
  ];
  const filtered = cat==="all" ? menuItems : menuItems.filter(i=>i.cat===cat);

  return (
    <div style={{paddingTop:70}}>
      <div style={{background:"#6F4E37",padding:"56px 24px 0",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-40,top:-40,opacity:0.08,pointerEvents:"none"}}>
          <CoffeeRing size={300}/>
        </div>
        <div style={{maxWidth:1200,margin:"0 auto",textAlign:"center",position:"relative"}}>
          <p style={{...{fontFamily:"DM Sans, sans-serif",fontSize:"0.75rem",fontWeight:700,
            letterSpacing:"2.5px",textTransform:"uppercase",color:"#C8A27C"},marginBottom:10}}>
            OUR MENU
          </p>
          <h1 className="font-display" style={{fontSize:"clamp(2rem,4vw,3.2rem)",
            fontWeight:700,color:"#F8F5F0",marginBottom:14}}>
            Fresh. Delicious. Yours.
          </h1>
          <div style={{width:64,height:3,borderRadius:2,
            background:"linear-gradient(90deg,#D97706,#C8A27C)",margin:"0 auto 32px"}}/>
          {/* Pill filters */}
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",paddingBottom:32}}>
            {catData.map(c=>(
              <button key={c.id} onClick={()=>setCat(c.id)}
                className={`pill ${cat===c.id?"pill-active":""}`}
                style={{padding:"8px 20px",border:"1.5px solid rgba(200,162,124,0.4)",
                  background:cat===c.id?undefined:"transparent",
                  color:cat===c.id?"#F8F5F0":"#C8A27C",cursor:"pointer",
                  fontFamily:"DM Sans, sans-serif",fontWeight:600,fontSize:"0.86rem"}}>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{background:"#F8F5F0",padding:"52px 24px"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div className="menu-grid" style={{display:"grid",
            gridTemplateColumns:"repeat(4,1fr)",gap:22}}>
            {filtered.map(item=>(
              <div key={item.id} className="menu-card card-shadow">
                <div style={{position:"relative",height:195,overflow:"hidden"}}>
                  <img src={item.img} alt={item.name} className="card-img"
                    style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                  <div style={{position:"absolute",inset:0,
                    background:"linear-gradient(to top,rgba(30,15,5,0.5) 0%,transparent 55%)"}}/>
                  {item.popular&&<span className="pop-badge" style={{position:"absolute",top:10,left:10}}>🔥 Popular</span>}
                  <span style={{position:"absolute",top:10,right:10}}><VegBadge/></span>
                </div>
                <div style={{padding:"18px"}}>
                  <h3 className="font-display" style={{fontSize:"1.05rem",fontWeight:700,
                    color:"#1F2937",marginBottom:6,lineHeight:1.3}}>{item.name}</h3>
                  <p style={{fontSize:"0.78rem",color:"#7A5C4A",lineHeight:1.55,
                    marginBottom:14,minHeight:36}}>{item.desc}</p>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <span className="font-display" style={{fontSize:"1.3rem",fontWeight:700,
                      color:"#D97706"}}>₹{item.price}</span>
                    <button className="btn-coffee" onClick={()=>addToCart(item)}
                      style={{padding:"7px 14px",borderRadius:8,fontSize:"0.8rem"}}>
                      <Plus size={12}/> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length===0&&(
            <div style={{textAlign:"center",padding:"60px",color:"#7A5C4A"}}>
              No items in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── ABOUT PAGE ────────────────────────────────────────────────── */
function AboutPage() {
  return (
    <div style={{paddingTop:70}}>
      {/* Hero band */}
      <div style={{background:"#6F4E37",padding:"64px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",left:-60,bottom:-60,opacity:0.08,pointerEvents:"none"}}>
          <CoffeeRing size={360}/>
        </div>
        <div style={{maxWidth:1200,margin:"0 auto",position:"relative"}}>
          <p style={{fontFamily:"DM Sans, sans-serif",fontSize:"0.75rem",fontWeight:700,
            letterSpacing:"2.5px",textTransform:"uppercase",color:"#C8A27C",marginBottom:12}}>
            OUR STORY
          </p>
          <h1 className="font-display" style={{fontSize:"clamp(2rem,4vw,3.4rem)",
            fontWeight:700,color:"#F8F5F0",maxWidth:620,lineHeight:1.1,marginBottom:20}}>
            Born from a Love of Good Food &amp; Great Company
          </h1>
          <p style={{color:"rgba(248,245,240,0.72)",maxWidth:560,lineHeight:1.85,fontSize:"1rem"}}>
            Suto Cafe was born in the sacred city of Ayodhya with a single mission: 
            a place to pause, connect, and enjoy honest food at prices that never compromise.
          </p>
        </div>
      </div>

      {/* Story section */}
      <section style={{background:"#F8F5F0",padding:"88px 24px"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div className="about-grid" style={{display:"grid",
            gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center"}}>
            <div className="about-img">
              <div style={{position:"relative"}}>
                <div style={{position:"absolute",bottom:-18,right:-18,
                  width:"100%",height:"100%",borderRadius:24,
                  background:"#C8A27C",opacity:0.22,transform:"rotate(2.5deg)"}}/>
                <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80"
                  alt="Suto Cafe"
                  style={{width:"100%",height:460,objectFit:"cover",borderRadius:24,
                    display:"block",position:"relative",
                    boxShadow:"0 20px 56px rgba(111,78,55,0.22)"}}/>
              </div>
            </div>
            <div>
              <p className="eyebrow" style={{marginBottom:12}}>WHO WE ARE</p>
              <h2 className="section-heading" style={{fontSize:"2.2rem",fontWeight:700,marginBottom:20,lineHeight:1.15}}>
                More Than a Café — A Community
              </h2>
              <div className="amber-rule" style={{width:64,marginBottom:24}}/>
              <p style={{color:"#7A5C4A",lineHeight:1.9,marginBottom:18,fontSize:"0.96rem"}}>
                Nestled in Niyawan, Faizabad, Suto Cafe is Ayodhya's beloved modern café. We believe food 
                is more than fuel — it's an experience that brings people together, whether you're a pilgrim 
                resting after darshan, a student catching up with friends, or a family marking life's small milestones.
              </p>
              <p style={{color:"#7A5C4A",lineHeight:1.9,marginBottom:36,fontSize:"0.96rem"}}>
                Our menu features handcrafted pizzas, golden sandwiches, refreshing beverages, and 
                bite-sized snacks — all 100% vegetarian, made fresh to order, served with care.
              </p>
              <div style={{display:"flex",gap:36}}>
                {[["2500+","Happy Guests"],["50+","Menu Items"],["4.8★","Google Rating"]].map(([v,l])=>(
                  <div key={l}>
                    <div className="font-display" style={{fontSize:"2rem",fontWeight:700,color:"#6F4E37"}}>{v}</div>
                    <div style={{color:"#C8A27C",fontSize:"0.78rem",marginTop:2,fontWeight:500}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{background:"#EDE8E0",padding:"88px 24px"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <h2 className="section-heading" style={{fontSize:"2.2rem",fontWeight:700,marginBottom:14}}>
              Our Promise to You
            </h2>
            <div className="amber-rule" style={{width:64,margin:"0 auto"}}/>
          </div>
          <div className="feat-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:22}}>
            {[
              {emoji:"🌿",title:"Always Fresh",     text:"We prepare every dish to order using ingredients sourced daily. No frozen shortcuts — ever."},
              {emoji:"💚",title:"100% Vegetarian",  text:"Suto Cafe is proudly and completely vegetarian. Every item is pure, safe, and ethically prepared."},
              {emoji:"💰",title:"Honest Pricing",   text:"Great food shouldn't cost a fortune. We price every dish fairly so you can enjoy more, worry less."},
            ].map((v,i)=>(
              <div key={i} className="feature-card card-shadow" style={{padding:"32px",textAlign:"center"}}>
                <div style={{fontSize:"2.6rem",marginBottom:16}}>{v.emoji}</div>
                <h3 className="font-display" style={{fontSize:"1.2rem",fontWeight:700,
                  color:"#1F2937",marginBottom:10}}>{v.title}</h3>
                <p style={{color:"#7A5C4A",fontSize:"0.88rem",lineHeight:1.75}}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── GALLERY PAGE ──────────────────────────────────────────────── */
function GalleryPage() {
  const [filter,setFilter] = useState("all");
  const cats = [{id:"all",label:"All"},{id:"food",label:"🍕 Food"},{id:"drinks",label:"☕ Drinks"},{id:"cafe",label:"🏠 Café"}];
  const filtered = filter==="all" ? galleryImages : galleryImages.filter(g=>g.cat===filter);
  return (
    <div style={{paddingTop:70}}>
      <div style={{background:"#6F4E37",padding:"56px 24px 0",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-30,top:-30,opacity:0.08,pointerEvents:"none"}}>
          <CoffeeRing size={260}/>
        </div>
        <div style={{maxWidth:1200,margin:"0 auto",textAlign:"center",position:"relative"}}>
          <p style={{fontFamily:"DM Sans, sans-serif",fontSize:"0.75rem",fontWeight:700,
            letterSpacing:"2.5px",textTransform:"uppercase",color:"#C8A27C",marginBottom:10}}>GALLERY</p>
          <h1 className="font-display" style={{fontSize:"clamp(2rem,4vw,3.2rem)",
            fontWeight:700,color:"#F8F5F0",marginBottom:14}}>A Feast for the Eyes</h1>
          <div style={{width:64,height:3,borderRadius:2,
            background:"linear-gradient(90deg,#D97706,#C8A27C)",margin:"0 auto 28px"}}/>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",paddingBottom:32}}>
            {cats.map(c=>(
              <button key={c.id} onClick={()=>setFilter(c.id)}
                className={`pill ${filter===c.id?"pill-active":""}`}
                style={{padding:"7px 18px",border:"1.5px solid rgba(200,162,124,0.35)",
                  background:filter===c.id?undefined:"transparent",
                  color:filter===c.id?"#F8F5F0":"#C8A27C",cursor:"pointer",
                  fontFamily:"DM Sans, sans-serif",fontWeight:600,fontSize:"0.84rem"}}>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{background:"#F8F5F0",padding:"52px 24px"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
            {filtered.map((g,i)=>(
              <div key={i} className="gallery-item"
                style={{height:i%4===0?300:210,position:"relative"}}>
                <img src={g.img} alt={g.label}/>
                <div className="gallery-overlay">
                  <div>
                    <div style={{color:"#C8A27C",fontSize:"0.68rem",fontWeight:700,
                      letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:2}}>{g.cat}</div>
                    <div style={{color:"#F8F5F0",fontWeight:600}}>{g.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{marginTop:48,borderRadius:20,background:"#FFFFFF",
            padding:"36px",textAlign:"center",
            boxShadow:"0 8px 32px rgba(111,78,55,0.10)",
            border:"1px solid #EDE8E0"}}>
            <div style={{width:56,height:56,borderRadius:14,
              background:"rgba(217,119,6,0.10)",border:"1.5px solid rgba(217,119,6,0.2)",
              display:"flex",alignItems:"center",justifyContent:"center",
              margin:"0 auto 14px",color:"#D97706"}}>
              <InstagramIcon size={24}/>
            </div>
            <h3 className="font-display" style={{fontSize:"1.5rem",fontWeight:700,
              color:"#1F2937",marginBottom:8}}>Follow Our Journey</h3>
            <p style={{color:"#7A5C4A",marginBottom:20,fontSize:"0.9rem"}}>
              Tag us in your food photos — we love seeing our food in your world!
            </p>
            <button className="btn-amber"
              onClick={()=>window.open("https://www.instagram.com/","_blank")}
              style={{padding:"11px 26px",borderRadius:10,fontSize:"0.92rem"}}>
              <InstagramIcon size={15}/> @sutocafeayodhya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── ORDER PAGE ────────────────────────────────────────────────── */
function OrderPage({ cart, addToCart, updateQty, removeFromCart, cartTotal, cartCount }) {
  const [cat,setCat] = useState("all");
  const [info,setInfo] = useState({name:"",phone:"",address:"",notes:""});
  const catData=[{id:"all",label:"All"},{id:"pizza",label:"Pizza"},{id:"sandwiches",label:"Sandwiches"},{id:"beverages",label:"Beverages"},{id:"snacks",label:"Snacks"}];
  const filtered = cat==="all" ? menuItems : menuItems.filter(i=>i.cat===cat);

  const placeOrder = () => {
    const items = cart.map(i=>`• ${i.name} ×${i.qty} = ₹${i.price*i.qty}`).join("\n");
    const msg = `🍕 *Suto Cafe Order*\n\n*Name:* ${info.name}\n*Phone:* ${info.phone}\n*Address:* ${info.address}\n\n*Items:*\n${items}\n\n*Total: ₹${cartTotal}*${info.notes?`\n*Notes:* ${info.notes}`:""}\n\nPlease confirm my order!`;
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`,"_blank");
  };

  return (
    <div style={{paddingTop:70}}>
      <div style={{background:"#6F4E37",padding:"48px 24px 32px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-50,top:-50,opacity:0.08,pointerEvents:"none"}}>
          <CoffeeRing size={280}/>
        </div>
        <p style={{fontFamily:"DM Sans, sans-serif",fontSize:"0.75rem",fontWeight:700,
          letterSpacing:"2.5px",textTransform:"uppercase",color:"#C8A27C",marginBottom:10,position:"relative"}}>ORDER ONLINE</p>
        <h1 className="font-display" style={{fontSize:"clamp(2rem,4vw,3rem)",fontWeight:700,
          color:"#F8F5F0",marginBottom:10,position:"relative"}}>Order Fresh, Eat Happy</h1>
        <p style={{color:"rgba(248,245,240,0.68)",maxWidth:480,margin:"0 auto",
          fontSize:"0.93rem",position:"relative"}}>Pick your items, add to cart, and checkout via WhatsApp.</p>
      </div>

      <div style={{background:"#F8F5F0",padding:"40px 24px"}}>
        <div className="order-grid" style={{maxWidth:1200,margin:"0 auto",
          display:"grid",gridTemplateColumns:"1fr 360px",gap:32,alignItems:"start"}}>
          {/* Menu */}
          <div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:24}}>
              {catData.map(c=>(
                <button key={c.id} onClick={()=>setCat(c.id)}
                  className={`pill ${cat===c.id?"pill-active":""}`}
                  style={{padding:"6px 16px",border:"1.5px solid #EDE8E0",
                    background:cat===c.id?undefined:"#FFFFFF",
                    color:cat===c.id?"#F8F5F0":"#7A5C4A",cursor:"pointer",
                    fontFamily:"DM Sans, sans-serif",fontWeight:600,fontSize:"0.82rem"}}>
                  {c.label}
                </button>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14}}>
              {filtered.map(item=>{
                const inCart = cart.find(i=>i.id===item.id);
                return (
                  <div key={item.id} style={{background:"#FFFFFF",borderRadius:14,
                    border:"1px solid #EDE8E0",padding:14,display:"flex",
                    gap:12,alignItems:"center",
                    boxShadow:"0 2px 12px rgba(111,78,55,0.07)"}}>
                    <img src={item.img} alt={item.name}
                      style={{width:66,height:66,borderRadius:10,objectFit:"cover",flexShrink:0}}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div className="font-display" style={{fontWeight:600,fontSize:"0.9rem",
                        color:"#1F2937",marginBottom:2,lineHeight:1.25}}>{item.name}</div>
                      <div style={{color:"#D97706",fontWeight:700,fontSize:"0.9rem",marginBottom:8}}>₹{item.price}</div>
                      {inCart?(
                        <div style={{display:"flex",alignItems:"center",gap:7}}>
                          <button onClick={()=>updateQty(item.id,-1)}
                            style={{width:24,height:24,borderRadius:6,background:"#F8F5F0",
                              border:"1px solid #EDE8E0",color:"#6F4E37",cursor:"pointer",
                              display:"flex",alignItems:"center",justifyContent:"center"}}><Minus size={11}/></button>
                          <span style={{fontWeight:700,color:"#1F2937",fontSize:"0.9rem",minWidth:16,textAlign:"center"}}>{inCart.qty}</span>
                          <button onClick={()=>updateQty(item.id,1)}
                            style={{width:24,height:24,borderRadius:6,background:"#F8F5F0",
                              border:"1px solid #EDE8E0",color:"#6F4E37",cursor:"pointer",
                              display:"flex",alignItems:"center",justifyContent:"center"}}><Plus size={11}/></button>
                        </div>
                      ):(
                        <button className="btn-coffee" onClick={()=>addToCart(item)}
                          style={{padding:"5px 12px",borderRadius:6,fontSize:"0.78rem"}}>
                          <Plus size={11}/> Add
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <div className="order-summary-sticky" style={{position:"sticky",top:90}}>
            <div style={{background:"#FFFFFF",borderRadius:18,border:"1px solid #EDE8E0",
              overflow:"hidden",boxShadow:"0 8px 32px rgba(111,78,55,0.10)"}}>
              <div style={{padding:"18px 20px",background:"#6F4E37",
                display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div className="font-display" style={{fontSize:"1.2rem",fontWeight:700,color:"#F8F5F0"}}>
                  Order Summary
                </div>
                <div style={{fontSize:"0.78rem",color:"#C8A27C"}}>
                  {cartCount} item{cartCount!==1?"s":""}
                </div>
              </div>
              <div style={{padding:"14px 18px",maxHeight:220,overflowY:"auto"}}>
                {cart.length===0?(
                  <div style={{textAlign:"center",padding:"28px 0",color:"#C8A27C"}}>
                    <ShoppingCart size={26} style={{display:"block",margin:"0 auto 8px",opacity:0.4}}/>
                    <div style={{fontSize:"0.86rem"}}>No items yet</div>
                  </div>
                ):cart.map(item=>(
                  <div key={item.id} style={{display:"flex",justifyContent:"space-between",
                    alignItems:"center",marginBottom:9,fontSize:"0.86rem"}}>
                    <span style={{color:"#4A3728",flex:1}}>{item.name} × {item.qty}</span>
                    <span style={{color:"#D97706",fontWeight:600}}>₹{item.price*item.qty}</span>
                  </div>
                ))}
              </div>

              {cart.length>0&&(
                <div style={{padding:"0 18px 18px"}}>
                  <div style={{height:1,background:"#EDE8E0",marginBottom:12}}/>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
                    <span className="font-display" style={{fontWeight:700,color:"#1F2937",fontSize:"1.05rem"}}>Total</span>
                    <span className="font-display" style={{fontWeight:700,color:"#D97706",fontSize:"1.2rem"}}>₹{cartTotal}</span>
                  </div>

                  {[{label:"Your Name",key:"name",type:"text",ph:"Enter your name"},
                    {label:"Phone",key:"phone",type:"tel",ph:"+91 XXXXX XXXXX"},
                    {label:"Delivery Address",key:"address",type:"text",ph:"Niyawan, Faizabad..."},
                    {label:"Special Notes",key:"notes",type:"text",ph:"Any customization..."},
                  ].map(f=>(
                    <div key={f.key} style={{marginBottom:8}}>
                      <label style={{fontSize:"0.73rem",color:"#7A5C4A",
                        display:"block",marginBottom:3,fontWeight:500}}>{f.label}</label>
                      <input type={f.type} placeholder={f.ph} value={info[f.key]}
                        onChange={e=>setInfo(p=>({...p,[f.key]:e.target.value}))}
                        className="form-field"
                        style={{padding:"8px 11px",borderRadius:8,fontSize:"0.84rem",border:"1.5px solid #EDE8E0"}}/>
                    </div>
                  ))}
                  <div style={{marginTop:14}}>
                    <button className="btn-wa" onClick={placeOrder}
                      style={{width:"100%",padding:"13px",borderRadius:12,fontSize:"0.93rem",justifyContent:"center"}}>
                      <MessageCircle size={16}/> Confirm on WhatsApp
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div style={{marginTop:12}}>
              <button className="btn-outline" onClick={()=>window.open(`tel:${PHONE}`)}
                style={{width:"100%",padding:"11px",borderRadius:10,fontSize:"0.87rem",justifyContent:"center"}}>
                <Phone size={14}/> Call: {PHONE_DISPLAY}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── CONTACT PAGE ──────────────────────────────────────────────── */
function ContactPage() {
  const [form,setForm] = useState({name:"",phone:"",message:""});
  const [sent,setSent] = useState(false);
  const send = () => {
    const msg = `Hello! I'm ${form.name} (${form.phone}).\n\n${form.message}`;
    window.open(WA(msg),"_blank");
    setSent(true);
    setTimeout(()=>setSent(false),3000);
  };
  return (
    <div style={{paddingTop:70}}>
      <div style={{background:"#6F4E37",padding:"56px 24px 48px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",left:-60,bottom:-60,opacity:0.08,pointerEvents:"none"}}>
          <CoffeeRing size={320}/>
        </div>
        <div style={{maxWidth:1200,margin:"0 auto",position:"relative",textAlign:"center"}}>
          <p style={{fontFamily:"DM Sans, sans-serif",fontSize:"0.75rem",fontWeight:700,
            letterSpacing:"2.5px",textTransform:"uppercase",color:"#C8A27C",marginBottom:10}}>GET IN TOUCH</p>
          <h1 className="font-display" style={{fontSize:"clamp(2rem,4vw,3.2rem)",
            fontWeight:700,color:"#F8F5F0",marginBottom:12}}>We're Always Here</h1>
          <p style={{color:"rgba(248,245,240,0.70)",maxWidth:460,margin:"0 auto",fontSize:"0.93rem"}}>
            Reach us via call, WhatsApp, or visit us in person at Niyawan, Faizabad.
          </p>
        </div>
      </div>

      <div style={{background:"#F8F5F0",padding:"72px 24px"}}>
        <div style={{maxWidth:1200,margin:"0 auto",
          display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"start"}}>
          {/* Info column */}
          <div>
            <h2 className="font-display" style={{fontSize:"1.9rem",fontWeight:700,
              color:"#1F2937",marginBottom:28}}>Visit or Contact Us</h2>
            {[
              {icon:<MapPin size={19}/>,title:"Our Location",lines:["Niyawan, Faizabad","Ayodhya, Uttar Pradesh 224001"]},
              {icon:<Phone size={19}/>,title:"Phone & WhatsApp",lines:[PHONE_DISPLAY]},
              {icon:<Clock size={19}/>,title:"Opening Hours",lines:["Mon – Sun: 10:00 AM – 11:00 PM","Open all days including public holidays"]},
            ].map((item,i)=>(
              <div key={i} style={{display:"flex",gap:14,padding:"18px",
                background:"#FFFFFF",borderRadius:14,marginBottom:14,
                border:"1px solid #EDE8E0",
                boxShadow:"0 3px 16px rgba(111,78,55,0.08)"}}>
                <div style={{width:42,height:42,borderRadius:10,
                  background:"rgba(217,119,6,0.10)",
                  border:"1.5px solid rgba(217,119,6,0.2)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  color:"#D97706",flexShrink:0}}>{item.icon}</div>
                <div>
                  <div style={{fontWeight:600,color:"#D97706",fontSize:"0.8rem",marginBottom:4}}>{item.title}</div>
                  {item.lines.map((l,j)=>(
                    <div key={j} style={{color:"#4A3728",fontSize:"0.9rem",lineHeight:1.65}}>{l}</div>
                  ))}
                </div>
              </div>
            ))}

            <div style={{display:"flex",gap:10,marginTop:22,flexWrap:"wrap"}}>
              <button className="btn-coffee" onClick={()=>window.open(`tel:${PHONE}`)}
                style={{padding:"10px 18px",borderRadius:10,fontSize:"0.86rem"}}>
                <Phone size={14}/> Call Now
              </button>
              <button className="btn-wa" onClick={()=>window.open(WA(),"_blank")}
                style={{padding:"10px 18px",borderRadius:10,fontSize:"0.86rem"}}>
                <MessageCircle size={14}/> WhatsApp
              </button>
              <button className="btn-amber" onClick={()=>window.open(`https://maps.google.com/?q=Niyawan+Faizabad+Ayodhya+UP`,"_blank")}
                style={{padding:"10px 18px",borderRadius:10,fontSize:"0.86rem"}}>
                <MapPin size={14}/> Directions
              </button>
            </div>

            <div style={{marginTop:24,borderRadius:16,overflow:"hidden",height:220,
              border:"1px solid #EDE8E0",boxShadow:"0 4px 20px rgba(111,78,55,0.10)"}}>
              <iframe src="https://maps.google.com/maps?q=Niyawan,Faizabad,Ayodhya,Uttar Pradesh&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy"
                title="Suto Cafe Location"/>
            </div>
          </div>

          {/* Form column */}
          <div>
            <div style={{background:"#FFFFFF",borderRadius:20,padding:"36px",
              boxShadow:"0 8px 36px rgba(111,78,55,0.12)",border:"1px solid #EDE8E0"}}>
              <h3 className="font-display" style={{fontSize:"1.6rem",fontWeight:700,
                color:"#1F2937",marginBottom:6}}>Send Us a Message</h3>
              <p style={{color:"#7A5C4A",fontSize:"0.86rem",lineHeight:1.65,marginBottom:26}}>
                Have a question, feedback, or want to make a reservation? Drop us a message!
              </p>
              {[{label:"Your Name",key:"name",type:"text",ph:"Rahul Kumar"},
                {label:"Phone Number",key:"phone",type:"tel",ph:"+91 XXXXX XXXXX"},
              ].map(f=>(
                <div key={f.key} style={{marginBottom:16}}>
                  <label style={{display:"block",fontSize:"0.79rem",color:"#6F4E37",
                    marginBottom:5,fontWeight:600}}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph} value={form[f.key]}
                    onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                    className="form-field"
                    style={{padding:"11px 13px",borderRadius:10,fontSize:"0.9rem",border:"1.5px solid #EDE8E0"}}/>
                </div>
              ))}
              <div style={{marginBottom:22}}>
                <label style={{display:"block",fontSize:"0.79rem",color:"#6F4E37",
                  marginBottom:5,fontWeight:600}}>Your Message</label>
                <textarea placeholder="Tell us how we can help..." value={form.message}
                  onChange={e=>setForm(p=>({...p,message:e.target.value}))}
                  className="form-field" rows={4}
                  style={{padding:"11px 13px",borderRadius:10,fontSize:"0.9rem",
                    resize:"vertical",border:"1.5px solid #EDE8E0"}}/>
              </div>
              {sent?(
                <div style={{display:"flex",alignItems:"center",gap:8,padding:14,
                  borderRadius:10,background:"rgba(37,211,102,0.08)",
                  border:"1px solid rgba(37,211,102,0.3)",color:"#128C7E",fontWeight:600,fontSize:"0.9rem"}}>
                  <CheckCircle size={17}/> Redirecting to WhatsApp…
                </div>
              ):(
                <button className="btn-wa" onClick={send}
                  style={{width:"100%",padding:"13px",borderRadius:12,fontSize:"0.93rem",justifyContent:"center"}}>
                  <Send size={15}/> Send via WhatsApp
                </button>
              )}

              <div style={{height:1,background:"#EDE8E0",margin:"24px 0"}}/>
              <div style={{background:"rgba(217,119,6,0.06)",borderRadius:12,padding:"16px",
                border:"1px solid rgba(217,119,6,0.2)"}}>
                <div style={{fontWeight:700,color:"#D97706",marginBottom:4,fontSize:"0.88rem"}}>
                  🪑 Reserve a Table
                </div>
                <div style={{color:"#7A5C4A",fontSize:"0.82rem",marginBottom:12,lineHeight:1.65}}>
                  Call or WhatsApp with your preferred date, time, and party size.
                </div>
                <button className="btn-coffee"
                  onClick={()=>window.open(WA("Hi! I'd like to reserve a table at Suto Cafe."),"_blank")}
                  style={{width:"100%",padding:"10px",borderRadius:8,fontSize:"0.86rem",justifyContent:"center"}}>
                  <MessageCircle size={14}/> Reserve via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FaqSection/>
    </div>
  );
}

/* ─── FAQ ───────────────────────────────────────────────────────── */
function FaqSection() {
  const [open,setOpen] = useState(null);
  return (
    <section style={{background:"#EDE8E0",padding:"88px 24px"}}>
      <div style={{maxWidth:780,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <p className="eyebrow" style={{marginBottom:12}}>FAQS</p>
          <h2 className="section-heading" style={{fontSize:"2.2rem",fontWeight:700,marginBottom:14}}>
            Common Questions
          </h2>
          <div className="amber-rule" style={{width:64,margin:"0 auto"}}/>
        </div>
        {faqs.map((f,i)=>(
          <div key={i} className="faq-row" onClick={()=>setOpen(open===i?null:i)}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",
              padding:"19px 0"}}>
              <span style={{fontWeight:600,color:"#1F2937",fontSize:"0.95rem",flex:1,paddingRight:16}}>
                {f.q}
              </span>
              <div style={{width:30,height:30,borderRadius:8,
                background:open===i?"#6F4E37":"#FFFFFF",border:"1.5px solid #EDE8E0",
                display:"flex",alignItems:"center",justifyContent:"center",
                flexShrink:0,transition:"background 0.2s",
                boxShadow:"0 2px 8px rgba(111,78,55,0.08)"}}>
                <ChevronDown size={15}
                  style={{color:open===i?"#F8F5F0":"#6F4E37",
                    transition:"transform 0.3s",
                    transform:open===i?"rotate(180deg)":"rotate(0deg)"}}/>
              </div>
            </div>
            <div className={`faq-body ${open===i?"open":""}`}
              style={{maxHeight:open===i?160:0,opacity:open===i?1:0,paddingBottom:open===i?18:0}}>
              <p style={{color:"#7A5C4A",fontSize:"0.9rem",lineHeight:1.8}}>{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── FOOTER ────────────────────────────────────────────────────── */
function Footer({ navigateTo }) {
  return (
    <footer style={{background:"#4A3728",padding:"60px 24px 24px"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div className="foot-grid" style={{display:"grid",
          gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:40,marginBottom:40}}>
          <div>
            <div className="font-script" style={{fontSize:"2.1rem",color:"#F8F5F0",lineHeight:1,marginBottom:4}}>
              Suto Cafe
            </div>
            <div style={{fontSize:"0.62rem",color:"#C8A27C",letterSpacing:"3px",fontWeight:700,
              textTransform:"uppercase",marginBottom:16}}>AYODHYA</div>
            <p style={{color:"rgba(248,245,240,0.62)",fontSize:"0.84rem",lineHeight:1.8,
              maxWidth:280,marginBottom:20}}>
              Ayodhya's favourite modern café — fresh food, warm hospitality, and memories 
              that last. 100% vegetarian. Open daily.
            </p>
            <div style={{display:"flex",gap:10}}>
              {[InstagramIcon,FacebookIcon].map((Icon,i)=>(
                <button key={i}
                  style={{width:36,height:36,borderRadius:8,background:"rgba(200,162,124,0.15)",
                    border:"1px solid rgba(200,162,124,0.25)",display:"flex",alignItems:"center",
                    justifyContent:"center",cursor:"pointer",color:"#C8A27C",transition:"all 0.2s"}}>
                  <Icon size={16}/>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{fontWeight:700,color:"#D97706",fontSize:"0.75rem",
              letterSpacing:"2px",marginBottom:16,textTransform:"uppercase",fontFamily:"DM Sans, sans-serif"}}>Menu</div>
            {["pizza","sandwiches","beverages","snacks"].map(c=>(
              <button key={c} onClick={()=>navigateTo("menu")}
                style={{display:"block",background:"none",border:"none",cursor:"pointer",
                  color:"rgba(248,245,240,0.58)",fontSize:"0.86rem",marginBottom:10,
                  textAlign:"left",textTransform:"capitalize",fontFamily:"DM Sans, sans-serif",
                  transition:"color 0.2s"}}>
                {c==="pizza"?"🍕 Pizza":c==="sandwiches"?"🥪 Sandwiches":c==="beverages"?"☕ Beverages":"🍟 Snacks"}
              </button>
            ))}
          </div>

          <div>
            <div style={{fontWeight:700,color:"#D97706",fontSize:"0.75rem",
              letterSpacing:"2px",marginBottom:16,textTransform:"uppercase",fontFamily:"DM Sans, sans-serif"}}>Pages</div>
            {["home","about","gallery","order","contact"].map(p=>(
              <button key={p} onClick={()=>navigateTo(p)}
                style={{display:"block",background:"none",border:"none",cursor:"pointer",
                  color:"rgba(248,245,240,0.58)",fontSize:"0.86rem",marginBottom:10,
                  textAlign:"left",textTransform:"capitalize",fontFamily:"DM Sans, sans-serif",
                  transition:"color 0.2s"}}>
                {p==="order"?"Order Online":p.charAt(0).toUpperCase()+p.slice(1)}
              </button>
            ))}
          </div>

          <div>
            <div style={{fontWeight:700,color:"#D97706",fontSize:"0.75rem",
              letterSpacing:"2px",marginBottom:16,textTransform:"uppercase",fontFamily:"DM Sans, sans-serif"}}>Contact</div>
            {[
              {Icon:MapPin, text:"Niyawan, Faizabad, Ayodhya UP 224001"},
              {Icon:Phone,  text:PHONE_DISPLAY},
              {Icon:Clock,  text:"10 AM – 11 PM Daily"},
            ].map(({Icon,text},i)=>(
              <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:12}}>
                <Icon size={13} style={{color:"#D97706",marginTop:2,flexShrink:0}}/>
                <span style={{color:"rgba(248,245,240,0.58)",fontSize:"0.83rem",lineHeight:1.65}}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{height:1,background:"rgba(200,162,124,0.18)",marginBottom:18}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
          <span style={{color:"rgba(248,245,240,0.40)",fontSize:"0.78rem"}}>
            © 2025 Suto Cafe Ayodhya. All rights reserved. 100% Vegetarian.
          </span>
          <span style={{color:"rgba(248,245,240,0.40)",fontSize:"0.78rem"}}>Made with ❤️ for Ayodhya</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── MAIN APP ──────────────────────────────────────────────────── */
export default function SutoCafe() {
  const [activePage, setActivePage] = useState("home");
  const [cart, setCart]             = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTop, setShowTop]       = useState(false);
  const [cartOpen, setCartOpen]     = useState(false);

  useEffect(()=>{
    const onScroll = ()=>{
      setIsScrolled(window.scrollY>60);
      setShowTop(window.scrollY>400);
    };
    window.addEventListener("scroll",onScroll);
    return ()=>window.removeEventListener("scroll",onScroll);
  },[]);

  const addToCart = item=>setCart(prev=>{
    const ex=prev.find(i=>i.id===item.id);
    return ex ? prev.map(i=>i.id===item.id?{...i,qty:i.qty+1}:i) : [...prev,{...item,qty:1}];
  });
  const removeFromCart = id=>setCart(prev=>prev.filter(i=>i.id!==id));
  const updateQty = (id,d)=>setCart(prev=>prev.map(i=>i.id===id?{...i,qty:i.qty+d}:i).filter(i=>i.qty>0));
  const cartTotal = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const cartCount = cart.reduce((s,i)=>s+i.qty,0);
  const navigateTo = page=>{ setActivePage(page); window.scrollTo({top:0,behavior:"smooth"}); };
  const onWhatsApp = ()=>{
    const items=cart.map(i=>`• ${i.name} ×${i.qty} = ₹${i.price*i.qty}`).join("\n");
    const msg=`🍕 *Suto Cafe Order*\n\n${items}\n\n*Total: ₹${cartTotal}*\n\nPlease confirm!`;
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`,"_blank");
  };

  const renderPage = ()=>{
    switch(activePage){
      case "home":    return <HomePage navigateTo={navigateTo} addToCart={addToCart}/>;
      case "menu":    return <MenuPage addToCart={addToCart}/>;
      case "about":   return <AboutPage/>;
      case "gallery": return <GalleryPage/>;
      case "order":   return <OrderPage cart={cart} addToCart={addToCart} updateQty={updateQty} removeFromCart={removeFromCart} cartTotal={cartTotal} cartCount={cartCount}/>;
      case "contact": return <ContactPage/>;
      default:        return <HomePage navigateTo={navigateTo} addToCart={addToCart}/>;
    }
  };

  return (
    <>
      <FontLink/>
      <GlobalStyles/>
      {/* Schema.org structured data */}
      <div style={{display:"none"}} aria-hidden itemScope itemType="https://schema.org/Restaurant">
        <span itemProp="name">Suto Cafe Ayodhya</span>
        <span itemProp="address">Niyawan, Faizabad, Ayodhya, Uttar Pradesh 224001</span>
        <span itemProp="telephone">+917985685451</span>
        <span itemProp="openingHours">Mo-Su 10:00-23:00</span>
        <span itemProp="priceRange">₹200-₹400</span>
        <span itemProp="servesCuisine">Vegetarian</span>
      </div>

      <div style={{minHeight:"100vh",background:"#F8F5F0",color:"#1F2937"}}>
        <Navbar activePage={activePage} navigateTo={navigateTo}
          cartCount={cartCount} setCartOpen={setCartOpen} isScrolled={isScrolled}/>
        <CartDrawer cart={cart} cartOpen={cartOpen} setCartOpen={setCartOpen}
          updateQty={updateQty} removeFromCart={removeFromCart}
          cartTotal={cartTotal} cartCount={cartCount} onWhatsApp={onWhatsApp}/>
        <main>{renderPage()}</main>
        <Footer navigateTo={navigateTo}/>

        {/* Floating WhatsApp */}
        <div className="wa-float"
          onClick={()=>window.open(WA("Hi Suto Cafe! I'd like to know more."),"_blank")}
          title="Chat on WhatsApp">
          <MessageCircle size={25} color="#fff" fill="#fff"/>
        </div>

        {/* Back to top */}
        {showTop&&(
          <button className="back-top" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>
            <ChevronUp size={19} color="#F8F5F0"/>
          </button>
        )}
      </div>
    </>
  );
}