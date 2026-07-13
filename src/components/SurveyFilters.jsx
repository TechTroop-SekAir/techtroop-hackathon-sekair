import React from 'react';
import { observer } from 'mobx-react-lite';
import { TextInput, Stack, Box, Group, Button, SegmentedControl, Center } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { dashboardStore } from '../stores/DashboardStore';
import { CATEGORIES_CONFIG } from '../constants/categories';
import { VISIBILITY_CONFIG } from '../constants/visibility';
import { Categories } from './Categories';

const SurveyFilters = observer(() => {
  const store = dashboardStore;

  const visibilityData = [
    { label: 'All Types', value: 'all' },
    ...VISIBILITY_CONFIG.map(item => {
      const Icon = item.icon;
      return {
        value: item.value,
        label: (
          <Center gap={4}>
            <Icon size={14} />
            <span>{item.label}</span>
          </Center>
        )
      };
    })
  ];

  return (
    <Box mb="xl">
      <Stack spacing="md">
        <TextInput
          placeholder="Search for a survey by title or question content..."
          leftSection={<IconSearch size={16} />}
          value={store.searchQuery}
          onChange={(e) => store.setSearchQuery(e.target.value)}
          size="md"
          radius="md"
        />

        <Categories 
          value={store.selectedCategory} 
          onChange={(val) => store.setSelectedCategory(val)} 
          showAll={true} 
        />

        <SegmentedControl
            size="xs"
            radius="md"
            value={store.visibilityFilter}
            onChange={(value) => store.setVisibilityFilter(value)}
            data={visibilityData}
            color={
              store.visibilityFilter === 'anonymous' ? 'indigo' : 
              store.visibilityFilter === 'public' ? 'teal' : 'blue'
            }
          />
      </Stack>
    </Box>
  );
});

export default SurveyFilters;