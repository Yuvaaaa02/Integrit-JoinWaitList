import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'When will CaptionIntegrit officially launch?',
    answer:
      'We are targeting a public launch in Q4 2025. Waitlist members will receive early access 4–6 weeks before the public release, along with exclusive launch pricing locked in forever.',
  },
  {
    question: 'Which Adobe applications does  Caption Integrit support?',
    answer:
      'Integrit natively integrates with Adobe Premiere Pro (v22+) and Adobe After Effects (v22+). Both Windows and macOS are fully supported. Resolve and FCPX integrations are on the roadmap.',
  },
  {
    question: 'How accurate is the AI caption generation?',
    answer:
      'Our models achieve 96–99% word error rate accuracy on clean audio in English and 120+ supported languages. The plugin includes an in-timeline correction interface for the rare edge cases.',
  },
  {
    question: 'Does Caption Integrit require an internet connection?',
    answer:
      'AI transcription requires a brief cloud connection for processing. Styling, editing, and export functionality works fully offline. Enterprise plans include local model options.',
  },
  {
    question: 'What languages are supported?',
    answer:
      'Caption Integrit currently supports 120+ languages including English, Spanish, French, German, Portuguese, Mandarin, Hindi, Arabic, Japanese, Korean, and many more. Full language list is available on our documentation page.',
  },
  {
    question: 'How is pricing structured?',
    answer:
      '   Caption Integrit will offer a monthly subscription with plans for solo editors, teams, and studios. Waitlist members will receive a permanent 40% discount on launch pricing. Final pricing will be announced closer to launch.',
  },
  {
    question: 'Can I export captions in different formats?',
    answer:
      'Yes.  Caption Integrit supports export to SRT, VTT, TTML, and embedded burn-in. You can also export caption data as XML for further processing in third-party tools.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'All audio data sent for processing is encrypted in transit and immediately deleted after transcription completes. We do not store, train on, or share your content. SOC 2 compliance is in progress.',
  },
]

function FaqItem({ question, answer, isOpen, onToggle, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`glass rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'neon-border' : 'border border-white/08'
        }`}
    >
      <button
        id={`faq-item-${index}`}
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className={`font-semibold text-base transition-colors duration-300 ${isOpen ? 'text-accent' : 'text-white group-hover:text-accent'
            }`}
        >
          {question}
        </span>
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ml-4 transition-all duration-300 ${isOpen
              ? 'bg-accent/15 border border-accent/30'
              : 'glass border border-white/10 group-hover:border-accent/20'
            }`}
        >
          {isOpen ? (
            <Minus className="w-3.5 h-3.5 text-accent" />
          ) : (
            <Plus className="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-colors" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="accordion-content"
          >
            <p className="px-6 pb-5 text-text-muted text-sm leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section id="faq" className="section-pad bg-bg-secondary relative">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="glass neon-border rounded-full px-4 py-1.5">
              <span className="font-mono text-xs text-accent tracking-widest uppercase">FAQ</span>
            </div>
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-white mb-4">
            GOT QUESTIONS?
          </h2>
          <p className="text-text-muted text-lg">
            Everything you need to know about Integrit before joining the waitlist.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              index={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
