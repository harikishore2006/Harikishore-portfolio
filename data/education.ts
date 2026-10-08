export type EducationItem = {
  school: string;
  degree: string;
  range: string;
  location: string;
  specialization?: string;
  result: string;
  skills?: string[];
  website?: string;
};

export const education: EducationItem[] = [
  {
    school: "Kongunadu College of Engineering and Technology",
    degree: "B.Tech Artificial Intelligence & Data Science",
    range: "2023 to 2027",
    location: "Trichy, Tamil Nadu",
    specialization: "NLP, AI & ML, Data Analytics",
    result: "CGPA: 8.38/10.00",
    skills: [
      "Event Organization",
      "Python",
      "Java",
      "AI Tools",
      "HTML/JavaScript/CSS",
      "MS Excel",
      "Canva Design",
      "Image Processing",
      "Data Visualization",
    ],
    website: "https://kongunadu.ac.in/",
  },
  {
    school: "Brindhavan Higher Secondary School",
    degree: "High School",
    range: "2019 to 2021",
    location: "Pattukkottai, Thanjavur",
    result: "Percentage: 89/100",
    website: "https://brindhavanpublicschool.in/",
  },
];
