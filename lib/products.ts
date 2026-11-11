import { fabricPhoto } from "@/lib/utils";
import type { Category, Product } from "@/lib/types";

const photo = (prompt: string, size: "portrait_4_3" | "landscape_4_3" = "portrait_4_3") =>
  fabricPhoto(prompt, size);

export const categories: Category[] = [
  {
    slug: "cotton",
    name: "Cotton Fabrics",
    navName: "Cotton",
    tagline: "Poplin, twill and canvas for shirting, uniforms and workwear",
    summary:
      "Yunhong supplies combed cotton poplin, twill and canvas from 110 to 340 gsm, OEKO-TEX Standard 100 certified, with 300 m minimums and 18–28 day production.",
    intro: [
      "Our cotton range is built around three constructions that cover most apparel programmes: fine poplin for shirting, mid-weight twill for chinos and uniforms, and heavy canvas for bags, jackets and workwear. All cotton is combed and ring-spun, so the yarn is cleaner and the surface pills less than carded alternatives at the same price point.",
      "Greige fabric is woven in Keqiao and finished in-house, which keeps shade consistency tight across repeat orders. Piece-dyed shades are matched to your lab dip, and we hold 40 stock colours ready for 100 m sample orders.",
    ],
    image: fabricPhoto(
      "close-up of neatly folded ivory and sand coloured cotton poplin fabric stacked on a pale oak table, soft directional daylight, warm neutral studio background, shallow depth of field, editorial textile photography, no text",
      "landscape_4_3",
    ),
    imageAlt: "Folded stacks of ivory and sand cotton poplin fabric in a textile studio",
    highlights: [
      "Combed, ring-spun yarn for a clean surface",
      "Reactive dyeing with 4–5 wash fastness",
      "40 stock colours, 100 m sampling",
      "GOTS organic cotton available on 1,000 m+",
    ],
    applications: ["Shirting", "Uniforms", "Chinos", "Workwear", "Bags", "Home textiles"],
    faqs: [
      {
        question: "What is the minimum order for cotton fabric?",
        answer:
          "300 metres per colour for custom dyeing, or 100 metres per colour from our stock shade card. Sample lengths of 5–20 metres are available before you commit to bulk.",
      },
      {
        question: "Can you supply GOTS certified organic cotton?",
        answer:
          "Yes. GOTS organic cotton poplin and twill are available from 1,000 metres per colour with a full transaction certificate chain, typically adding 10–14 days to production.",
      },
    ],
  },
  {
    slug: "linen",
    name: "Linen Fabrics",
    navName: "Linen",
    tagline: "Washed, blended and heavy linen with European flax",
    summary:
      "European flax linen in 160–280 gsm, garment-washed for softness, supplied from 300 m with OEKO-TEX certification and heat-friendly breathability for EU, US and Gulf markets.",
    intro: [
      "We weave with certified European flax from Normandy and Belgium, then garment-wash or enzyme-soften the finished cloth so it drapes from the first wear rather than after ten washes. The slub character is part of the look: we grade for evenness so your cutting room sees consistent width and shrinkage.",
      "Linen is our strongest category for the Middle East, where breathability and coverage matter more than crease resistance. We also stock linen-cotton and linen-viscose blends that reduce cost and creasing while keeping the dry hand feel.",
    ],
    image: fabricPhoto(
      "washed natural flax linen fabric with visible slub texture draped over a pale stone surface, muted oatmeal and beige tones, soft morning light, editorial textile photography, no text",
      "landscape_4_3",
    ),
    imageAlt: "Washed natural flax linen fabric draped over pale stone",
    highlights: [
      "Certified European flax (Normandy, Belgium)",
      "Enzyme and garment washing in-house",
      "Pre-shrunk to under 3% residual shrinkage",
      "Blends with cotton, viscose and wool",
    ],
    applications: ["Resortwear", "Abaya and kaftan", "Shirts", "Dresses", "Suiting", "Bedding"],
    faqs: [
      {
        question: "Is your linen pre-shrunk?",
        answer:
          "Yes. Garment-washed linen is pre-shrunk to under 3% residual shrinkage in both warp and weft, and we issue a shrinkage report with every bulk shipment so your pattern maker can cut confidently.",
      },
      {
        question: "Where does the flax come from?",
        answer:
          "Flax fibre is sourced from certified European growers in Normandy and Belgium, spun in Jiangsu, and woven at our Keqiao mill. Fibre origin documentation is available for EUDR and brand traceability requests.",
      },
    ],
  },
  {
    slug: "denim",
    name: "Denim & Chambray",
    navName: "Denim",
    tagline: "Rigid, stretch and selvedge denim from 6 to 14.5 oz",
    summary:
      "Indigo denim from 6 to 14.5 oz including comfort stretch and selvedge, with rope-dyed yarns, 500 m minimums and 25–35 day production for jeans and jackets.",
    intro: [
      "Our denim is woven on shuttle and projectile looms with rope-dyed indigo yarns, which is why the fade character holds up after repeated washing. We keep a wide weight band so one supplier can cover 5-pocket jeans, trucker jackets, skirts and lightweight chambray shirting.",
      "Stretch qualities use dual-core yarns with 1–3% elastane and are tested for growth and recovery after 5,000 abrasion cycles. If you need a specific % elongation or leg-twist tolerance, send the target figures with your enquiry and we will match the construction.",
    ],
    image: fabricPhoto(
      "rolls of indigo selvedge denim fabric stacked in a weaving mill, deep blue tones with white selvedge edges, raking daylight and fine dust in the air, documentary textile photography, no text",
      "landscape_4_3",
    ),
    imageAlt: "Rolls of indigo selvedge denim stacked in a weaving mill",
    highlights: [
      "Rope-dyed indigo for authentic fades",
      "Dual-core stretch with recovery testing",
      "Shuttle looms for selvedge programmes",
      "Laser-friendly finishes for low-water washing",
    ],
    applications: ["Jeans", "Jackets", "Skirts", "Shirting", "Overalls", "Accessories"],
    faqs: [
      {
        question: "What is the minimum order for custom denim?",
        answer:
          "500 metres per colour for custom indigo shades, or 300 metres from our stock indigo and black qualities. Selvedge programmes start at 1,000 metres because of loom setup time.",
      },
      {
        question: "Do you offer laser-engraving ready denim?",
        answer:
          "Yes. We can supply denim with a finish optimised for laser fading, which cuts water use in your laundry by up to 60%. Tell us your laser recipe and we will adjust the finish recipe to suit.",
      },
    ],
  },
  {
    slug: "knit",
    name: "Knitted Fabrics",
    navName: "Knit",
    tagline: "Jersey, rib and French terry on circular knitting machines",
    summary:
      "Circular-knit single jersey, rib and French terry from 140 to 320 gsm, with combed cotton and recycled polyester options, 300 m minimums and 15–25 day lead times.",
    intro: [
      "Knits are produced on 24–34 inch circular machines with combed cotton, viscose and recycled polyester yarns. Tubular or open-width, with a compacted finish so the fabric arrives close to final measurements and your cut yield is predictable.",
      "We test every lot for course and wale density, spirality and shrinkage after three home launderings. For heavyweight hoodie programmes we recommend 280–320 gsm French terry with a brushed or looped back, depending on whether you want a soft interior or a dry hand.",
    ],
    image: fabricPhoto(
      "close-up of oatmeal cotton jersey knit fabric with soft ribbed folds, warm studio light, neutral background, macro textile photography, no text",
      "landscape_4_3",
    ),
    imageAlt: "Close-up of oatmeal cotton jersey knit fabric with soft folds",
    highlights: [
      "Combed cotton and GRS recycled polyester",
      "Compacted, low-shrinkage finishing",
      "Spirality tested to under 5%",
      "Open width or tubular on request",
    ],
    applications: ["T-shirts", "Hoodies", "Loungewear", "Babywear", "Sportswear", "Underwear"],
    faqs: [
      {
        question: "What is the difference between jersey and French terry?",
        answer:
          "Single jersey is a lightweight single-faced knit, usually 140–180 gsm, used for T-shirts. French terry is a heavier double-knit with loops on the back, usually 240–320 gsm, used for sweatshirts and hoodies because it holds shape and warmth.",
      },
      {
        question: "Can you knit with recycled yarn?",
        answer:
          "Yes. GRS-certified recycled cotton and recycled polyester yarns are available across jersey, rib and French terry, with transaction certificates issued for each shipment.",
      },
    ],
  },
  {
    slug: "viscose",
    name: "Viscose & Rayon",
    navName: "Viscose",
    tagline: "Challis, crepe and blends with a fluid, cool drape",
    summary:
      "Viscose challis, crepe and linen blends from 100 to 170 gsm, with fluid drape and cool hand feel, ideal for dresses and modest wear in hot climates, from 300 m.",
    intro: [
      "Viscose is the workhorse for warm-weather womenswear: it takes print beautifully, falls softly and feels cool against the skin. We finish with a tensionless wash so the cloth does not pull at the seams, and we test for shrinkage after both hand wash and dry clean.",
      "Our viscose-linen and viscose-crepe qualities add body and reduce the creasing that pure viscose shows in humid conditions — a practical choice for Gulf and Mediterranean markets. All viscose is FSC-controlled pulp and OEKO-TEX certified.",
    ],
    image: fabricPhoto(
      "flowing sand coloured viscose challis fabric caught in motion against a warm plaster wall, long soft shadows, editorial fashion textile photography, no text",
      "landscape_4_3",
    ),
    imageAlt: "Flowing sand-coloured viscose fabric caught in motion",
    highlights: [
      "FSC-controlled pulp, OEKO-TEX certified",
      "Print-ready with digital and rotary options",
      "Low-crease blends for humid climates",
      "Hand-wash and dry-clean shrinkage tested",
    ],
    applications: ["Dresses", "Blouses", "Abaya", "Lining", "Resortwear", "Scarves"],
    faqs: [
      {
        question: "Does viscose shrink a lot?",
        answer:
          "Standard viscose can shrink 5–8% on first wash. Our finishes are tensionless-washed and pre-shrunk to 3–4%, and we recommend a 3% cutting allowance for unwashed styles.",
      },
      {
        question: "Can you print on viscose?",
        answer:
          "Yes. We offer digital reactive printing from 100 m and rotary printing from 1,000 m, with colour matching to Pantone TCX. Digital lead time is 12–16 days including strike-off approval.",
      },
    ],
  },
  {
    slug: "performance",
    name: "Recycled & Performance",
    navName: "Performance",
    tagline: "GRS recycled polyester, nylon taslan and 3-layer softshell",
    summary:
      "GRS-certified recycled polyester and nylon performance fabrics, plus 3-layer softshell, with waterproof ratings to 10,000 mm and 300 m minimums for EU and US brands.",
    intro: [
      "This range exists for brands that have committed to recycled content and need documentation, not just a claim. We buy GRS-certified recycled chips and yarns, keep transaction certificates on file, and issue them with the shipping documents so your sustainability claim survives an audit.",
      "Constructions cover recycled polyester twill for outerwear and bags, recycled nylon taslan for lightweight shells, and a 3-layer softshell with a TPU membrane for ski and cycling programmes. PFC-free DWR is standard; bluesign-approved finishes are available.",
    ],
    image: fabricPhoto(
      "recycled polyester twill fabric in deep olive with water beads beading on the surface, technical apparel material, studio light, macro photography, no text",
      "landscape_4_3",
    ),
    imageAlt: "Water beading on deep olive recycled polyester performance fabric",
    highlights: [
      "GRS 4.0 transaction certificates",
      "PFC-free durable water repellency",
      "Waterproof to 10,000 mm (softshell)",
      "bluesign® approved finishes available",
    ],
    applications: ["Outerwear", "Bags", "Activewear", "Uniforms", "Tents", "Workwear"],
    faqs: [
      {
        question: "Do you provide GRS transaction certificates?",
        answer:
          "Yes. Every recycled shipment includes a GRS transaction certificate covering the yarn lot and the delivered metres, so the recycled content claim can be traced through your supply chain.",
      },
      {
        question: "Is the water repellency PFC-free?",
        answer:
          "Yes, C0 PFC-free DWR is standard across the performance range, with a spray rating of 4–5 after 20 home launderings. Fluorocarbon finishes are available on request where a contract requires them.",
      },
    ],
  },
];

export const products: Product[] = [
  // ---------------------------------------------------------------- cotton
  {
    slug: "combed-cotton-poplin-120",
    name: "Combed Cotton Poplin 120",
    code: "LT-CO-120",
    categorySlug: "cotton",
    summary:
      "A 120 gsm combed cotton poplin with a smooth, crisp hand — our most-ordered shirting base, OEKO-TEX certified and available in 40 stock colours from 100 m.",
    description: [
      "Combed cotton poplin 120 is a plain-weave shirting fabric woven from combed, ring-spun 60s yarns. Combing removes short fibres, which gives the cloth its clean surface, low pilling and the crisp hand that presses well and holds a collar.",
      "It is piece-dyed with reactive dyes to 4–5 wash fastness, then sanforised so residual shrinkage stays under 2%. Typical uses are dress shirts, blouses and uniform shirting; for a softer, more casual handle choose the 110 gsm version and ask for an enzyme wash.",
    ],
    composition: "100% combed cotton",
    weightGsm: 120,
    widthCm: 148,
    weave: "Plain weave (poplin)",
    finish: "Reactive dyed, sanforised, soft-touch",
    shrinkage: "≤2% warp, ≤2% weft",
    moqMeters: 300,
    stockMeters: 100,
    leadTimeDays: [18, 28],
    priceFrom: 1.65,
    priceTo: 2.2,
    colors: 40,
    certifications: ["OEKO-TEX Standard 100", "GOTS on request"],
    applications: ["Dress shirts", "Blouses", "Uniforms", "Corporate wear"],
    features: [
      "60s combed ring-spun yarn",
      "4–5 wash fastness",
      "Sanforised for stable cutting",
      "Stock shade card in 40 colours",
    ],
    image: photo(
      "macro detail of crisp white combed cotton poplin fabric with fine plain weave, soft folds, neutral warm studio background, soft side light, high detail textile photography, no text",
    ),
    imageAlt: "Macro detail of crisp white combed cotton poplin fabric",
    featured: true,
    faqs: [
      {
        question: "What is combed cotton poplin used for?",
        answer:
          "It is used mainly for dress shirts, blouses and uniform shirting because the combed yarn gives a smooth, pill-resistant surface that presses crisply and takes a sharp collar.",
      },
      {
        question: "How much does 120 gsm poplin cost?",
        answer:
          "Indicative pricing is US$1.65–2.20 per metre FOB Shanghai at 3,000 metres, depending on shade depth and finish. Stock colours sit at the lower end; custom lab dips add a one-off matching fee.",
      },
    ],
  },
  {
    slug: "cotton-twill-240",
    name: "Cotton Twill 240",
    code: "LT-CO-240",
    categorySlug: "cotton",
    summary:
      "A 240 gsm cotton twill with a 3/1 diagonal face for chinos, uniforms and light jackets, available in piece-dyed and garment-dyed finishes from 300 m.",
    description: [
      "This 3/1 twill is woven from 20s warp and 16s weft cotton, giving a firm diagonal face and enough body for trousers without the stiffness of canvas. It is the construction most chino programmes settle on after testing 220–260 gsm.",
      "We finish it with a compressive shrinkage pass, then calender lightly. For garment dyeing we supply it in greige or semi-bleached with a dye recipe matched to your wash house, and we can pre-test for the shade shift your laundry expects.",
    ],
    composition: "100% cotton",
    weightGsm: 240,
    widthCm: 150,
    weave: "3/1 right-hand twill",
    finish: "Piece dyed or greige for garment dyeing",
    shrinkage: "≤3% warp, ≤2% weft",
    moqMeters: 300,
    stockMeters: 100,
    leadTimeDays: [20, 30],
    priceFrom: 2.1,
    priceTo: 2.8,
    colors: 24,
    certifications: ["OEKO-TEX Standard 100"],
    applications: ["Chinos", "Trousers", "Uniforms", "Light jackets", "Workwear"],
    features: [
      "Firm 3/1 diagonal face",
      "Garment-dye ready on request",
      "Compressive shrinkage finish",
      "Good abrasion resistance for uniforms",
    ],
    image: photo(
      "macro detail of khaki cotton twill fabric with clear diagonal rib lines, folded corner, warm neutral studio background, soft directional light, textile photography, no text",
    ),
    imageAlt: "Macro detail of khaki cotton twill fabric showing diagonal ribs",
    faqs: [
      {
        question: "Can this twill be garment dyed?",
        answer:
          "Yes. We supply it greige or semi-bleached with a documented recipe, and we can pre-test the shade shift your laundry will see so the bulk wash result is predictable.",
      },
      {
        question: "Is 240 gsm heavy enough for trousers?",
        answer:
          "For chinos and uniform trousers, yes. For jeans-style five-pocket construction most brands move up to 280–320 gsm or switch to denim for better seam strength.",
      },
    ],
  },
  {
    slug: "cotton-canvas-320",
    name: "Cotton Canvas 320",
    code: "LT-CO-320",
    categorySlug: "cotton",
    summary:
      "A 320 gsm 2/1 cotton canvas for bags, workwear and structured jackets, with high tear strength and optional water-repellent finish, from 500 m.",
    description: [
      "Our 320 gsm canvas is a 2/1 basket-weave construction built from 10s and 7s cotton yarns. It is dense, dimensionally stable and holds a structured shape, which is why bag makers and workwear brands specify it over twill.",
      "Standard finish is a wash-and-wear softening pass; for bags we recommend a paraffin or C0 water-repellent finish which raises the spray rating to 4 without changing the hand. Tear strength is tested to ASTM D1424 and reported per lot.",
    ],
    composition: "100% cotton",
    weightGsm: 320,
    widthCm: 150,
    weave: "2/1 basket weave canvas",
    finish: "Softened, optional C0 water repellent",
    shrinkage: "≤3% warp, ≤3% weft",
    moqMeters: 500,
    stockMeters: 200,
    leadTimeDays: [22, 32],
    priceFrom: 2.6,
    priceTo: 3.4,
    colors: 16,
    certifications: ["OEKO-TEX Standard 100"],
    applications: ["Tote bags", "Workwear", "Jackets", "Aprons", "Home accessories"],
    features: [
      "High tear strength for bag construction",
      "Holds structure without interlining",
      "Optional PFC-free water repellent",
      "ASTM D1424 tear report per lot",
    ],
    image: photo(
      "macro detail of natural undyed heavy cotton canvas fabric with visible basket weave and slub yarns, rough folded edge, warm studio light, textile photography, no text",
    ),
    imageAlt: "Macro detail of natural heavy cotton canvas with basket weave",
    faqs: [
      {
        question: "What is canvas used for in apparel?",
        answer:
          "In apparel it is used for structured jackets, workwear trousers, aprons and chore coats. Outside apparel it is the standard base for tote bags, tool bags and home accessories because of its tear strength.",
      },
      {
        question: "Can canvas be printed?",
        answer:
          "Yes, but screen printing on 320 gsm canvas needs a thicker ink deposit. Many bag brands prefer pigment printing or embroidery; we can supply a print trial length before bulk.",
      },
    ],
  },

  // ---------------------------------------------------------------- linen
  {
    slug: "washed-linen-180",
    name: "Washed Linen 180",
    code: "LT-LI-180",
    categorySlug: "linen",
    summary:
      "A 180 gsm European flax linen, garment-washed for a soft, lived-in hand, pre-shrunk to under 3% and OEKO-TEX certified — our best seller for resort and Gulf markets.",
    description: [
      "Woven from 100% certified European flax, this 180 gsm plain-weave linen is garment-washed in soft water without harsh enzymes, so the fibre keeps its strength while the surface softens. The result is the dry, cool hand customers expect from linen at first wear, not after a season.",
      "Because linen is the most requested fabric in hot, humid climates, we grade each lot for evenness and residual shrinkage. Width is a consistent 145 cm with a tight ±2 cm tolerance, which keeps your marker efficiency predictable across repeat orders.",
    ],
    composition: "100% European flax linen",
    weightGsm: 180,
    widthCm: 145,
    weave: "Plain weave",
    finish: "Garment washed, pre-shrunk",
    shrinkage: "≤3% warp, ≤3% weft",
    moqMeters: 300,
    stockMeters: 100,
    leadTimeDays: [20, 30],
    priceFrom: 4.8,
    priceTo: 6.2,
    colors: 32,
    certifications: ["OEKO-TEX Standard 100", "European Flax®"],
    applications: ["Shirts", "Dresses", "Abaya", "Resortwear", "Trousers"],
    features: [
      "Certified European flax fibre",
      "Soft washed hand from first wear",
      "Pre-shrunk below 3%",
      "Consistent 145 cm usable width",
    ],
    image: photo(
      "macro detail of washed oatmeal linen fabric with natural slub texture and soft creases, neutral studio background, warm soft light, high detail textile photography, no text",
    ),
    imageAlt: "Macro detail of washed oatmeal linen with natural slubs",
    featured: true,
    faqs: [
      {
        question: "Is washed linen pre-shrunk?",
        answer:
          "Yes. Our washed linen is pre-shrunk to under 3% residual shrinkage in both directions, and each bulk shipment ships with a shrinkage report from the finishing line.",
      },
      {
        question: "Why is linen a good choice for hot climates?",
        answer:
          "Linen fibres are hollow and highly moisture-absorbent, so they wick perspiration away and dry quickly while staying cool to the touch. It also drapes with coverage rather than clinging, which suits modest and resort silhouettes.",
      },
    ],
  },
  {
    slug: "linen-cotton-blend-160",
    name: "Linen Cotton Blend 160",
    code: "LT-LI-160",
    categorySlug: "linen",
    summary:
      "A 55/45 linen-cotton blend at 160 gsm that keeps the linen look with less creasing and a lower cost — a practical shirting and dress base from 300 m.",
    description: [
      "Blending 55% linen with 45% cotton softens the crease and lowers the price without losing the slub character buyers recognise as linen. At 160 gsm it is light enough for summer shirting and structured enough for dresses and wide-leg trousers.",
      "The cotton content also improves dye uptake consistency, so pale and mid-tone shades repeat more closely than on 100% linen. We stock 20 shades and can piece-dye to Pantone TCX from 300 m.",
    ],
    composition: "55% linen, 45% cotton",
    weightGsm: 160,
    widthCm: 145,
    weave: "Plain weave",
    finish: "Enzyme softened, pre-shrunk",
    shrinkage: "≤3% warp, ≤2.5% weft",
    moqMeters: 300,
    stockMeters: 100,
    leadTimeDays: [18, 28],
    priceFrom: 3.2,
    priceTo: 4.1,
    colors: 20,
    certifications: ["OEKO-TEX Standard 100"],
    applications: ["Shirts", "Dresses", "Trousers", "Shorts", "Loungewear"],
    features: [
      "Linen look with reduced creasing",
      "Lower cost than 100% linen",
      "Better dye reproducibility",
      "20 shades in stock",
    ],
    image: photo(
      "macro detail of natural linen cotton blend fabric in soft sage tone with fine slub weave, gentle folds, warm neutral studio background, textile photography, no text",
    ),
    imageAlt: "Macro detail of sage linen-cotton blend fabric",
    faqs: [
      {
        question: "Does a linen-cotton blend still crease?",
        answer:
          "Less than pure linen. The cotton content reduces creasing noticeably, though it is not wrinkle-free. Brands wanting a crisp finish usually add a resin-free press at the laundry rather than a chemical finish.",
      },
      {
        question: "What is the price difference between linen and linen-cotton?",
        answer:
          "Linen-cotton typically costs 30–35% less than 100% European flax linen at the same weight, mainly because cotton fibre and its spinning route are cheaper.",
      },
    ],
  },
  {
    slug: "heavy-linen-260",
    name: "Heavy Linen 260",
    code: "LT-LI-260",
    categorySlug: "linen",
    summary:
      "A 260 gsm heavyweight washed linen for structured dresses, outerwear and home textiles, with a dense hand and under 4% shrinkage, from 500 m.",
    description: [
      "At 260 gsm this linen carries structure: it stands away from the body, holds a pleat and works for sleeveless dresses, soft jackets and heavier home textiles. It is woven from the same certified European flax as our lighter qualities, with a denser sett.",
      "Finishing uses a longer stone-free wash cycle to soften the heavier cloth without breaking the yarn surface. If you need a fully opaque result for unlined styles, ask for the double-washed version, which reduces light transmission by roughly 30%.",
    ],
    composition: "100% European flax linen",
    weightGsm: 260,
    widthCm: 145,
    weave: "Plain weave, dense sett",
    finish: "Heavy garment wash",
    shrinkage: "≤4% warp, ≤3% weft",
    moqMeters: 500,
    stockMeters: 150,
    leadTimeDays: [25, 35],
    priceFrom: 6.5,
    priceTo: 8.2,
    colors: 12,
    certifications: ["OEKO-TEX Standard 100", "European Flax®"],
    applications: ["Structured dresses", "Soft jackets", "Wide-leg trousers", "Cushions", "Curtains"],
    features: [
      "Structured, opaque hand",
      "Holds pleats and volume",
      "Certified European flax",
      "Suitable for home textiles",
    ],
    image: photo(
      "macro detail of heavy rust coloured linen fabric with dense weave and structured folds, dramatic soft light, neutral background, editorial textile photography, no text",
    ),
    imageAlt: "Macro detail of heavy rust linen fabric with structured folds",
    faqs: [
      {
        question: "Is 260 gsm linen too heavy for dresses?",
        answer:
          "Not for structured silhouettes. It suits sleeveless dresses, pinafores and soft tailoring. For fluid, gathered dresses choose 180 gsm instead.",
      },
      {
        question: "Can heavy linen be used for upholstery?",
        answer:
          "It can be used for cushions and light domestic upholstery, but for contract upholstery we recommend a Martindale-tested blend with a higher abrasion rating.",
      },
    ],
  },

  // ---------------------------------------------------------------- denim
  {
    slug: "rigid-denim-12-5oz",
    name: "Rigid Denim 12.5 oz",
    code: "LT-DN-125",
    categorySlug: "denim",
    summary:
      "A 12.5 oz rigid indigo denim woven on shuttle looms with rope-dyed yarns, giving authentic fades for five-pocket jeans, from 500 m per shade.",
    description: [
      "This 12.5 oz denim uses rope-dyed indigo warp yarns and natural weft, woven on shuttle looms at 76 cm loomstate width. The rope dyeing leaves the yarn core white, which is what produces the high-contrast fade pattern denim wearers look for.",
      "It is sanforised to 2–3% residual shrinkage, so it can be cut without a wash-first step. If your laundry runs laser or ozone finishing, tell us the recipe — we adjust the singeing and skewing to suit.",
    ],
    composition: "100% cotton, ring-spun",
    weightGsm: 424,
    widthCm: 150,
    weave: "3/1 twill, rope-dyed indigo",
    finish: "Sanforised, skew-controlled",
    shrinkage: "≤3% warp, ≤2% weft",
    moqMeters: 500,
    stockMeters: 300,
    leadTimeDays: [25, 35],
    priceFrom: 3.1,
    priceTo: 3.9,
    colors: 8,
    certifications: ["OEKO-TEX Standard 100"],
    applications: ["5-pocket jeans", "Trucker jackets", "Overalls", "Skirts"],
    features: [
      "Rope-dyed indigo for high-contrast fades",
      "Shuttle-loom weaving",
      "Skew-controlled for straight legs",
      "Laser and ozone friendly",
    ],
    image: photo(
      "macro detail of raw indigo denim fabric with visible diagonal twill and white weft, deep blue tones, raking daylight, textile photography, no text",
    ),
    imageAlt: "Macro detail of raw indigo denim with visible twill",
    featured: true,
    faqs: [
      {
        question: "What does 12.5 oz denim weigh in gsm?",
        answer:
          "12.5 oz per square yard is approximately 424 gsm. It is a mid-heavyweight denim suited to year-round five-pocket jeans and light jackets.",
      },
      {
        question: "Is this denim sanforised?",
        answer:
          "Yes, it is sanforised to 2–3% residual shrinkage, so it can be cut without pre-washing. Unsanforised loomstate is available on request for raw-denim programmes.",
      },
    ],
  },
  {
    slug: "stretch-denim-10oz",
    name: "Stretch Denim 10 oz",
    code: "LT-DN-100",
    categorySlug: "denim",
    summary:
      "A 10 oz dual-core stretch denim with 1.5% elastane, tested for growth and recovery, for comfort-fit jeans and jackets from 500 m.",
    description: [
      "Built on dual-core yarn, this 10 oz denim stretches and recovers rather than bagging at the knee. Elastane content is 1.5%, which gives roughly 22% elongation at 10 kg load with 95% recovery after five cycles — the range most comfort-fit programmes specify.",
      "It is finished with a low-temperature sanforising route that protects the elastane, and we report growth and recovery figures with each lot. For high-stretch skinny fits, ask about the 8 oz version with 2% elastane.",
    ],
    composition: "98.5% cotton, 1.5% elastane",
    weightGsm: 339,
    widthCm: 150,
    weave: "3/1 twill, dual-core yarn",
    finish: "Sanforised, elastane-protective",
    shrinkage: "≤2% warp, ≤2% weft",
    moqMeters: 500,
    stockMeters: 300,
    leadTimeDays: [25, 35],
    priceFrom: 2.9,
    priceTo: 3.6,
    colors: 10,
    certifications: ["OEKO-TEX Standard 100"],
    applications: ["Comfort-fit jeans", "Jackets", "Skirts", "Shorts"],
    features: [
      "22% elongation, 95% recovery",
      "Dual-core yarn resists bagging",
      "Low-temperature sanforising",
      "Growth and recovery report per lot",
    ],
    image: photo(
      "macro detail of mid-blue stretch denim fabric with subtle diagonal twill and soft drape, daylight studio, neutral background, textile photography, no text",
    ),
    imageAlt: "Macro detail of mid-blue stretch denim fabric",
    faqs: [
      {
        question: "How much stretch does 1.5% elastane give?",
        answer:
          "Around 22% elongation at 10 kg load, with about 95% recovery after five stretch cycles. That is enough for comfort-fit jeans without the rubbery hand of 3% stretch.",
      },
      {
        question: "Will stretch denim lose shape after washing?",
        answer:
          "Dual-core yarn limits growth to under 2% after 20 home launderings in our testing. Recovery reports are supplied with each lot so you can verify against your own wash standard.",
      },
    ],
  },
  {
    slug: "chambray-140",
    name: "Chambray 140",
    code: "LT-DN-140",
    categorySlug: "denim",
    summary:
      "A 140 gsm yarn-dyed chambray with indigo warp and white weft, lightweight enough for shirting and dresses, from 300 m in 12 shades.",
    description: [
      "Chambray uses the same indigo warp and white weft idea as denim but in a plain weave at 140 gsm, which makes it soft, breathable and light enough for shirts. The yarn-dyed construction means the colour is in the yarn, so it fades gently rather than crocking.",
      "It is a strong seller for summer shirting and lightweight dresses, and it prints well for capsule collections. We stock 12 indigo and washed-blue shades and can match additional shades at 500 m.",
    ],
    composition: "100% cotton",
    weightGsm: 140,
    widthCm: 145,
    weave: "Plain weave, yarn dyed",
    finish: "Enzyme washed, pre-shrunk",
    shrinkage: "≤2.5% warp, ≤2% weft",
    moqMeters: 300,
    stockMeters: 150,
    leadTimeDays: [18, 28],
    priceFrom: 2.2,
    priceTo: 2.9,
    colors: 12,
    certifications: ["OEKO-TEX Standard 100"],
    applications: ["Shirts", "Dresses", "Light jackets", "Kids wear"],
    features: [
      "Yarn-dyed, gentle fade",
      "Lightweight 140 gsm",
      "Enzyme-washed soft hand",
      "12 indigo shades in stock",
    ],
    image: photo(
      "macro detail of light blue yarn dyed chambray fabric with fine plain weave, soft folds, bright neutral studio light, textile photography, no text",
    ),
    imageAlt: "Macro detail of light blue yarn-dyed chambray fabric",
    faqs: [
      {
        question: "What is the difference between chambray and denim?",
        answer:
          "Both use indigo warp and white weft, but chambray is a lightweight plain weave at 100–160 gsm while denim is a heavier twill at 300 gsm and above. Chambray is for shirting; denim is for jeans and jackets.",
      },
      {
        question: "Does chambray bleed colour?",
        answer:
          "Yarn-dyed chambray has low crocking and will not bleed onto adjacent fabrics in normal wear. We still recommend a cold first wash and testing against white trims in your wash standard.",
      },
    ],
  },

  // ---------------------------------------------------------------- knit
  {
    slug: "single-jersey-160",
    name: "Single Jersey 160",
    code: "LT-KN-160",
    categorySlug: "knit",
    summary:
      "A 160 gsm combed cotton single jersey with a compacted finish and under 5% spirality, the standard base for T-shirts and loungewear from 300 m.",
    description: [
      "Knitted on 34-inch circular machines from 30s combed cotton, this jersey is compacted after dyeing so it arrives close to final dimensions. Spirality is held under 5%, which matters for side-seam tees and all-over prints.",
      "It is available in tubular or open width, with a soft or dry hand finish. For print programmes we recommend the semi-bleached base, which gives better ink yield and cleaner whites.",
    ],
    composition: "100% combed cotton",
    weightGsm: 160,
    widthCm: 180,
    weave: "Single jersey knit",
    finish: "Compacted, soft or dry hand",
    shrinkage: "≤4% length, ≤5% width",
    moqMeters: 300,
    stockMeters: 200,
    leadTimeDays: [15, 25],
    priceFrom: 1.45,
    priceTo: 1.95,
    colors: 36,
    certifications: ["OEKO-TEX Standard 100", "GOTS on request"],
    applications: ["T-shirts", "Loungewear", "Babywear", "Undershirts", "Dresses"],
    features: [
      "Combed 30s ring-spun cotton",
      "Spirality under 5%",
      "Tubular or open width",
      "Semi-bleached base for printing",
    ],
    image: photo(
      "macro detail of white cotton single jersey knit fabric with fine vertical wales and soft folds, bright studio light, neutral background, textile photography, no text",
    ),
    imageAlt: "Macro detail of white cotton single jersey knit fabric",
    faqs: [
      {
        question: "What is the best gsm for a T-shirt?",
        answer:
          "160–180 gsm single jersey is the standard for retail T-shirts: opaque enough not to show through, light enough to drape. Heavyweight 220–240 gsm jersey is used for boxy, structured fits.",
      },
      {
        question: "Do you supply tubular knit fabric?",
        answer:
          "Yes, both tubular and open width are available. Tubular is common for T-shirt programmes that cut on the tube and avoid side seams.",
      },
    ],
  },
  {
    slug: "french-terry-280",
    name: "French Terry 280",
    code: "LT-KN-280",
    categorySlug: "knit",
    summary:
      "A 280 gsm cotton-rich French terry for hoodies and sweatshirts, with a looped back, low shrinkage and GRS recycled options, from 300 m.",
    description: [
      "French terry 280 is a double-knit with fine loops on the back, which gives warmth and structure without the bulk of fleece. At 280 gsm it holds a hood shape and a dropped shoulder, making it the base for most premium sweatshirt programmes.",
      "We knit in 80/20 cotton-polyester for stability, or 100% cotton where a fully natural base is required. Shrinkage is held under 5% after three washes, and we can add an anti-pilling enzyme finish for a smoother surface.",
    ],
    composition: "80% cotton, 20% recycled polyester",
    weightGsm: 280,
    widthCm: 185,
    weave: "French terry double knit",
    finish: "Compacted, anti-pilling option",
    shrinkage: "≤5% length, ≤4% width",
    moqMeters: 300,
    stockMeters: 150,
    leadTimeDays: [18, 28],
    priceFrom: 2.3,
    priceTo: 3.0,
    colors: 24,
    certifications: ["OEKO-TEX Standard 100", "GRS 4.0"],
    applications: ["Hoodies", "Sweatshirts", "Joggers", "Kids sets"],
    features: [
      "Holds hood and shoulder structure",
      "GRS recycled polyester content",
      "Anti-pilling enzyme option",
      "100% cotton version available",
    ],
    image: photo(
      "macro detail of heather grey French terry fabric with visible looped back edge and soft folds, warm studio light, neutral background, textile photography, no text",
    ),
    imageAlt: "Macro detail of heather grey French terry fabric",
    featured: true,
    faqs: [
      {
        question: "Is 280 gsm French terry warm enough for a hoodie?",
        answer:
          "Yes for mid-season hoodies and year-round in most markets. For winter-weight hoodies with a brushed interior, choose 320–340 gsm fleece-backed terry.",
      },
      {
        question: "Can French terry be garment dyed?",
        answer:
          "Yes. We supply a greige base for garment dyeing and can pre-test shrinkage after your dye cycle. Garment-dyed terry typically shrinks 6–8%, so plan the pattern allowance accordingly.",
      },
    ],
  },
  {
    slug: "rib-knit-2x2-240",
    name: "2x2 Rib Knit 240",
    code: "LT-KN-240",
    categorySlug: "knit",
    summary:
      "A 240 gsm 2x2 cotton rib with 60% width stretch for cuffs, collars and fitted tops, dyed to match our jersey and terry ranges, from 300 m.",
    description: [
      "This 2x2 rib is knitted to match our single jersey and French terry shade cards, so trims and bodies come out of the same dye lot family. At 240 gsm it has enough body for waistbands and cuffs without rolling.",
      "Stretch is around 60% across the width with 90% recovery, which keeps cuffs snug after washing. Order it with the body fabric and we will dye both in the same lot to avoid shade drift on the finished garment.",
    ],
    composition: "95% cotton, 5% elastane",
    weightGsm: 240,
    widthCm: 120,
    weave: "2x2 rib knit",
    finish: "Compacted, soft hand",
    shrinkage: "≤5% length, ≤6% width",
    moqMeters: 300,
    stockMeters: 100,
    leadTimeDays: [18, 28],
    priceFrom: 2.0,
    priceTo: 2.6,
    colors: 24,
    certifications: ["OEKO-TEX Standard 100"],
    applications: ["Cuffs", "Collars", "Waistbands", "Fitted tops", "Dresses"],
    features: [
      "Dyed to match jersey and terry",
      "60% width stretch, 90% recovery",
      "Same-lot dyeing with body fabric",
      "Narrow 120 cm width for trim cutting",
    ],
    image: photo(
      "macro detail of cream coloured 2x2 rib knit fabric with deep vertical ribs, soft folds, warm studio light, neutral background, textile photography, no text",
    ),
    imageAlt: "Macro detail of cream 2x2 rib knit fabric",
    faqs: [
      {
        question: "Can rib be dyed the same shade as jersey?",
        answer:
          "Yes. Order rib with your body fabric and we dye both in the same lot. Because rib and jersey take dye slightly differently, same-lot dyeing is the only reliable way to avoid visible shade differences at the cuff.",
      },
      {
        question: "What is 2x2 rib used for?",
        answer:
          "It is used for cuffs, collars, waistbands and hems because the alternating knit and purl columns give strong crosswise stretch with good recovery. Heavier weights are also used for fitted tops and dresses.",
      },
    ],
  },

  // ---------------------------------------------------------------- viscose
  {
    slug: "viscose-challis-110",
    name: "Viscose Challis 110",
    code: "LT-VS-110",
    categorySlug: "viscose",
    summary:
      "A 110 gsm viscose challis with a fluid drape and matte finish, print-ready for dresses and modest wear, from 300 m with OEKO-TEX certification.",
    description: [
      "Challis is a soft, loosely woven plain-weave viscose that falls in fluid folds and prints with high colour yield. At 110 gsm it is light without being sheer in mid and dark shades, which is why it dominates summer dress and abaya programmes.",
      "We finish with a tensionless wash to remove loom tension, then test shrinkage after hand wash and dry clean. Digital reactive printing is available from 100 m so capsule collections can be produced without a rotary setup cost.",
    ],
    composition: "100% viscose (FSC-controlled pulp)",
    weightGsm: 110,
    widthCm: 145,
    weave: "Plain weave challis",
    finish: "Tensionless washed, matte",
    shrinkage: "≤4% warp, ≤4% weft",
    moqMeters: 300,
    stockMeters: 200,
    leadTimeDays: [18, 28],
    priceFrom: 1.9,
    priceTo: 2.5,
    colors: 30,
    certifications: ["OEKO-TEX Standard 100", "FSC controlled wood"],
    applications: ["Dresses", "Blouses", "Abaya", "Skirts", "Scarves"],
    features: [
      "Fluid drape, matte finish",
      "Print-ready from 100 m digital",
      "Tensionless wash reduces seam pull",
      "FSC-controlled pulp",
    ],
    image: photo(
      "macro detail of soft terracotta viscose challis fabric with fluid folds and matte surface, warm studio light, neutral background, editorial textile photography, no text",
    ),
    imageAlt: "Macro detail of soft terracotta viscose challis fabric",
    faqs: [
      {
        question: "Is viscose challis see-through?",
        answer:
          "At 110 gsm it is semi-opaque in pale shades and opaque in mid to dark tones. For unlined pale dresses we recommend 130–150 gsm or a lining.",
      },
      {
        question: "Can you print small runs on viscose?",
        answer:
          "Yes. Digital reactive printing starts at 100 metres, which suits capsule collections. Rotary printing becomes cheaper above roughly 1,000 metres per design.",
      },
    ],
  },
  {
    slug: "viscose-linen-150",
    name: "Viscose Linen 150",
    code: "LT-VS-150",
    categorySlug: "viscose",
    summary:
      "A 150 gsm viscose-linen blend combining linen texture with viscose drape, low-crease and breathable for hot climates, from 300 m.",
    description: [
      "This blend pairs 55% viscose with 45% linen: the linen gives surface texture and breathability, the viscose gives drape and reduces creasing. At 150 gsm it works for wide-leg trousers, dresses and relaxed shirts.",
      "Because both fibres absorb moisture well, it performs in Gulf and Mediterranean summer conditions where polyester blends feel clammy. We stock 16 shades and can dye to Pantone TCX at 300 m.",
    ],
    composition: "55% viscose, 45% linen",
    weightGsm: 150,
    widthCm: 145,
    weave: "Plain weave",
    finish: "Enzyme softened",
    shrinkage: "≤4% warp, ≤3% weft",
    moqMeters: 300,
    stockMeters: 100,
    leadTimeDays: [20, 30],
    priceFrom: 3.0,
    priceTo: 3.8,
    colors: 16,
    certifications: ["OEKO-TEX Standard 100"],
    applications: ["Wide-leg trousers", "Dresses", "Relaxed shirts", "Kaftan"],
    features: [
      "Linen texture with viscose drape",
      "Reduced creasing versus pure linen",
      "Breathable for hot climates",
      "Pantone TCX matching from 300 m",
    ],
    image: photo(
      "macro detail of sand coloured viscose linen blend fabric with subtle slub and soft drape, warm daylight, neutral studio background, textile photography, no text",
    ),
    imageAlt: "Macro detail of sand viscose-linen blend fabric",
    faqs: [
      {
        question: "Is viscose-linen suitable for hot weather?",
        answer:
          "Yes. Both fibres absorb moisture and release it quickly, and the open weave allows airflow. It is cooler than polyester blends and creases less than pure linen.",
      },
      {
        question: "How should viscose-linen be washed?",
        answer:
          "Cool machine wash at 30°C, low spin, hang dry away from direct sun. We test shrinkage to that method and report the result per lot.",
      },
    ],
  },
  {
    slug: "crepe-viscose-135",
    name: "Crepe Viscose 135",
    code: "LT-VS-135",
    categorySlug: "viscose",
    summary:
      "A 135 gsm crepe viscose with a subtle grained surface and bounce, for tailored dresses, blouses and occasionwear, from 300 m.",
    description: [
      "Crepe viscose is woven with high-twist yarns, which gives the cloth its fine grain and a slight bounce that resists clinging. It presses cleanly, holds a soft pleat and drapes without collapsing — useful for occasionwear and tailored dresses.",
      "At 135 gsm it is substantial enough for unlined dresses in mid tones. We finish with a gentle wash that stabilises the twist, and test for seam slippage so you can choose the right stitch density.",
    ],
    composition: "100% viscose (high-twist crepe)",
    weightGsm: 135,
    widthCm: 145,
    weave: "Crepe weave, high-twist yarn",
    finish: "Washed, twist-stabilised",
    shrinkage: "≤4% warp, ≤3.5% weft",
    moqMeters: 300,
    stockMeters: 150,
    leadTimeDays: [20, 30],
    priceFrom: 2.1,
    priceTo: 2.7,
    colors: 22,
    certifications: ["OEKO-TEX Standard 100"],
    applications: ["Occasionwear", "Blouses", "Tailored dresses", "Wide-leg trousers"],
    features: [
      "High-twist yarn for grained surface",
      "Bounce resists clinging",
      "Holds soft pleats",
      "Seam-slippage tested",
    ],
    image: photo(
      "macro detail of deep forest green crepe viscose fabric with fine grained texture and soft folds, moody warm light, neutral background, editorial textile photography, no text",
    ),
    imageAlt: "Macro detail of forest green crepe viscose fabric",
    faqs: [
      {
        question: "What is crepe viscose used for?",
        answer:
          "Occasionwear, blouses and tailored dresses. The high-twist yarn gives a dry, grainy hand that resists clinging and holds a soft pleat better than plain challis.",
      },
      {
        question: "Does crepe viscose fray when cut?",
        answer:
          "It frays moderately, more than jersey but less than loose challis. We test seam slippage per lot and can recommend stitch density and overlock settings.",
      },
    ],
  },

  // ---------------------------------------------------------------- performance
  {
    slug: "recycled-poly-twill-180",
    name: "Recycled Polyester Twill 180",
    code: "LT-PF-180",
    categorySlug: "performance",
    summary:
      "A 180 gsm GRS-certified recycled polyester twill with PFC-free DWR, for outerwear, bags and uniform shells, supplied with transaction certificates from 300 m.",
    description: [
      "This 180 gsm twill is woven from GRS-certified recycled polyester filament yarn, then finished with C0 PFC-free durable water repellency. It is the workhorse for lightweight shells, bag bodies and uniform outerwear where recycled content must be documented.",
      "Every shipment includes a GRS transaction certificate that traces the yarn lot through to delivered metres. If your brand requires bluesign-approved chemistry, we can switch the finish recipe without changing the base cloth.",
    ],
    composition: "100% GRS recycled polyester",
    weightGsm: 180,
    widthCm: 150,
    weave: "2/2 twill",
    finish: "C0 PFC-free DWR, calender option",
    shrinkage: "≤2% warp, ≤2% weft",
    moqMeters: 300,
    stockMeters: 200,
    leadTimeDays: [20, 30],
    priceFrom: 2.4,
    priceTo: 3.1,
    colors: 18,
    certifications: ["GRS 4.0", "OEKO-TEX Standard 100", "bluesign® available"],
    applications: ["Outerwear", "Bags", "Uniforms", "Caps", "Covers"],
    features: [
      "GRS transaction certificate per shipment",
      "PFC-free DWR, spray rating 4–5",
      "Tear and abrasion tested",
      "bluesign® finish on request",
    ],
    image: photo(
      "macro detail of deep olive recycled polyester twill fabric with water droplets beading on the surface, technical apparel material, studio light, textile photography, no text",
    ),
    imageAlt: "Water beading on deep olive recycled polyester twill",
    faqs: [
      {
        question: "What does GRS certification cover?",
        answer:
          "GRS 4.0 verifies recycled content, chain of custody, social and environmental practice, and chemical restrictions. Each shipment comes with a transaction certificate linking the certified yarn to the delivered fabric.",
      },
      {
        question: "How long does PFC-free DWR last?",
        answer:
          "Our C0 finish holds a spray rating of 4–5 through 20 home launderings. For garments needing longer performance, ask about a 30-wash recipe at a small cost premium.",
      },
    ],
  },
  {
    slug: "recycled-nylon-taslan-120",
    name: "Recycled Nylon Taslan 120",
    code: "LT-PF-120",
    categorySlug: "performance",
    summary:
      "A 120 gsm GRS recycled nylon taslan with a dry, papery hand for lightweight shells, windbreakers and packable jackets, from 300 m.",
    description: [
      "Taslan is a textured nylon with a dry, slightly papery hand and a matte surface — the classic shell fabric for packable jackets and windbreakers. At 120 gsm it packs small while staying tear-resistant.",
      "We weave it from GRS-certified recycled nylon and finish with C0 DWR. It is down-proof enough for light quilted linings when calendered; specify the calender pass if you plan to use it as a shell over down.",
    ],
    composition: "100% GRS recycled nylon",
    weightGsm: 120,
    widthCm: 150,
    weave: "Plain weave taslan",
    finish: "C0 PFC-free DWR, optional calender",
    shrinkage: "≤2% warp, ≤2% weft",
    moqMeters: 300,
    stockMeters: 150,
    leadTimeDays: [22, 32],
    priceFrom: 2.2,
    priceTo: 2.9,
    colors: 14,
    certifications: ["GRS 4.0", "OEKO-TEX Standard 100"],
    applications: ["Windbreakers", "Packable jackets", "Light shells", "Bags"],
    features: [
      "Dry, papery taslan hand",
      "Packs small, resists tearing",
      "Optional calendering for down-proofing",
      "GRS recycled nylon",
    ],
    image: photo(
      "macro detail of matte black recycled nylon taslan fabric with crisp folds and water repellent surface, dark studio light, technical textile photography, no text",
    ),
    imageAlt: "Macro detail of matte black recycled nylon taslan fabric",
    faqs: [
      {
        question: "What is taslan fabric used for?",
        answer:
          "Lightweight shells, windbreakers and packable jackets. Its textured filament yarn gives a dry, papery hand and good tear resistance at low weight.",
      },
      {
        question: "Is taslan waterproof?",
        answer:
          "Standard taslan is water-repellent, not waterproof. For waterproof shells, specify a laminated or coated version with a hydrostatic head rating.",
      },
    ],
  },
  {
    slug: "softshell-3-layer-320",
    name: "3-Layer Softshell 320",
    code: "LT-PF-320",
    categorySlug: "performance",
    summary:
      "A 320 gsm 3-layer softshell with a TPU membrane rated to 10,000 mm waterproof and 5,000 g breathability, for ski, cycling and workwear programmes from 500 m.",
    description: [
      "This bonded 3-layer construction pairs a recycled polyester twill face, a TPU membrane and a light grid backer. It is waterproof to 10,000 mm, breathable to 5,000 g/m²/24h, and stretchy enough for articulated sleeves without a separate lining.",
      "Bonding is done in-house with a solvent-free adhesive, and we test peel strength plus hydrostatic head on every lot. For workwear, ask about the EN 343 option with sealed-seam tape supply.",
    ],
    composition: "Face 100% recycled polyester, TPU membrane, polyester backer",
    weightGsm: 320,
    widthCm: 145,
    weave: "Bonded 3-layer softshell",
    finish: "C0 DWR, in-house solvent-free bonding",
    shrinkage: "≤2% warp, ≤2% weft",
    moqMeters: 500,
    stockMeters: 100,
    leadTimeDays: [28, 38],
    priceFrom: 4.6,
    priceTo: 5.8,
    colors: 10,
    certifications: ["GRS 4.0", "OEKO-TEX Standard 100", "EN 343 option"],
    applications: ["Ski wear", "Cycling jackets", "Workwear", "Softshell trousers"],
    features: [
      "10,000 mm waterproof, 5,000 g breathability",
      "Stretch without a lining",
      "Solvent-free in-house bonding",
      "EN 343 workwear option",
    ],
    image: photo(
      "macro detail of charcoal 3 layer softshell fabric with bonded edge showing membrane layers, technical apparel material, studio light, textile photography, no text",
    ),
    imageAlt: "Macro detail of charcoal 3-layer softshell showing bonded layers",
    faqs: [
      {
        question: "What does 10,000 mm waterproof mean?",
        answer:
          "It is the hydrostatic head: the fabric resists a 10-metre column of water before leaking. That suits rain and snow sports, while 20,000 mm is used for expedition shells.",
      },
      {
        question: "Can you supply seam tape with the softshell?",
        answer:
          "Yes. Matching 20 mm seam tape is available, and for workwear we can quote an EN 343 tested package including tape and test reports.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ helpers */

export function productPriceRange(product: Product) {
  return `US$${product.priceFrom.toFixed(2)}–${product.priceTo.toFixed(2)} / m`;
}
