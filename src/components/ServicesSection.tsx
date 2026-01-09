import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import serviceConstruction from "@/assets/service-construction.jpg";
import servicePlots from "@/assets/service-plots.jpg";
import serviceApartments from "@/assets/service-apartments.jpg";

const services = [
  {
    image: servicePlots,
    title: "Real Estate",
    description:
      "Vara Krishna Infra is one of the most renowned Real Estate Developers in Telangana. We are a young and dynamic company with an excellent marketing stand and impressive track record. Our team of experienced professionals ensures quality and timely delivery of projects.",
  },
  {
    image: serviceConstruction,
    title: "Infrastructure",
    description:
      "We specialize in building world-class infrastructure projects including commercial complexes, roads, and industrial facilities. Our commitment to quality and innovation sets us apart in the construction industry.",
  },
  {
    image: serviceApartments,
    title: "Construction",
    description:
      "From residential apartments to commercial buildings, we deliver projects that exceed expectations. Our construction services are backed by years of experience and a dedicated team of skilled professionals.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group">
              <div className="overflow-hidden mb-6">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-4 uppercase">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {service.description}
              </p>
              <Button variant="link" className="p-0 text-primary font-semibold uppercase tracking-wide">
                Read More <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
