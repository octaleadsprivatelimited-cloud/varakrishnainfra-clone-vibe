import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Check, Award, Users, Building, Target, Eye, Heart } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import PageTransition from "@/components/PageTransition";

const milestones = [
  { year: "2008", title: "Company Founded", description: "Started with a vision to transform real estate in Hyderabad" },
  { year: "2012", title: "First Major Project", description: "Completed our first residential township spanning 50 acres" },
  { year: "2015", title: "100+ Projects", description: "Crossed the milestone of 100 successful project deliveries" },
  { year: "2018", title: "Expansion", description: "Expanded operations to 5 major cities across Telangana" },
  { year: "2021", title: "1000+ Acres", description: "Total developed land crosses 1000 acres" },
  { year: "2024", title: "Industry Leader", description: "Recognized as one of the top infrastructure developers" },
];

const values = [
  { icon: Target, title: "Integrity", description: "We maintain the highest standards of honesty and transparency in all our dealings" },
  { icon: Eye, title: "Innovation", description: "Continuously adopting new technologies and methods to deliver excellence" },
  { icon: Heart, title: "Customer First", description: "Every decision we make is centered around customer satisfaction" },
  { icon: Award, title: "Quality", description: "Uncompromising commitment to quality in every project we undertake" },
];


const About = () => {
  const { ref: storyRef, isVisible: storyVisible } = useScrollAnimation(0.1);
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation(0.1);
  const { ref: timelineRef, isVisible: timelineVisible } = useScrollAnimation(0.1);

  return (
    <PageTransition>
      <Layout>
        <PageHeader 
          title="About Us"
          subtitle="Building dreams into reality since 2008. We are one of Hyderabad's most trusted real estate developers."
          breadcrumbs={[{ label: "About Us" }]}
        />

        {/* Our Story Section */}
        <section className="py-20 md:py-28 bg-background" ref={storyRef}>
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image Grid */}
              <div className={`relative fade-left ${storyVisible ? 'in-view' : ''}`}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <img 
                      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop" 
                      alt="Modern building" 
                      className="rounded-xl w-full h-48 object-cover"
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=500&fit=crop" 
                      alt="Office space" 
                      className="rounded-xl w-full h-64 object-cover"
                    />
                  </div>
                  <div className="space-y-4 pt-8">
                    <img 
                      src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=500&fit=crop" 
                      alt="Apartment building" 
                      className="rounded-xl w-full h-64 object-cover"
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop" 
                      alt="Luxury villa" 
                      className="rounded-xl w-full h-48 object-cover"
                    />
                  </div>
                </div>
                {/* Stats Badge */}
                <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-xl">
                  <div className="text-4xl font-bold">16+</div>
                  <div className="text-sm uppercase tracking-wide opacity-90">Years Experience</div>
                </div>
              </div>

              {/* Content */}
              <div className={`fade-right ${storyVisible ? 'in-view' : ''}`}>
                <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                  <span className="w-8 h-0.5 bg-primary" />
                  Our Story
                </div>
                <h2 className="section-title mb-6">
                  Building <span className="text-gradient">Excellence</span> Since 2008
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Vara Krishna Infra was founded with a singular vision - to transform the landscape of real estate development in Hyderabad. What started as a small venture has grown into one of the most trusted names in infrastructure development.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Over the years, we have delivered more than 200 successful projects, including residential townships, commercial complexes, and infrastructure developments. Our commitment to quality, transparency, and customer satisfaction has earned us the trust of thousands of happy families.
                </p>

                <div className="grid grid-cols-2 gap-6">
                  {[
                    "DTCP/HMDA Approved",
                    "Transparent Dealings",
                    "Quality Construction",
                    "On-time Delivery",
                    "Clear Documentation",
                    "After-sales Support"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 md:py-28 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-background rounded-2xl p-10 shadow-lg">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the most trusted and preferred real estate developer in India, known for creating sustainable communities that enhance the quality of life for generations to come.
                </p>
              </div>
              <div className="bg-background rounded-2xl p-10 shadow-lg">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To deliver exceptional real estate solutions that exceed customer expectations through innovation, integrity, and unwavering commitment to quality, while contributing to the sustainable development of urban infrastructure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 md:py-28 bg-background" ref={valuesRef}>
          <div className="container mx-auto px-4">
            <div className={`text-center max-w-3xl mx-auto mb-16 fade-up ${valuesVisible ? 'in-view' : ''}`}>
              <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                <span className="w-8 h-0.5 bg-primary" />
                Our Values
                <span className="w-8 h-0.5 bg-primary" />
              </div>
              <h2 className="section-title">
                Principles That <span className="text-gradient">Guide Us</span>
              </h2>
            </div>

            <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children ${valuesVisible ? 'in-view' : ''}`}>
              {values.map((value, index) => (
                <div key={index} className="text-center p-8 rounded-2xl bg-secondary hover:bg-primary/5 transition-all duration-300 group">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <value.icon className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 md:py-28 bg-footer text-footer-text" ref={timelineRef}>
          <div className="container mx-auto px-4">
            <div className={`text-center max-w-3xl mx-auto mb-16 fade-up ${timelineVisible ? 'in-view' : ''}`}>
              <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                <span className="w-8 h-0.5 bg-primary" />
                Our Journey
                <span className="w-8 h-0.5 bg-primary" />
              </div>
              <h2 className="section-title text-white">
                Milestones We're <span className="text-gradient">Proud Of</span>
              </h2>
            </div>

            <div className={`relative stagger-children ${timelineVisible ? 'in-view' : ''}`}>
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/30 hidden md:block" />
              
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-300">
                      <span className="text-primary font-bold text-2xl">{milestone.year}</span>
                      <h3 className="text-xl font-serif font-bold text-white mt-2 mb-2">{milestone.title}</h3>
                      <p className="text-footer-text">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-footer" />
                  
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </section>

      </Layout>
    </PageTransition>
  );
};

export default About;
