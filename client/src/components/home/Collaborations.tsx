import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";

interface Partner {
  id: number;
  name: string;
  logo: string;
  description: string;
}

export default function Collaborations() {
  // Fetch partners from the API but provide fallback data
  const { data: partners, isLoading } = useQuery({
    queryKey: ['/api/partners'],
    initialData: [
      {
        id: 1,
        name: "TechGrid Solutions",
        logo: "https://placehold.co/200x100/2563eb/white?text=TechGrid",
        description: "A leading technology provider specializing in smart grid innovations."
      },
      {
        id: 2,
        name: "GreenPower International",
        logo: "https://placehold.co/200x100/15803d/white?text=GreenPower",
        description: "Global renewable energy developer partnering on large-scale solar initiatives."
      },
      {
        id: 3,
        name: "EcoVolt Energy",
        logo: "https://placehold.co/200x100/f97316/white?text=EcoVolt",
        description: "Sustainable energy storage and battery technology innovator."
      },
      {
        id: 4,
        name: "BuildSmart Systems",
        logo: "https://placehold.co/200x100/6d28d9/white?text=BuildSmart",
        description: "Industry leader in building automation and energy management systems."
      },
      {
        id: 5,
        name: "MobilityElectric",
        logo: "https://placehold.co/200x100/dc2626/white?text=MobilityE",
        description: "Pioneer in electric mobility infrastructure and charging solutions."
      },
      {
        id: 6,
        name: "PowerSync Labs",
        logo: "https://placehold.co/200x100/0891b2/white?text=PowerSync",
        description: "Research and development partner for next-generation power technologies."
      }
    ]
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Industry Collaborations</h2>
          <p className="text-lg text-muted-foreground">
            We partner with leading organizations across the energy sector to deliver
            innovative solutions and drive technological advancement.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {partners.map((partner) => (
            <motion.div key={partner.id} variants={item}>
              <Card className="h-full hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="h-20 flex items-center justify-center mb-4">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">{partner.name}</h3>
                  <p className="text-center text-muted-foreground">{partner.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 bg-background rounded-xl p-8 shadow-sm">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Become a Partner</h3>
            <p className="text-muted-foreground mb-6">
              Join our network of industry collaborators to drive innovation in energy solutions.
              We're always looking for organizations that share our commitment to sustainability
              and technological advancement.
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <a
                href="/contact?partnership=true"
                className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium text-white bg-primary hover:bg-primary/90 transition-colors"
              >
                Explore Partnership Opportunities
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
