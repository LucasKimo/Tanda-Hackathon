// Icebreaker questions based on skills (hackathon-themed)
const ICEBREAKER_MAP: Record<string, string[]> = {
  'Frontend Development': [
    "What frontend frameworks do you prefer?",
    "Have you worked with React or Vue before?",
    "What's your favorite UI library?",
  ],
  'Backend Development': [
    "What backend stack do you usually use?",
    "Do you prefer REST APIs or GraphQL?",
    "What databases are you most comfortable with?",
  ],
  'Full Stack': [
    "What's your go-to tech stack for hackathons?",
    "Do you lean more frontend or backend?",
    "What's your favorite full-stack framework?",
  ],
  'UI/UX Design': [
    "What design tools do you use?",
    "Have you done design for hackathons before?",
    "What's your design process like?",
  ],
  'Product Design': [
    "How do you approach product design in time-constrained projects?",
    "What products have you designed recently?",
    "Do you use Figma or Sketch?",
  ],
  'AI/ML': [
    "What ML frameworks are you comfortable with?",
    "Have you integrated AI into apps before?",
    "What's your favorite AI use case?",
  ],
  'Data Science': [
    "What data tools do you use most?",
    "Have you built data dashboards before?",
    "What's your go-to for data analysis?",
  ],
  'DevOps': [
    "What cloud platforms do you work with?",
    "Have you set up CI/CD pipelines before?",
    "What's your containerization experience?",
  ],
  'Mobile Development': [
    "Do you do native or cross-platform development?",
    "Have you used React Native or Flutter?",
    "iOS or Android?",
  ],
  'Blockchain': [
    "What blockchain platforms do you work with?",
    "Have you built Web3 apps before?",
    "Solidity or Rust?",
  ],
  'Cloud Architecture': [
    "AWS, Azure, or GCP?",
    "What's your experience with serverless?",
    "Have you built microservices before?",
  ],
  'Product Management': [
    "How do you prioritize features in a hackathon?",
    "What's your approach to MVP scope?",
    "Have you led product teams before?",
  ],
  'Business Strategy': [
    "What's your approach to go-to-market strategy?",
    "Have you pitched startup ideas before?",
    "How do you validate business ideas quickly?",
  ],
  'Marketing': [
    "What marketing channels work best for new products?",
    "Have you done growth hacking before?",
    "How would you market a hackathon project?",
  ],
  'Content Creation': [
    "What content formats do you create?",
    "Have you created demo videos before?",
    "What's your content creation process?",
  ],
  'Pitching/Presentation': [
    "Have you pitched at hackathons before?",
    "What makes a great demo?",
    "Do you have experience with pitch decks?",
  ],
  'Project Management': [
    "What tools do you use for project management?",
    "How do you keep teams on track during sprints?",
    "Have you managed hackathon teams before?",
  ],
  'Research': [
    "What research methods do you use?",
    "How do you validate ideas quickly?",
    "Do you do user research?",
  ],
};

// Generic fallback questions
const GENERIC_QUESTIONS = [
  "What kind of project are you thinking of building?",
  "Have you done hackathons before?",
  "What role do you usually take on teams?",
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