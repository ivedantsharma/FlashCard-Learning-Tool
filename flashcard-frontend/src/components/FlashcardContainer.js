import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Flashcard from "./Flashcard";

const categoriesData = ["JavaScript", "Database", "React", "Node.js", "CSS"];

const flashcardsData = [
  {
    question: "What is a closure?",
    answer:
      "A closure is a function that retains access to its lexical scope, even when the function is executed outside that scope.",
    category: "JavaScript",
  },
  {
    question: "What is a promise?",
    answer:
      "A promise is an object that represents the eventual completion or failure of an asynchronous operation.",
    category: "JavaScript",
  },
  {
    question: "What is normalization?",
    answer:
      "Normalization is the process of organizing data to reduce redundancy and improve data integrity.",
    category: "Database",
  },
  {
    question: "What is an index in SQL?",
    answer:
      "An index is a database object that improves the speed of data retrieval operations on a table.",
    category: "Database",
  },
  {
    question: "What is JSX?",
    answer:
      "JSX is a syntax extension for JavaScript that allows writing HTML-like code within JavaScript.",
    category: "React",
  },
  {
    question: "What is a component in React?",
    answer:
      "A component is a reusable piece of UI that can be either a class or a function.",
    category: "React",
  },
  {
    question: "What is middleware in Node.js?",
    answer:
      "Middleware is a function that has access to the request, response, and the next function in the application's request-response cycle.",
    category: "Node.js",
  },
  {
    question: "What is Express.js?",
    answer:
      "Express.js is a web application framework for Node.js designed for building web applications and APIs.",
    category: "Node.js",
  },
  {
    question: "What is Flexbox?",
    answer:
      "Flexbox is a layout model in CSS that allows responsive alignment and distribution of space within a container.",
    category: "CSS",
  },
  {
    question: "What is the Box Model in CSS?",
    answer:
      "The Box Model is a box that wraps around every HTML element, consisting of margins, borders, padding, and the actual content.",
    category: "CSS",
  },
];

const FlashcardContainer = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Initialize categories and flashcards
    setCategories(categoriesData);
  }, []);

  useEffect(() => {
    // Filter flashcards based on the selected category
    if (selectedCategory) {
      const filteredFlashcards = flashcardsData.filter(
        (flashcard) => flashcard.category === selectedCategory
      );
      setFlashcards(filteredFlashcards);
    } else {
      setFlashcards(flashcardsData);
    }
    setCurrentIndex(0);
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
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
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
