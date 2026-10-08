export type ExperienceItem = {
  title: string;
  company: string;
  period: string;
  description: string;
  grade?: string;
  current?: boolean;
  certificate?: string;
};

export const experience: ExperienceItem[] = [
  {
    title: "NLP Internship",
    company: "Sun Software Solutions",
    period: "02-06-2025 to 17-06-2025",
    description: "Natural Language Processing Specialization.",
    grade: "A - Excellent",
    certificate: "/images/nlp-internship-certificate.jpg",
  },
  {
    title: "AWS Internship",
    company: "iSquare Data Systems (P) Ltd",
    period: "24-11-2025 to 10-12-2025",
    description: "Completed 15 days of internship training on AWS.",
    certificate: "/images/aws-internship-certificate.jpeg",
  },
  {
    title: "Web & Poster Designer",
    company: "PencilBitz",
    period: "6 months of work experience",
    description: "Web design and poster design, creative visual content.",
  },
];

export const leadership = [
  {
    title: "Secretary",
    description: "Organizing workshops and technical events for the department.",
    current: true,
  },
  {
    title: "Joint Secretary",
    description: "Supporting department activities and coordinating programs.",
  },
  {
    title: "Treasurer",
    description: "Supporting department activities and events.",
  },
  {
    title: "Hackathon Team Leader",
    description: "Finalist and Team Leader at CMR Hackfest 3.0.",
  },
  {
    title: "Technical Event Organizer",
    description: "Organizing workshops and events.",
  },
  {
    title: "Designer",
    description: "Poster and web design at PencilBitz.",
  },
];
