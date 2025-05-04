import { db } from "./index";
import * as schema from "@shared/schema";

async function seed() {
  try {
    console.log("Starting database seeding...");

    // Seed services
    const servicesData = [
      {
        title: "Power Distribution Systems",
        description: "Engineering & implementation of reliable power distribution systems for commercial, industrial, and residential applications. Our expertise includes substation design, high and medium voltage networks, and power quality solutions.",
        icon: "bolt",
        slug: "power-distribution-systems",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Renewable Energy Solutions",
        description: "Design and integration of renewable energy systems including solar, wind, hydroelectric, and hybrid solutions. We provide comprehensive services from resource assessment to implementation and grid connection.",
        icon: "sun",
        slug: "renewable-energy-solutions",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Energy Management Systems",
        description: "Custom energy management solutions to optimize consumption, reduce operational costs, and enhance sustainability. Our systems include real-time monitoring, automated controls, and advanced analytics.",
        icon: "gauge",
        slug: "energy-management-systems",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Electric Vehicle Infrastructure",
        description: "Planning and deployment of EV charging infrastructure for public facilities, commercial properties, and residential complexes. We provide scalable solutions from single-point installations to networked charging hubs.",
        icon: "car-battery",
        slug: "ev-infrastructure",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Power Electronics Design",
        description: "Custom power electronics solutions including converters, inverters, and control systems for specialized applications. Our engineering team has expertise in both analog and digital power electronics design.",
        icon: "microchip",
        slug: "power-electronics-design",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Energy Audits & Optimization",
        description: "Comprehensive energy audits to identify inefficiencies and develop optimization strategies. Our services include thermal imaging, load analysis, power quality assessment, and ROI-focused recommendations.",
        icon: "magnifying-glass-chart",
        slug: "energy-audits-optimization",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Check if services exist before inserting
    const existingServices = await db.query.services.findMany();
    if (existingServices.length === 0) {
      console.log("Seeding services...");
      await db.insert(schema.services).values(servicesData);
    } else {
      console.log("Services already exist, skipping...");
    }

    // Seed projects
    const projectsData = [
      {
        title: "Smart Grid Implementation for Municipal Utility",
        description: "Designed and implemented a comprehensive smart grid system for a municipal utility serving 50,000 residents. The project included advanced metering infrastructure, distribution automation, and a centralized management system.",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e",
        category: "Smart Grids",
        client: "Westlake Municipal Utility",
        completionDate: new Date("2023-08-15"),
        slug: "smart-grid-municipal-utility",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Solar Microgrid for Rural Healthcare Facility",
        description: "Engineered a 100kW solar microgrid with battery storage for a rural healthcare facility, ensuring reliable 24/7 power supply and reducing operational costs by 60%. The system includes automated load management and remote monitoring capabilities.",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276",
        category: "Renewable Energy",
        client: "Regional Health Partners",
        completionDate: new Date("2023-05-10"),
        slug: "solar-microgrid-healthcare",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Commercial EV Fleet Charging Infrastructure",
        description: "Developed a scalable charging infrastructure for a logistics company's fleet of 50 electric delivery vehicles. The smart charging system optimizes charging schedules, manages peak demand, and integrates with the company's operations software.",
        image: "https://images.unsplash.com/photo-1593941707882-a5bba13938c7",
        category: "EV Infrastructure",
        client: "GreenDelivery Logistics",
        completionDate: new Date("2023-11-30"),
        slug: "ev-fleet-charging",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Industrial Energy Management System",
        description: "Implemented a comprehensive energy management system for a manufacturing facility, reducing energy consumption by 25%. The solution includes real-time monitoring, predictive maintenance, and automated optimization algorithms.",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12",
        category: "Energy Management",
        client: "PrecisionMfg Industries",
        completionDate: new Date("2023-03-22"),
        slug: "industrial-energy-management",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Hybrid Power System for Island Community",
        description: "Designed and deployed a hybrid power system combining solar, wind, and diesel generation with advanced storage for an island community of 2,000 residents. The system has reduced fossil fuel consumption by 70% while improving reliability.",
        image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51",
        category: "Renewable Energy",
        client: "Isla Verde Township",
        completionDate: new Date("2022-09-15"),
        slug: "island-hybrid-power",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Power Quality Improvement for Data Center",
        description: "Engineered and implemented power quality solutions for a 10MW data center, ensuring clean power delivery and eliminating costly downtime. The project included harmonic filtering, transient voltage suppression, and uninterruptible power systems.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
        category: "Power Quality",
        client: "CloudSphere Data Services",
        completionDate: new Date("2023-01-12"),
        slug: "data-center-power-quality",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Check if projects exist before inserting
    const existingProjects = await db.query.projects.findMany();
    if (existingProjects.length === 0) {
      console.log("Seeding projects...");
      await db.insert(schema.projects).values(projectsData);
    } else {
      console.log("Projects already exist, skipping...");
    }

    // Seed team members
    const teamData = [
      {
        name: "Dr. Priya Sharma",
        position: "Founder & CEO",
        bio: "Dr. Sharma has over 20 years of experience in electrical engineering and renewable energy systems. She founded Srimitha Energy Solutions with a vision to accelerate the transition to sustainable energy. She holds a Ph.D. in Electrical Engineering from MIT and has published over 30 research papers.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
        socialLinks: JSON.stringify({
          linkedin: "https://linkedin.com/in/priyasharma",
          twitter: "https://twitter.com/drsharma"
        }),
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Rajiv Mehta",
        position: "Chief Technology Officer",
        bio: "Rajiv leads our technical innovations with expertise in power electronics and control systems. With 15 years of industry experience, he has led the development of multiple patented technologies in energy conversion systems. He previously worked at Siemens and General Electric.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
        socialLinks: JSON.stringify({
          linkedin: "https://linkedin.com/in/rajivmehta"
        }),
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Ananya Patel",
        position: "Renewable Energy Director",
        bio: "Ananya specializes in solar and wind energy systems with a focus on grid integration. She has designed and implemented renewable solutions across three continents and has a master's degree in Sustainable Energy Engineering from TU Delft, Netherlands.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
        socialLinks: JSON.stringify({
          linkedin: "https://linkedin.com/in/ananyapatel",
          twitter: "https://twitter.com/ananyaenergy"
        }),
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Samuel Johnson",
        position: "Smart Grid Engineer",
        bio: "Samuel is an expert in smart grid technologies and advanced metering systems. He has helped utilities modernize their infrastructure and improve grid reliability. He holds a degree in Electrical Engineering from Stanford University and is a certified Project Management Professional.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
        socialLinks: JSON.stringify({
          linkedin: "https://linkedin.com/in/samueljohnson"
        }),
        order: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Check if team members exist before inserting
    const existingTeam = await db.query.team.findMany();
    if (existingTeam.length === 0) {
      console.log("Seeding team members...");
      await db.insert(schema.team).values(teamData);
    } else {
      console.log("Team members already exist, skipping...");
    }

    // Seed testimonials
    const testimonialsData = [
      {
        name: "Michael Chen",
        position: "Operations Director",
        company: "GreenTech Manufacturing",
        quote: "Srimitha Energy Solutions transformed our manufacturing facility with their industrial energy management system. We've seen a 30% reduction in energy costs and significant improvements in production efficiency. Their team was professional, knowledgeable, and committed throughout the project.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        rating: 5,
        isActive: true,
        createdAt: new Date()
      },
      {
        name: "Sarah Rodriguez",
        position: "Sustainability Manager",
        company: "Metro Hospital Network",
        quote: "The solar microgrid system installed by Srimitha Energy has been a game-changer for our rural healthcare facilities. Not only has it provided reliable power in areas with frequent outages, but it's also aligned perfectly with our sustainability goals. Their team's expertise in both healthcare requirements and renewable energy made the project seamless.",
        image: "https://images.unsplash.com/photo-1554727242-741c14fa561c",
        rating: 5,
        isActive: true,
        createdAt: new Date()
      },
      {
        name: "James Wilson",
        position: "Chief Information Officer",
        company: "DataStream Solutions",
        quote: "After experiencing costly downtime due to power quality issues, we engaged Srimitha Energy Solutions to implement a comprehensive solution for our data center. Their technical expertise and methodical approach resolved all our issues. We've had zero downtime since implementation, and our equipment is running more efficiently than ever.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        rating: 5,
        isActive: true,
        createdAt: new Date()
      }
    ];

    // Check if testimonials exist before inserting
    const existingTestimonials = await db.query.testimonials.findMany();
    if (existingTestimonials.length === 0) {
      console.log("Seeding testimonials...");
      await db.insert(schema.testimonials).values(testimonialsData);
    } else {
      console.log("Testimonials already exist, skipping...");
    }

    // Seed events/workshops
    const now = new Date();
    const nextMonth = new Date(now);
    nextMonth.setMonth(now.getMonth() + 1);
    const twoMonthsFromNow = new Date(now);
    twoMonthsFromNow.setMonth(now.getMonth() + 2);
    const lastMonth = new Date(now);
    lastMonth.setMonth(now.getMonth() - 1);

    const eventsData = [
      {
        title: "Renewable Energy Integration Workshop",
        description: "A comprehensive two-day workshop on integrating renewable energy sources into existing power systems. Topics include grid stability, energy storage solutions, and smart control systems. Industry experts will share case studies and practical implementation strategies.",
        startDate: nextMonth,
        endDate: new Date(nextMonth.getTime() + 86400000),
        location: "Srimitha Energy Solutions Training Center, Bangalore",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
        capacity: 50,
        registrationUrl: "https://forms.example.com/renewableworkshop",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "EV Infrastructure Planning Forum",
        description: "Join us for an insightful discussion on planning and implementing electric vehicle charging infrastructure for various applications. Learn about current technologies, regulatory considerations, and funding opportunities from industry leaders and policy experts.",
        startDate: twoMonthsFromNow,
        endDate: twoMonthsFromNow,
        location: "Grand Hyatt, Mumbai",
        image: "https://images.unsplash.com/photo-1593941707882-a5bba13938c7",
        capacity: 100,
        registrationUrl: "https://forms.example.com/evforum",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Energy Efficiency in Industrial Systems Seminar",
        description: "A completed seminar that covered advanced strategies for optimizing energy use in industrial facilities. Participants learned about the latest technologies in motor drives, compressed air systems, and process heating, along with ROI-focused implementation approaches.",
        startDate: lastMonth,
        endDate: lastMonth,
        location: "Virtual Webinar",
        image: "https://images.unsplash.com/photo-1581244277943-fe4d9aa28207",
        capacity: 200,
        registrationUrl: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Check if events exist before inserting
    const existingEvents = await db.query.events.findMany();
    if (existingEvents.length === 0) {
      console.log("Seeding events...");
      await db.insert(schema.events).values(eventsData);
    } else {
      console.log("Events already exist, skipping...");
    }

    // Seed collaborations
    const collaborationsData = [
      {
        name: "Indian Institute of Technology, Bombay",
        logo: "https://example.com/iitb-logo.svg", // Placeholder URL
        website: "https://www.iitb.ac.in",
        description: "Research partnership focused on advanced power electronics and energy storage technologies. Joint development of innovative solutions for renewable energy integration.",
        isActive: true,
        order: 1,
        createdAt: new Date()
      },
      {
        name: "Tata Power",
        logo: "https://example.com/tatapower-logo.svg", // Placeholder URL
        website: "https://www.tatapower.com",
        description: "Strategic collaboration on smart grid implementations and distributed energy resource management systems. Co-development of pilot projects for urban microgrids.",
        isActive: true,
        order: 2,
        createdAt: new Date()
      },
      {
        name: "National Renewable Energy Laboratory",
        logo: "https://example.com/nrel-logo.svg", // Placeholder URL
        website: "https://www.nrel.gov",
        description: "International research partnership on advanced solar energy systems and grid integration technologies. Knowledge sharing and validation of innovative approaches.",
        isActive: true,
        order: 3,
        createdAt: new Date()
      },
      {
        name: "EV Manufacturers Association of India",
        logo: "https://example.com/evmai-logo.svg", // Placeholder URL
        website: "https://www.evmai.org",
        description: "Industry association membership for advancing electric vehicle charging standards and infrastructure development in India. Participation in policy development and technology standardization.",
        isActive: true,
        order: 4,
        createdAt: new Date()
      }
    ];

    // Check if collaborations exist before inserting
    const existingCollaborations = await db.query.collaborations.findMany();
    if (existingCollaborations.length === 0) {
      console.log("Seeding collaborations...");
      await db.insert(schema.collaborations).values(collaborationsData);
    } else {
      console.log("Collaborations already exist, skipping...");
    }

    // Seed settings
    const settingsData = [
      {
        key: "company_name",
        value: "Srimitha Energy Solutions",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: "company_email",
        value: "info@srimitha-energy.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: "company_phone",
        value: "+91 80 1234 5678",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: "company_address",
        value: "36 Energy Park Road, Electronic City Phase 1, Bangalore, Karnataka 560100, India",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: "social_linkedin",
        value: "https://linkedin.com/company/srimitha-energy",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: "social_twitter",
        value: "https://twitter.com/srimitha_energy",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: "social_facebook",
        value: "https://facebook.com/srimithaenergy",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: "about_company",
        value: "Srimitha Energy Solutions is a premier electrical engineering firm specializing in renewable energy systems, power distribution, and energy efficiency solutions. Founded in 2010, we have successfully completed over 200 projects across India and Southeast Asia, bringing innovative and sustainable energy solutions to industries, municipalities, and communities.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: "company_mission",
        value: "Our mission is to accelerate the global transition to sustainable energy through innovative engineering solutions that are reliable, efficient, and environmentally responsible. We strive to empower our clients with the knowledge and technology to optimize their energy systems and reduce their environmental impact.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: "company_vision",
        value: "We envision a world powered by clean, accessible, and reliable energy. Srimitha Energy Solutions aims to be at the forefront of this transformation, driving innovation in electrical engineering and contributing to a more sustainable future for all.",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Check if settings exist before inserting
    const existingSettings = await db.query.settings.findMany();
    if (existingSettings.length === 0) {
      console.log("Seeding settings...");
      await db.insert(schema.settings).values(settingsData);
    } else {
      console.log("Settings already exist, skipping...");
    }

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();
