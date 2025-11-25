// frontend/src/pages/VerifyEmailPage.tsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, ArrowRight } from 'lucide-react';
// Passe den Importpfad an, falls deine Components woanders liegen:
import { GlassCard, GlassButton } from '../components/GlassUI'; 

export const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('Deine E-Mail wird verifiziert...');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Kein Token gefunden. Bitte nutze den Link aus der E-Mail.');
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage(data.msg || 'E-Mail erfolgreich bestätigt!');
          
          // Optional: Automatische Weiterleitung nach 5 Sekunden
          setTimeout(() => navigate('/'), 5000);
        } else {
          setStatus('error');
          setMessage(data.msg || 'Verifizierung fehlgeschlagen.');
        }
      } catch (error) {
        console.error(error);
        setStatus('error');
        setMessage('Ein Netzwerkfehler ist aufgetreten.');
      }
    };

    // Um "React Strict Mode" doppelte Aufrufe zu vermeiden, könnte man hier noch Refs nutzen,
    // aber für diesen Zweck reicht es so:
    verifyToken();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-lumio-dark flex items-center justify-center p-6 relative overflow-hidden font-sans text-white">
      {/* Background Blobs (gleicher Style wie Home) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lumio-neon/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-lumio-hot/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none" />

      <GlassCard className="max-w-md w-full text-center p-12 border border-white/10 relative z-10 backdrop-blur-xl bg-black/40">
        <div className="flex justify-center mb-6">
          {status === 'verifying' && (
            <Loader2 className="w-16 h-16 text-lumio-neon animate-spin" />
          )}
          {status === 'success' && (
            <CheckCircle className="w-16 h-16 text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.6)]" />
          )}
          {status === 'error' && (
            <XCircle className="w-16 h-16 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]" />
          )}
        </div>

        <h2 className="text-3xl font-display font-bold mb-4">
          {status === 'verifying' && 'Verifiziere...'}
          {status === 'success' && 'Geschafft!'}
          {status === 'error' && 'Ups!'}
        </h2>

        <p className="text-gray-300 mb-8 leading-relaxed text-lg">
          {message}
        </p>

        {status === 'success' && (
          <GlassButton onClick={() => navigate('/')} variant="primary" glow className="w-full justify-center">
            Weiter zum Shop <ArrowRight className="ml-2 w-4 h-4"/>
          </GlassButton>
        )}
        
        {status === 'error' && (
          <GlassButton onClick={() => navigate('/')} variant="secondary" className="w-full justify-center">
            Zurück zur Startseite
          </GlassButton>
        )}
      </GlassCard>
    </div>
  );
};