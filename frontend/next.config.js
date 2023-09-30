/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.shutterstock.com',
        port: '',
        pathname: '/z/stock-photo-raw-dough-for-pizza-with-ingredients-and-spices-on-table-526830277.jpg',
      },
      {
        protocol: 'https',
        hostname: 'thumb1.shutterstock.com',
        port: '',
        pathname: '/display_pic_with_logo/2982127/437116033/stock-photo-happy-chef-437116033.jpg',
      },
      {
        protocol: 'https',
        hostname: 'thumb9.shutterstock.com',
        port: '',
        pathname: '/display_pic_with_logo/175989610/669255388/stock-photo-vintage-analog-kitchen-countdown-timer-with-classical-clock-face-and-red-remaining-time-display-669255388.jpg',
      },
    ],
  },
}

module.exports = nextConfig
