import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const f1bold = localFont({
  src: "./fonts/Formula1-Bold.otf",
  variable: "--font-f1bold",
  weight: "100 900",
});
const f1regular = localFont({
  src: "./fonts/Formula1-Regular.otf",
  variable: "--font-f1regular",
  weight: "100 900",
});

export const metadata = {
  title: "F1 Predict",
  description: "Formula 1 prediction app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${f1bold.variable} ${f1regular.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
