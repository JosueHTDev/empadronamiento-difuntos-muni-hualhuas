import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://www.municipalidadhualhuas.com/empadronamiento-difuntos"
  ),

  title: {
    default: "Empadronamiento de Difuntos",
    template: "%s | Municipalidad Distrital de Hualhuas",
  },

  description:
    "Formulario oficial para el empadronamiento de difuntos del Cementerio General de la Municipalidad Distrital de Hualhuas, provincia de Huancayo, región Junín.",

  applicationName: "Empadronamiento de Difuntos",

  keywords: [
    "Municipalidad Distrital de Hualhuas",
    "Hualhuas",
    "Huancayo",
    "Junín",
    "Empadronamiento de difuntos",
    "Registro de difuntos",
    "Cementerio General",
    "Formulario de empadronamiento",
  ],

  authors: [
    {
      name: "Municipalidad Distrital de Hualhuas",
    },
  ],

  creator: "Municipalidad Distrital de Hualhuas",

  publisher: "Municipalidad Distrital de Hualhuas",

  category: "government",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Empadronamiento de Difuntos",
    description:
      "Formulario oficial para el empadronamiento de difuntos del Cementerio General de la Municipalidad Distrital de Hualhuas.",

    url: "/",

    siteName: "Municipalidad Distrital de Hualhuas",

    locale: "es_PE",

    type: "website",

    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Empadronamiento de Difuntos - Municipalidad Distrital de Hualhuas",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Empadronamiento de Difuntos",
    description:
      "Formulario oficial para el empadronamiento de difuntos del Cementerio General de la Municipalidad Distrital de Hualhuas.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}