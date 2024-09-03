import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from '@/components/header'
import { AntdRegistry } from '@ant-design/nextjs-registry';
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "jazh"
};
// 获得
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={inter.className}>
          <div className="rootBox">
            <AntdRegistry>
              <Header />
              <main className="mainBox">{children}</main>
            </AntdRegistry>
          </div>
      </body>
    </html>
  );
}
