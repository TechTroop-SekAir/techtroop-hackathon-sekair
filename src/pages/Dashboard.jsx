import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Container, Title, Grid, Text, Group, Button, Box, Flex, LoadingOverlay, Paper } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import SurveyFilters from '../components/SurveyFilters';
import { dashboardStore } from '../stores/dashboardStore';
import SurveyCard from '../components/SurveyCard';
import { voteSurveyStore } from '../stores/voteSurveyStore';

const Dashboard = observer(() => {
  const store = dashboardStore;
  const navigate = useNavigate();

  useEffect(() => {
    voteSurveyStore.resetAnsweredSurveys();
    store.fetchSurveys();
  }, []);

  return (
    <Box pos="relative" mih="100vh">
      <LoadingOverlay visible={store.isLoading} overlayProps={{ blur: 2 }} />

      <Container size="lg" py="xl">
        <Flex justify="space-between" align="center" mb="xl" direction={{ base: 'column', sm: 'row' }} gap="md">
          <Title order={1} c="brandPurple" fw={900}>
            SekAir
          </Title>

          <Button
            leftSection={<IconPlus size={16} />}
            color="brandCyan"
            radius="md"
            onClick={() => navigate('/create')}
          >
            Create New Survey
          </Button>
        </Flex>

        <Paper shadow="sm" radius="lg" withBorder p="lg" mb="xl">
          <SurveyFilters
            searchQuery={store.searchQuery}
            onSearchQueryChange={(val) => store.setSearchQuery(val)}
            selectedCategory={store.selectedCategory}
            onCategoryChange={(val) => store.setSelectedCategory(val)}
            visibilityFilter={store.visibilityFilter}
            onVisibilityFilterChange={(val) => store.setVisibilityFilter(val)}
          />
        </Paper>

        <Grid gutter="lg">
          {store.filteredSurveys.map((survey) => (
            <Grid.Col key={survey.id} span={{ base: 12, sm: 6, md: 4 }}>
              <SurveyCard survey={survey} />
            </Grid.Col>
          ))}
        </Grid>

        {!store.isLoading && store.filteredSurveys.length === 0 && (
          <Text ta="center" c="dimmed" mt="xl" size="lg" fs="italic">
            No surveys match your search or category selection.
          </Text>
        )}
      </Container>
    </Box>
  );
});

export default Dashboard;