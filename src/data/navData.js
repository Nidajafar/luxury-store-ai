export const navData = [
  {
    title: "GOLD",
    path: "/category/gold",
    subCategories: [
      { name: "Bangles & Bracelets", path: "/category/gold/bangles" },
      { name: "Gold Nose Pins", path: "/category/gold/nose-pins" },
      { name: "Gold Rings", path: "/category/gold/rings" },
      { name: "Gold Pendant", path: "/category/gold/pendant" },
      { name: "Gold Set", path: "/category/gold/sets" },
    ]
  },
  {
    title: "DIAMOND",
    path: "/category/diamond",
    isNested: true,
    subCategories: [
      {
        name: "Gold Diamond Jewellery",
        items: [
          { name: "Ladies Diamond Rings", path: "/category/diamond/gold-rings" },
          { name: "Ladies Diamond Nose Pins", path: "/category/diamond/gold-nose-pins" },
          { name: "Ladies Diamond Earrings", path: "/category/diamond/gold-earrings" },
        ]
      },
      {
        name: "Silver Diamond Jewellery",
        items: [
          { name: "Silver Diamond Rings", path: "/category/diamond/silver-rings" },
          { name: "Silver Diamond Pendants", path: "/category/diamond/silver-pendants" },
        ]
      }
    ]
  },
  {
    title: "WATCHES",
    path: "/category/watches",
    subCategories: [
      { name: "Men's Luxury Watches", path: "/category/watches/men" },
      { name: "Women's Elegant Watches", path: "/category/watches/women" },
      { name: "Limited Edition", path: "/category/watches/limited" },
    ]
  },
  {
    title: "FRAGRANCE",
    path: "/category/fragrance",
    subCategories: [
      { name: "Oud & Oriental", path: "/category/fragrance/oud" },
      { name: "French Perfumes", path: "/category/fragrance/french" },
      { name: "Premium Attar", path: "/category/fragrance/attar" },
    ]
  },
  {
    title: "ACCESSORIES",
    path: "/category/accessories",
    subCategories: [
      { name: "Leather Wallets", path: "/category/accessories/wallets" },
      { name: "Luxury Belts", path: "/category/accessories/belts" },
      { name: "Cufflinks", path: "/category/accessories/cufflinks" },
    ]
  },
  {
    title: "SILVER",
    path: "/category/silver",
    isNested: true,
    subCategories: [
      {
        name: "Silver Men Jewellery",
        items: [
          { name: "Silver Bracelets", path: "/category/silver/men-bracelets" },
          { name: "Silver Rings", path: "/category/silver/men-rings" },
        ]
      },
      {
        name: "Silver Ladies Jewellery",
        items: [
          { name: "Ladies Silver Rings", path: "/category/silver/ladies-rings" },
          { name: "Ladies Silver Earrings", path: "/category/silver/ladies-earrings" },
        ]
      }
    ]
  }
];