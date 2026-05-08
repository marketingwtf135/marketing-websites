import { useState } from 'react'

/** Section 7 — Get Updates / Email Newsletter (Figma 89:642)
 *  #17: height 800px, bg-shine-email-sub.png centered on all axes, not cropped
 */
export default function CSGetUpdates() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  return (
    <section
      className="relative w-full bg-page-bg"
      style={{ minHeight: '700px', paddingTop: '200px', paddingBottom: '100px' }}
    >
      {/* bg-shine — natural/default size, centered, does not overflow section */}
      <img
        alt=""
        src="/img/bg-shine-email-sub.png"
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100svw',
          height: 'auto',
          zIndex: 0,
        }}
      />

      <div className="relative mx-auto w-full max-w-content flex flex-col gap-10 items-center text-center" style={{ zIndex: 1 }}>

        {/* Eyebrow */}
        <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
          <span className="opacity-50">7.0</span>
          <span className="opacity-80">Email Newsletter</span>
        </div>

        {/* Heading */}
        <h2
          className="font-inter-tight font-semibold text-transparent bg-clip-text"
          style={{
            fontSize: 64, lineHeight: 1, letterSpacing: '-0.02em',
            backgroundImage: 'linear-gradient(98.203deg, #ffffff 0.176%, #b7b7b7 98.822%)',
          }}
        >
          Get Updates
        </h2>

        {/* Subtitle */}
        <p className="font-inter-tight font-medium text-text-l text-white/60 text-center" style={{ maxWidth: 460 }}>
          Stay informed about Anthropic stock news and new investment rounds.
        </p>

        {/* Form */}
        {submitted ? (
          <div
            className="flex items-center justify-center font-inter-tight font-medium text-text-l text-status-open"
            style={{ height: 56, padding: '0 24px', borderRadius: 14, background: 'rgba(77,186,121,0.1)', border: '1px solid rgba(77,186,121,0.25)' }}
          >
            ✓ You're subscribed!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex items-center gap-2" style={{ maxWidth: 480, width: '100%' }}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yourmail@gmail.com"
              className="flex-1 font-inter-tight font-medium text-text-m text-white placeholder:text-white/40 focus:outline-none transition-colors"
              style={{
                height: 56, padding: '0 20px', borderRadius: 14,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            />
            <button
              type="submit"
              className="shrink-0 font-inter-tight font-semibold text-text-m text-phone-bg hover:scale-[1.02] transition-transform focus-visible:outline-none"
              style={{ height: 56, padding: '0 28px', borderRadius: 14, background: '#fff' }}
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
