import React from 'react';
import { Card, Text, Group, Avatar, RingProgress, Spoiler, Divider, List, ThemeIcon } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

const MatchCard = ({ match }) => {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Group justify="space-between" wrap="nowrap" mb="xs">
        <Group gap="sm">
          <Avatar size="md" radius="xl" color="brandPurple">
            {match.name ? match.name.charAt(0).toUpperCase() : 'S'}
          </Avatar>
          <div>
            <Text fw={600} size="sm">{match.name}</Text>
            <Text size="xs" c="dimmed" tt="capitalize">
              {match.role}
            </Text>
            <Text size="xs" c="brandPurple" mt={2}>
              Based on {match.sharedQuestions} common questions answered
            </Text>
          </div>
        </Group>

        <RingProgress
          size={75}
          thickness={6}
          roundCaps
          sections={[{ value: match.percentage, color: 'brandPurple' }]}
          label={
            <Text ta="center" fw={700} size="xs" c="brandPurple">
              {match.percentage}%
            </Text>
          }
        />
      </Group>

      {match.agreements && match.agreements.length > 0 ? (
        <Spoiler maxHeight={0} showLabel="Show what you agree on ✨" hideLabel="Hide agreements">
          <Divider my="xs" />
          <Text size="xs" fw={700} c="dimmed" mb="xs">You both voted the same on:</Text>
          <List
            spacing="xs"
            size="xs"
            center
            icon={
              <ThemeIcon color="brandCyan" size={16} radius="xl">
                <IconCheck size={12} />
              </ThemeIcon>
            }
          >
            {match.agreements.map((agreement, idx) => (
              <List.Item key={idx}>
                <Text size="xs" span fw={600}>{agreement.questionText}:</Text>{' '}
                <Text size="xs" span c="brandCyan" fw={700}>"{agreement.agreedAnswer}"</Text>
              </List.Item>
            ))}
          </List>
        </Spoiler>
      ) : (
        <Text size="xs" c="dimmed" fs="italic" mt="xs">
          No matching answers found.
        </Text>
      )}
    </Card>
  );
};

export default MatchCard;