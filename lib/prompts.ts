/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { Agent } from './presets/agents';
import { en } from './i18n/en';
import { User } from './state';

type TFunction = (key: keyof typeof en) => string;

export const createSystemInstructions = (
  agent: Agent,
  user: User,
  t: TFunction,
  language: string,
) => {
  const agentName = agent.nameKey ? t(agent.nameKey) : agent.name;
  const agentPersonality = agent.personalityKey
    ? t(agent.personalityKey)
    : agent.personality;

  const yourNameIs = t('promptYourNameIs')
    .replace('{agentName}', agentName)
    .replace('{userName}', user.name ? ` (${user.name})` : '');

  const yourPersonalityIs = t('promptYourPersonalityIs');

  const userNameForPrompt = user.name || t('theUser');
  const userInfoPrompt = user.info
    ? `\n${t('promptUserInfo')
        .replace('{userName}', userNameForPrompt)
        .replace('{userInfo}', user.info)}`
    : '';

  const date = new Intl.DateTimeFormat(language, {
    dateStyle: 'full',
  }).format(new Date());

  const time = new Date().toLocaleTimeString(language, {
    hour: 'numeric',
    minute: 'numeric',
  });

  const todaysDate = t('promptTodaysDate')
    .replace('{date}', date)
    .replace('{time}', time);

  const instructions = t('promptInstructions');

  return `${yourNameIs}

${yourPersonalityIs}
${agentPersonality}${userInfoPrompt}

${todaysDate}

${instructions}`;
};
