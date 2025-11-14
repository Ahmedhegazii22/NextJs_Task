import "@/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "My Store",
  description: "Next.js Store Example",
};

export default function MainLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <main className="max-w-7xl mx-auto p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
