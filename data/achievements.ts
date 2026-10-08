export type AchievementItem = {
  title: string;
  description: string;
  certificates?: { name: string; file: string }[];
};

export const achievements: AchievementItem[] = [
  {
    title: "Hackathons",
    description: "CMR Hackfest 3.0 finalist · 0x.Day participant · Tezario 24-hour hackathon participant",
    certificates: [
      { name: "0x.Day", file: "ox-day.png" },
      { name: "Tezario Hackathon 2025", file: "tezario-hackathon-2025.jpg" },
    ],
  },
  {
    title: "Industrial Visits",
    description: "KGiSL MicroCollege · AbserveTech · Cloud Computing",
    certificates: [
      { name: "KGiSL MicroCollege · 2024", file: "industrial-visit-kgisl-2024.jpg" },
      { name: "AbserveTech · MERN Stack · 2025", file: "industrial-visit-abservetech-2025.jpg" },
      {
        name: "KGiSL MicroCollege · Cloud Computing · 2025",
        file: "industrial-visit-cloud-computing-2025.jpg",
      },
    ],
  },
  {
    title: "Java Training",
    description: "Core Java value-added course · September 2024",
    certificates: [{ name: "Core Java", file: "core-java-training.jpg" }],
  },
  {
    title: "Workshops",
    description: "Manipulator Workshop · ExplelliarMus’24 · Kongu Engineering College · March 2024",
    certificates: [{ name: "Manipulator Workshop", file: "manipulator-workshop-kec-2024.jpg" }],
  },
  {
    title: "Paper Presentation",
    description: "Paper presentations at FIESTAA’26 and MEQUESTA’24",
    certificates: [
      { name: "MEQUESTA’24", file: "mequesta24-paper-presentation.png" },
    ],
  },
];
