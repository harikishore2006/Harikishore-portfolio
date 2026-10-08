export type Project = {
  id: string;
  number?: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  imageAspectRatio?: "wide" | "cinematic";
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    id: "weapon-detection",
    number: "01",
    slug: "weapon-detection",
    title: "Real-Time Weapon Detection and Mobile Alert System",
    shortTitle: "Weapon Detection & Mobile Alert",
    category: "AI / Computer Vision",
    description:
      "An AI-powered real-time weapon detection system that uses YOLOv8 and computer vision to identify weapons and trigger mobile alerts.",
    technologies: ["Python", "YOLOv8", "OpenCV", "AI", "Flutter", "Firebase"],
    image: "/projects/weapon-detection.png",
    imageAspectRatio: "cinematic",
  },
  {
    id: "isl-translator",
    number: "02",
    slug: "isl-translator",
    title: "Indian Sign Language Translator",
    shortTitle: "ISL Translator",
    category: "AI / Computer Vision / NLP",
    description:
      "A system that recognizes Indian Sign Language gestures using computer vision and machine learning, detects hand signs and translates them into readable text, aiding communication for the hearing-impaired.",
    technologies: ["Python", "Flask", "Computer Vision", "Machine Learning", "NLP"],
    image: "/projects/isl-translator.png",
    imageAspectRatio: "wide",
    github: "https://github.com/harikishore2006/sign-language.git",
  },
  {
    id: "spam-detection",
    number: "03",
    slug: "spam-detection",
    title: "E-mail Spam Detection",
    shortTitle: "E-mail Spam Detection",
    category: "Machine Learning / NLP",
    description:
      "A spam mail detection system using Natural Language Processing and machine learning to classify emails as spam or legitimate, focused on data preprocessing, model training, and evaluation with performance metrics.",
    technologies: ["Python", "Machine Learning", "NLP", "Pandas", "NumPy", "Scikit-learn"],
    image: "/projects/spam-detection.jpg",
    github: "https://github.com/harikishore2006/Spam-mail-detection",
  },
  {
    id: "plant-disease-detection",
    number: "04",
    slug: "plant-disease-detection",
    title: "Plant Disease Detection",
    shortTitle: "Plant Disease Detection",
    category: "AI / Deep Learning",
    description:
      "A PyTorch convolutional neural network trained on the PlantVillage dataset to classify leaf images into 39 plant disease categories, with a Flask web app for image-based detection.",
    technologies: ["Python", "PyTorch", "CNN", "Flask", "Deep Learning", "PlantVillage"],
    image: "/projects/plant-disease-detection.png",
    imageAspectRatio: "wide",
    github: "https://github.com/harikishore2006/Plant-Disease-Detection",
  },
];
