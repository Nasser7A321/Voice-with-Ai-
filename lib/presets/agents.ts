/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { en } from '../i18n/en';

export const INTERLOCUTOR_VOICES = [
  'Aoede',
  'Charon',
  'Fenrir',
  'Kore',
  'Leda',
  'Orus',
  'Puck',
  'Zephyr',
] as const;

export type INTERLOCUTOR_VOICE = (typeof INTERLOCUTOR_VOICES)[number];

export type Agent = {
  id: string;
  name: string;
  nameKey?: keyof typeof en;
  personality: string;
  personalityKey?: keyof typeof en;
  bodyColor: string;
  voice: INTERLOCUTOR_VOICE;
};

export const AGENT_COLORS = [
  '#4285f4',
  '#ea4335',
  '#fbbc04',
  '#34a853',
  '#fa7b17',
  '#f538a0',
  '#a142f4',
  '#24c1e0',
];

export const createNewAgent = (properties?: Partial<Agent>): Agent => {
  return {
    id: Math.random().toString(36).substring(2, 15),
    name: '',
    personality: '',
    bodyColor: AGENT_COLORS[Math.floor(Math.random() * AGENT_COLORS.length)],
    voice: Math.random() > 0.5 ? 'Charon' : 'Aoede',
    ...properties,
  };
};

export const Charlotte: Agent = {
  id: 'chic-charlotte',
  name: '👠 Elegant Jamila',
  nameKey: 'charlotteName',
  personality: en.charlottePersonality,
  personalityKey: 'charlottePersonality',
  bodyColor: '#a142f4',
  voice: 'Aoede',
};

export const Nasser: Agent = {
  id: 'proper-paul',
  name: '🫖 Polite Nasser',
  nameKey: 'nasserName',
  personality: en.paulPersonality,
  personalityKey: 'paulPersonality',
  bodyColor: '#ea4335',
  voice: 'Fenrir',
};

export const Shane: Agent = {
  id: 'chef-shane',
  name: '🍳 Chef Shehab',
  nameKey: 'shaneName',
  personality: en.shanePersonality,
  personalityKey: 'shanePersonality',
  bodyColor: '#25C1E0',
  voice: 'Charon',
};

export const Penny: Agent = {
  id: 'passport-penny',
  name: '✈️ Wanderer Reem',
  nameKey: 'pennyName',
  personality: en.pennyPersonality,
  personalityKey: 'pennyPersonality',
  bodyColor: '#34a853',
  voice: 'Leda',
};