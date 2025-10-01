'use client';

import { useRouter } from 'next/navigation';
import ServicesPageRefactored from '@/components/services-page';

export default function ServicesPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

  return <ServicesPageRefactored onBack={handleBack} />;
}