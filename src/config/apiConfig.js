const config = {
  baseURL:'https://raas-backend.onrender.com/api',
  routes: {
    company: {
      create: '/Company/Create',
      getAll: '/Company/GetAll',
    },
    staff: {
      create: '/Staff/Create',
    },
    // Add other routes as needed
  },
};

export default config;
