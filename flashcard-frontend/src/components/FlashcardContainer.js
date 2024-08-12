import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Flashcard from "./Flashcard";

const FlashcardContainer = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get(
          selectedCategory
            ? `${process.env.REACT_APP_BACKEND_URL}/api/flashcards/${selectedCategory}`
            : `${process.env.REACT_APP_BACKEND_URL}/api/flashcards`
        );
        setFlashcards(response.data);
        setCurrentIndex(0);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };

    fetchFlashcards();
  }, [selectedCategory]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };

  return (
    <Container>
      <CategorySelector
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Database">Database</option>
        {/* Add more categories as needed */}
      </CategorySelector>
      <CategoryTitle>
        Category: <span>{selectedCategory || "All"}</span>
      </CategoryTitle>
      {flashcards.length > 0 && (
        <Flashcard
          question={flashcards[currentIndex].question}
          answer={flashcards[currentIndex].answer}
        />
      )}
      <ButtonContainer>
        <NavButton onClick={handlePrevious}>Previous</NavButton>
        <NavButton onClick={handleNext}>Next</NavButton>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #e0f7fa;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  width: 80%;
  margin: 0 auto;
  max-width: 800px;
  font-family: "Arial", sans-serif;
`;

const CategorySelector = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #00796b;
  background-color: #ffffff;
  font-size: 16px;
  color: #00796b;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #004d40;
  }
`;

const CategoryTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #00796b;

  span {
    font-weight: bold;
    color: #004d40;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
`;

const NavButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #00796b;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #004d40;
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }
`;

export default FlashcardContainer;
