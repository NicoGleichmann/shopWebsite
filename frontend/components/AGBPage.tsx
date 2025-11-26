import React from 'react';
import { GlassCard } from './GlassUI';

const AGBPage = () => {
  return (
    <div className="min-h-screen bg-lumio-dark text-white font-sans selection:bg-lumio-neon selection:text-black">
      <div className="container mx-auto px-4 py-8 pt-32">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-12 text-center text-white">Allgemeine Geschäftsbedingungen (AGB)</h1>
        <GlassCard>
          <div className="p-6 text-gray-300">
            <h2 className="text-2xl font-bold mb-4 text-lumio-neon">1. Geltungsbereich</h2>
            <p className="mb-6">
              Für alle Bestellungen über unsere Webseite gelten die nachfolgenden Allgemeinen Geschäftsbedingungen.
            </p>

            <h2 className="text-2xl font-bold mb-4 text-lumio-neon">2. Vertragspartner, Vertragsschluss</h2>
            <p className="mb-6">
              Der Kaufvertrag kommt zustande mit Lumio. Mit Einstellung der Produkte in den Online-Shop geben wir ein verbindliches Angebot zum Vertragsschluss über diese Artikel ab. Der Vertrag kommt zustande, indem Sie durch Anklicken des Bestellbuttons das Angebot über die im Warenkorb enthaltenen Waren annehmen. Unmittelbar nach dem Absenden der Bestellung erhalten Sie noch einmal eine Bestätigung per E-Mail.
            </p>

            <h2 className="text-2xl font-bold mb-4 text-lumio-neon">3. Bezahlung</h2>
            <p className="mb-6">
              In unserem Shop stehen Ihnen grundsätzlich die folgenden Zahlungsarten zur Verfügung:
              <br />
              <strong>Vorkasse:</strong> Bei Auswahl der Zahlungsart Vorkasse nennen wir Ihnen unsere Bankverbindung in separater E-Mail und liefern die Ware nach Zahlungseingang.
              <br />
              <strong>Kreditkarte:</strong> Mit Abgabe der Bestellung übermitteln Sie uns gleichzeitig Ihre Kreditkartendaten. Nach Ihrer Legitimation als rechtmäßiger Karteninhaber fordern wir unmittelbar nach der Bestellung Ihr Kreditkartenunternehmen zur Einleitung der Zahlungstransaktion auf.
              <br />
              <strong>PayPal:</strong> Im Bestellprozess werden Sie auf die Webseite des Online-Anbieters PayPal weitergeleitet. Um den Rechnungsbetrag über PayPal bezahlen zu können, müssen Sie dort registriert sein bzw. sich erst registrieren, mit Ihren Zugangsdaten legitimieren und die Zahlungsanweisung an uns bestätigen.
            </p>

            <h2 className="text-2xl font-bold mb-4 text-lumio-neon">4. Eigentumsvorbehalt</h2>
            <p className="mb-6">
              Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.
            </p>

            <h2 className="text-2xl font-bold mb-4 text-lumio-neon">5. Transportschäden</h2>
            <p className="mb-6">
              Werden Waren mit offensichtlichen Transportschäden angeliefert, so reklamieren Sie solche Fehler bitte möglichst sofort beim Zusteller und nehmen Sie bitte unverzüglich Kontakt zu uns auf. Die Versäumung einer Reklamation oder Kontaktaufnahme hat für Ihre gesetzlichen Ansprüche und deren Durchsetzung, insbesondere Ihre Gewährleistungsrechte, keinerlei Konsequenzen. Sie helfen uns aber, unsere eigenen Ansprüche gegenüber dem Frachtführer bzw. der Transportversicherung geltend machen zu können.
            </p>

            <h2 className="text-2xl font-bold mb-4 text-lumio-neon">6. Gewährleistung und Garantien</h2>
            <p className="mb-6">
              Soweit nicht nachstehend ausdrücklich anders vereinbart, gilt das gesetzliche Mängelhaftungsrecht.
            </p>

            <h2 className="text-2xl font-bold mb-4 text-lumio-neon">7. Streitbeilegung</h2>
            <p className="mb-6">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie hier finden: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-lumio-neon hover:underline">https://ec.europa.eu/consumers/odr/</a>. Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir nicht verpflichtet und nicht bereit.
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default AGBPage;
