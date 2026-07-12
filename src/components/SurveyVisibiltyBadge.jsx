import React from 'react';
import { Group, Text } from '@mantine/core';
import { getVisibilitySettings } from '../constants/visibility';

export const SurveyVisibilityBadge = ({ isAnonymous }) => {
  const settings = getVisibilitySettings(isAnonymous);

  if (!settings) return null;

  const IconComponent = settings.icon;

  return (
    <Group gap={4} c={settings.color}>
      <IconComponent size={14} />
      <Text size="xs" fw={500}>
        {settings.cardLabel}
      </Text>
    </Group>
  );
};