'use client';

import Link from 'next/link';
import { Plus, Star } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const href = `/product/${product.id}`;

  return (
    <article className="group flex flex-col">
      <Link href={href} className="relative block aspect-[4/5] overflow-hidden rounded-2xl bg-mint/40">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {(product.isBestSeller || product.isNewArrival) && (
          <div className="absolute left-3 top-3 flex gap-1.5">
            {product.isBestSeller && (
              <span className="rounded-full bg-berry px-3 py-1 text-xs font-semibold text-white">Customer favorite</span>
            )}
            {product.isNewArrival && (
              <span className="rounded-full bg-marigold px-3 py-1 text-xs font-semibold text-ink">New</span>
            )}
          </div>
        )}
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-sm text-ink-soft">{product.categoryName}</p>
        <h3 className="mt-0.5 font-display text-xl leading-snug">
          <Link href={href} className="hover:text-berry">{product.name}</Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-ink-soft">{product.description}</p>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-soft">
          <Star className="h-4 w-4 fill-marigold text-marigold" aria-hidden="true" />
          <span className="font-semibold text-ink">{product.rating.toFixed(1)}</span>
          <span>({product.reviewsCount} reviews)</span>
        </p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
            aria-label={`Add ${product.name} to bag`}
          >
            <Plus size={15} /> Add to bag
          </button>
        </div>
      </div>
    </article>
  );
}