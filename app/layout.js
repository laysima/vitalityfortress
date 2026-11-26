import { Archivo, Instrument_Serif } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  style: ["normal", "italic"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Pain&Gains — No pain, no gains",
    template: "%s · Pain&Gains",
  },
  description:
    "Coached strength training, classes and a training app that logs every set. Programs, progress tracking and class booking in one place.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f3efe6",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${archivo.variable} ${instrument.variable}`}>
      <body className="min-h-dvh bg-paper font-sans text-ink antialiased">
        {children}
        <Toaster
          position="bottom-center"
          offset={{ bottom: 128 }}
          mobileOffset={{ bottom: 176 }}
          toastOptions={{
            classNames: {
              toast: "!rounded-2xl !border-line !bg-ink !text-paper !font-sans !shadow-lg",
              description: "!text-paper/70",
              actionButton: "!bg-signal !text-ink !font-semibold",
            },
          }}
        />
      </body>
    </html>
  );
}
