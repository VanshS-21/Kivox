import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const faqCategories = [
  {
    label: "Common Questions",
    items: [
      {
        question: "How much does a website project cost?",
        answer: "Every project is different, but our website projects typically start at $3,500. After our initial call, we provide a detailed proposal with clear pricing and no hidden fees."
      },
      {
        question: "How long will it take to build?",
        answer: "Most standard websites take between 4 to 6 weeks from our kickoff meeting to launch. Custom web applications or larger redesigns usually take 8 to 12 weeks."
      },
      {
        question: "What do I need to provide?",
        answer: "We'll need your logo, brand guidelines (if you have them), and any specific photos or copy you want included. We provide copywriting and stock photography services if you need help with content."
      },
      {
        question: "How do revisions work?",
        answer: "We include two rounds of revisions at each major milestone (design and development). This ensures you have plenty of opportunity to provide feedback and shape the final product."
      },
      {
        question: "Can I update the website myself?",
        answer: "Yes. We build our sites with easy-to-use content management systems (CMS) and provide a training session before launch so you and your team can easily update text, images, and blog posts."
      }
    ]
  }
];

export function HomeFAQ() {
  return (
    <Section className="bg-background">
      <Container className="max-w-4xl">
        <div className="mb-12 md:mb-16">
          <h2 className="studio-h2-editorial text-foreground">Frequently Asked Questions</h2>
          <p className="mt-4 text-muted-foreground studio-body">
            Everything you need to know about working with us.
          </p>
        </div>
        
        <FaqAccordion categories={faqCategories} />
      </Container>
    </Section>
  );
}
