import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, ArrowRight, Shield, FileSearch, Mic, Terminal } from 'lucide-react';

interface ProductCardProps {
  title: string;
  description: string;
  githubUrl: string;
  websiteUrl?: string;
  icon: React.ReactNode;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, githubUrl, websiteUrl, icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
      className="group relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/0 via-zinc-800/0 to-zinc-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />

      <div className="relative z-10">
        <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-zinc-100 mb-2">{title}</h3>
        <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{description}</p>

        <div className="flex items-center gap-4">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-zinc-300 hover:text-zinc-100 transition-colors duration-200"
          >
            <Github className="w-4 h-4" />
            <span className="text-sm">GitHub</span>
          </a>
          {websiteUrl && (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-zinc-300 hover:text-zinc-100 transition-colors duration-200"
            >
              <span className="text-sm">Website</span>
              <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center">
      <motion.div
        style={{ opacity, scale }}
        className="max-w-4xl mx-auto px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-light text-zinc-100 tracking-tight">
            Pleno
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4"
          >
            <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed">
              Not solving insufficiency.
              <br />
              Arranging a state of sufficiency.
            </p>
            <p className="text-base md:text-lg text-zinc-500 font-light max-w-2xl mx-auto">
              No need to add more. No need to rush. Already complete.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const ProductsSection: React.FC = () => {
  const products = [
    {
      title: 'Pleno Audit',
      description: 'Personal Browser Security',
      githubUrl: 'https://github.com/HikaruEgashira/pleno-audit',
      websiteUrl: 'https://hikaruegashira.github.io/pleno-audit/',
      icon: <FileSearch className="w-5 h-5 text-zinc-100" />,
    },
    {
      title: 'Pleno Anonymize',
      description: 'PII Filter Backend Service',
      githubUrl: 'https://github.com/HikaruEgashira/pleno-anonymize',
      websiteUrl: 'https://hikaruegashira.github.io/pleno-anonymize/',
      icon: <Shield className="w-5 h-5 text-zinc-100" />,
    },
    {
      title: 'Pleno Transcribe',
      description: 'OSS Plaude Note Pro Alternative',
      githubUrl: 'https://github.com/HikaruEgashira/pleno-transcribe',
      websiteUrl: 'https://hikaruegashira.github.io/pleno-transcribe/',
      icon: <Mic className="w-5 h-5 text-zinc-100" />,
    },
  ];

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-light text-zinc-100 mb-4">Products</h2>
          <p className="text-zinc-400 text-lg">Just right, over feature-rich. Calm, over fast. Lasting, over novel.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.title} {...product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  const products = [
    { name: 'Anonymize', privacyUrl: 'https://hikaruegashira.github.io/pleno-anonymize/privacy', termsUrl: 'https://hikaruegashira.github.io/pleno-anonymize/terms' },
    { name: 'Audit', privacyUrl: 'https://hikaruegashira.github.io/pleno-audit/privacy', termsUrl: 'https://hikaruegashira.github.io/pleno-audit/terms' },
    { name: 'Transcribe', privacyUrl: 'https://hikaruegashira.github.io/pleno-transcribe/privacy', termsUrl: 'https://hikaruegashira.github.io/pleno-transcribe/terms' },
  ];

  return (
    <footer className="relative border-t border-zinc-800 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <p className="text-zinc-100 font-medium mb-4">Pleno Project</p>
            <a
              href="https://natbee.pages.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-100 transition-colors duration-200 text-sm"
            >
              Company
            </a>
          </div>

          <div>
            <p className="text-zinc-100 font-medium mb-4">Privacy Policy</p>
            <ul className="space-y-2">
              {products.map((product) => (
                <li key={product.name}>
                  <a
                    href={product.privacyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-zinc-100 transition-colors duration-200 text-sm"
                  >
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-zinc-100 font-medium mb-4">Terms of Service</p>
            <ul className="space-y-2">
              {products.map((product) => (
                <li key={product.name}>
                  <a
                    href={product.termsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-zinc-100 transition-colors duration-200 text-sm"
                  >
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex md:justify-end items-start gap-4">
            <a
              href="https://github.com/HikaruEgashira"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-100 transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="/dev/"
              className="text-zinc-400 hover:text-zinc-100 transition-colors duration-200"
            >
              <Terminal className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const BackgroundGrid: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />
    </div>
  );
};

const HomePage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black text-zinc-100 overflow-x-hidden">
      <BackgroundGrid />

      <div className="relative z-10">
        <HeroSection />
        <ProductsSection />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
