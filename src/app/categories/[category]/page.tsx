'use client';

import { use } from 'react';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const categorySlug = use(params).category;
  const currentCategory = CATEGORIES.find((category) => category.slug === categorySlug);
  const filteredProducts = PRODUCTS.filter((product) => product.category === categorySlug);

  return (
    <div className="min-h-[65vh] bg-[#faf8f3]">
      <section className="border-b border-[#e9e1d7] bg-[#f2ece2]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-[#74766d] transition hover:text-[#a65f51]"><ArrowLeft className="h-3.5 w-3.5"/> Back to the collection</Link>
          <div className="mt-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#a65f51]"><Sparkles className="h-3.5 w-3.5"/> Made for your everyday</p><h1 className="font-serif text-4xl text-[#293d33] sm:text-5xl">{currentCategory ? currentCategory.name : categorySlug.replaceAll('-', ' ')}</h1><p className="mt-3 max-w-xl text-sm leading-6 text-[#77776e]">A small collection of thoughtful, hand-crocheted pieces, each made with care from the very first stitch.</p></div><span className="w-fit rounded-full border border-[#ded4c8] bg-white/60 px-4 py-2 text-xs font-medium text-[#696b63]">{filteredProducts.length} {filteredProducts.length === 1 ? 'handmade piece' : 'handmade pieces'}</span></div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        {filteredProducts.length === 0 ? <div className="rounded-3xl border border-dashed border-[#d9cfc2] bg-white px-6 py-16 text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#f3e8dd] text-[#a65f51]"><Sparkles className="h-6 w-6"/></span><h2 className="mt-5 font-serif text-2xl text-[#293d33]">A little more time on the hook</h2><p className="mt-2 text-sm text-[#77776e]">This collection is taking shape. Have a look at all our handmade favorites.</p><Link href="/#products" className="mt-6 inline-flex rounded-full bg-[#293d33] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#405b4b]">Browse all pieces</Link></div> : <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">{filteredProducts.map((product) => <ProductCard key={product.id} product={product}/>)}</div>}
      </section>
    </div>
  );
}
