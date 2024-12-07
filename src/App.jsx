import { useState } from 'react'
import FlashcardList from './components/flashcardList'
import './app.css'

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)

  return (
    <FlashcardList flashcards={flashcards} />
    
  )
}

const SAMPLE_FLASHCARDS = [
  {
      id: 1,
      question: 'What is the capital of France?',
      answer: 'Paris',
      options: [
          'New York',
          'London',
          'Paris',
          'Dublin'
      ]
  },
  {
      id: 2,
      question: 'Who is CEO of Tesla?',
      answer: 'Elon Musk',
      options: [
          'Jeff Bezos',
          'Elon Musk',
          'Bill Gates',
          'Tony Stark'
      ]
  },
  {
      id: 3,
      question: 'The iPhone was created by which company?',
      answer: 'Apple',
      options: [
          'Apple',
          'Intel',
          'Amazon',
          'Microsoft'
      ]
  },
  {
      id: 4,
      question: 'How many Harry Potter books are there?',
      answer: '7',
      options: [
          '5',
          '6',
          '7',
          '8'
      ]
  }
]

export default App
