import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Items from "@/components/items/Items";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4">
        <p className="text-2xl font-bold my-4 text-center">
          Webshop poc
        </p>
        <Items />
        
      </main>
      <Footer />
    </div>
  );
}
