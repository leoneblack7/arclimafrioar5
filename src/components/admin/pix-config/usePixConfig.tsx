import { useState, useEffect } from 'react';
import { getFromStorage } from '@/utils/storage';
import { mysqlService } from '@/utils/mysqlService';
import { PixConfig } from '@/types/pix';

export const usePixConfig = () => {
  const [config, setConfig] = useState<PixConfig>({
    enabled: false,
    useCustomKeys: false,
    usePixPay: false,
    usePixUp: false,
    maintenance: false,
  });
  const [tictoApiKey, setTictoApiKey] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPixConfig();
  }, []);

  const loadPixConfig = async () => {
    const savedConfig = await getFromStorage('pix_config', null);
    if (savedConfig) {
      setConfig(savedConfig);
    }
    const tictoConfig = await mysqlService.getTictoConfig();
    if (tictoConfig?.apiKey) {
      setTictoApiKey(tictoConfig.apiKey);
    }
    setLoading(false);
  };

  const handleTictoToggle = (checked: boolean) => {
    setConfig(prev => ({ ...prev, enabled: checked }));
  };

  const handleCustomKeysToggle = (checked: boolean) => {
    setConfig(prev => ({ ...prev, useCustomKeys: checked }));
  };

  const handlePixPayToggle = (checked: boolean) => {
    setConfig(prev => ({ ...prev, usePixPay: checked }));
  };

  const handlePixUpToggle = (checked: boolean) => {
    setConfig(prev => ({ ...prev, usePixUp: checked }));
  };

  const handleMaintenanceToggle = (checked: boolean) => {
    setConfig(prev => ({ ...prev, maintenance: checked }));
  };

  const handleSave = async () => {
    await mysqlService.savePixConfig(config);
    await mysqlService.saveTictoConfig({ apiKey: tictoApiKey });
  };

  return {
    config,
    setConfig,
    tictoApiKey,
    setTictoApiKey,
    loading,
    handleTictoToggle,
    handleCustomKeysToggle,
    handlePixPayToggle,
    handlePixUpToggle,
    handleMaintenanceToggle,
    handleSave,
  };
};