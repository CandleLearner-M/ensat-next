import localFont from "next/font/local";
import { Outfit } from "next/font/google";

export const canelaDeck = localFont({
  variable: "--font-canela-deck",
  display: "swap",
  preload: true,
  fallback: ["Georgia", "serif"],
  src: [
    {
      path: "../public/fonts/Canela Deck/CanelaDeck-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/Canela Deck/CanelaDeck-ThinItalic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/fonts/Canela Deck/CanelaDeck-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Canela Deck/CanelaDeck-LightItalic-Trial.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/Canela Deck/CanelaDeck-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Canela Deck/CanelaDeck-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Canela Deck/CanelaDeck-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Canela Deck/CanelaDeck-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/Canela Deck/CanelaDeck-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Canela Deck/CanelaDeck-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/Canela Deck/CanelaDeck-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/Canela Deck/CanelaDeck-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
});

export const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
