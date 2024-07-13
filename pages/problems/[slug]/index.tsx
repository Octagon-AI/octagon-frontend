import React from 'react';
import { useRouter } from 'next/router';
import { Tabs, Container, Title, Divider, Text, Card } from '@mantine/core';
import { useApiProblemsRetrieve } from '../../../my-apis/endpoints/api/api';
import SampleDescription from './sample-description';

const Problems: React.FC = () => {
  // Extract the slug from the URL parameters
  const [counter, setCounter] = React.useState(0);

  const router = useRouter();
  const {
    data: service,
    error,
    isLoading,
    refetch,
  } = useApiProblemsRetrieve(Number(router.query.slug), {
    format: 'json',
    counter: counter,
  });

  return (
    <Container id="abc" style={{ width: '100%' }} p="md">
      <Card
        shadow="sm"
        padding="md"
        radius="xl"
        withBorder
        style={{ backgroundColor: '#2e2e2eDD' }}
      >
        <Title
          mt="md"
          order={1}
          style={{
            fontWeight: 900,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '2.5rem',
          }}
        >
          <Text
            component="span"
            inherit
            ml="lg"
            variant="gradient"
            gradient={{ from: '#FFFFFF', to: '#FFFFFF' }}
          >
            {service?.name} - Solve Range-Specific Liquidity in Uniswap V3 and
            V4
          </Text>
        </Title>
        <Divider my="lg" variant="dashed" />

        <Tabs defaultValue="description">
          <Tabs.List>
            <Tabs.Tab value="description">Description</Tabs.Tab>
            <Tabs.Tab value="leaderboard">Leaderboard</Tabs.Tab>
          </Tabs.List>

          <div className="py-8 px-4">
            <Tabs.Panel value="description">
              <SampleDescription />
            </Tabs.Panel>
            <Tabs.Panel value="leaderboard">
              <Text>Leaderboard</Text>
            </Tabs.Panel>
          </div>
        </Tabs>
      </Card>
    </Container>
  );
};

export default Problems;
