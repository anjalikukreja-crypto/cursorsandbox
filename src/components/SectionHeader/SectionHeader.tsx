import './SectionHeader.css'

interface SectionHeaderProps {
  title: string
  linkLabel: string
}

export function SectionHeader({ title, linkLabel }: SectionHeaderProps) {
  return (
    <header className="section-header">
      <h3 className="section-header__title">{title}</h3>
      <button type="button" className="section-header__link">
        {linkLabel}
      </button>
    </header>
  )
}
