import "./globals.css";
import { estedad } from "./components/font";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body className={estedad.className}>{children}</body>
    </html>
  );
}
