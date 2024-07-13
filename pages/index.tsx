<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { Button, Group, Container, Text, Title, Card } from "@mantine/core";
import { relative } from "path";
import { useEffect, useRef } from 'react';
import Logo from '../public/log.svg';
import Image from 'next/image';

export default function IndexPage() {

  return (
    <Group mt={0} justify="center">
    <div style={{maxWidth: '50%'}} >     
      <Card shadow="sm" padding="xl" radius="xl" withBorder style={{backgroundColor: '#2e2e2eAA'}}>

      <Title mb='10' order={1} style={{fontWeight: 900, fontSize: '5rem', textAlign: 'center', display: 'flex', justifyContent: 'center'}}>
      <Image src={Logo} alt="Logo" width={100} />
      <Text
      component="span"
      inherit
      ml="lg"
      variant="gradient"
      gradient={{ from: '#E22732', to: '#FFFFFF' }}
      
    >
      Octagon AI
    </Text>

    </Title>
  <Text size="lg" style={{color: 'white', textAlign: 'center', minWidth: 600}}>A platform for managing, compiling and deployming provable neural networks for time-series predictions. On our platform you can compile trained neural networks for time series predictions, deploy a verifier to prove inference of the network and include predictions of the network into a vault strategy.</Text>
        </Card>      
        <Card shadow="sm" mt='lg' padding="sm" radius="xl" withBorder style={{backgroundColor: '#2e2e2eAA'}}>
        <Text size="sm" style={{color: '#e64f57', textAlign: 'center', margin: 'auto'}}>Hey! <br></br>This frontend runs without the appropriate backend services because it uses a bunch of AI/ML libraries. You can try running the backend locally (use localhost:8000) and continue to use this web app.</Text>
        </Card>
  </div>
  </Group>

=======
import { Button, Group } from "@mantine/core";

export default function IndexPage() {
  return (
    <Group mt={50} justify="center">
      <Button size="xl">Welcome to Mantine!</Button>
    </Group>
>>>>>>> parent of dd22bce (first page)
=======
import { Button, Group } from "@mantine/core";

export default function IndexPage() {
  return (
    <Group mt={50} justify="center">
      <Button size="xl">Welcome to Mantine!</Button>
    </Group>
>>>>>>> parent of dd22bce (first page)
=======
import { Button, Group } from "@mantine/core";

export default function IndexPage() {
  return (
    <Group mt={50} justify="center">
      <Button size="xl">Welcome to Mantine!</Button>
    </Group>
>>>>>>> parent of dd22bce (first page)
  );
}
