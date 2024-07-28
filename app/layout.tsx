import "./globals.css";
import "@coreui/coreui-pro/dist/css/coreui.min.css";
import "@coreui/coreui/dist/css/coreui.min.css";
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
