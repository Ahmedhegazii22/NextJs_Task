import Image from "next/image";
import Link from "next/link";

// دالة تجلب المنتجات من API
async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 10 },
    });

    if (!res.ok) throw new Error(`API returned ${res.status}`);

    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null; // لو في مشكلة ترجع null
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  if (!products) {
    return (
      <div className="p-6 text-center text-red-600">
        حدث خطأ أثناء تحميل المنتجات. حاول لاحقًا.
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <Link
          key={p.id}
          href={`/products/${p.id}`}
          className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="relative w-full h-48 mb-4">
            <Image
              src={p.image}
              alt={p.title}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <h2 className="font-semibold text-lg line-clamp-2 mb-2">{p.title}</h2>
          <p className="text-blue-600 font-bold text-xl">${p.price}</p>
        </Link>
      ))}
    </div>
  );
}
