import { BRAND_MEDALLIONS, type BrandMedallion } from '../data/portfolio'

interface BrandRule {
  brandId: string
  patterns: RegExp[]
}

const BRAND_RULES: BrandRule[] = [
  { brandId: 'arencia', patterns: [/\barencia\b/i, /#arencia/i] },
  { brandId: 'abib', patterns: [/\babib\b/i, /#abib/i, /#glowwithabib/i, /#joinmonthlyabib/i] },
  { brandId: 'axis-y', patterns: [/\baxis[-\s]?y\b/i, /#axisy/i] },
  { brandId: 'seoul-1988', patterns: [/seoul\s*1988/i, /\bk[-\s]?secret\b/i, /#ksecret/i] },
  { brandId: 'tage', patterns: [/\btage\b/i, /#tage/i, /@tage_global/i] },
  { brandId: 'isntree', patterns: [/\bisntree\b/i, /#isntree/i, /#instreesunscreen/i] },
  { brandId: 'firmoo', patterns: [/\bfirmoo\b/i, /#firmoo/i, /aqrc50/i] },
  { brandId: 'clio', patterns: [/\bclio\b/i, /#clio/i, /club\s*clio/i] },
  { brandId: 'meditherapy', patterns: [/\bmeditherapy\b/i, /#meditherapy/i] },
  { brandId: 'fg-beauty', patterns: [/\bfg\s*beauty\b/i, /#fgbeauty/i] },
  { brandId: 'medicube', patterns: [/\bmedicube\b/i, /#medicube/i, /aprilskin/i] },
  { brandId: 'lorealistar', patterns: [/lorealistar/i, /lor[eé]al/i, /\bmaybelline\b/i, /\bgarnier\b/i] },
  { brandId: 'caraseoul', patterns: [/\bcaraseoul\b/i, /#caraseoul/i] },
  { brandId: 'ilso', patterns: [/\bilso\b/i, /#ilso/i] },
  { brandId: 'rijeseo', patterns: [/rije\s*:?\s*seo/i, /#rijeseo/i] },
  { brandId: 'calli-gift', patterns: [/calli[e]?\s*gift/i, /#calliegifts/i, /callie\.meitia/i, /wishs478/i] },
  { brandId: 'celimax', patterns: [/\bcelimax\b/i, /#celimax/i] },
  { brandId: 'stylevana', patterns: [/\bstylevana\b/i, /#stylevana/i, /inf10pzafn/i, /vana\.ly/i] },
  { brandId: 'oulac', patterns: [/\boulac\b/i, /#oulac/i] },
  { brandId: 'dr-melaxin', patterns: [/dr\.?\s*melaxin/i, /\bmelaxin\b/i] },
]

/**
 * Automatically identifies which of Puja's 20 brand partners a new
 * Instagram Reel or TikTok video belongs to from its caption / hashtags.
 */
export function detectBrandFromCaption(caption: string): BrandMedallion | null {
  for (const rule of BRAND_RULES) {
    if (rule.patterns.some((re) => re.test(caption))) {
      return BRAND_MEDALLIONS.find((b) => b.id === rule.brandId) || null
    }
  }
  return null
}

export function inferFormatTag(caption: string): string {
  const text = caption.toLowerCase()
  if (/unbox|pr\s*(haul|package|box)/i.test(text)) return 'PR Unboxing'
  if (/grwm|get ready|makeup look/i.test(text)) return 'GRWM'
  if (/transition|7[\s-]?day|before/i.test(text)) return 'Results Demo'
  if (/sunscreen|spf|no\s*white\s*cast/i.test(text)) return 'SPF Wear Test'
  if (/lip\s*(tint|stain|combo|oil)/i.test(text)) return 'Lip Swatch'
  if (/eye\s*patch|serum|cream|cleanser|balm|pad/i.test(text)) return 'Skincare Demo'
  if (/glasses|frames|robe|gift|jewellery/i.test(text)) return 'Lifestyle UGC'
  return 'Brand Reel'
}

export function buildCleanTitle(brandName: string, caption: string): string {
  const firstSentence = caption
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[#@][\w._-]+/g, '')
    .split(/[\n.!?]/)[0]
    ?.trim()
  if (firstSentence && firstSentence.length >= 10 && firstSentence.length <= 58) {
    return firstSentence
  }
  return `${brandName} Featured UGC`
}

