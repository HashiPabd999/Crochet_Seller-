'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal } = useCart();
  const close = () => setIsCartOpen(false);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Close on Escape and lock page scroll while open
  useEffect(() => {
    if (!isCartOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsCartOpen(false);
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    // TODO: replace with router.push('/checkout')
    alert('Proceeding to checkout...');
  };

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <button className="absolute inset-0 bg-ink/50" onClick={close} aria-label="Close bag" />

      <section className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper shadow-2xl">
        <header className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-display text-2xl">
            Your bag <span className="text-base text-ink-soft">({itemCount})</span>
          </h2>
          <button onClick={close} className="rounded-full p-2 hover:bg-ink/5" aria-label="Close bag">
            <X size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-lilac text-ink">
                <ShoppingBag size={26} />
              </span>
              <h3 className="mt-5 font-display text-2xl">Your bag is empty</h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-ink-soft">
                Add a piece you like and it will show up here.
              </p>
              <Link
                href="/#products"
                onClick={close}
                className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper hover:bg-berry"
              >
                Shop favorites
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-dashed divide-line">
              {cart.map(({ product, quantity, customNote }) => (
                <li key={product.id} className="flex gap-4 py-5 first:pt-0">
                  <img src={product.image} alt={product.name} className="h-24 w-24 rounded-xl object-cover" />

                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="text-xs text-ink-soft">{product.categoryName}</p>
                    <h3 className="font-display text-lg leading-snug">{product.name}</h3>
                    <p className="mt-0.5 text-sm font-semibold">${product.price.toFixed(2)}</p>
                    {customNote && (
                      <p className="mt-2 rounded-lg bg-marigold/25 px-2.5 py-1.5 text-xs text-ink">Note: {customNote}</p>
                    )}

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="inline-flex items-center rounded-full border border-line">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="grid h-8 w-8 place-items-center hover:text-berry"
                          aria-label={`Decrease quantity of ${product.name}`}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="min-w-6 text-center text-sm font-semibold" aria-live="polite">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="grid h-8 w-8 place-items-center hover:text-berry"
                          aria-label={`Increase quantity of ${product.name}`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-sm text-ink-soft underline underline-offset-4 hover:text-berry"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <footer className="border-t border-line bg-white px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="text-ink-soft">Subtotal</span>
              <span className="font-display text-2xl">${cartTotal.toFixed(2)}</span>
            </div>
            <p className="mt-1 text-xs text-ink-soft">Shipping and taxes are calculated at checkout.</p>
            <button
              onClick={handleCheckout}
              className="mt-4 w-full rounded-full bg-berry py-3.5 text-sm font-semibold text-white hover:bg-berry-dark"
            >
              Check out
            </button>
          </footer>
        )}
      </section>
    </div>
  );
}