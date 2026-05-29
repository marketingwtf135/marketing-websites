import { Nav } from '@axevil/design-system/components'
import { NAV_LINKS } from './content'

/**
 * About page nav — the real design-system <Nav/> (so it reads as the DS `Nav`
 * component), parameterised with this page's RU content: in-page anchor links,
 * a "Обсудить" CTA that scrolls to the final CTA, and a logo that scrolls to top.
 */
export default function AboutNav() {
  return (
    <Nav
      links={NAV_LINKS.map(({ label, id }) => ({ label, href: `#${id}` }))}
      logoHref="#top"
      ctaLabel="Обсудить"
      onCtaClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
    />
  )
}
