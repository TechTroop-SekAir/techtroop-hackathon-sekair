import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container, Title, TextInput, Switch, Button, Card, Text, ActionIcon, Stack, Group, Divider } from '@mantine/core';
import { IconTrash, IconPlus, IconSend } from '@tabler/icons-react';
import { newSurveyStore } from '../stores/NewSurveyStore';
import { userStore } from '../stores/userStore';

class CreateSurvey extends Component {
  handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newSurveyStore.title.trim()) {
      alert('Please enter a survey title');
      return;
    }

    const success = await newSurveyStore.submitSurvey();
    if (success) {
      alert('Survey created successfully (Mock)!');
    }
  };

  handleLogout = async () => {
    await userStore.logout();
  };

  render() {
    const store = newSurveyStore;

    return (
      <Container size="sm" py="xl">

        <Group justify="space-between" mb="xl" style={{ borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
          <div>
            <Title order={4} c="blue">SekAir System</Title>
            <Text size="xs" c="dimmed">
              Logged in as: <strong style={{ color: '#333' }}>{userStore.profile?.name || 'Student'}</strong> ({userStore.profile?.role})
            </Text>
          </div>

          <Button color="red" variant="light" size="xs" onClick={this.handleLogout}>
            Logout
          </Button>
        </Group>

        <Title order={2} mb="lg" ta="center" c="blue">
          Create New Survey
        </Title>

        <form onSubmit={this.handleSubmit}>
          <Stack spacing="md">
            
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <TextInput
                label="Survey Title"
                placeholder="e.g., What are your favorite weekend hobbies?"
                value={store.title}
                onChange={(e) => store.setTitle(e.target.value)}
                required
                mb="md"
              />

              <Switch
                label="Make responses anonymous"
                description="If enabled, votes will not be linked to student profiles"
                checked={store.isAnonymous}
                onChange={(e) => store.setIsAnonymous(e.currentTarget.checked)}
              />
            </Card>

            <Divider label="Survey Questions" labelPosition="center" my="lg" />

            {store.error && (
              <Text color="red" size="sm" ta="center" weight={500}>
                {store.error}
              </Text>
            )}

            {store.questions.map((question, qIndex) => (
              <Card key={qIndex} shadow="sm" padding="lg" radius="md" withBorder>
                <Group position="apart" mb="xs">
                  <Text weight={600} size="sm" c="dimmed">
                    Question #{qIndex + 1}
                  </Text>
                  
                  {/* כפתור מחיקה - יוצג רק אם יש יותר משאלה אחת בטופס */}
                  {store.questions.length > 1 && (
                    <ActionIcon
                      color="red"
                      variant="light"
                      onClick={() => store.removeQuestion(qIndex)}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  )}
                </Group>

                <TextInput
                  placeholder="Enter your question here"
                  value={question.question_text}
                  onChange={(e) => store.updateQuestionText(qIndex, e.target.value)}
                  required
                  mb="md"
                />

                <Text size="xs" weight={500} mb={5} c="dimmed">
                  Answers Options (Provide exactly 4 options):
                </Text>
                <Stack spacing="xs">
                  {question.options.map((option, oIndex) => (
                    <TextInput
                      key={oIndex}
                      placeholder={`Option ${oIndex + 1}`}
                      value={option}
                      onChange={(e) => store.updateOptionText(qIndex, oIndex, e.target.value)}
                      required
                      size="sm"
                    />
                  ))}
                </Stack>
              </Card>
            ))}

            <Group position="apart" mt="lg">
              <Button
                variant="outline"
                leftSection={<IconPlus size={16} />}
                onClick={store.addQuestion}
                disabled={store.isLoading}
              >
                Add Question
              </Button>

              <Button
                type="submit"
                color="blue"
                rightSection={<IconSend size={16} />}
                loading={store.isLoading}
              >
                Publish Survey
              </Button>
            </Group>

          </Stack>
        </form>
      </Container>
    );
  }
}

export default observer(CreateSurvey);