import { Tag } from '@axevil/design-system/components'
import { LOGO_MAP } from './logoMap'

/** One company in a sector card: logo image if we have it, else a DS text pill. */
export default function CompanyChip({ name }: { name: string }) {
  const logo = LOGO_MAP[name]
  if (logo) {
    return (
      <span
        className="inline-flex items-center rounded-border-r-0.75 bg-black-400"
        style={{ padding: '0.5rem 0.75rem', border: '1px solid var(--border-subtle)' }}
      >
        <img src={logo} alt={name} style={{ height: '1rem', width: 'auto', display: 'block' }} />
      </span>
    )
  }
  return <Tag variant="regulatory" label={name} />
}