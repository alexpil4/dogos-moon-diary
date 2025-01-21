import { MoonPhase } from '../types';

const mapPhase2Icon = {
  'New Moon': '🌑',
  'Waxing crescent': '🌒',
  'First quarter': '🌓',
  'Waxing gibbous': '🌔',
  'Full Moon': '🌕',
  'Waning gibbous': '🌖',
  'Last quarter': '🌗',
  'Waning crescent': '🌘',
} as const;

export function moonPhaseEmoji(p: MoonPhase): string {
  return mapPhase2Icon[p];
}
