import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import PageTransition from "@/components/PageTransition";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { Linkedin, Mail, Phone } from "lucide-react";

const teamMembers = [
  {
    name: "Rajesh Kumar",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    bio: "With over 20 years of experience in real estate, Rajesh founded Varakrishna Infra with a vision to transform Hyderabad's landscape.",
    linkedin: "#",
    email: "rajesh@varakrishnainfra.com",
    phone: "+91 9515541663"
  },
  {
    name: "Priya Sharma",
    role: "Managing Director",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    bio: "Priya oversees all strategic operations and has been instrumental in expanding our portfolio across Telangana.",
    linkedin: "#",
    email: "priya@varakrishnainfra.com",
    phone: "+91 9515541664"
  },
  {
    name: "Arun Reddy",
    role: "Chief Architect",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "Award-winning architect with expertise in sustainable design and modern residential complexes.",
    linkedin: "#",
    email: "arun@varakrishnainfra.com",
    phone: "+91 9515541665"
  },
  {
    name: "Sneha Patel",
    role: "Head of Sales",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    bio: "Sneha leads our sales team with a customer-first approach, ensuring every client finds their perfect property.",
    linkedin: "#",
    email: "sneha@varakrishnainfra.com",
    phone: "+91 9515541666"
  },
  {
    name: "Vikram Singh",
    role: "Project Manager",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "Vikram ensures timely delivery of all projects with his meticulous planning and execution skills.",
    linkedin: "#",
    email: "vikram@varakrishnainfra.com",
    phone: "+91 9515541667"
  },
  {
    name: "Ananya Rao",
    role: "Legal Head",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop&crop=face",
    bio: "Ananya handles all legal documentation ensuring transparent and hassle-free transactions for our clients.",
    linkedin: "#",
    email: "ananya@varakrishnainfra.com",
    phone: "+91 9515541668"
  },
];

const Team = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.1);
  const { ref: teamRef, isVisible: teamVisible } = useScrollAnimation(0.1);

  return (
    <PageTransition>
      <Layout>
        <PageHeader
          title="Our Team"
          subtitle="Meet the dedicated professionals behind Varakrishna Infra's success"
          breadcrumbs={[{ label: "Our Team" }]}
        />

        {/* Team Introduction */}
        <section className="py-12 md:py-20 bg-background" ref={heroRef}>
          <div className="container mx-auto px-4">
            <div className={`text-center max-w-3xl mx-auto fade-up ${heroVisible ? 'in-view' : ''}`}>
              <div className="inline-flex items-center gap-2 text-primary font-semibold text-xs md:text-sm uppercase tracking-wider mb-4">
                <span className="w-8 h-[2px] bg-primary" />
                Our Experts
                <span className="w-8 h-[2px] bg-primary" />
              </div>
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-foreground mb-4">
                The People Behind Our Success
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Our team comprises experienced professionals from diverse backgrounds, 
                united by a shared passion for excellence in real estate development. 
                Together, we bring decades of expertise in architecture, project management, 
                sales, and customer service.
              </p>
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-12 md:py-20 bg-secondary" ref={teamRef}>
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={member.name}
                  className={`group bg-background rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 fade-up ${teamVisible ? 'in-view' : ''}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image */}
                  <div className="relative h-64 md:h-72 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    
                    {/* Social Links Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a
                        href={member.linkedin}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary transition-colors"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary transition-colors"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                      <a
                        href={`tel:${member.phone}`}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary transition-colors"
                        aria-label={`Call ${member.name}`}
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 md:p-6">
                    <h3 className="text-lg md:text-xl font-serif font-bold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-semibold text-sm mb-3">
                      {member.role}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Our Team CTA */}
        <section className="py-12 md:py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-4xl font-serif font-bold mb-4">
              Join Our Growing Team
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-6 text-sm md:text-base">
              We're always looking for talented individuals who share our passion for 
              excellence. If you're interested in building a career in real estate, 
              we'd love to hear from you.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary font-semibold rounded-none hover:bg-white/90 transition-colors"
            >
              Get In Touch
            </a>
          </div>
        </section>
      </Layout>
    </PageTransition>
  );
};

export default Team;
