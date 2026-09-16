export default function SectionHeading({ index, eyebrow, title, description }) {
  return (
    <header className="section-heading reveal">
      <div className="section-index"><span>{String(index).padStart(2, '0')}</span><i /></div>
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="section-description">{description}</p>}
      </div>
    </header>
  );
}
