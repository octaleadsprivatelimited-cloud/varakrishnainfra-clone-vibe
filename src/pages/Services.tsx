import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import PageTransition from "@/components/PageTransition";
import { ArrowRight, Building, Home, Landmark, HardHat, TreePine, Factory, CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const services = [
  {
    icon: Home,
    title: "Residential Projects",
    description: "Premium villas and apartments designed for modern living with world-class amenities and contemporary architecture.",
    color: "from-amber-500 to-orange-600",
    features: [
      "2, 3 & 4 BHK Apartments",
      "Independent Villas",
      "Gated Communities",
      "Modern Amenities",
      "Prime Locations",
      "Quality Construction"
    ],
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop"
  },
  {
    icon: Landmark,
    title: "Plot Development",
    description: "DTCP/HMDA approved plots in prime locations with clear titles, proper documentation, and excellent infrastructure.",
    color: "from-emerald-500 to-teal-600",
    features: [
      "DTCP/HMDA Approved",
      "Clear Land Titles",
      "Wide Internal Roads",
      "Underground Drainage",
      "Electricity Connection",
      "Park & Open Spaces"
    ],
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop"
  },
  {
    icon: Building,
    title: "Commercial Spaces",
    description: "State-of-the-art commercial complexes and office spaces in strategic locations for business growth.",
    color: "from-blue-500 to-indigo-600",
    features: [
      "Office Spaces",
      "Retail Showrooms",
      "IT Parks",
      "Business Centers",
      "Premium Locations",
      "Modern Infrastructure"
    ],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop"
  },
  {
    icon: HardHat,
    title: "Construction Services",
    description: "End-to-end construction services with quality materials, skilled workforce, and timely project delivery.",
    color: "from-rose-500 to-pink-600",
    features: [
      "Turnkey Projects",
      "Renovation & Remodeling",
      "Interior Design",
      "Structural Engineering",
      "Quality Materials",
      "Skilled Workforce"
    ],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop"
  },
  {
    icon: Factory,
    title: "Infrastructure Development",
    description: "Large-scale infrastructure development including roads, utilities, and public facilities.",
    color: "from-purple-500 to-violet-600",
    features: [
      "Road Construction",
      "Water Supply Systems",
      "Sewage Treatment",
      "Power Infrastructure",
      "Public Facilities",
      "Township Development"
    ],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop"
  },
  {
    icon: TreePine,
    title: "Farm Houses",
    description: "Serene farmhouse projects away from city chaos, perfect for weekend getaways and investment.",
    color: "from-green-500 to-lime-600",
    features: [
      "Organic Farming",
      "Eco-friendly Design",
      "Water Conservation",
      "Nature Integration",
      "Privacy & Security",
      "Investment Value"
    ],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop"
  },
];

const process = [
  { step: "01", title: "Consultation", description: "Free initial consultation to understand your requirements and budget" },
  { step: "02", title: "Site Selection", description: "Help you choose the perfect location based on your needs" },
  { step: "03", title: "Legal Verification", description: "Complete legal verification and documentation process" },
  { step: "04", title: "Customization", description: "Customize your property according to your preferences" },
  { step: "05", title: "Execution", description: "Quality construction with regular progress updates" },
  { step: "06", title: "Handover", description: "Timely handover with complete documentation and after-sales support" },
];

const Services = () => {
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation(0.1);
  const { ref: processRef, isVisible: processVisible } = useScrollAnimation(0.1);

  return (
    <PageTransition>
      <Layout>
        <PageHeader 
          title="Our Services"
          subtitle="Comprehensive real estate and infrastructure solutions tailored to meet your needs."
          breadcrumbs={[{ label: "Services" }]}
        />

        {/* Services Detail Section */}
        <section className="py-20 md:py-28 bg-background" ref={servicesRef}>
          <div className="container mx-auto px-4">
            <div className={`space-y-24 ${servicesVisible ? 'in-view' : ''}`}>
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >
                  {/* Image */}
                  <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''} fade-up`}>
                    <div className="relative rounded-2xl overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-80 lg:h-[450px] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    {/* Floating Icon */}
                    <div className={`absolute -bottom-6 ${index % 2 === 1 ? 'right-6' : 'left-6'} w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-xl`}>
                      <service.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                      <span className="w-8 h-0.5 bg-primary" />
                      Service {String(index + 1).padStart(2, '0')}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                      {service.title}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                      {service.description}
                    </p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <Button className="cta-button">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button variant="outline" className="cta-button-outline">
                        <Phone className="w-4 h-4 mr-2" />
                        Get Quote
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 md:py-28 bg-secondary" ref={processRef}>
          <div className="container mx-auto px-4">
            <div className={`text-center max-w-3xl mx-auto mb-16 fade-up ${processVisible ? 'in-view' : ''}`}>
              <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                <span className="w-8 h-0.5 bg-primary" />
                Our Process
                <span className="w-8 h-0.5 bg-primary" />
              </div>
              <h2 className="section-title">
                How We <span className="text-gradient">Work</span>
              </h2>
              <p className="section-subtitle mt-4">
                A streamlined process designed to make your property journey seamless
              </p>
            </div>

            <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children ${processVisible ? 'in-view' : ''}`}>
              {process.map((item, index) => (
                <div key={index} className="relative bg-background rounded-xl p-8 border border-border hover:border-primary/50 transition-all duration-300 group">
                  {/* Step Number */}
                  <span className="absolute -top-4 -left-4 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-transform">
                    {item.step}
                  </span>
                  <div className="mt-4">
                    <h3 className="text-xl font-serif font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                  {/* Connector Line */}
                  {index < process.length - 1 && index % 3 !== 2 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-primary relative overflow-hidden pb-24 lg:pb-28">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="container mx-auto px-4 relative text-center">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary-foreground mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Get in touch with our experts today for a free consultation
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Schedule Visit
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    </PageTransition>
  );
};

export default Services;
