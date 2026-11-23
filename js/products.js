/*
 * Every name, figure, description and URL here was taken from amphenol-ns.com (November 2026).
 * Market and need groupings are a proposed editorial mapping for the product finder and
 * must be confirmed by the ANS product team before launch.
 * Images are hotlinked from amphenol-ns.com; `localImage` is where the optimized WebP copy
 * should live once exported (see assets/images/README.md).
 */
(function () {
  const SITE = "https://amphenol-ns.com";
  const IMG = SITE + "/portals/0/";
  const PRODUCT_EXPERIENCE = "https://network-solution.netlify.app/";

  const products = [
    {
      id: "pivot",
      name: "PIVOT™",
      family: "Ultra high density panel",
      category: "fiber-distribution",
      description: "A modular fiber panel whose patent-pending pivoting architecture opens access to recessed mid-plane connections.",
      keySpec: "Up to 192 LC connections in 1RU",
      image: IMG + "Pivot-front-mods-pivoted-%282%29.jpg",
      localImage: "assets/images/pivot-panel.webp",
      url: SITE + "/Our-Products/Fiber-Distribution/PIVOT"
    },
    {
      id: "fibervault",
      name: "FiberVault®",
      family: "Hyperscale ODF",
      category: "fiber-distribution",
      description: "A high-count optical distribution frame with front-visible tracer windows, so technicians confirm circuits with a standard VFL before opening a shelf.",
      keySpec: "36,864 fiber splice capacity",
      image: IMG + "B0038248-Edit_1.jpg",
      localImage: "assets/images/fibervault-odf.webp",
      url: SITE + "/Our-Products/Fiber-Distribution/FiberVault-Hyperscale-ODF"
    },
    {
      id: "linc",
      name: "LiNC®",
      family: "Rapid-deployment panel",
      category: "fiber-distribution",
      description: "A multi-fiber end-to-end system with four trunk spools built into the chassis, removing the need for slack storage.",
      keySpec: "Up to 96 LC per rack unit",
      image: IMG + "B0019191_1.jpg",
      localImage: "assets/images/linc-panel.webp",
      url: SITE + "/Our-Products/Fiber-Distribution/LiNC-Rapid-Deployment-Panel"
    },
    {
      id: "c2e",
      name: "C2E",
      family: "High density panel",
      category: "fiber-distribution",
      description: "The high-density panel in the C2 fiber distribution family, built around C2 Advanced Optical Modules.",
      image: IMG + "C2E%20Resize_1.jpg",
      localImage: "assets/images/c2e-panel.webp",
      url: SITE + "/Our-Products/Fiber-Distribution/C2E-High-Density"
    },
    {
      id: "c2x",
      name: "C2X",
      family: "Medium density panel",
      category: "fiber-distribution",
      description: "The medium-density C2 panel, including patch-and-splice chassis configurations.",
      image: IMG + "C2X-Front-Angle-Open-REMIX.jpg",
      localImage: "assets/images/c2x-panel.webp",
      url: SITE + "/Our-Products/Fiber-Distribution/C2X-Medium-Density"
    },
    {
      id: "lcx",
      name: "LCX",
      family: "Standard density panel",
      category: "fiber-distribution",
      description: "A standard-density fiber distribution panel that pairs with LCX cassettes.",
      image: IMG + "LCX-4RU-72port-2nd-View.jpg",
      localImage: "assets/images/lcx-panel.webp",
      url: SITE + "/Our-Products/Fiber-Distribution/LCX-Standard-Density"
    },
    {
      id: "hyperx",
      name: "HyperX",
      family: "Optical distribution frame",
      category: "fiber-distribution",
      description: "A high-density ODF for Tier 1 data centers, built to maximize circuit density and simplify migration.",
      image: IMG + "HyperX%20Full.jpeg",
      localImage: "assets/images/hyperx-odf.webp",
      url: SITE + "/Our-Products/Fiber-Distribution/HyperX-ODF"
    },
    {
      id: "infinx",
      name: "InfinX Splice",
      family: "Rollable ribbon splice cabinet",
      category: "fiber-distribution",
      description: "A splice cabinet designed for rollable ribbon fiber.",
      image: IMG + "infinx.png",
      localImage: "assets/images/infinx-splice.webp",
      url: SITE + "/Our-Products/Fiber-Distribution/InfinX-Splice"
    },
    {
      id: "preterm-panels",
      name: "Pre-Terminated Fiber Panels",
      family: "Fiber distribution",
      category: "fiber-distribution",
      description: "Pre-terminated versions of Amphenol fiber distribution panels.",
      image: IMG + "C2X%20Pre-term%20small.jpeg",
      localImage: "assets/images/preterminated-panels.webp",
      url: SITE + "/Our-Products/Fiber-Distribution/Pre-Terminated-Fiber-Panels"
    },
    {
      id: "aoms",
      name: "Advanced Optical Modules",
      family: "C2X / C2E modules",
      category: "fiber-distribution",
      description: "AOMs for C2X and C2E panels, including breakout and patch-and-splice modules.",
      image: IMG + "c2%20breakout%203.png",
      localImage: "assets/images/c2-aoms.webp",
      url: SITE + "/Our-Products/Fiber-Distribution/C2-AOMs"
    },
    {
      id: "nrgsmart",
      name: "nrgSMART®",
      family: "Intelligent power",
      category: "power-distribution",
      description: "Power distribution with real-time remote monitoring that helps operators improve energy efficiency, reduce operating costs, and improve grid reliability.",
      image: IMG + "NRG-USE.jpg",
      localImage: "assets/images/nrgsmart.webp",
      url: SITE + "/Solutions/Data-Center/DC-Power/nrgSMART"
    },
    {
      id: "dc-power",
      name: "DC Power Panels",
      family: "Fuse and breaker panels",
      category: "power-distribution",
      description: "Fuse and circuit breaker panels including the 250TPA08, 240GT54, 300CB08 and 125GMT families.",
      image: IMG + "54f35196-04ec-4b33-bb96-cd6b87e44240.jpg",
      localImage: "assets/images/dc-power-panels.webp",
      url: SITE + "/Our-Products/Power-Distribution"
    },
    {
      id: "fuses-breakers",
      name: "Fuses and Breakers",
      family: "Power protection",
      category: "power-distribution",
      description: "Replacement fuses and breakers for Amphenol power distribution panels.",
      image: IMG + "Breaker.jpeg",
      localImage: "assets/images/fuses-breakers.webp",
      url: SITE + "/Our-Products/Power-Distribution/Fuses-and-Breakers"
    },
    {
      id: "wavetrax",
      name: "WaveTrax",
      family: "Fiber raceway",
      category: "cable-management",
      description: "Fiber raceway for routing and protecting fiber, available as a custom layout through Fiber Raceway Solutions.",
      image: IMG + "Wavetrax.png",
      localImage: "assets/images/wavetrax.webp",
      url: SITE + "/Our-Products/Cable-Management"
    },
    {
      id: "racks",
      name: "Racks and Accessories",
      family: "Network, server and seismic racks",
      category: "racks",
      description: "Network, server and seismic racks with mounting accessories.",
      image: null,
      localImage: "assets/images/racks.webp",
      url: SITE + "/Our-Products/Racks-and-Accessories"
    },
    {
      id: "enclosures",
      name: "Enclosures",
      family: "Fiber and cable enclosures",
      category: "enclosures",
      description: "Fiber and cable enclosures from the Amphenol Network Solutions portfolio.",
      image: null,
      localImage: "assets/images/enclosures.webp",
      url: SITE + "/Our-Products/Enclosures"
    },
    {
      id: "optical-passives",
      name: "Optical Passives",
      family: "Cassettes and modules",
      category: "optical-passives",
      description: "Optical passive cassettes and modules for inside and outside plant.",
      image: null,
      localImage: "assets/images/optical-passives.webp",
      url: SITE + "/Our-Products/Optical-Passives"
    }
  ];

  const services = [
    {
      id: "configure-to-order",
      name: "Configure-to-Order",
      family: "Service",
      category: "service",
      description: "Application engineers bundle products from every Amphenol line under one part number and ship it to your site in one delivery.",
      image: IMG + "Use-1.jpg",
      localImage: "assets/images/configure-to-order.webp",
      url: SITE + "/Our-Services/Configure-to-Order-Solutions"
    },
    {
      id: "custom-configured",
      name: "Custom Configured Solutions",
      family: "Service",
      category: "service",
      description: "Everything in Configure-to-Order, plus pre-installation before shipment and custom product designs.",
      image: IMG + "use-2.jpg",
      localImage: "assets/images/custom-configured.webp",
      url: SITE + "/Our-Services/Custom-Configured-Solutions"
    },
    {
      id: "fiber-raceway",
      name: "Fiber Raceway Solutions",
      family: "Service",
      category: "service",
      description: "A custom WaveTrax layout designed for your network and site, either around your current layout or from scratch.",
      image: IMG + "use-3.jpg",
      localImage: "assets/images/fiber-raceway.webp",
      url: SITE + "/Our-Services/Fiber-Raceway-Solutions"
    },
    {
      id: "pre-terminated",
      name: "Pre-Terminated Solutions",
      family: "Service",
      category: "service",
      description: "Pre-terminated fiber solutions designed by the application engineering team around your network.",
      image: IMG + "C2LINX-pre-term-webbbbb.jpg",
      localImage: "assets/images/pre-terminated-solutions.webp",
      url: SITE + "/Our-Services/Pre-Terminated-Solutions"
    }
  ];

  const discovery = {
    market: [
      {
        id: "hyperscale",
        label: "Hyperscale and cloud",
        summary: "Fiber management and network performance for hyperscale environments as data demands surge.",
        items: ["pivot", "fibervault", "hyperx", "infinx", "nrgsmart"],
        exploreUrl: PRODUCT_EXPERIENCE + "?application=data-center",
        exploreLabel: "Configure data center products"
      },
      {
        id: "colocation",
        label: "Colocation and MTDC",
        summary: "Infrastructure that helps multi-tenant operators meet rising bandwidth demands and deployment timelines.",
        items: ["linc", "c2e", "c2x", "preterm-panels", "wavetrax"],
        exploreUrl: PRODUCT_EXPERIENCE + "?application=data-center",
        exploreLabel: "Configure data center products"
      },
      {
        id: "service-providers",
        label: "Service providers",
        summary: "Scalable fiber, power and cable management for 5G, FTTH and low-latency applications, from the core to the edge.",
        items: ["c2x", "lcx", "aoms", "dc-power", "nrgsmart", "wavetrax"],
        exploreUrl: SITE + "/Markets/Service-Providers",
        exploreLabel: "Explore service provider solutions"
      },
      {
        id: "broadband",
        label: "CATV and broadband",
        summary: "Fiber and hybrid solutions for fast deployment, rural reach and multi-gigabit speeds.",
        items: ["linc", "c2x", "lcx", "enclosures", "optical-passives"],
        exploreUrl: SITE + "/Markets/CATV-Broadband",
        exploreLabel: "Explore broadband solutions"
      },
      {
        id: "ftth",
        label: "Fiber to the home",
        summary: "Central office, headend, outside plant and SFU/MDU connectivity, including BABAA-compliant options.",
        items: ["c2x", "lcx", "preterm-panels", "enclosures", "optical-passives"],
        exploreUrl: SITE + "/solutions/ftth",
        exploreLabel: "Explore FTTH solutions"
      }
    ],
    product: [
      {
        id: "fiber-distribution",
        label: "Fiber distribution",
        summary: "Panels, optical distribution frames and modules that manage, protect and distribute fiber connections across a network.",
        items: ["pivot", "fibervault", "linc", "c2e", "c2x", "lcx", "hyperx", "infinx", "aoms"],
        exploreUrl: PRODUCT_EXPERIENCE,
        exploreLabel: "Configure fiber distribution"
      },
      {
        id: "power-distribution",
        label: "Power distribution",
        summary: "DC power panels, fuse and breaker panels and intelligent power management for critical network sites.",
        items: ["nrgsmart", "dc-power", "fuses-breakers"],
        exploreUrl: SITE + "/Our-Products/Power-Distribution",
        exploreLabel: "Explore power distribution"
      },
      {
        id: "cable-management",
        label: "Cable management",
        summary: "Cable management designed to protect fiber and keep routing efficient.",
        items: ["wavetrax", "fiber-raceway"],
        exploreUrl: SITE + "/Our-Products/Cable-Management",
        exploreLabel: "Explore cable management"
      },
      {
        id: "racks-enclosures",
        label: "Racks, enclosures and passives",
        summary: "The physical foundation around the fiber: racks, enclosures and optical passives.",
        items: ["racks", "enclosures", "optical-passives"],
        exploreUrl: SITE + "/Our-Products",
        exploreLabel: "Explore all products"
      }
    ],
    need: [
      {
        id: "high-density",
        label: "High density",
        summary: "More connections per rack unit without giving up access to each one.",
        items: ["pivot", "c2e", "linc", "fibervault"],
        exploreUrl: PRODUCT_EXPERIENCE + "?application=data-center&capacity=144",
        exploreLabel: "Configure a high-density panel"
      },
      {
        id: "fiber-management",
        label: "Fiber management and splicing",
        summary: "Frames, splice cabinets and raceway for dense cross-connects and growing mesh topologies.",
        items: ["fibervault", "hyperx", "infinx", "wavetrax"],
        exploreUrl: SITE + "/Our-Products/Fiber-Distribution",
        exploreLabel: "Explore fiber management"
      },
      {
        id: "power",
        label: "Power distribution",
        summary: "Protected, monitored DC power for telecom networks, data centers and central offices.",
        items: ["nrgsmart", "dc-power", "fuses-breakers"],
        exploreUrl: SITE + "/Our-Products/Power-Distribution",
        exploreLabel: "Explore power distribution"
      },
      {
        id: "pre-terminated",
        label: "Pre-terminated",
        summary: "Arrive ready to connect and spend installation time turning up capacity.",
        items: ["linc", "preterm-panels", "pre-terminated"],
        exploreUrl: SITE + "/Our-Services/Pre-Terminated-Solutions",
        exploreLabel: "Explore pre-terminated solutions"
      },
      {
        id: "custom",
        label: "Custom solutions",
        summary: "Application engineering that designs, builds and kits a configuration under a single part number.",
        items: ["configure-to-order", "custom-configured", "fiber-raceway", "pre-terminated"],
        exploreUrl: SITE + "/Our-Services",
        exploreLabel: "Explore our services"
      }
    ]
  };

  const markets = [
    { name: "Hyperscale and Multi-Tenant Environments", url: SITE + "/Markets/Hyperscale-and-Multi-Tenant-Environments" },
    { name: "Service Providers", url: SITE + "/Markets/Service-Providers" },
    { name: "CATV - Broadband", url: SITE + "/Markets/CATV-Broadband" },
    { name: "Fiber to the Home", url: SITE + "/solutions/ftth" },
    { name: "Central Office and Headend Solutions", url: SITE + "/Markets/Fiber-to-the-Home/Central-Office-and-Headend-Solutions" },
    { name: "Outside Plant", url: SITE + "/Markets/Fiber-to-the-Home/Outside-Plant" },
    { name: "BABAA", url: SITE + "/Markets/Fiber-to-the-Home/BABAA" },
    { name: "SFU and MDU Fiber Connectivity", url: SITE + "/Markets/Fiber-to-the-Home/SFU-and-MDU-Fiber-Connectivity" },
    { name: "LATAM", url: SITE + "/Markets/LATAM" }
  ];

  const resources = [
    { name: "AI Is Reshaping Data Center Infrastructure", type: "White paper", url: SITE + "/Assets/Amphenol_AI%20Driven%20Demand%20for%20High-Density%20Optical%20Interconnections%20in%20Data%20Centers.pdf" },
    { name: "Data Center Power Outlook 2025–2030", type: "White paper", url: SITE + "/Assets/Data%20Center%20Power%20Outlook%202025-2030%20by%20Brad%20Hawkins,%20ANS.pdf" },
    { name: "Design Data Center Infrastructure for Generative AI", type: "White paper", url: SITE + "/assets/Amphenol_Design%20Data%20Center%20Infrastructure%20for%20Generative%20AI_White%20Paper.pdf" },
    { name: "Cloud Edge Computing with the Power of Fiber Optics", type: "White paper", url: SITE + "/assets/Cloud%20Edge%20Computing%20with%20the%20Power%20of%20Fiber%20Optics.pdf" },
    { name: "Coherent Optics Technologies and Applications", type: "White paper", url: SITE + "/assets/Amphenol_White%20Paper_Coherent%20Optics%20Technologies%20and%20Applications%20for%20Next-Generation%20Optical%20Networks.pdf" },
    { name: "Applications of Tunable Optics for DWDM Networks", type: "White paper", url: SITE + "/Assets/Amphenol_Applications%20of%20Tunable%20Optics%20for%20DWDM%20Networks.pdf" },
    { name: "Expanded Beam vs. Physical Contact Connectors", type: "White paper", url: SITE + "/Portals/0/Amphneol%20Network%20Solutions%20Expanded-Beam-White-Paper.pdf" },
    { name: "FiberVault Case Study", type: "Case study", url: SITE + "/Assets/Amphenol%20Network%20Solutions%20FiberVault%20Case%20Study.pdf" },
    { name: "HyperX ODF Case Study", type: "Case study", url: SITE + "/Assets/Amphenol_HyperX%20Case%20Study.pdf" },
    { name: "LiNC Panel Case Study", type: "Case study", url: SITE + "/assets/Amphenol_LiNC%20Case%20Study.pdf" },
    { name: "nrgSMART Case Study", type: "Case study", url: SITE + "/assets/Amphenol_nrgSMART%20Case%20Study.pdf" },
    { name: "WaveTrax Case Study", type: "Case study", url: SITE + "/Assets/F_CaseStudy_WaveTrax.pdf" },
    { name: "Breaking the Density Barrier Without Compromising Access", type: "Blog", url: SITE + "/Blog/post/breaking-the-density-barrier-without-compromising-access---pivot-panel" },
    { name: "From Core to Edge: Infrastructure That Keeps Networks Moving Forward", type: "Blog", url: SITE + "/Blog/post/from-core-to-edge-infrastructure-that-keeps-networks-moving-forward" },
    { name: "WISPAPALOOZA 2026", type: "Event", url: SITE + "/Company/Events/WISPAPALOOZA-2026" },
    { name: "Support Center", type: "Support", url: SITE + "/Support-Center" },
    { name: "nrgSMART® Downloads", type: "Support", url: SITE + "/software" },
    { name: "Fiber Distribution Brochure", type: "Brochure", url: SITE + "/Assets/fiber-distribution-booklet-update-july-26-digital-small.pdf" },
    { name: "Power Product Brochure", type: "Brochure", url: SITE + "/Assets/Power-Brochure-digital.pdf" },
    { name: "Line Card", type: "Brochure", url: SITE + "/Assets/Line%20Card_Digital.pdf" }
  ];

  const catalog = products.concat(services);
  const catalogById = new Map(catalog.map((item) => [item.id, item]));

  const searchIndex = [
    ...products.map((p) => ({ title: p.name, type: "Product", detail: p.family, keywords: p.description, url: p.url })),
    ...services.map((s) => ({ title: s.name, type: "Solution", detail: "Service", keywords: s.description, url: s.url })),
    ...markets.map((m) => ({ title: m.name, type: "Market", detail: "Market", keywords: "", url: m.url })),
    ...resources.map((r) => ({ title: r.name, type: "Resource", detail: r.type, keywords: r.type, url: r.url }))
  ];

  window.ANS_DATA = { products, services, discovery, markets, resources, catalogById, searchIndex, PRODUCT_EXPERIENCE };
})();
