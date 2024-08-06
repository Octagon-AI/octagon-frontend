import { ThemeIcon, Text, Title, Container, SimpleGrid, rem } from '@mantine/core';
import { IconGauge, IconCookie, IconUser, IconMessage2, IconLock } from '@tabler/icons-react';
import classes from './featuresSectionStyle.module.css';

export const MOCKDATA = [
  {
    icon: IconGauge,
    title: 'Unparalleled Model Performance',
    description:
      'Our platform ensures your AI models operate at peak performance, adapting to evolving data and improving continuously.',
  },
  {
    icon: IconUser,
    title: 'User-Centric Privacy',
    description:
      'We prioritize privacy, ensuring your model strategies remain confidential while still proving their effectiveness.',
  },
  {
    icon: IconCookie,
    title: 'Direct Developer Engagement',
    description:
      'By eliminating intermediaries, we enable direct interaction between model developers and users, fostering trust and collaboration.',
  },
  {
    icon: IconLock,
    title: 'Robust Security Measures',
    description:
      'Combining TEEs and ZK proofs, our platform guarantees the security and integrity of your models without compromising performance.',
  },
  {
    icon: IconMessage2,
    title: 'Real-Time Performance Metrics',
    description:
      'Access detailed performance metrics for your AI models in real-time, allowing for immediate insights and adjustments.',
  },
  {
    icon: IconMessage2,
    title: 'Dynamic Model Selection',
    description:
      'Our marketplace allows for flexible model selection based on user preferences, ensuring optimal performance for every use case.',
  },
];



interface FeatureProps {
  icon: React.FC<any>;
  title: React.ReactNode;
  description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div style={{backgroundColor: "#2e2e2eAA", borderRadius: "15px", padding: "20px", color: "white"}}>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      </ThemeIcon>
      <Text mt="md" size="lg" mb={7} style={{fontWeight: "bold", textDecoration: "underline"}}>
        {title}
      </Text>
      <Text size="md" lh={1.6}>
        {description}
      </Text>
    </div>
  );
}

export function FeaturesGrid() {
  const features = MOCKDATA.map((feature, index) => <Feature {...feature} key={index} />);

  return (
    <Container className={classes.wrapper}>
        <Container style={{backgroundColor: "#2e2e2eAA", borderRadius: "15px", padding: "20px", color: "white"}}>
            <Title className={classes.title}>Integrate effortlessly with any technology stack</Title>

            <Container size={560} p={0}>
                <Text size="md" className={classes.description}>
                Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when
                hunger drives it to try biting a Steel-type Pokémon.
                </Text>
            </Container>
        </Container>

      <SimpleGrid
        mt={60}
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 'xl', md: 50 }}
        verticalSpacing={{ base: 'xl', md: 50 }}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}

export default function IgnoreMe() {
  return <></>;
}
