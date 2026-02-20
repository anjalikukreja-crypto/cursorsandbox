import React from 'react';
import { CardProps } from './Card.types';
import { Button } from '../Button';
import './Card.css';

export const Card: React.FC<CardProps> = ({
  heading,
  subtext,
  buttonLabel,
  onButtonClick,
}) => {
  return (
    <article className="radiant-card">
      <h3 className="radiant-card__heading">{heading}</h3>
      <p className="radiant-card__subtext">{subtext}</p>
      <Button variant="primary" size="medium" onClick={onButtonClick}>
        {buttonLabel}
      </Button>
    </article>
  );
};

export default Card;
