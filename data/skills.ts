export type SkillGroup = {
  name: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    name: "Programming",
    items: ["Python", "Java", "SQL"],
  },
  {
    name: "AI & Data",
    items: [
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "Computer Vision",
      "Data Analysis",
      "YOLOv8",
      "OpenCV",
      "Scikit-learn",
      "TensorFlow",
      "NumPy",
      "Pandas",
    ],
  },
  {
    name: "Web",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "Flask",
      "Django",
      "FastAPI",
      "Node.js",
      "MySQL",
      "MongoDB",
      "Cassandra",
      "Firebase",
      "Supabase",
    ],
  },
  {
    name: "Tools",
    items: ["Git", "GitHub", "Canva", "Figma", "VS Code", "MS Excel"],
  },
];
