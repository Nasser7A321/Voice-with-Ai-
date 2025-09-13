/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useRef } from 'react';
import {
  Agent,
  AGENT_COLORS,
  INTERLOCUTOR_VOICE,
  INTERLOCUTOR_VOICES,
} from '@/lib/presets/agents';
import Modal from './Modal';
import c from 'classnames';
import { useAgent, useUI } from '@/lib/state';
import { useTranslation } from '@/contexts/LanguageContext';

export default function EditAgent() {
  const agent = useAgent(state => state.current);
  const updateAgent = useAgent(state => state.update);
  const nameInput = useRef(null);
  const { setShowAgentEdit } = useUI();
  const { t } = useTranslation();

  function onClose() {
    setShowAgentEdit(false);
  }

  function updateCurrentAgent(adjustments: Partial<Agent>) {
    updateAgent(agent.id, adjustments);
  }

  const agentName = agent.nameKey ? t(agent.nameKey) : agent.name;
  const agentPersonality = agent.personalityKey
    ? t(agent.personalityKey)
    : agent.personality;

  return (
    <Modal onClose={() => onClose()}>
      <div className="editAgent">
        <div>
          <form>
            <div>
              <input
                className="largeInput"
                type="text"
                placeholder={t('name')}
                value={agentName}
                onChange={e =>
                  updateCurrentAgent({ name: e.target.value, nameKey: undefined })
                }
                ref={nameInput}
              />
            </div>

            <div>
              <label>
                {t('personality')}
                <textarea
                  value={agentPersonality}
                  onChange={e =>
                    updateCurrentAgent({
                      personality: e.target.value,
                      personalityKey: undefined,
                    })
                  }
                  rows={7}
                  placeholder={t('personalityPlaceholder')}
                />
              </label>
            </div>
          </form>
        </div>

        <div>
          <div>
            <ul className="colorPicker">
              {AGENT_COLORS.map((color, i) => (
                <li
                  key={i}
                  className={c({ active: color === agent.bodyColor })}
                >
                  <button
                    style={{ backgroundColor: color }}
                    onClick={() => updateCurrentAgent({ bodyColor: color })}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="voicePicker">
            {t('voice')}
            <select
              value={agent.voice}
              onChange={e => {
                updateCurrentAgent({
                  voice: e.target.value as INTERLOCUTOR_VOICE,
                });
              }}
            >
              {INTERLOCUTOR_VOICES.map(voice => (
                <option key={voice} value={voice}>
                  {voice}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button onClick={() => onClose()} className="button primary">
          {t('letsGo')}
        </button>
      </div>
    </Modal>
  );
}