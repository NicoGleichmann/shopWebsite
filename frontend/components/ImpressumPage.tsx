import React from 'react';
import { GlassCard } from './GlassUI';

const ImpressumPage = () => {
  return (
    <div className="min-h-screen bg-lumio-dark text-white font-sans selection:bg-lumio-neon selection:text-black">
      <div className="container mx-auto px-4 py-8 pt-32">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-12 text-center text-white">Impressum</h1>
        <GlassCard>
          <div className="p-6 text-gray-300">
            <h2 className="text-2xl font-bold mb-4 text-lumio-neon">Angaben gemäß § 5 TMG</h2>
            <p className="mb-6">
              Lumio GmbH<br />
              Musterstraße 111<br />
              12345 Musterstadt<br />
            </p>

            <h2 className="text-2xl font-bold mb-4 text-lumio-neon">Vertreten durch</h2>
            <p className="mb-6">
              Max Mustermann
            </p>

            <h2 className="text-2xl font-bold mb-4 text-lumio-neon">Kontakt</h2>
            <p className="mb-6">
              Telefon: +49 (0) 123 456789<br />
              E-Mail: info@lumio.com
            </p>

            <h2 className="text-2xl font-bold mb-4 text-lumio-neon">Registereintrag</h2>
            <p className="mb-6">
              Eintragung im Handelsregister.<br />
              Registergericht: Amtsgericht Musterstadt<br />
              Registernummer: HRB 12345
            </p>

            <h2 className="text-2xl font-bold mb-4 text-lumio-neon">Umsatzsteuer-ID</h2>
            <p className="mb-6">
              Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
              DE123456789
            </p>

            <h2 className="text-2xl font-bold mb-4 text-lumio-neon">Haftungsausschluss</h2>
            <p className="mb-6">
              <strong>Haftung für Inhalte</strong><br />
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default ImpressumPage;
