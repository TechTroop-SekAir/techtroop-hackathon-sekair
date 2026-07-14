import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Group, Button, Text, Menu, Avatar, UnstyledButton, Image, Paper } from '@mantine/core';
import { IconLogout, IconUser, IconLayoutDashboard, IconHeartHandshake } from '@tabler/icons-react';
import { userStore } from '../stores/userStore';
import sekAirLogo from '../assets/SekAir-Logo-No-Text.png';

export const Navbar = observer(() => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await userStore.logout();
  };

  if (!userStore.isAuthenticated) {
      return null;
  }

  return (
    <Paper
      radius={0}
      shadow="sm"
      withBorder
      py="sm"
      mb="xl"
      bg="linear-gradient(90deg, var(--mantine-color-brandCyan-0), var(--mantine-color-brandPurple-0))"
    >
      <Container size="lg">
        <Group justify="space-between">

          <Group gap="md">
            <UnstyledButton onClick={() => navigate('/dashboard')}>
              <Image
                src={sekAirLogo}
                alt="SekAir"
                h={36}
                w="auto"
                fit="contain"
              />
            </UnstyledButton>

            <Button
              variant="subtle"
              color="brandCyan"
              size="xs"
              leftSection={<IconLayoutDashboard size={14} />}
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>

            <Button
              variant="subtle"
              color="brandCyan"
              size="xs"
              leftSection={<IconUser size={14} />}
              onClick={() => navigate('/users')}
            >
                Users
            </Button>

            <Button
              variant="subtle"
              color="brandCyan"
              size="xs"
              leftSection={<IconHeartHandshake size={14} />}
              onClick={() => navigate('/matches')}
            >
                My Matches
            </Button>
          </Group>

          {/* User Profile Dropdown Menu */}
          <Group gap="xs">
            <Menu shadow="md" width={200} position="bottom-end">
              <Menu.Target>
                <UnstyledButton>
                  <Group gap="xs">
                    <Avatar radius="xl" color="brandCyan" size="sm">
                      {userStore.profile?.name?.charAt(0).toUpperCase() || 'U'}
                    </Avatar>
                    <Box>
                      <Text size="sm" fw={600}>
                        {userStore.profile?.name || 'Student'}
                      </Text>
                      <Text size="xs" c="dimmed" tt="uppercase">
                        {userStore.profile?.role || 'user'}
                      </Text>
                    </Box>
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Account Settings</Menu.Label>
                <Menu.Item
                  leftSection={<IconUser size={14} />}
                  onClick={() => navigate(`/user/${userStore.user?.id}`)}
                >
                  My Profile
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Actions</Menu.Label>
                <Menu.Item
                  color="red"
                  leftSection={<IconLogout size={14} />}
                  onClick={handleLogout}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>

        </Group>
      </Container>
    </Paper>
  );
});