import React from 'react';
import { Card, Stack, TextInput, Switch, Text, Box } from '@mantine/core';
import { Categories } from './Categories';

export const SurveySettingsCard = ({ title, isAnonymous, category, onTitleChange, onAnonymousChange, onCategoryChange }) => {
  return (
    <Card shadow="sm" padding="xl" radius="md" withBorder>
      <Stack gap="lg">
        <TextInput
          label="Survey Title"
          placeholder="e.g., What are your favorite weekend hobbies?"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          required
          mb="md"
        />

        <Switch
          label="Make responses anonymous"
          description="If enabled, votes will not be linked to student profiles"
          checked={isAnonymous}
          onChange={(e) => onAnonymousChange(e.currentTarget.checked)}
          color="brandCyan"
          />

        <Box>
          <Text size="sm" fw={500} mb={5}>
            Survey Category
          </Text>
          <Categories
            value={category}
            onChange={(val) => onCategoryChange(val)}
            showAll={false}
            />
        </Box>
      </Stack>
    </Card>
  );
};