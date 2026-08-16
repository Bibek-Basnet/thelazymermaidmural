"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FAQItem = {
  question: string;
  answer: string;
  color: string;
};

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How much does a mural cost?",
    answer:
      "It depends on the size, surface and complexity of the design. After a chat about your space and vision, I'll put together a personalised quote - most residential murals sit within a 600–3000 NZD range, but public and commercial work varies more.",
    color: "#D93E87",
  },
  {
    question: "Do you need a deposit before starting?",
    answer:
      "Yes - a 50% deposit secures your booking and we move into the design stage. The remaining 50% is due once your mural is complete.",
    color: "#FFB162",
  },
  {
    question: "What surfaces can you paint on?",
    answer:
      "Walls, floors, coffee trailers, electrical boxes, shipping containers, buses - if it holds paint, it's probably fair game. Send a photo of your space and I'll let you know what prep it needs.",
    color: "#5EC1CF",
  },
  {
    question: "How long does a mural take?",
    answer:
      "Smaller interior pieces can take a few days, larger exterior or public murals can take a couple of weeks. Weather, surface condition and design complexity all play a part - I'll give you a realistic timeframe once I've seen the space.",
    color: "#F09580",
  },
  {
    question: "Can I see what the design will look like before you paint?",
    answer:
      "Always. I'll create your custom design and digitally place it onto photos of your actual space, so you can get a proper feel for the finished mural before a drop of paint goes down. We refine it together until it's right.",
    color: "#D93E87",
  },
  {
    question: "Will the mural hold up outdoors?",
    answer:
      "Yes - exterior murals are painted with quality outdoor paints and finished with a protective sealant, so they're built to handle sun, rain and everyday wear.",
    color: "#FFB162",
  },
];

function FAQRow({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-ink/10 py-5 lg:py-6">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="flex items-center gap-3">
          <span
            className="hidden h-2 w-2 shrink-0 rounded-full sm:block"
            style={{ backgroundColor: item.color }}
            aria-hidden="true"
          />
          <span className="font-[var(--font-fraunces)] text-lg font-bold text-ink lg:text-xl">
            {item.question}
          </span>
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: item.color }}
        >
          <i className="ti ti-plus text-base text-white" aria-hidden="true" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pt-3 text-sm leading-relaxed text-ink-soft sm:pl-5 lg:pt-4 lg:text-[15px]">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="faq" className="bg-cream px-6 py-20 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 lg:mb-14">
          <p className="text-sm font-bold uppercase tracking-wide text-ink-soft">
            FAQ
          </p>
          <h2 className="mt-2 font-[var(--font-fraunces)] text-3xl font-bold text-magenta lg:text-4xl">
            Questions, answered
          </h2>
        </div>

        <div>
          {FAQ_ITEMS.map((item, index) => (
            <FAQRow
              key={item.question}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}