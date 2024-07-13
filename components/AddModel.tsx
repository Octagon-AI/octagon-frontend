import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, LoadingOverlay } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { useApiAimodelsCreate } from '../my-apis/endpoints/api/api';
import { notifications } from '@mantine/notifications';
import { ModelForm } from './ModelForm';
import axios from 'axios';
import { useState } from 'react';
import lighthouse from '@lighthouse-web3/sdk';

const apiKey = 'f9aa7723.749dd94a4bad4392a947dc5aed3c24db';

const AddModel = ({ refetchParent, problems, types }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [isPending, setIsPending] = useState(false);
  const { isPending: pendingCreation, mutateAsync: createAsync } =
    useApiAimodelsCreate();

  // Function to upload file to Lighthouse with progress callback
  const uploadToLighthouse = async (file) => {
    const progressCallback = (progressData) => {
      let percentageDone =
        100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
      console.log(percentageDone);
    };

    try {
      const uploadResponse = await lighthouse.upload(
        file,
        apiKey,
        false,
        undefined,
        progressCallback
      );
      console.log(uploadResponse);
      console.log(
        'Visit at https://gateway.lighthouse.storage/ipfs/' +
          uploadResponse.data.Hash
      );
      return uploadResponse.data.Hash;
    } catch (error) {
      throw new Error('Lighthouse upload failed');
    }
  };

  // Function to post data to the database
  const postToDatabase = async (payload, fileHash) => {
    const formData = new FormData();
    formData.append('file', payload.file);
    formData.append('name', payload.name);
    formData.append('description', payload.description);
    formData.append('problem', payload.problem);
    formData.append('type', payload.type);
    formData.append('fileHash', fileHash);
    formData.append('accuracy', '75.2');

    await axios.post('http://localhost:8000/api/aimodels/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  // Function to handle form submission
  const createModel = async (payload) => {
    try {
      setIsPending(true);

      // Upload file to Lighthouse
      const fileHash = await uploadToLighthouse(payload.file);

      // Post data to the database
      await postToDatabase(payload, fileHash);

      close();
      notifications.show({
        message: 'Model deployed successfully',
        color: 'green',
      });
      if (refetchParent) refetchParent();
    } catch (error) {
      notifications.show({
        message: `Model deployment failed: ${error.message}`,
        color: 'red',
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Deploy a model">
        <LoadingOverlay visible={isPending} zIndex={1000} />
        <ModelForm
          actionFunction={createModel}
          problems={problems}
          types={types}
        />
      </Modal>
      <Button
        onClick={open}
        justify="center"
        radius={'xl'}
        rightSection={<IconUpload size={20} />}
        style={{ maxWidth: 300, margin: 'auto' }}
        variant="outline"
        mt="lg"
        mb="sm"
      >
        Deploy your own model
      </Button>
    </>
  );
};

export { AddModel };
