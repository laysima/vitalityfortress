import { Fraunces, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "VitalityFortress — Built for more",
  description:
    "VitalityFortress — a fitness community for workout programs, exercise demonstrations, progress tracking and expert coaching.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${fraunces.variable}`}>
      <body className="bg-bg font-sans text-fg antialiased">{children}</body>
    </html>
  );
}
