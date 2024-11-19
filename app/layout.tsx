import "@coreui/coreui-pro/dist/css/coreui.min.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import "./globals.css";
import { vazir } from "./components/font";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body className={vazir.className}>{children}</body>
    </html>
  );
}
