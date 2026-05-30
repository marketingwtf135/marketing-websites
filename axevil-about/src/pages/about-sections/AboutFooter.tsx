import { Footer } from '@axevil/design-system/components'
import { NAV_LINKS, FOOTER_COMPLIANCE } from './content'

/**
 * About page footer — the real design-system <Footer/> (reads as the DS `Footer`
 * component in ds-agent), parameterised with this page's content: in-page anchor
 * links, the AXEVIL compliance line, and a logo that scrolls to top.
 */
export default function AboutFooter() {
  return (
    <Footer
      logoHref="#top"
      links={NAV_LINKS.map(({ label, id }) => ({ label, href: `#${id}` }))}
      compliance={FOOTER_COMPLIANCE}
    />
  )
}
