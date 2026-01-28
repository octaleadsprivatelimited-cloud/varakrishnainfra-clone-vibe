import { useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["Pillor no, P-55, 3rd Floor Dwaraka Heights", "Plot no 132, Raghavendra Colony", "Hyderabad, Telangana 500039"],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+91 8143341663"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["info@varakrishnainfra.com", "sales@varakrishnainfra.com"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sunday: 10:00 AM - 5:00 PM"],
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { ref, isVisible } = useScrollAnimation(0.1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message Sent Successfully!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <PageTransition>
      <SEO 
        title="Contact Us | Vara Krishna Infra - Get in Touch"
        description="Contact Vara Krishna Infra for inquiries, site visits, or assistance. Call +91 8143341663 or visit our office in Raghavendra Colony, Hyderabad. Mon-Sat: 9 AM - 7 PM."
        keywords="contact vara krishna infra, real estate contact hyderabad, property inquiry hyderabad, site visit booking, real estate consultation"
        url="https://varakrishnainfra.com/contact"
      />
      <Layout>
        <PageHeader 
          title="Contact Us"
          subtitle="Get in touch with our team for inquiries, site visits, or any assistance you need."
          breadcrumbs={[{ label: "Contact Us" }]}
        />

        {/* Contact Section */}
        <section className="py-10 md:py-20 lg:py-28 bg-background" ref={ref}>
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-12">
              {/* Contact Form */}
              <div className={`lg:col-span-2 fade-left ${isVisible ? 'in-view' : ''}`}>
                <div className="bg-secondary rounded-xl md:rounded-2xl p-5 md:p-8 lg:p-10">
                  <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                    <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    <h2 className="text-lg md:text-2xl font-serif font-bold">Send Us a Message</h2>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-2 gap-3 md:gap-6">
                      <div>
                        <label className="text-xs md:text-sm font-medium mb-1 md:mb-2 block">Full Name *</label>
                        <Input 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="bg-background text-sm md:text-base h-9 md:h-10"
                        />
                      </div>
                      <div>
                        <label className="text-xs md:text-sm font-medium mb-1 md:mb-2 block">Email *</label>
                        <Input 
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          className="bg-background text-sm md:text-base h-9 md:h-10"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:gap-6">
                      <div>
                        <label className="text-xs md:text-sm font-medium mb-1 md:mb-2 block">Phone *</label>
                        <Input 
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          required
                          className="bg-background text-sm md:text-base h-9 md:h-10"
                        />
                      </div>
                      <div>
                        <label className="text-xs md:text-sm font-medium mb-1 md:mb-2 block">Subject</label>
                        <Input 
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="How can we help?"
                          className="bg-background text-sm md:text-base h-9 md:h-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs md:text-sm font-medium mb-1 md:mb-2 block">Message *</label>
                      <Textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your requirements..."
                        rows={4}
                        required
                        className="bg-background resize-none text-sm md:text-base"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="sm" 
                      className="w-full md:w-auto cta-button text-sm md:text-base"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>

              {/* Contact Info */}
              <div className={`fade-right ${isVisible ? 'in-view' : ''}`}>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 md:gap-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="bg-secondary rounded-lg md:rounded-xl p-3 md:p-6 flex flex-col md:flex-row gap-2 md:gap-4 hover:bg-primary/5 transition-colors group">
                      <div className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all">
                        <info.icon className="w-4 h-4 md:w-6 md:h-6 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xs md:text-base mb-1 md:mb-2">{info.title}</h3>
                        {info.lines.map((line, idx) => (
                          <p key={idx} className="text-muted-foreground text-[10px] md:text-sm leading-relaxed">{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Contact CTA */}
                <div className="mt-4 md:mt-8 bg-primary rounded-lg md:rounded-xl p-4 md:p-6 text-primary-foreground">
                  <h3 className="font-bold text-sm md:text-lg mb-1 md:mb-2">Need Immediate Assistance?</h3>
                  <p className="text-xs md:text-sm opacity-90 mb-3 md:mb-4">Our team is ready to help you.</p>
                  <Button variant="secondary" size="sm" className="w-full text-xs md:text-sm">
                    <Phone className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                    Call +91 8143341663
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-8 md:py-12 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-4 md:mb-8">
              <h2 className="text-lg md:text-2xl font-serif font-bold mb-1 md:mb-2">Our Location</h2>
              <p className="text-muted-foreground text-xs md:text-base">Visit our office in Raghavendra Colony, Hyderabad</p>
            </div>
            <div className="rounded-xl md:rounded-2xl overflow-hidden h-[200px] md:h-[400px] shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.123456789!2d78.583995!3d17.403479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9fb72b88ab53%3A0xbca330d52616d42e!2sVara%20krishna%20Infra%20Pvt.%20Ltd!5e0!3m2!1sen!2sin!4v1706284800000!5m2!1sen!2sin&q=Pillor+no,+P-55,+3rd+Floor+Dwaraka+Heights,+Plot+no+132,+Raghavendra+Colony,+Hyderabad,+Telangana+500039"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vara Krishna Infra Location"
              />
            </div>
          </div>
        </section>

        {/* Why Contact Us */}
        <section className="py-10 md:py-16 lg:py-20 bg-background pb-20 md:pb-24 lg:pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-6 md:mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold">
                Why <span className="text-gradient">Contact Us</span>
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-3 md:gap-8">
              {[
                { title: "Free Consultation", description: "Get expert advice on your property requirements at no cost" },
                { title: "Site Visits", description: "Schedule complimentary site visits to our ongoing projects" },
                { title: "24/7 Support", description: "Our dedicated team is available to assist you anytime" },
              ].map((item, index) => (
                <div key={index} className="text-center p-3 md:p-6 rounded-lg md:rounded-xl bg-secondary hover:bg-primary/5 transition-colors">
                  <CheckCircle className="w-8 h-8 md:w-12 md:h-12 text-primary mx-auto mb-2 md:mb-4" />
                  <h3 className="text-xs md:text-xl font-bold mb-1 md:mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-[10px] md:text-base leading-relaxed line-clamp-3 md:line-clamp-none">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </PageTransition>
  );
};

export default Contact;
