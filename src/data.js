// data.js
export const exams = [
  {
    id: 1,
    title: 'Python Fundamentals',
    duration: 30,
    questionsCount: 3,
    difficulty: 'Beginner'
  },
  {
    id: 2,
    title: 'Web Development Basics',
    duration: 45,
    questionsCount: 3,
    difficulty: 'Intermediate'
  },
  {
    id: 3,
    title: 'Advanced Programming',
    duration: 60,
    questionsCount: 3,
    difficulty: 'Advanced'
  }
];

export const questions = {
  1: [
    {
      id: 1,
      question: "Which language runs in a web browser?",
      options: ["Java", "C", "Python", "JavaScript"],
      answer: "JavaScript"
    },
    {
      id: 2,
      question: "What does CSS stand for?",
      options: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"],
      answer: "Cascading Style Sheets"
    },
    {
      id: 3,
      question: "What does HTML stand for?",
      options: ["Hypertext Markup Language", "Hypertext Markdown Language", "Hyperloop Machine Language", "Helicopters Terminals Motorboats Lamborginis"],
      answer: "Hypertext Markup Language"
    }
  ],
  2: [
    {
      id: 1,
      question: "What is React?",
      options: ["A programming language", "A JavaScript library for building user interfaces", "A database management system", "An operating system"],
      answer: "A JavaScript library for building user interfaces"
    },
    {
      id: 2,
      question: "Which of the following is NOT a JavaScript framework?",
      options: ["Angular", "Vue", "React", "Django"],
      answer: "Django"
    },
    {
      id: 3,
      question: "What is the purpose of localStorage?",
      options: ["To store data permanently in a database", "To store data temporarily in the browser", "To manage server-side sessions", "To handle HTTP requests"],
      answer: "To store data temporarily in the browser"
    }
  ],
  3: [
    {
      id: 1,
      question: "What is a closure in JavaScript?",
      options: [
        "A function that has access to variables in its outer scope",
        "A way to close a web page",
        "A method to terminate a program",
        "A type of loop"
      ],
      answer: "A function that has access to variables in its outer scope"
    },
    {
      id: 2,
      question: "What is the Virtual DOM?",
      options: [
        "A direct copy of the real DOM",
        "A virtual representation of the real DOM kept in memory",
        "A database object model",
        "A server-side rendering technique"
      ],
      answer: "A virtual representation of the real DOM kept in memory"
    },
    {
      id: 3,
      question: "What does API stand for?",
      options: [
        "Application Programming Interface",
        "Advanced Programming Instruction",
        "Automated Program Integration",
        "Application Process Integration"
      ],
      answer: "Application Programming Interface"
    }
  ]
};
