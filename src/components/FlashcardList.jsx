import React from 'react'
import Flashcard from './flashcard'

export default function flashcardList({ flashcards }) {
  return (
    <div className='card-grid'>
        {flashcards.map(flashcard => {
            return <Flashcard flashcard={flashcard} key={flashcard.id} />
        })}
      
    </div>
  )
}

