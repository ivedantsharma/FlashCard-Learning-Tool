import React from "react";
import styled from "styled-components";
import FlashcardContainer from "./components/FlashcardContainer";

function App() {
  return (
    <StyledApp>
      <h1>Flashcard Learning Tool</h1>
      <FlashcardContainer />
    </StyledApp>
  );
}

const StyledApp = styled.div`
  text-align: center;
  background-color: #e0f7fa;
  padding: 40px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Arial", sans-serif;

  h1 {
    font-size: 48px;
    margin-bottom: 30px;
    color: #00796b;
    text-shadow: 2px 2px #004d40;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 36px;
      margin-bottom: 20px;
    }
    padding: 20px;
  }
`;

export default App;
