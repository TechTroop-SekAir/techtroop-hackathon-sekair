import React from 'react';
import { Group, Button } from '@mantine/core';
import { CATEGORIES_CONFIG } from '../constants/categories';

export const Categories = ({ value, onChange, showAll = true }) => {
  const filteredCategories = showAll 
    ? CATEGORIES_CONFIG 
    : CATEGORIES_CONFIG.filter(cat => cat.value !== 'all');

  return (
    <Group gap="xs" wrap="wrap">
      {filteredCategories.map((category) => {
        const isSelected = value === category.value;

        return (
          <Button
            key={category.value}
            size="xs"
            radius="xl"
            color={category.color}
            variant={isSelected ? 'filled' : 'light'}
            onClick={() => onChange(category.value)}
            style={{
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          >
            {category.label}
          </Button>
        );
      })}
    </Group>
  );
};