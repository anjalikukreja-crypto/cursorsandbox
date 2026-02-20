import './Card.css';

interface CardProps {
  heading: string;
  subtext: string;
  buttonLabel: string;
  onButtonClick?: () => void;
}

export function Card({ heading, subtext, buttonLabel, onButtonClick }: CardProps) {
  return (
    <article className="radiant-card">
      <h3 className="radiant-card__heading">{heading}</h3>
      <p className="radiant-card__subtext">{subtext}</p>
      <button
        type="button"
        className="radiant-card__button"
        onClick={onButtonClick}
      >
        {buttonLabel}
      </button>
    </article>
  );
}
