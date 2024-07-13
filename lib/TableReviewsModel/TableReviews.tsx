import { Table, Progress, Anchor, Text, Group, LoadingOverlay, Button, Badge, Tooltip, Modal, TextInput } from '@mantine/core';
import classes from './TableReviews.module.css';
import Link from 'next/link';
import { useEffect } from 'react';
import { apiAimodelsPartialUpdate } from '../../my-apis/endpoints/api/api';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import {
  deployStrategy,
  depositToStrategy,
  updateLiqudity,
  approveTokenSpend,
} from "../../scripts/smartContractInteractions";
import { ethers } from "ethers";
import { useDeployCreate } from '../../my-apis/endpoints/deploy/deploy';
import { id } from 'ethers/lib/utils';
import { useContext } from 'react';
import { GlobalContext } from '../../contexts/globalContext';
import Inference from "../../pages/inference/index";


export function TableReviews({services, isLoading, refetchParent}) {
    const [opened, { open, close }] = useDisclosure(false);
    const [opened2, {open: open2, close:close2}] = useDisclosure(false);
    const [opened3 , {open: open3, close:close3}] = useDisclosure(false);
    // const [selectModel, setSelectModel] = useState(0);
    const [isUpdating, setIsUpdating] = useState(false);
    const { primaryWallet } = useDynamicContext();
    const [isVerifierDelopying, setIsVerifierDelopying] = useState(false);
    const [isDeployingonChain, setIsDeployingonChain] = useState(false);
    const [isDepositing, setIsDepositing] = useState(false);
    const [isUpdatingLiqudity, setIsUpdatingLiqudity] = useState(false);
    const { mutateAsync: deployCreate } = useDeployCreate();
    const { verifierAddress, setVerifierAddress, strategyAddress, setStrategyAddress, selectModel, setSelectModel } = useContext(GlobalContext);
    const [ depositTx, setDepositTx ] = useState('');
    const [ updateTx, setUpdateTx ] = useState('');

    const form = useForm({
    });

    const deployMyStrategy = async () => {
      // const walletClient = await primaryWallet?.connector?.getWalletClient();
      setIsDeployingonChain(true);
      const signer = await primaryWallet?.connector.ethers?.getSigner();
      console.log(signer)
      // const verifierAddress = "0xBaa37770a6486f8070E3B6e0ebbCEe5dd1320894"
      let _strategyAddress = await deployStrategy(signer, verifierAddress);
      setStrategyAddress(_strategyAddress);
      notifications.show({message: `Strategy deployed successfully with address ${strategyAddress}`, color: 'green'});
      setIsDeployingonChain(false);
      }
    
    async function depositFunds() {
      setIsDepositing(true);
      const depositAmount = ethers.utils.parseUnits("0.0001", 18);
      const signer = await primaryWallet?.connector.ethers?.getSigner();
      await approveTokenSpend(signer, strategyAddress, depositAmount);
      let txHash = await depositToStrategy(signer, depositAmount, strategyAddress);
      notifications.show({message: `Deposited successfully with transaction hash ${txHash}`, color: 'green'});
      setDepositTx(txHash);
      setIsDepositing(false);
    }

    const rows = services?.map((row) => {
    const best_accuracy = parseFloat(row.accuracy) || 0;
    const positiveReviews = (best_accuracy);
    const negativeReviews = (100 - best_accuracy);  


    return (
      <Table.Tr key={row.name}>
        <Table.Td>
          <Anchor component="button" fz="sm">
            {row.name}
          </Anchor>
        </Table.Td>
        <Table.Td><Link href={'#'}>{row.problem_name}</Link></Table.Td>
        <Table.Td>
          <Anchor component="button" fz="sm">
            <Tooltip label={row.description}>
              <Text>Hover to read</Text>
            </Tooltip>
          </Anchor>
        </Table.Td>
        <Table.Td>
        {strategyAddress !== '' ? <Badge ml={5} variant='dot' color="teal">Deployed</Badge> : <Button onClick={() => {
          setSelectModel(row.id);
          open();
        }} variant='transparent'>Deploy</Button>}
        </Table.Td>
        <Table.Td>
        {false ? <Badge ml={5} variant='dot' color="teal">Deployed</Badge> : <Button onClick={() => {
          setSelectModel(row.id);
          open2();
        }} variant='transparent'>Deposit funds</Button>}
        </Table.Td>
        <Table.Td>
        {false ? <Badge ml={5} variant='dot' color="teal">Deployed</Badge> : <Button onClick={() => {
          setSelectModel(row.id);
          open3();
        }} variant='transparent'>Update liquidity</Button>}
        </Table.Td>
        <Table.Td>
          <Group justify="space-between">
            <Text fz="xs" c="teal" fw={700}>
              {positiveReviews.toFixed(0)}%
            </Text>
            <Text fz="xs" c="red" fw={700}>
              {negativeReviews.toFixed(0)}%
            </Text>
          </Group>
          <Progress.Root>
            <Progress.Section
              className={classes.progressSection}
              value={positiveReviews}
              color="teal"
            />

            <Progress.Section
              className={classes.progressSection}
              value={negativeReviews}
              color="red"
            />
          </Progress.Root>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table.ScrollContainer minWidth={800}>
      <LoadingOverlay visible={isLoading} />
      <Table verticalSpacing="xs">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Problem</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Availability</Table.Th>
            <Table.Th>Deposit</Table.Th>
            <Table.Th>Update liquidity</Table.Th>
            <Table.Th>Mean Absolute Error</Table.Th>
            
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      <Modal opened={opened} onClose={close} title="Deploy veirifer and strategy" size={"xl"}>
        <LoadingOverlay visible={false} />
        <Button mb='sm' onClick={async () => {
          setIsVerifierDelopying(true);

          let res:any = await deployCreate({id: selectModel});

          console.log(res);
          notifications.show({message: "successfully deployed", color: 'green'});
          setIsVerifierDelopying(false);

          setVerifierAddress(res.verifierAddress);
        }} loading={isVerifierDelopying} disabled={verifierAddress !== ''}>Deploy verifier</Button>

        { verifierAddress &&
          <>
            <Text>Verifier address: {verifierAddress}</Text>
            <a href={`https://sepolia.etherscan.io/address/${verifierAddress}`} target="_blank">View on Etherscan</a>
          </>
        }
        <br></br>
        <br></br>
        <Button mb='sm' onClick={deployMyStrategy} loading={isDeployingonChain} disabled={strategyAddress !== ''}>Deploy strategy</Button>

        { strategyAddress &&
          <>
            <Text>Strategy address: {strategyAddress}</Text>
            <a href={`https://sepolia.etherscan.io/address/${strategyAddress}`} target="_blank">View on Etherscan</a>
          </>
        }
        <br></br>
        <br></br>
      </Modal>
      <Modal opened={opened2} onClose={close2} title="Deposit funds to the strategy" size={"xl"}>
        <Button onClick={depositFunds} loading={isDepositing}>Deposit</Button>
        { depositTx &&
          <>
            <Text>Transaction hash: {depositTx}</Text>
            <a href={`https://sepolia.etherscan.io/tx/${depositTx}`} target="_blank">View on Etherscan</a>
          </>
        }
        <br></br>
        <br></br>
      </Modal>

      <Modal opened={opened3} onClose={close3} title="Deposit funds to the strategy" size={"xl"}>
        {/* <Button onClick={updateLiqudityLocal} loading={isUpdatingLiqudity} disabled={updateTx !== ''}>Update Liqudity</Button>
          { updateTx &&
            <>
              <Text>Transaction hash: {updateTx}</Text>
              <a href={`https://sepolia.etherscan.io/tx/${updateTx}`} target="_blank">View on Etherscan</a>
            </>
          } */}

          <Inference />
      </Modal>

    </Table.ScrollContainer>
  );
}
