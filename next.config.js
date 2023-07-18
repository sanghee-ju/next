/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/old-blog/:path*",
        destination: "/new-blog/:path*",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination:
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      },
      {
        source: "/api/movies/:id",
        destination:
          "https://api.themoviedb.org/3/movie/:id?language=en-US&page=1",
      },
    ];
  },
};
