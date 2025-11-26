import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from './GlassUI';
import { ChevronDown, HelpCircle, Package, RefreshCw, Shield } from 'lucide-react';

const faqData = [
  {
    category: 'Allgemeine Fragen',
    icon: HelpCircle,
    items: [
      {
        q: 'Was ist Lumio?',
        a: 'Lumio ist deine Anlaufstelle für futuristische Beleuchtung und ästhetische Setups. Wir kuratieren die besten LED- und Neon-Produkte, um deinem Raum einen einzigartigen Vibe zu geben, egal ob für Gaming, Arbeit oder Entspannung.'
      },
      {
        q: 'Welche Produkte bietet ihr an?',
        a: 'Unser Sortiment umfasst eine breite Palette von Produkten, darunter smarte LED-Panels, Neon-Schilder, tragbare Gadgets, Umgebungsbeleuchtung und alles, was du für ein Gamer- oder Smart-Home-Setup benötigst.'
      },
      {
        q: 'Wie kann ich euch kontaktieren?',
        a: 'Bei Fragen oder Problemen erreichst du unseren Support am besten über das Kontaktformular auf unserer Website oder per E-Mail an nicogleichmann1@gmail.com. Wir bemühen uns, alle Anfragen innerhalb von 24 Stunden zu beantworten.'
      }
    ]
  },
  {
    category: 'Versand & Rückgabe',
    icon: Package,
    items: [
      {
        q: 'Wie hoch sind die Versandkosten?',
        a: 'Der Standardversand innerhalb Deutschlands ist ab einem Bestellwert von 30€ kostenlos. Darunter berechnen wir eine Pauschale von 4,99€. Die Kosten für internationalen Versand variieren je nach Zielland.'
      },
      {
        q: 'Wie lange dauert der Versand?',
        a: 'Bestellungen werden in der Regel innerhalb von 1-2 Werktagen bearbeitet. Die Lieferzeit mit unserem Standardversand beträgt dann zusätzlich 2-4 Werktage. Du erhältst eine Sendungsverfolgungsnummer, sobald dein Paket unterwegs ist.'
      },
      {
        q: 'Wie kann ich einen Artikel zurückgeben?',
        a: 'Du kannst unbenutzte Artikel innerhalb von 30 Tagen nach Erhalt zurücksenden. Bitte kontaktiere unseren Support, um eine Rücksendung anzumelden. Du erhältst dann alle notwendigen Informationen und ein Rücksendeetikett.'
      },
      {
        q: 'Wer trägt die Kosten für die Rücksendung?',
        a: 'Die Kosten für die Rücksendung werden von uns übernommen, wenn der Artikel fehlerhaft ist oder wir einen falschen Artikel geliefert haben. Bei einer Rücksendung aus anderen Gründen (z.B. Nichtgefallen) trägt der Käufer die unmittelbaren Kosten der Rücksendung.'
      }
    ]
  },
  {
    category: 'Bestellung & Bezahlung',
    icon: Shield,
    items: [
      {
        q: 'Welche Zahlungsmethoden akzeptiert ihr?',
        a: 'Wir akzeptieren eine Vielzahl von Zahlungsmethoden, darunter PayPal, Kreditkarte (Visa, MasterCard, American Express), Klarna (Kauf auf Rechnung) und Sofortüberweisung.'
      },
      {
        q: 'Wie sicher ist meine Bezahlung?',
        a: 'Deine Sicherheit hat für uns oberste Priorität. Alle Transaktionen werden über sichere, SSL-verschlüsselte Verbindungen abgewickelt. Wir speichern keine vollständigen Kreditkartendaten auf unseren Servern.'
      },
      {
        q: 'Kann ich meine Bestellung ändern oder stornieren?',
        a: 'Solange deine Bestellung noch nicht versandt wurde, können wir sie in der Regel noch ändern oder stornieren. Bitte kontaktiere unseren Support so schnell wie möglich mit deiner Bestellnummer. Sobald das Paket unterwegs ist, sind Änderungen leider nicht mehr möglich.'
      }
    ]
  }
];

const FaqItem: React.FC<{ q: string, a: string }> = ({ q, a }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-4 px-6 text-white"
      >
        <span className="font-bold">{q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0, marginTop: isOpen ? '0' : '-1rem' }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-4 text-gray-300">
          {a}
        </p>
      </motion.div>
    </motion.div>
  );
};

export const FAQPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-lumio-dark text-white font-sans selection:bg-lumio-neon selection:text-black">
      <section id="faq" className="py-20 px-6 pt-32">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-white">
              Häufig gestellte Fragen
            </h1>
            <p className="text-lg text-gray-400">
              Hier findest du Antworten auf die wichtigsten Fragen rund um Lumio.
            </p>
          </motion.div>

          <div className="space-y-12">
            {faqData.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 text-lumio-neon">
                  <category.icon className="w-6 h-6" />
                  <span>{category.category}</span>
                </h2>
                <GlassCard className="p-0 overflow-hidden" hoverEffect={false}>
                  {category.items.map((item) => (
                    <FaqItem key={item.q} q={item.q} a={item.a} />
                  ))}
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
