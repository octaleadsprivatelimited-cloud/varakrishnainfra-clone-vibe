import { Shield, Clock, BadgeCheck, Headphones, Wallet, Scale } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import whyChooseBg from "@/assets/why-choose-bg.jpg";

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
    <section className="py-12 md:py-16 lg:py-20 bg-foreground text-background relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${whyChooseBg})` }}
      />
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative" ref={ref}>
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-8 md:mb-10 gravity-drop ${isVisible ? 'in-view' : ''}`}>
          <div className="inline-flex items-center gap-2 text-primary font-semibold text-xs md:text-sm uppercase tracking-wider mb-2 md:mb-3">
            <span className="w-6 md:w-8 h-0.5 bg-primary" />
            Why Choose Us
            <span className="w-6 md:w-8 h-0.5 bg-primary" />
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold mb-2 md:mb-3">
            Building Trust Through <span className="text-primary">Excellence</span>
          </h2>
          <p className="text-sm md:text-base opacity-70">
            Experience the difference of working with a company that puts your interests first
          </p>
        </div>

        {/* Features Grid */}
        <div className={`grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 stagger-children ${isVisible ? 'in-view' : ''}`}>
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-4 md:p-6 rounded-lg md:rounded-xl bg-background/5 backdrop-blur-sm border border-background/10 hover:bg-primary hover:border-primary transition-all duration-500 cursor-pointer"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary/20 group-hover:bg-background/20 flex items-center justify-center mb-3 md:mb-4 transition-all duration-300 group-hover:scale-110">
                <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-primary group-hover:text-background transition-colors" />
              </div>
              <h3 className="text-sm md:text-lg font-serif font-bold mb-1 md:mb-2 group-hover:text-background transition-colors leading-tight">
                {feature.title}
              </h3>
              <p className="text-xs md:text-sm opacity-70 group-hover:opacity-90 transition-opacity line-clamp-2 md:line-clamp-none leading-relaxed">
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
