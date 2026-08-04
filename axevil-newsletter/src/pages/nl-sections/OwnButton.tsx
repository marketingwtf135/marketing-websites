import MailIcon from './MailIcon'

interface OwnButtonProps {
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  label?: string
  color?: string
  fullWidth?: boolean
}

/**
 * "own-btn" — uses DS `.cta-button-glow` for hover (translateY-4px + white box-shadow).
 * Matches the design system CtaButton behaviour exactly.
 */
export default function OwnButton({
  onClick, type = 'button', disabled = false,
  label = 'Подписаться на дайджест', color = '#202020', fullWidth = false,
}: OwnButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`cta-button-glow relative flex items-center justify-center gap-2 font-inter-tight font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-white disabled:opacity-60 transition-all duration-300${fullWidth ? ' w-full' : ' shrink-0'}`}
      style={{
        background: 'var(--white-100)',
        height: 'clamp(56px, 4.5vw, 64px)',
        paddingLeft: 32, paddingRight: 32,
        // Было 13 сверху и 16 снизу — надпись сидела выше центра кнопки.
        paddingTop: 14, paddingBottom: 14,
        borderRadius: 16,
        fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
        fontWeight: 600, lineHeight: '110%',
        letterSpacing: '-0.6px', color,
        fontFamily: '"Inter Tight", sans-serif',
      }}
    >
      <MailIcon color={color} />
      {label}
    </button>
  )
}
