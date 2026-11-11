import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { articles, getArticle, recentArticles } from "@/lib/articles";
import { getCategory } from "@/lib/products";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return buildMetadata({
      title: "Article not found",
      description: "This article is not available.",
      path: `/insights/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/insights/${article.slug}`,
    image: article.image,
    imageAlt: article.imageAlt,
    type: "article",
    publishedTime: article.date,
    modifiedTime: article.updated ?? article.date,
    authors: [article.author],
    keywords: [article.topic, ...article.relatedCategories],
  });
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Insights", href: "/insights" },
    { name: article.title, href: `/insights/${article.slug}` },
  ];

  const more = recentArticles(4)
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={[articleSchema(article), breadcrumbSchema(breadcrumbItems), faqSchema(article.faqs)]}
      />

      <div className="border-b border-line">
        <div className="shell py-6 lg:py-8">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      <article>
        <header className="border-b border-line py-12 lg:py-16">
          <div className="shell">
            <p className="text-[0.6875rem] uppercase tracking-[0.14em] text-clay">{article.topic}</p>
            <h1 className="mt-4 max-w-4xl text-[2.4rem] leading-[1.05] sm:text-[3rem] lg:text-[3.4rem]">
              {article.title}
            </h1>
            <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft">
              {article.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.75rem] text-muted">
              <span>{article.author}</span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span>{article.readingMinutes} min read</span>
            </div>
          </div>
        </header>

        <div className="shell">
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[20px] bg-sand">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              priority
              sizes="(max-width: 1240px) 100vw, 1160px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="shell grid gap-12 py-14 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16 lg:py-20">
          <aside className="h-fit lg:sticky lg:top-28">
            <div className="rounded-[16px] border border-line bg-surface p-6">
              <h2 className="text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                Key takeaways
              </h2>
              <ul className="mt-4 space-y-3">
                {article.keyTakeaways.map((takeaway) => (
                  <li key={takeaway} className="flex gap-3 text-[0.8125rem] leading-relaxed text-ink-soft">
                    <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                    {takeaway}
                  </li>
                ))}
              </ul>
            </div>

            {article.relatedCategories.length > 0 && (
              <div className="mt-6 rounded-[16px] border border-line p-6">
                <h2 className="text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                  Fabrics in this guide
                </h2>
                <ul className="mt-3 space-y-2">
                  {article.relatedCategories.map((slugName) => {
                    const category = getCategory(slugName);
                    if (!category) return null;
                    return (
                      <li key={category.slug}>
                        <Link
                          href={`/fabrics/${category.slug}`}
                          className="link-underline text-[0.875rem] text-ink-soft"
                        >
                          {category.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </aside>

          <div className="prose-loom max-w-2xl">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
                {section.table && (
                  <div className="mt-6 overflow-x-auto">
                    <table className="data-table min-w-[560px]">
                      <caption className="mb-3 text-left text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
                        {section.table.caption}
                      </caption>
                      <thead>
                        <tr>
                          {section.table.head.map((cell) => (
                            <th key={cell} scope="col">
                              {cell}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row) => (
                          <tr key={row.join("|")}>
                            {row.map((cell, index) =>
                              index === 0 ? (
                                <th key={cell} scope="row" className="whitespace-nowrap font-normal">
                                  {cell}
                                </th>
                              ) : (
                                <td key={`${cell}-${index}`} className="text-ink-soft">
                                  {cell}
                                </td>
                              ),
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}

            <section aria-labelledby="article-faq">
              <h2 id="article-faq">Frequently asked</h2>
              <div className="mt-4">
                <FaqList faqs={article.faqs} />
              </div>
            </section>
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section aria-labelledby="more-insights" className="border-t border-line bg-surface py-16">
          <div className="shell">
            <h2 id="more-insights" className="text-[1.5rem]">
              More sourcing notes
            </h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {more.map((item) => (
                <article key={item.slug} className="group">
                  <Link href={`/insights/${item.slug}`}>
                    <p className="text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
                      {item.topic} · {formatDate(item.date)}
                    </p>
                    <h3 className="mt-2 font-display text-[1.25rem] leading-snug transition-colors group-hover:text-clay">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[0.875rem] leading-relaxed text-ink-soft">
                      {item.excerpt}
                    </p>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        eyebrow="Questions about this guide"
        title="Ask us to apply it to your fabric"
        body="Send your construction and end use. We will tell you which weight, finish and certification actually fit the garment — and what we can supply from stock."
      />
    </>
  );
}
