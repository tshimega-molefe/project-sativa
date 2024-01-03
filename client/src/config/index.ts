export const PRODUCT_CATEGORIES = [
  {
    label: "Flower",
    value: "flower" as const,
    featured: [
      {
        name: "Indoor",
        href: "/products/?category=flower",
        imageSrc: "/nav/flower/flower-indoor.jpg",
      },
      {
        name: "Outdoor",
        href: "/products/?category=flower&sort=desc",
        imageSrc: "/nav/flower/flower-outdoor.jpg",
      },
      {
        name: "Greenhouse",
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
        name: "Chocolate",
        href: "/products/?category=edibles",
        imageSrc: "/nav/edibles/chocolate.jpg",
      },
      {
        name: "Cookies",
        href: "/products/?category=edibles&sort=desc",
        imageSrc: "/nav/edibles/cookies.jpg",
      },
      {
        name: "Gummies",
        href: "/products/?category=edibles",
        imageSrc: "/nav/edibles/gummies.jpg",
      },
    ],
  },
];
