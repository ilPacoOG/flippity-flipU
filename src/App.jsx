import React, { useState, useEffect } from 'react'
import FlashcardList from './components/FlashcardList'
import './app.css'
import axios from 'axios'
import { use } from 'react'

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)

  useEffect(() => {
    axios
        .get ('https://opentdb.com/api.php?amount=10&category=14')
        .then(res => {
            setFlashcards(res.data.results.map((questionItem, index) => {
                const answer = questionItem.correct_answer
                const options = [...questionItem.incorrect_answers, answer]
            return {
                id: `${index}-${Date.now()}`,
                question: questionItem.question,
                answer: answer,
                options: options.sort(() => Math.random() - .5)

                }
            }))
            console.log(res.data)
        })
    }, [])

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
