import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Standard image providers
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },

      // Active Food Image Domains
      {
        protocol: 'https',
        hostname: 'www.sharmispassions.com', // Upma, Banana Shake, Kulfi
      },
      {
        protocol: 'https',
        hostname: 'www.secondrecipe.com', // Rajma Chawal
      },
      {
        protocol: 'https',
        hostname: 'mukhorochak.com', // Egg Roll
      },
      {
        protocol: 'https',
        hostname: 'thewhiskaddict.com', // Vada Pav
      },
      {
        protocol: 'https',
        hostname: 'www.cubesnjuliennes.com', // Spring Roll
      },
      {
        protocol: 'https',
        hostname: 'www.vegrecipesofindia.com', // Gulab Jamun
      },
      {
        protocol: 'https',
        hostname: 'sinfullyspicy.com', // Jalebi
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org', // Ice Cream
      },
      {
        protocol: 'https',
        hostname: 'www.cookclickndevour.com', // Watermelon Juice
      },
      {
        protocol: 'https',
        hostname: 'chickenday.in', // Fresh Lime Soda
      },
      {
        protocol: 'https',
        hostname: 'saltandbaker.com', // Oreo Shake
      },
      {
        protocol: 'https',
        hostname: 'masalaandchai.com', // Chicken Samosa (Found in error log)
      },
      {
        protocol: 'https',
        hostname: 'vismaifood.com', // Found in error log
      },
      {
        protocol: 'https',
        hostname: 'maharajaroyaldining.com', // Idli Sambar (Found in error log)
      },
      {
        protocol: 'https',
        hostname: 'www.funfoodfrolic.com', // Kanda Poha (Found in error log)
      },
      {
        protocol: 'https',
        hostname: 'shivanilovesfood.com', // Aloo Paratha (Found in error log)
      },
      {
        protocol: 'https',
        hostname: 'pritams.co.in', // Found in error log
      },
      {
        protocol: 'https',
        hostname: 'j6e2i8c9.delivery.rocketcdn.me', // Paneer Butter Masala
      },
      {
        protocol: 'https',
        hostname: 'www.pureindianfoods.com', // Dal Makhani
      },
      {
        protocol: 'https',
        hostname: 'bellyfull.net', // Chicken Tikka Masala
      },
      {
        protocol: 'https',
        hostname: 'myfoodstory.com', // Mutton Curry
      },
      {
        protocol: 'https',
        hostname: 'www.cookwithkushi.com', // Egg Curry
      },
      {
        protocol: 'https',
        hostname: 'www.cookwithmanali.com', // Masala Chai
      },
      {
        protocol: 'https',
        hostname: 'images.lifestyleasia.com', // Pav Bhaji
      },
      {
        protocol: 'https',
        hostname: 'www.simplyrecipes.com', // Samosa
      },
      {
        protocol: 'https',
        hostname: 'ilovevegan.com', // Pakora
      },
      {
        protocol: 'https',
        hostname: 'www.bhg.com', // Cheese Sandwich
      },
      {
        protocol: 'https',
        hostname: 'aroundtheyum.com', // Mango Lassi
      },
      {
        protocol: 'https',
        hostname: 'www.awesomecuisine.com', // Buttermilk
      },
      {
        protocol: 'https',
        hostname: 'www.alphafoodie.com', // Orange Juice
      },
      {
        protocol: 'https',
        hostname: 'www.butteredsideupblog.com', // Strawberry Shake
      },
      {
        protocol: 'https',
        hostname: 'cdnimg.webstaurantstore.com', // Vanilla Shake
      },
      {
        protocol: 'https',
        hostname: 'as2.ftcdn.net', // Chocolate Shake
      },
    ],
  },
};

export default nextConfig;
