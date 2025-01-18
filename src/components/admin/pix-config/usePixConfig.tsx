import { useState, useEffect } from 'react';
import { getFromStorage } from '@/utils/storage';

export const usePixConfig = () => {
  const [pixConfig, setPixConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPixConfig = async () => {
      const config = await getFromStorage('pix_config', null);
      setPixConfig(config);
      setLoading(false);
    };

    loadPixConfig();
  }, []);

  return { pixConfig, loading };
};
