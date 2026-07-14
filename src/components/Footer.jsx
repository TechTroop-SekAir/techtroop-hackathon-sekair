import React from 'react';
import { Container, Group, Text, Paper } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { userStore } from '../stores/userStore';

export const Footer = observer(() => {
  if (!userStore.isAuthenticated) {
    return null;
  }

  return (
    <Paper
      radius={0}
      shadow="sm"
      withBorder
      py="sm"
      mt="xl"
      bg="linear-gradient(90deg, var(--mantine-color-brandCyan-0), var(--mantine-color-brandPurple-0))"
    >
      <Container size="lg">
        <Group justify="center">
          <Text size="m" c="dimmed">
            Made by Darya Abbassov, Matan Maabari, Ofek Cofman
          </Text>
        </Group>
      </Container>
    </Paper>
  );
});