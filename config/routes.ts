const routes = {
  home: {
    path: '/',
  },
  account: {
    path: 'https://localhost:3000/account/login',
    // TODO: set correct shopify domain
  },
  blog: {
    path: '/blog',
  },
  technology: {
    path: '/technology',
  },
  portfolio: {
    path: '/portfolio',
  },
  products: {
    path: '/products',
  },
  collection: {
    hidden: true,
    path: '/product-category',
  },
  manuals: {
    path: '/manuals',
  },
  about: {
    path: '/about',
  },
  ambassadors: {
    path: '/ambassadors',
  },
  loyaltyProgram: {
    path: '/loyaltyProgram',
  },
  videos: {
    path: '/videos',
  },
  gymSolutions: {
    path: '/gymSolutions',
  },
  financing: {
    path: '/finance',
  },
  warranty: {
    path: '/warranty',
  },
  returnPolicy: {
    path: '/returnPolicy',
  },
  stores: {
    path: '/storeLocator',
  },
  contact: {
    path: '/contact',
  },
  api: {
    hidden: true,
    path: '/api',
    wishlist: {
      path: '/api/wishlist',
    },
    coordinates: {
      path: '/api/coordinates',
    },
  },
};

export default routes;
