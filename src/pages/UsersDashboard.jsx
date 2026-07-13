import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Title, Table, Avatar, Group, Text, Anchor, Loader, Alert } from '@mantine/core';
import { Link } from 'react-router-dom';
import { usersStore } from '../stores/UsersStore';
import { userStore } from '../stores/userStore';
import { IconAlertCircle } from '@tabler/icons-react';

export const UsersDashboard = observer(() => {
  useEffect(() => {
    usersStore.fetchUsers();
  }, []);

  if (usersStore.isLoading) {
    return (
      <Container size="md" pt="xl" style={{ display: 'flex', justifyContent: 'center' }}>
        <Loader size="xl" />
      </Container>
    );
  }

  if (usersStore.error) {
    return (
      <Container size="md" pt="xl">
        <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red">
          {usersStore.error}
        </Alert>
      </Container>
    );
  }

  const rows = usersStore.users
    .filter((user) => user.id !== userStore.user?.id)  
    .map((user) => (
        <Table.Tr key={user.id}>
        <Table.Td>
            <Group gap="sm">
            <Avatar radius="xl" size="sm" alt={user.name}>
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </Avatar>
            <Text size="sm" fw={500}>
                {user.name || 'Anonymous User'}
            </Text>
            </Group>
        </Table.Td>
        <Table.Td>
            <Text size="sm">
            {user.email || 'No Email'}
            </Text>
        </Table.Td>
        <Table.Td>
            <Text size="sm">
            {user.role || 'student'}
            </Text>
        </Table.Td>
        <Table.Td>
            <Anchor component={Link} to={`/user/${user.id}`} size="sm" fw={500}>
            View Profile
            </Anchor>
        </Table.Td>
        </Table.Tr>
    ));


  return (
    <Container size="md" pt="xl">
      <Title order={2} mb="lg">Users Dashboard</Title>
      
      <Table highlightOnHover verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>User</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows.length > 0 ? rows : (
            <Table.Tr>
              <Table.Td colSpan={3}>
                <Text align="center" color="dimmed">No users found</Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </Container>
  );
});

