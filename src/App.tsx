//need to convert the file to use typescript

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import FlashcardList from './components/FlashcardList';
import './app.css';
import axios from 'axios';

interface Flashcard {
    id: number;
    question: string;
    answer: string;
    options: string[];
}

interface Category {
    id: number;
    name: string;
}

function App() {
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const categoryEl = useRef<HTMLSelectElement>(null);
    const amountEl = useRef<HTMLInputElement>(null);

    useEffect(() => {
        axios.get('https://opentdb.com/api_category.php').then((res) => {
            setCategories(res.data.trivia_categories);
        });
    }, []);

    function decodeString(str: string): string {
        const textArea = document.createElement('textarea');
        textArea.innerHTML = str;
        return textArea.value;
    }

    useEffect(() => {
        axios.get('https://opentdb.com/api.php?amount=10').then((res) => {
            setFlashcards(
                res.data.results.map((questionItem: any, index: number) => {
                    const answer = decodeString(questionItem.correct_answer);
                    const options = [...questionItem.incorrect_answers.map((a: string) => decodeString(a)), answer];
                    return {
                        id: index,
                        question: decodeString(questionItem.question),
                        answer: answer,
                        options: options.sort(() => Math.random() - 0.5),
                    };
                })
            );
            console.log(res.data);
        });
    }, []);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        axios
            .get('https://opentdb.com/api.php', {
                params: {
                    amount: amountEl.current?.value,
                    category: categoryEl.current?.value,
                },
            })
            .then((res) => {
                setFlashcards(
                    res.data.results.map((questionItem: any, index: number) => {
                        const answer = decodeString(questionItem.correct_answer);
                        const options = [...questionItem.incorrect_answers.map((a: string) => decodeString(a)), answer];
                        return {
                            id: `${index}-${Date.now()}`,
                            question: decodeString(questionItem.question),
                            answer: answer,
                            options: options.sort(() => Math.random() - 0.5),
                        };
                    })
                );
            });
    }

    return (
        <>
            <form className="header" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select id="category" ref={categoryEl}>
                        {categories.map((category) => {
                            return (
                                <option value={category.id} key={category.id}>
                                    {category.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Number of Questions</label>
                    <input type="number" id="amount" min="1" step="1" defaultValue={10} ref={amountEl} />
                </div>
                <div className="form-group">
                    <button className="btn">Generate</button>
                </div>
            </form>
            <div className="container">
                <FlashcardList flashcards={flashcards} />
            </div>
        </>
    );
}

export default App;
