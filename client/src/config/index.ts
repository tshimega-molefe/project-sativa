export const PRODUCT_CATEGORIES = [
  {
    label: "Flower",
    value: "flower" as const,
    featured: [
      {
        name: "Recommended",
        href: "/products/?category=flower",
        imageSrc: "/nav/flower/flower-indoor.jpg",
      },
      {
        name: "New Arrivals",
        href: "/products/?category=flower&sort=desc",
        imageSrc: "/nav/flower/flower-outdoor.jpg",
      },
      {
        name: "Best Sellers",
        href: "/products/?category=flower",
        imageSrc: "/nav/flower/flower-greenhouse.jpg",
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
        href: "/products/?category=cbd&sort=desc",
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
    label: "Edibles",
    value: "edibles" as const,
    featured: [
      {
        name: "Recommended",
        href: "/products/?category=edibles",
        imageSrc: "/nav/edibles/edibles-health.jpg",
      },
      {
        name: "New Arrivals",
        href: "/products/?category=edibles&sort=desc",
        imageSrc: "/nav/edibles/edibles-industrial.jpg",
      },
      {
        name: "Best Sellers",
        href: "/products/?category=edibles",
        imageSrc: "/nav/edibles/edibles-consumable.jpg",
      },
    ],
  },
];
