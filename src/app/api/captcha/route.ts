import { NextResponse } from 'next/server';

interface CaptchaResponse {
  question: string;
  answer: number;
}

// Handle GET requests
export async function GET() {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const question = `${num1} + ${num2}`;
  const answer = num1 + num2;

  return NextResponse.json({ question, answer } as CaptchaResponse);
}

// Handle POST requests
export async function POST(request: Request) {
  const { userAnswer, correctAnswer } = await request.json();

  const isCorrect = parseInt(userAnswer) === correctAnswer;
  return NextResponse.json({ isCorrect });
}