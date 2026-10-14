import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category: category.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const products = PRODUCTS.filter((product) => product.category === slug);

  return (
    <>
      <section className="border-b border-line bg-lilac/40">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-berry">
            <ArrowLeft size={15} /> All products
          </Link>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl">{category.name}</h1>
          <p className="mt-3 max-w-lg leading-7 text-ink-soft">
            Hand-crocheted pieces, made with care from the first stitch.{' '}
            <span className="font-semibold text-ink">
              {products.length} {products.length === 1 ? 'item' : 'items'}
            </span>
          </p>
        </div>
      </section>

      <section className="mx-auto min-h-[50vh] max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        {products.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-line px-6 py-16 text-center">
            <h2 className="font-display text-2xl">Nothing here yet</h2>
            <p className="mt-2 text-sm text-ink-soft">New pieces are on the hook. Browse the rest of the shop in the meantime.</p>
            <Link href="/#products" className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper hover:bg-berry">
              Shop favorites
            </Link>
          </div>
        ) : (
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}