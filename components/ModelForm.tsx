import React from 'react';
import { TextInput, Button, Group, Box, FileInput, NativeSelect } from '@mantine/core';
import { useForm } from '@mantine/form';
import lighthouse from '@lighthouse-web3/sdk';

interface Problem {
  id: number;
  name: string;
}

interface Type {
  id: number;
  name: string;
}

interface FormValues {
  name: string;
  description: string;
  problem: string;
  type: string;
  file: File | null;
  fileHash?: string;
}

interface ModelFormProps {
  actionFunction: (values: FormValues) => void;
  problems: Problem[];
  types: Type[];
}

const apiKey = 'f9aa7723.749dd94a4bad4392a947dc5aed3c24db';


const ModelForm: React.FC<ModelFormProps> = ({ actionFunction, problems, types }) => {
  let empty_types: Type = { id: 0, name: 'Select a type...' };
  let empty_problems: Problem = { id: 0, name: 'Select a problem...' };
  // if (!types) types = empty_types;
  // if (!problems) problems = empty_problems;

  let n_type = [empty_types, ...types];
  let n_problem = [empty_problems, ...problems];

  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      description: '',
      problem: '',
      type: '',
      file: null,
    },
  });

  const handleSubmit = async (values) => {
    if (values.file) {
      try {
        const uploadResponse = await lighthouse.upload(values.file, apiKey);
        console.log(uploadResponse);

        if (uploadResponse && uploadResponse.data && uploadResponse.data.Hash) {
          // Add the uploaded file hash to the form values
          const updatedValues = {
            ...values,
            fileHash: uploadResponse.data.Hash,
          };

          // Call the actionFunction with the updated values
          actionFunction(updatedValues);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      // Handle form submission without file upload
      actionFunction(values);
    }
  };

  return (
    <Box maxWidth={300} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="Uniswap Vault Manager..."
          {...form.getInputProps('name')}
        />

        <TextInput
          mt='xs'
          withAsterisk
          label="Description"
          placeholder="Manages stuff..."
          {...form.getInputProps('description')}
        />

        <NativeSelect
          mt='xs'
          label="Problem"
          placeholder="Select a problem..."
          required
          {...form.getInputProps('problem')}
        >
          {n_problem.map((problem) => (
            <option key={problem.id} value={problem.id}>{problem.name}</option>
          ))}
        </NativeSelect>

        <FileInput
          mt='xs'
          label="File in .onnx format"
          accept=".onnx"
          placeholder="Select & upload your model..."
          required
          {...form.getInputProps('file')}
        />

        <Group position="right" mt="lg">
          <Button type="submit">Deploy model</Button>
        </Group>
      </form>
    </Box>
  );
};

export { ModelForm };
