import { Shield, Clock, BadgeCheck, Headphones, Wallet, Scale } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const features = [
  {
    icon: Shield,
    title: "100% Secure Investment",
    description: "All our properties come with clear legal documentation and RERA registration.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "We are committed to delivering projects on schedule with zero delays.",
  },
  {
    icon: BadgeCheck,
    title: "Premium Quality",
    description: "Best-in-class construction materials and world-class craftsmanship.",
  },
  {
    icon: Wallet,
    title: "Best Price Guarantee",
    description: "Competitive pricing with flexible payment plans and bank loan assistance.",
  },
  {
    icon: Scale,
    title: "Legal Transparency",
    description: "Complete transparency in all transactions with proper government approvals.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated customer support team to assist you at every step.",
  },
];

const WhyChooseUs = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="py-20 md:py-28 bg-foreground text-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative" ref={ref}>
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 fade-up ${isVisible ? 'in-view' : ''}`}>
          <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            <span className="w-8 h-0.5 bg-primary" />
            Why Choose Us
            <span className="w-8 h-0.5 bg-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
            Building Trust Through <span className="text-primary">Excellence</span>
          </h2>
          <p className="text-lg opacity-70">
            Experience the difference of working with a company that puts your interests first
          </p>
        </div>

        {/* Features Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children ${isVisible ? 'in-view' : ''}`}>
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 rounded-xl bg-background/5 backdrop-blur-sm border border-background/10 hover:bg-primary hover:border-primary transition-all duration-500 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/20 group-hover:bg-background/20 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-background transition-colors" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-background transition-colors">
                {feature.title}
              </h3>
              <p className="opacity-70 group-hover:opacity-90 transition-opacity">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
