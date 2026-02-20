export interface CardProps {
  /** Card heading text */
  heading: string;
  /** Secondary/subtext content */
  subtext: string;
  /** Primary button label */
  buttonLabel: string;
  /** Click handler for the primary button */
  onButtonClick?: () => void;
}
