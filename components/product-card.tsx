import Image from "next/image";
import Link from "next/link";
import { productPriceRange } from "@/lib/products";
import type { Product } from "@/lib/types";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <article className="group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-sand">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
          />
          <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.1em] text-ink-soft backdrop-blur">
            {product.code}
          </span>
        </div>
        <div className="mt-4">
          <p className="text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
            {product.weightGsm} gsm · {product.widthCm} cm
          </p>
          <h3 className="mt-1.5 font-display text-[1.3rem] leading-snug transition-colors group-hover:text-clay">
            {product.name}
          </h3>
          <p className="mt-1 text-[0.8125rem] text-muted">{product.composition}</p>
          <p className="mt-3 flex items-center justify-between border-t border-line pt-3 text-[0.75rem] text-ink-soft">
            <span>{productPriceRange(product)}</span>
            <span className="text-muted">MOQ {product.moqMeters} m</span>
          </p>
        </div>
      </Link>
    </article>
  );
}
