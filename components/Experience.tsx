import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { experience, leadership } from "@/data/experience";

export function Experience() {
  return (
    <Section id="experience" className="px-5 sm:px-8 lg:px-10 xl:px-14">
      <SectionHeading
        eyebrow="03 / EXPERIENCE"
        title="Experience shaped by craft and collaboration."
        description="Professional design work, technical training, and the people-facing work of leading student activities."
      />

      <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div>
          <p className="mb-6 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#9a6a22]">
            Work &amp; training
          </p>
          <div className="divide-y divide-black/15 border-y border-black/15">
            {experience.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="grid gap-3 py-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-8">
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.035em] text-[#171715] sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#65655f]">{item.company}</p>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-[#65655f]">{item.description}</p>
                    {item.grade ? <p className="mt-2 text-xs font-medium text-[#9a6a22]">{item.grade}</p> : null}
                    {item.title.includes("Internship") ? (
                      <a
                        href={item.certificate ?? undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-disabled={!item.certificate}
                        title={item.certificate ? undefined : "AWS certificate has not been uploaded yet"}
                        className="mt-5 inline-flex min-h-10 items-center gap-2 border border-black/20 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#171715] transition-colors hover:border-[#9a6a22] hover:text-[#9a6a22] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a6a22]"
                      >
                        View certificate
                        <span aria-hidden="true">↗</span>
                      </a>
                    ) : null}
                  </div>
                  <span className="text-[0.62rem] font-medium uppercase tracking-[0.12em] text-[#73736c] sm:pt-1 sm:text-right">
                    {item.period}
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-6 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#9a6a22]">
            Department leadership
          </p>
          <div className="divide-y divide-black/15 border-y border-black/15">
            {leadership
              .filter((item) => ["Secretary", "Joint Secretary", "Treasurer"].includes(item.title))
              .map((item, index) => (
                <Reveal key={item.title} delay={index * 0.07}>
                  <article className="flex items-start justify-between gap-4 py-6">
                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.035em] text-[#171715]">{item.title}</h3>
                      <p className="mt-2 max-w-sm text-sm leading-6 text-[#65655f]">{item.description}</p>
                    </div>
                    {item.current ? (
                      <Badge className="shrink-0 border-[#9a6a22]/40 text-[#9a6a22]">Current</Badge>
                    ) : null}
                  </article>
                </Reveal>
              ))}
          </div>
          <Card className="mt-8 border-[#171715] bg-[#171715] p-6 text-[#f3f3f0]">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#e7a847]">Beyond the classroom</p>
            <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.04em]">
              Finalist &amp; team leader
            </h3>
            <p className="mt-2 text-sm text-white/65">CMR Hackfest 3.0</p>
          </Card>
        </div>
      </div>
    </Section>
  );
}
