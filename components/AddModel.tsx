import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, LoadingOverlay } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { useApiAimodelsCreate } from '../my-apis/endpoints/api/api';
import { notifications } from '@mantine/notifications';
import { ModelForm } from './ModelForm';
import axios from 'axios';
import { useState } from 'react';
import lighthouse from '@lighthouse-web3/sdk';

const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY ?? '';

// Function to sign the authentication message using Wallet
const signAuthMessage = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      if (accounts.length === 0) {
        throw new Error('No accounts returned from Wallet.');
      }
      const signerAddress = accounts[0];
      const { message } = (await lighthouse.getAuthMessage(signerAddress)).data;
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, signerAddress],
      });
      return { signature, signerAddress };
    } catch (error) {
      console.error('Error signing message with Wallet', error);
      return null;
    }
  } else {
    console.log('Please install Wallet!');
    return null;
  }
};

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

    console.log('Uploading to Lighthouse...');
    console.log(file);
    console.log(apiKey);

    const encryptionAuth = await signAuthMessage();
    if (!encryptionAuth) {
      console.error('Failed to sign the message.');
      return;
    }

    const { signature, signerAddress } = encryptionAuth;

    try {
      const output = await lighthouse.uploadEncrypted(
        [file],
        apiKey,
        signerAddress,
        signature.toString(),
        progressCallback
      );
      console.log(output);
      console.log(
        `Decrypt at https://decrypt.mesh3.network/evm/${output.data[0].Hash}`
      );
      return output.data[0].Hash;
    } catch (error) {
      console.error('Error uploading encrypted file:', error);
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
