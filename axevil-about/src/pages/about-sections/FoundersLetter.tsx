import { DescTag } from '@axevil/design-system/components'
import { FOUNDERS } from './content'

export default function FoundersLetter() {
  return (
    <section id="founders" className="w-full bg-page-bg" style={{ padding: 'clamp(4rem, 8vw, 7.5rem) 0' }}>
      <div className="mx-auto w-full max-w-content container-px">
        <div className="rounded-card-lg bg-black-500" style={{ border: '1px solid var(--border-subtle)', borderTop: '0.125rem solid var(--status-open)', padding: 'clamp(1.75rem, 3.5vw, 2.25rem)' }}>
          <div className="grid lg:grid-cols-[0.85fr_1.45fr]" style={{ gap: 'clamp(2rem, 4vw, 2.625rem)' }}>
            {/* Photos */}
            <div className="grid content-start" style={{ gap: '1.125rem' }}>
              {FOUNDERS.people.map((f) => (
                <div key={f.name} className="flex flex-col justify-end" style={{ minHeight: '13.75rem', borderRadius: '1rem', border: '1px solid var(--border-subtle)', padding: '1.375rem', gap: '0.375rem', background: 'radial-gradient(circle at 30% 20%, rgba(77,186,121,0.18), transparent 35%), linear-gradient(135deg,#121212,#050505)' }}>
                  <h3 className="font-inter-tight font-semibold text-white" style={{ fontSize: '1.375rem' }}>{f.name}</h3>
                  <p className="font-inter-tight font-medium text-text-xs text-white/45" style={{ textTransform: 'uppercase', letterSpacing: '0.0625rem' }}>{f.role}</p>
                </div>
              ))}
            </div>
            {/* Letter */}
            <div className="flex flex-col" style={{ gap: '1.25rem' }}>
              <DescTag number="7.0" label={FOUNDERS.eyebrow} />
              <h2 className="font-inter-tight font-semibold text-h2 text-acc-gradient">{FOUNDERS.title}</h2>
              <div className="flex flex-col" style={{ borderLeft: '0.25rem solid var(--status-open)', paddingLeft: '1.625rem', gap: '1.125rem', marginTop: '0.5rem' }}>
                {FOUNDERS.letter.map((para, i) => (
                  <p key={i} className="font-inter-tight font-medium text-paragraph text-white/80">{para}</p>
                ))}
                <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '1.125rem', marginTop: '1rem' }}>
                  {FOUNDERS.signatures.map((s) => (
                    <div key={s.name} className="font-inter-tight text-text-xs text-white/45">
                      <strong className="block text-white font-semibold" style={{ marginBottom: '0.3125rem' }}>{s.name}</strong>{s.role}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
