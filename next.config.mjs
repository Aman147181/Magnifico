const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '*.googleusercontent.com',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          pathname: '**',
        },
      ],
    },
  };
  
  export default nextConfig;
