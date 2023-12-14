export const PRODUCT_CATEGORIES = [
  {
    label: "Green",
    value: "sativa" as const,
    featured: [
      {
        name: "Recommended",
        href: "/products/?category=green",
        imageSrc: "/nav/sativa/sativa-indoor.jpg",
      },
      {
        name: "New Arrivals",
        href: "/products/?category=green&sort=desc",
        imageSrc: "/nav/sativa/sativa-outdoor.jpg",
      },
      {
        name: "Best Sellers",
        href: "/products/?category=green",
        imageSrc: "/nav/sativa/sativa-greenhouse.jpg",
      },
    ],
  },
  // {
  //   label: "Hybrid",
  //   value: "hybrid" as const,
  //   featured: [
  //     {
  //       name: "Indoor",
  //       href: "#",
  //       imageSrc: "/nav/hybrid/hybrid-indoor.jpg",
  //     },
  //     {
  //       name: "Outdoor",
  //       href: "#",
  //       imageSrc: "/nav/hybrid/hybrid-outdoor.jpg",
  //     },
  //     {
  //       name: "Greenhouse",
  //       href: "#",
  //       imageSrc: "/nav/hybrid/hybrid-greenhouse.jpg",
  //     },
  //   ],
  // },
  // {
  //   label: "Indica",
  //   value: "indica" as const,
  //   featured: [
  //     {
  //       name: "Indoor",
  //       href: "#",
  //       imageSrc: "/nav/indica/indica-indoor.jpg",
  //     },
  //     {
  //       name: "Outdoor",
  //       href: "#",
  //       imageSrc: "/nav/indica/indica-outdoor.jpg",
  //     },
  //     {
  //       name: "Greenhouse",
  //       href: "#",
  //       imageSrc: "/nav/indica/indica-greenhouse.jpg",
  //     },
  //   ],
  // },
  {
    label: "CBD",
    value: "cbd" as const,
    featured: [
      {
        name: "Oils",
        href: "/products/?category=CBD",
        imageSrc: "/nav/cbd/cbd-oils.jpg",
      },
      {
        name: "Capsules",
        href: "/products/?category=CBD&sort=desc",
        imageSrc: "/nav/cbd/cbd-capsules.jpg",
      },
      {
        name: "Juices",
        href: "/products/?category=CBD",
        imageSrc: "/nav/cbd/cbd-juices.jpg",
      },
    ],
  },
  {
    label: "Hemp",
    value: "hemp" as const,
    featured: [
      {
        name: "Health",
        href: "/products/?category=hemp",
        imageSrc: "/nav/hemp/hemp-health.jpg",
      },
      {
        name: "Industrial",
        href: "/products/?category=CBD&sort=desc",
        imageSrc: "/nav/hemp/hemp-industrial.jpg",
      },
      {
        name: "Consumable",
        href: "/products/?category=CBD",
        imageSrc: "/nav/hemp/hemp-consumable.jpg",
      },
    ],
  },
  // {
  //   label: "Smoke",
  //   value: "smoke" as const,
  //   featured: [
  //     {
  //       name: "Disposables",
  //       href: "#",
  //       imageSrc: "/nav/smoke/smoke-disposables.jpg",
  //     },
  //     {
  //       name: "Flavours",
  //       href: "#",
  //       imageSrc: "/nav/smoke/smoke-flavours.jpg",
  //     },
  //     {
  //       name: "Starter Kits",
  //       href: "#",
  //       imageSrc: "/nav/smoke/smoke-starter.jpg",
  //     },
  //   ],
  // },
];
