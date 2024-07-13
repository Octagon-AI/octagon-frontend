import React from 'react';
import {
  Card,
  Table,
  Container,
  Title,
  Text,
  Divider,
  Button,
  Tabs,
  rem,
  Group,
  Select,
  Grid,
} from '@mantine/core';
import { TableReviews } from '../../../lib/TableReviewsModel/TableReviews';
import { AddModel } from '../../../components/AddModel';
import { useApiTypesList } from '../../../my-apis/endpoints/api/api';
import { useApiProblemsList } from '../../../my-apis/endpoints/api/api';
import { useApiAimodelsList } from '../../../my-apis/endpoints/api/api';

let empty_problem = {
  id: 0,
  name: 'All problems',
};

let empty_type = {
  id: 0,
  name: 'All types',
};

const Leaderboard: React.FC = () => {
  {
    /* ===================================================================================== */
  }
  {
    /* ===================================================================================== */
  }

  const problems = [
    { id: 1, name: 'Overfitting' },
    { id: 2, name: 'Underfitting' },
    { id: 3, name: 'Data Bias' },
    { id: 4, name: 'Lack of Interpretability' },
  ];
  const iconStyle = { width: rem(12), height: rem(12) };
  const { data: problemsData, isLoading: problemsLoading } =
    useApiProblemsList();
  const { data: typesData, isLoading: typesLoading } = useApiTypesList();
  const [selectedProblem, setSelectedProblem] = React.useState({
    value: '0',
    label: 'All problems',
  });
  const [selectedType, setSelectedType] = React.useState({
    value: '0',
    label: 'All types',
  });
  const {
    data: modelsData,
    isLoading: modelsLoading,
    refetch,
  } = useApiAimodelsList({
    type: parseInt(selectedType.value)
      ? parseInt(selectedType.value)
      : undefined,
    problem: parseInt(selectedProblem.value)
      ? parseInt(selectedProblem.value)
      : undefined,
  });

  let allTypes = typesData;
  let allProblems = problemsData;

  if (
    (selectedType.value !== '0' || selectedProblem.value !== '0') &&
    typesData &&
    problemsData &&
    typesData?.length > 0 &&
    problemsData?.length > 0
  ) {
    allTypes = [{ id: 0, name: 'All types' }, ...typesData];
    allProblems = [{ id: 0, name: 'All problems' }, ...problemsData];
  }

  return (
    <Container id="abc" style={{ width: '100%' }} p="md" mb={10}>
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
            Leaderboard
          </Text>

          {/* ===================================================================================== */}
          {/* ===================================================================================== */}
        </Title>
        <AddModel
          refetchParent={refetch}
          types={typesData}
          problems={problemsData}
        />
        <Divider my="lg" variant="dashed" labelPosition="center" label={''} />

        <Tabs defaultValue="search" variant="pills">
          {/* <Tabs.List justify="center">
            <Tabs.Tab
              value="search"
              leftSection={<IconSearch style={iconStyle} />}
            >
              Compare models
            </Tabs.Tab>
            <Tabs.Tab value="buy" leftSection={<IconCoins style={iconStyle} />}>
              Buy inference
            </Tabs.Tab>
          </Tabs.List> */}

          <Tabs.Panel value="search">
            <Group mt={15} grow justify="space-between">
              <Select
                placeholder="All problems"
                data={allProblems?.map((problem) => ({
                  value: problem.id.toString(),
                  label: problem.name,
                }))}
                value={selectedProblem ? selectedProblem.value : null}
                onChange={(_value, option) => setSelectedProblem(option)}
              ></Select>
              <Select
                placeholder="All types"
                data={allTypes?.map((type) => ({
                  value: type.id.toString(),
                  label: type.name,
                }))}
                value={selectedType ? selectedType.value : null}
                onChange={(_value, option) => setSelectedType(option)}
              ></Select>
            </Group>

            <TableReviews services={modelsData} isLoading={modelsLoading} />
          </Tabs.Panel>

          <Tabs.Panel value="buy">
            <Grid>
              {modelsData && modelsData.length > 0
                ? modelsData
                    ?.filter((model) => model.nevermind_tag)
                    .map((model) => {
                      return (
                        <Grid.Col
                          key={model.id}
                          span={12}
                          mt="sm"
                          mb="sm"
                          style={{ height: 237 }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                            }}
                            className="nvm-agent-widget"
                            nvm-did={model.nevermind_tag}
                            nvm-wid="wid-eb0c3740-bcbb-410e-885a-ea0a1e2c785e"
                            nvm-cta-text="Start using"
                            nvm-cta-bg-color="#e7515a"
                            nvm-theme="dark"
                            nvm-layout="horizontal"
                          ></div>
                        </Grid.Col>
                      );
                    })
                : 'No models found'}
            </Grid>
          </Tabs.Panel>
        </Tabs>
    </Container>
  );
};

export default Leaderboard;
