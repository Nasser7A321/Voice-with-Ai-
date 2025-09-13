/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useLiveAPIContext } from '@/contexts/LiveAPIContext';
import { Agent, createNewAgent } from '@/lib/presets/agents';
import { useAgent, useUI, useUser } from '@/lib/state';
import c from 'classnames';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';

export default function Header() {
  const {
    showUserConfig,
    setShowUserConfig,
    setShowAgentEdit,
    theme,
    toggleTheme,
  } = useUI();
  const { name } = useUser();
  const { current, setCurrent, availablePresets, availablePersonal, addAgent } =
    useAgent();
  const { disconnect } = useLiveAPIContext();
  const { t, language, setLanguage } = useTranslation();

  let [showRoomList, setShowRoomList] = useState(false);

  useEffect(() => {
    addEventListener('click', () => setShowRoomList(false));
    return () => removeEventListener('click', () => setShowRoomList(false));
  }, []);

  function changeAgent(agent: Agent | string) {
    disconnect();
    setCurrent(agent);
  }

  function addNewChatterBot() {
    disconnect();
    addAgent(createNewAgent());
    setShowAgentEdit(true);
  }

  function toggleLanguage() {
    setLanguage(language === 'en' ? 'ar' : 'en');
  }

  return (
    <header>
      <div className="roomInfo">
        <div className="roomName">
          <button
            onClick={e => {
              e.stopPropagation();
              setShowRoomList(!showRoomList);
            }}
          >
            <h1 className={c({ active: showRoomList })}>
              {current.nameKey ? t(current.nameKey) : current.name}
              <span className="icon">arrow_drop_down</span>
            </h1>
          </button>

          <button
            onClick={() => setShowAgentEdit(true)}
            className="button createButton"
          >
            <span className="icon">edit</span> {t('edit')}
          </button>
        </div>

        <div className={c('roomList', { active: showRoomList })}>
          <div>
            <h3>{t('presets')}</h3>
            <ul>
              {availablePresets
                .filter(agent => agent.id !== current.id)
                .map(agent => (
                  <li
                    key={agent.id}
                    className={c({ active: agent.id === current.id })}
                  >
                    <button onClick={() => changeAgent(agent)}>
                      {agent.nameKey ? t(agent.nameKey) : agent.name}
                    </button>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h3>{t('yourChatterBots')}</h3>
            {
              <ul>
                {availablePersonal.length ? (
                  availablePersonal.map(agent => (
                    <li
                      key={agent.id}
                      className={c({ active: agent.id === current.id })}
                    >
                      <button onClick={() => changeAgent(agent.id)}>
                        {agent.name}
                      </button>
                    </li>
                  ))
                ) : (
                  <p>{t('noneYet')}</p>
                )}
              </ul>
            }
            <button
              className="newRoomButton button"
              onClick={() => {
                addNewChatterBot();
              }}
            >
              <span className="icon">add</span>{t('newChatterBot')}
            </button>
          </div>
        </div>
      </div>
      <div className="header-actions">
        <button
          className="userSettingsButton"
          onClick={() => setShowUserConfig(!showUserConfig)}
        >
          <p className="user-name">{name || t('yourName')}</p>
          <span className="icon">tune</span>
        </button>
        <button
          className="theme-switcher button"
          onClick={toggleTheme}
          aria-label={t('toggleTheme')}
        >
          <span className="icon">
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
        <button
          className="language-switcher button"
          onClick={toggleLanguage}
          aria-label={t('language')}
        >
          <span className="icon">language</span>
          <span>{language === 'en' ? 'AR' : 'EN'}</span>
        </button>
      </div>
    </header>
  );
}