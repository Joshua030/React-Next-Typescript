import { useState } from "react";
import { Start } from "./partials/Start";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const startContainerStyle = {
  display: "flex",
};

interface StartRatingProps {
  maxRating: number;
  color?: string;
  size?: number;
  className?: string;
  defaultRating?: number;
  onSetRating?: (rating: number) => void;
}

const StartRating: React.FC<StartRatingProps> = ({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  defaultRating = 0,
  onSetRating,
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating: number): void {
    setRating(rating);
    if (onSetRating) {
      onSetRating(rating); // call only if defined
    }
  }

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={startContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Start
            key={i}
            onRate={() => handleRating(i + 1)}
            full={tempRating ? i < tempRating : i < rating}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>{tempRating || rating || ""}</p>
    </div>
  );
};

export default StartRating;
