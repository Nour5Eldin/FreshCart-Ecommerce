import type { Metadata } from "next";
import localFont from "next/font/local"
import "./globals.css";
import { ClerkProvider,} from '@clerk/nextjs'
import { Toaster } from "react-hot-toast";


const font = localFont({
  src: "../font/Montserrat-Bold.ttf",
  variable: "--font-Montserrat-Bold",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    template: "%s - FreshCart Store",
    default: "FreshCart Store",
  },
  description: "FreshCart Online Store For Electronics Products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body
          className={`${font.variable} antialiased`}>
          {children}{" "}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#000000",
                color: "#fff"  
            }
          }}/>
      </body>
    </html>
    </ClerkProvider>
  );
}
