'use client';

import { getUserReputation } from '@/utils/getUserReputation';
import { useEffect } from 'react';

export default function Test() {
  useEffect(() => {
    getUserReputation('FRXbHF8z3UEiNRG1r6ubYGTbNGjZ6g7j2WDSjjqjxNCF').then(
      (value) => console.log('Score', value)
    );
  }, []);

  return null;
}
