import React, { useState } from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 320px;
  height: 220px;
  background-color: #ffffff;
  border: none;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  perspective: 1200px;
  transition: transform 0.4s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardInner = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  position: relative;
  transform: ${({ isFlipped }) =>
    isFlipped ? "rotateY(180deg)" : "rotateY(0)"};
`;

const CardFace = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  padding: 20px;
  font-size: 20px;
  color: #333;
  box-sizing: border-box;
`;

const CardFront = styled(CardFace)`
  background-color: #fafafa;
`;

const CardBack = styled(CardFace)`
  background-color: #00796b;
  color: #ffffff;
  transform: rotateY(180deg);
`;

const Flashcard = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Card onClick={handleFlip}>
      <CardInner isFlipped={isFlipped}>
        <CardFront>
          <p>{question}</p>
        </CardFront>
        <CardBack>
          <p>{answer}</p>
        </CardBack>
      </CardInner>
    </Card>
  );
};

export default Flashcard;
