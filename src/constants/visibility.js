import { IconLock, IconWorld } from '@tabler/icons-react';

export const VISIBILITY_CONFIG = [
  {
    value: 'public',
    label: 'Public Only',
    cardLabel: 'Public Survey',
    color: 'teal',
    icon: IconWorld
  },
  {
    value: 'anonymous',
    label: 'Anonymous Only',
    cardLabel: 'Anonymous Survey',
    color: 'indigo',
    icon: IconLock
  }
];

export const getVisibilitySettings = (isAnonymous) => {
  const targetValue = isAnonymous ? 'anonymous' : 'public';
  return VISIBILITY_CONFIG.find(item => item.value === targetValue);
};