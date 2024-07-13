import lighthouse from '@lighthouse-web3/sdk';

const apiKey = 'f9aa7723.749dd94a4bad4392a947dc5aed3c24db';

export const uploadFileTo = async (values, actionFunction) => {
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
