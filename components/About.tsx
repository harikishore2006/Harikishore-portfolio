import { Education } from "@/components/Education";
import { Section, SectionHeading } from "@/components/ui/Section";

export function About() {
  return (
    <Section id="about" className="px-5 sm:px-8 lg:px-10 xl:px-14">
      <SectionHeading
        eyebrow="01 / ABOUT ME"
        title="Engineer with a creative, data-driven mindset."
        singleLineTitle
      />

      <div className="grid gap-10 border-b border-black/15 pb-14 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">
        <p className="max-w-5xl text-2xl font-normal leading-[1.28] tracking-[-0.045em] text-[#292925] sm:text-3xl md:text-4xl">
          I&apos;m a final-year B.Tech Artificial Intelligence &amp; Data Science student at Kongunadu College of Engineering and Technology. I work across Python, Java, AI, machine learning, NLP, and modern frontend development to build practical technology solutions.
        </p>
        <div className="space-y-5 self-end text-base leading-7 text-[#65655f]">
          <p>
            Alongside development, I have six months of web and poster design experience at PencilBitz, bringing a visual perspective to the products I build.
          </p>
          <p>
            I&apos;ve served as Treasurer and Joint Secretary and currently serve as Secretary of the AI &amp; DS Department, helping organize workshops and events.
          </p>
        </div>
      </div>

      <div className="pt-14">
        <Education />
      </div>
    </Section>
  );
}
