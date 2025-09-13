/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import Modal from './Modal';
import { useUI, useUser } from '@/lib/state';
import { useTranslation } from '@/contexts/LanguageContext';

export default function UserSettings() {
  const { name, info, setName, setInfo } = useUser();
  const { setShowUserConfig } = useUI();
  const { t } = useTranslation();

  function updateClient() {
    setShowUserConfig(false);
  }

  return (
    <Modal onClose={() => setShowUserConfig(false)}>
      <div className="userSettings">
        <p>{t('userSettingsIntro')}</p>

        <form
          onSubmit={e => {
            e.preventDefault();
            setShowUserConfig(false);
            updateClient();
          }}
        >
          <p>{t('userSettingsFun')}</p>

          <div>
            <p>{t('yourNameLabel')}</p>
            <input
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={t('yourNamePlaceholder')}
            />
          </div>

          <div>
            <p>{t('yourInfoLabel')}</p>
            <textarea
              rows={3}
              name="info"
              value={info}
              onChange={e => setInfo(e.target.value)}
              placeholder={t('yourInfoPlaceholder')}
            />
          </div>

          <button className="button primary">{t('letsGo')}</button>
        </form>
      </div>
    </Modal>
  );
}
