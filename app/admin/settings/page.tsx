import { AdminForm } from "@/components/admin/admin-form";
import { saveSiteSettings } from "@/app/admin/actions";
import { getSite } from "@/lib/queries";

export default async function AdminSettingsPage() {
  const site = await getSite();

  return (
    <div className="max-w-4xl">
      <div>
        <p className="eyebrow">Configuration</p>
        <h1 className="mt-3 font-display text-[2rem] leading-tight">Company settings</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-soft">
          These values override the built-in defaults and feed every page, the JSON-LD structured
          data, sitemap metadata and llms.txt. Saving triggers a site-wide revalidation.
        </p>
      </div>

      <div className="card mt-8 p-6 sm:p-8">
        <AdminForm action={saveSiteSettings} submitLabel="Save settings">
          <div className="grid gap-5 sm:grid-cols-2">
            {(
              [
                ["name", "Brand name", site.name],
                ["legalName", "Legal name", site.legalName],
                ["shortName", "Short name", site.shortName],
                ["foundedYear", "Founded year", site.foundedYear],
                ["email", "Sales email", site.email],
                ["sampleEmail", "Samples email", site.sampleEmail],
                ["phone", "Phone", site.phone],
                ["whatsapp", "WhatsApp", site.whatsapp],
                ["addressLine", "One-line address", site.addressLine],
                ["hours", "Working hours", site.hours],
                ["responseTime", "Response promise", site.responseTime],
                ["street", "Street", site.address.street],
                ["city", "City", site.address.city],
                ["region", "Region / province", site.address.region],
                ["postalCode", "Postal code", site.address.postalCode],
                ["country", "Country code", site.address.country],
                ["linkedin", "LinkedIn URL", site.social.linkedin],
                ["instagram", "Instagram URL", site.social.instagram],
                ["youtube", "YouTube URL", site.social.youtube],
              ] as Array<[string, string, string | number]>
            ).map(([name, label, value]) => (
              <div key={name}>
                <label className="field-label" htmlFor={name}>
                  {label}
                </label>
                <input id={name} name={name} className="field" defaultValue={value} />
              </div>
            ))}

            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="tagline">
                Tagline
              </label>
              <input id="tagline" name="tagline" className="field" defaultValue={site.tagline} />
            </div>
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="description">
                Site description (used in metadata and llms.txt)
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="field"
                defaultValue={site.description}
              />
            </div>

            {(
              [
                ["markets", "Export markets (JSON array)", site.markets, 12],
                ["certifications", "Certifications (JSON array of {code, detail})", site.certifications, 8],
                ["stats", "Homepage stats (JSON array of {value, label})", site.stats, 6],
              ] as Array<[string, string, unknown, number]>
            ).map(([name, label, value, rows]) => (
              <div key={name} className="sm:col-span-2">
                <label className="field-label" htmlFor={name}>
                  {label}
                </label>
                <textarea
                  id={name}
                  name={name}
                  rows={rows}
                  className="field font-mono text-xs leading-relaxed"
                  defaultValue={JSON.stringify(value, null, 2)}
                />
              </div>
            ))}
          </div>
        </AdminForm>
      </div>
    </div>
  );
}
