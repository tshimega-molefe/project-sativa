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
  {
    label: "CBD",
    value: "cbd" as const,
    featured: [
      {
        name: "Recommended",
        href: "/products/?category=cbd",
        imageSrc: "/nav/cbd/cbd-oils.jpg",
      },
      {
        name: "New Arrivals",
        href: "/products/?category=cbdsort=desc",
        imageSrc: "/nav/cbd/cbd-capsules.jpg",
      },
      {
        name: "Best Sellers",
        href: "/products/?category=cbd",
        imageSrc: "/nav/cbd/cbd-juices.jpg",
      },
    ],
  },
  {
    label: "Hemp",
    value: "hemp" as const,
    featured: [
      {
        name: "Recommended",
        href: "/products/?category=hemp",
        imageSrc: "/nav/hemp/hemp-health.jpg",
      },
      {
        name: "New Arrivals",
        href: "/products/?category=hemp&sort=desc",
        imageSrc: "/nav/hemp/hemp-industrial.jpg",
      },
      {
        name: "Best Sellers",
        href: "/products/?category=hemp",
        imageSrc: "/nav/hemp/hemp-consumable.jpg",
      },
    ],
  },
];
