import Image from "next/image";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);

    if (!res.ok) {
      throw new Error("Product not found");
    }

    const product = await res.json();

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="relative w-full h-64 mb-4">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
        <p className="text-gray-600 mb-3">{product.description}</p>
        <p className="text-lg font-semibold text-blue-600">${product.price}</p>
      </div>
    );
  } catch (error) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-600">Failed to load product details.</p>
      </div>
    );
  }
}
