import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const FlashcardList = styled.div`
  width: 80%;
  margin: 20px 0;
`;

const FlashcardForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin-bottom: 20px;

  input,
  textarea {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const FlashcardItem = styled.div`
  background-color: #f9f9f9;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;

  button {
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #c82333;
    }
  }
`;

const backendURL =
  process.env.REACT_APP_BACKEND_URL ||
  "https://flachcards-quiz-backend-production.up.railway.app";

const Dashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await axios.get(`${backendURL}`);
      setFlashcards(response.data);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${backendURL}/api/flashcards/${editId}`, {
        question,
        answer,
        category,
      });
    } else {
      await axios.post(`${backendURL}/api/flashcards`, {
        question,
        answer,
        category,
      });
    }
    setQuestion("");
    setAnswer("");
    setCategory("");
    setEditId(null);
    fetchFlashcards();
  };

  const handleEdit = (flashcard) => {
    setQuestion(flashcard.question);
    setAnswer(flashcard.answer);
    setCategory(flashcard.category);
    setEditId(flashcard.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${backendURL}/api/flashcards/${id}`);
    fetchFlashcards();
  };

  return (
    <Container>
      <h1>Admin Dashboard</h1>
      <FlashcardForm onSubmit={handleAddOrUpdate}>
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <textarea
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <button type="submit">
          {editId ? "Update Flashcard" : "Add Flashcard"}
        </button>
      </FlashcardForm>

      <FlashcardList>
        {flashcards.map((flashcard) => (
          <FlashcardItem key={flashcard.id}>
            <div>
              <h3>{flashcard.question}</h3>
              <p>{flashcard.answer}</p>
              <p>
                <em>Category: {flashcard.category}</em>
              </p>
            </div>
            <div>
              <button onClick={() => handleEdit(flashcard)}>Edit</button>
              <button onClick={() => handleDelete(flashcard.id)}>Delete</button>
            </div>
          </FlashcardItem>
        ))}
      </FlashcardList>
    </Container>
  );
};

export default Dashboard;
