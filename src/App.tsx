/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Droplets, 
  Leaf, 
  Clock, 
  Box, 
  ChevronRight, 
  Instagram, 
  Facebook, 
  Twitter,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import { useState, useEffect } from "react";
import { generateImages } from "./services/imageGenerator";

// Extend Window interface for AI Studio
declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
            <Leaf className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-emerald-900">
            HİLAL'İN <span className="font-light">YEŞİLİ</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#teknoloji" className="hover:text-emerald-600 transition-colors">Teknoloji</a>
          <a href="#tazelik" className="hover:text-emerald-600 transition-colors">Tazelik</a>
          <a href="#abonelik" className="hover:text-emerald-600 transition-colors">Taze Kutu</a>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
            Hemen Sipariş Ver
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 p-6 flex flex-col gap-4 shadow-xl"
        >
          <a href="#teknoloji" onClick={() => setIsOpen(false)} className="text-lg font-medium">Teknoloji</a>
          <a href="#tazelik" onClick={() => setIsOpen(false)} className="text-lg font-medium">Tazelik</a>
          <a href="#abonelik" onClick={() => setIsOpen(false)} className="text-lg font-medium">Taze Kutu</a>
          <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold">Hemen Sipariş Ver</button>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = ({ images }: { images: any }) => {
  console.log("Hero component received images:", Object.keys(images || {}));
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-50 -z-10 hidden lg:block" />
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-50 -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold tracking-widest uppercase rounded-full mb-6">
            Kadın Girişimci İnovasyonu • Çatalca, İstanbul
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
            Saf Yeşilliğin <br />
            <span className="text-gradient">Geleceği</span>
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
            Hilal'in fütüristik dikey çiftliğinden yeni nesil hidroponik deneyimi. 
            Saf su teknolojisiyle yetiştirilen canlı mikroyeşillikler ve otlar, 
            saatler içinde sofranızda.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-emerald-600 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 group shadow-xl shadow-emerald-200">
              Çiftliğimizi Keşfedin <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-full font-bold hover:border-emerald-600 hover:text-emerald-600 transition-all">
              Kataloğu Görüntüle
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-8">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img 
                  key={i}
                  src={`https://picsum.photos/seed/customer-stock-${i}/100/100`} 
                  className="w-10 h-10 rounded-full border-2 border-white"
                  referrerPolicy="no-referrer"
                  alt="Müşteri"
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 font-medium">
              İstanbul'da <span className="text-emerald-600 font-bold">500+</span> Sağlıklı aile
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
            <img 
              src={images.hero || "https://picsum.photos/seed/hydroponic-microgreens-1/800/1000"} 
              alt="Hilal dikey çiftliğinde"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-linear-to-t from-emerald-900/40 to-transparent" />
            
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute bottom-8 left-8 glass-effect p-6 rounded-2xl max-w-[240px]"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                  <ShieldCheck className="text-white w-6 h-6" />
                </div>
                <span className="font-bold text-gray-900">Sıfır Pestisit</span>
              </div>
              <p className="text-xs text-gray-600">
                Sadece saf su ve besin maddeleri kullanılarak steril bir ortamda yetiştirilir.
              </p>
            </motion.div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 w-32 h-32 border-8 border-emerald-100 rounded-full -z-10" />
          <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-silver-custom/20 rounded-full blur-2xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

const FeatureSection = ({ images }: { images: any }) => {
  const features = [
    {
      id: "teknoloji",
      icon: <Droplets className="w-8 h-8 text-emerald-600" />,
      title: "Saf Su Teknolojisi",
      description: "Kapalı devre sistemimiz geleneksel tarıma göre %95 daha az su kullanır. Toprak yok, tarım ilacı yok, sadece saf besin.",
      image: images.tech || "https://picsum.photos/seed/hydroponic-microgreens-2/600/400"
    },
    {
      id: "tazelik",
      icon: <Clock className="w-8 h-8 text-emerald-600" />,
      title: "2 Saatte Tarladan Sofraya",
      description: "Şafakta hasat edilir, öğlene kadar teslim edilir. Çatalca çiftliğimiz ile İstanbul mutfağınız arasındaki mesafeyi kapatıyoruz.",
      image: images.harvest || "https://picsum.photos/seed/hydroponic-microgreens-3/600/400"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {features.map((feature, index) => (
          <div key={feature.id} id={feature.id} className={`flex flex-col lg:flex-row items-center gap-16 mb-32 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="mb-6">{feature.icon}</div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{feature.title}</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {feature.description}
              </p>
              <ul className="space-y-4">
                {['Steril Ortam', 'Optimize Edilmiş Besin', 'Karbon Nötr Teslimat'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700 font-medium">
                    <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                      <ChevronRight className="w-3 h-3 text-emerald-600" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-xl aspect-video">
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-50 rounded-2xl -z-10" />
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Subscription = ({ images }: { images: any }) => {
  return (
    <section id="abonelik" className="py-24 bg-emerald-900 text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 border border-white rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 border border-white rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Aylık Taze Kutu</h2>
            <p className="text-emerald-100 text-lg max-w-2xl leading-relaxed mb-8">
              Daha sağlıklı bir yaşam tarzına abone olun. En iyi mikroyeşilliklerimizden 
              ve otlarımızdan oluşan özel bir seçki her ay kapınıza gelsin.
            </p>
            <div className="flex items-center gap-4 text-emerald-300 font-medium">
              <ShieldCheck className="w-6 h-6" />
              <span>Sürdürülebilir ve Geri Dönüştürülebilir Paketleme</span>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-square max-w-md mx-auto">
              <img 
                src={images.packaging || "https://picsum.photos/seed/hydroponic-box/600/600"} 
                alt="Taze Kutu Paketleme" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Başlangıç", price: "₺450", items: "3 Çeşit", icon: <Leaf /> },
            { name: "Aile", price: "₺850", items: "7 Çeşit", icon: <Box />, popular: true },
            { name: "Şefin Seçimi", price: "₺1200", items: "12 Çeşit", icon: <Zap /> }
          ].map((plan) => (
            <motion.div 
              key={plan.name}
              whileHover={{ y: -10 }}
              className={`p-8 rounded-3xl ${plan.popular ? 'bg-white text-emerald-900' : 'bg-emerald-800/50 border border-emerald-700'} relative`}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                  En Popüler
                </span>
              )}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${plan.popular ? 'bg-emerald-100 text-emerald-600' : 'bg-emerald-700 text-emerald-300'}`}>
                {plan.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold mb-6">{plan.price}<span className="text-sm font-normal opacity-70">/ay</span></div>
              <ul className="space-y-4 mb-8 opacity-80">
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4" /> {plan.items}</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4" /> Ücretsiz Teslimat</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4" /> Tarif Kartları</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4" /> İstediğin Zaman İptal Et</li>
              </ul>
              <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.popular ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-white/10 hover:bg-white/20'}`}>
                Planı Seç
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = ({ images }: { images: any }) => {
  const galleryImages = [
    images.gallery1 || "https://picsum.photos/seed/hydroponic-microgreens-4/400/400",
    images.gallery2 || "https://picsum.photos/seed/hydroponic-microgreens-5/400/400",
    images.gallery3 || "https://picsum.photos/seed/hydroponic-microgreens-6/400/400",
    images.gallery4 || "https://picsum.photos/seed/hydroponic-microgreens-7/400/400",
    images.packaging || "https://picsum.photos/seed/hydroponic-microgreens-8/400/400",
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Canlı Beslenme</h2>
            <p className="text-gray-600 max-w-md">
              Çatalca tesisimizde yakalanan yüksek çözünürlüklü tazelik. 
              Teknoloji odaklı saflığın farkını tadın.
            </p>
          </div>
          <button className="text-emerald-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
            Takip Et @hilalnyesili <Instagram className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {galleryImages.map((img, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 0.98 }}
              className="aspect-square rounded-2xl overflow-hidden shadow-lg"
            >
              <img 
                src={img} 
                alt="Mikro yeşillik yakın çekim" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                <Leaf className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-emerald-900">
                HİLAL'İN <span className="font-light">YEŞİLİ</span>
              </span>
            </div>
            <p className="text-gray-500 max-w-sm leading-relaxed mb-8">
              İstanbul'un beslenme şeklini devrimleştiriyoruz. Çatalca'nın kalbinden 
              sürdürülebilir, kadın odaklı ve teknoloji destekli hidroponik tarım.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Keşfet</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Hikayemiz</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Teknoloji</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Ürünler</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Sürdürülebilirlik</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-6">İletişim</h4>
            <ul className="space-y-4 text-gray-500">
              <li>Çatalca, İstanbul</li>
              <li>merhaba@hilalnyesili.com</li>
              <li>+90 (212) 555 0123</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2026 Hilal’in Yeşili. Tüm hakları saklıdır.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-gray-600">Gizlilik Politikası</a>
            <a href="#" className="hover:text-gray-600">Kullanım Şartları</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [generatedImages, setGeneratedImages] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      console.log("App mounted, starting loadImages process...");
      setIsLoading(true);
      setError(null);
      
      // Small delay to ensure window.aistudio is fully initialized
      await new Promise(resolve => setTimeout(resolve, 1000));

      try {
        const hasKey = await window.aistudio?.hasSelectedApiKey?.();
        console.log("API Key check:", hasKey);
        
        if (hasKey === false) {
          console.log("No API key selected, opening dialog...");
          await window.aistudio.openSelectKey();
          // After opening the dialog, we assume the user selects a key and we proceed.
        }
        
        console.log("Starting image generation with Gemini...");
        const results = await generateImages();
        
        if (Object.keys(results).length === 0) {
          throw new Error("Görseller oluşturulamadı. Lütfen API anahtarınızı kontrol edin.");
        }
        
        console.log("Images generated successfully:", Object.keys(results));
        setGeneratedImages(results);
      } catch (err: any) {
        console.error("Auto image generation failed:", err);
        setError(err.message || "Görseller oluşturulurken bir hata oluştu.");
      } finally {
        setIsLoading(false);
      }
    };
    loadImages();
  }, []);

  return (
    <div className="min-h-screen relative">
      {isLoading && (
        <div className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full mb-8"
          />
          <h2 className="text-2xl font-bold text-emerald-900 mb-4">Geleceğin Çiftliği Hazırlanıyor</h2>
          <p className="text-gray-600 max-w-md">
            Yapay zeka, Hilal'in Yeşili için yüksek kaliteli görselleri oluşturuyor. 
            Bu işlem yaklaşık 30-60 saniye sürebilir. Lütfen bekleyin...
          </p>
        </div>
      )}

      {error && (
        <div className="fixed bottom-6 right-6 z-[100] bg-red-50 border border-red-200 p-4 rounded-2xl shadow-2xl max-w-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
              <X className="text-red-600 w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-red-900 mb-1">Hata Oluştu</h4>
              <p className="text-xs text-red-700 mb-3">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="text-xs font-bold text-red-900 underline hover:no-underline"
              >
                Tekrar Dene
              </button>
            </div>
          </div>
        </div>
      )}

      <Navbar />
      <main>
        <Hero images={generatedImages} />
        <FeatureSection images={generatedImages} />
        <Subscription images={generatedImages} />
        <Gallery images={generatedImages} />
      </main>
      <Footer />
    </div>
  );
}
