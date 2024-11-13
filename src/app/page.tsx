'use client'

import { useEffect, useState } from 'react';

interface CaptchaResponse {
  question: string;
  answer: number;
}

export default function Home() {
  const [question, setQuestion] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [message, setMessage] = useState<string>('');

  const fetchCaptcha = async () => {
    const response = await fetch('/api/captcha');
    const data: CaptchaResponse = await response.json();
    setQuestion(data.question);
    setCorrectAnswer(data.answer);
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('/api/captcha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userAnswer, correctAnswer }),
    });

    const data = await response.json();
    if (data.isCorrect) {
      setMessage('CAPTCHA verified successfully!');
    } else {
      setMessage('Incorrect answer. Please try again.');
      fetchCaptcha(); // Fetch a new question
    }
    setUserAnswer(''); // Clear the input field
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 className="title">Simple CAPTCHA Demo</h1>
      <form onSubmit={handleSubmit}>
        <label >
          <span className="custom-label"> {question} </span>
          <input
            type="text"
            className="form-control"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            required
          />
        </label>
        <button className='btn' type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}