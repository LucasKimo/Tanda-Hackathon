// src/utils/icebreakers.ts

// Icebreaker questions based on interests
const ICEBREAKER_MAP: Record<string, string[]> = {
  AI: [
    "What's the most exciting AI development you've seen lately?",
    "Are you building anything with AI?",
    "What's your take on where AI is heading?",
  ],
  Design: [
    "What kind of products do you enjoy designing?",
    "What's your favorite design tool?",
    "What design trends are you excited about?",
  ],
  Startups: [
    "Are you working on anything on the side?",
    "What startup ideas are you excited about?",
    "What's the biggest challenge you're facing right now?",
  ],
  Data: [
    "What kind of data problems are you working on?",
    "What's your favorite data visualization tool?",
    "What's the most interesting insight you've discovered from data?",
  ],
  ML: [
    "What ML models are you working with?",
    "What's your favorite ML framework?",
    "What's the most interesting ML project you've seen?",
  ],
  Web3: [
    "What Web3 projects are you following?",
    "What's your take on the future of Web3?",
    "Are you building anything in the Web3 space?",
  ],
  Growth: [
    "What growth strategies are working for you?",
    "What's your biggest growth challenge?",
    "What growth channels are you exploring?",
  ],
  Content: [
    "What kind of content do you create?",
    "What's your content creation process?",
    "What content creators do you follow?",
  ],
  Sales: [
    "What's your sales process like?",
    "What's working well for you in sales?",
    "What sales challenges are you facing?",
  ],
  "Developer Tools": [
    "What developer tools are you building or using?",
    "What's missing in the developer tools space?",
    "What's your favorite developer tool?",
  ],
  "Open Source": [
    "What open source projects are you contributing to?",
    "Are you maintaining any open source projects?",
    "What open source projects are you excited about?",
  ],
  Psychology: [
    "What psychology topics interest you most?",
    "How do you apply psychology in your work?",
    "What's the most interesting psychological study you've read?",
  ],
  Research: [
    "What are you researching right now?",
    "What research methods do you use?",
    "What's the most interesting research you've come across?",
  ],
  Marketing: [
    "What marketing channels are working for you?",
    "What's your marketing strategy?",
    "What marketing trends are you following?",
  ],
  Product: [
    "What products are you working on?",
    "What's your product development process?",
    "What product challenges are you facing?",
  ],
};

// Generic fallback questions
const GENERIC_QUESTIONS = [
  "What brings you to this event?",
  "What are you working on right now?",
  "What kind of projects or collaborations are you looking for?",
];

export function getIcebreakerQuestions(interests: string[]): string[] {
  const questions: string[] = [];
  const seenQuestions = new Set<string>();

  // Get questions for each interest
  for (const interest of interests) {
    const interestQuestions = ICEBREAKER_MAP[interest];
    if (interestQuestions) {
      for (const question of interestQuestions) {
        if (!seenQuestions.has(question)) {
          questions.push(question);
          seenQuestions.add(question);
          if (questions.length >= 3) break;
        }
      }
    }
    if (questions.length >= 3) break;
  }

  // Fill with generic questions if needed
  if (questions.length < 3) {
    for (const question of GENERIC_QUESTIONS) {
      if (!seenQuestions.has(question)) {
        questions.push(question);
        seenQuestions.add(question);
        if (questions.length >= 3) break;
      }
    }
  }

  return questions;
}
