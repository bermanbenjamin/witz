'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Icons } from '@/components/icons'
import { Spinner } from '@/components/ui/spinner';
import { appRoutes } from '@/lib/constants';

import { signInWithMagicLinkVerifierAction } from './actions';

export default function MagicLinkTokenVerifierPage({ params }: { params: { token: string } }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await signInWithMagicLinkVerifierAction(params.token);
        setTimeout(() => {
          router.push(appRoutes.suitability);
        }, 2000);
      } catch (err) {
        setError('An error occurred while verifying the token.');
      } finally {
        toast.success("Login efeituado!");
        setLoading(false);
      }
    };

    verifyToken();
  }, [params.token, router]);

  if (loading) {
    return (
      <div>
        <Spinner size="large">
          <strong className="text-lg">Verificando token de login...</strong>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="border-solid border-2 border-primary rounded-full w-12 h-12 flex items-center justify-center">
      <Icons.checkCheck className="text-primary" />
    </div>
  );
}
