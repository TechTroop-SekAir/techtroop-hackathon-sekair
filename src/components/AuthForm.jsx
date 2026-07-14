import React, { useState, useEffect } from 'react';
import { userStore } from '../stores/userStore';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Box, Container, Paper, Stack, TextInput, PasswordInput, Button, Title, Text, Alert, Center, Image, Anchor } from '@mantine/core';
import logo from '../assets/SekAir-Logo.png';

export const AuthForm = observer(() => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (userStore.isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [userStore.isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      if (isRegister) {
        await userStore.register(email, password, fullName);
      } else {
        await userStore.login(email, password);
      }
      setEmail('');
      setPassword('');
      setFullName('');
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <Box
      flex={1}
      py="xl"
      bg="linear-gradient(90deg, var(--mantine-color-brandCyan-0), var(--mantine-color-brandPurple-0))"
    >
      <Container size="xs">
        <Center mb="lg">
          <Image src={logo} alt="SekAir" w={140} fit="contain" />
        </Center>

        <Paper shadow="sm" radius="lg" withBorder p="xl">
          <Title order={2} ta="center" fw={700} mb="xs">
            {isRegister ? 'Sign Up to SekAir' : 'Sign In to SekAir'}
          </Title>
          <Text ta="center" c="dimmed" size="sm" mb="lg">
            {isRegister ? 'Create an account to get started' : 'Welcome back, please log in'}
          </Text>

          {errorMsg && (
            <Alert color="red" variant="light" mb="md" radius="md">
              {errorMsg}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              {isRegister && (
                <TextInput
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              )}

              <TextInput
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <PasswordInput
                placeholder="Password (min 6 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Button type="submit" color="brandCyan" fullWidth size="md" mt="xs">
                {isRegister ? 'Register' : 'Login'}
              </Button>
            </Stack>
          </form>

          <Text ta="center" size="sm" c="dimmed" mt="lg">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <Anchor
              component="span"
              c="brandPurple"
              fw={600}
              onClick={() => { setIsRegister(!isRegister); setErrorMsg(''); }}
            >
              {isRegister ? 'Login here' : 'Register here'}
            </Anchor>
          </Text>
        </Paper>
      </Container>
    </Box>
  );
})