import type { Metadata } from "next";
import { Lato, Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-ImgBlur bg-cover">
        <div className="flex justify-center h-screen">{children}</div>
      </body>
    </html>
  );
}
