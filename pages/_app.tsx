import '@mantine/core/styles.css';
import Head from 'next/head';
import { HeaderMegaMenu } from '../lib/HeaderMegaMenu/HeaderMegaMenu';
import { MantineProvider, createTheme, Container } from '@mantine/core';
import { FooterLinks } from '../lib/FooterLinks/FooterLinks';
import { useEffect, useRef } from 'react';
import {
  DynamicContextProvider,
  DynamicWidget,
} from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { EthersExtension } from '@dynamic-labs/ethers-v5';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import '@mantine/notifications/styles.css';
import '../public/overrides.css';
import { GlobalProvider } from '../contexts/globalContext';
import './globals.css';
import type { AppProps } from 'next/app';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  colors: {
    blue: [
      '#ffeaec',
      '#bee3f8',
      '#90cdf4',
      '#63b3ed',
      '#4299e1',
      '#3182ce',
      '#2b6cb0',
      '#2c5282',
      '#2a4365',
      '#1A365D',
    ],
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const cssOverrides = `
  .button--padding-large {
    padding: 0.66rem 1rem;
  }
`;

  const vantaRef = useRef(null);

  useEffect(() => {
    let vantaEffect: any;
    const loadVanta = () => {
      if (vantaRef.current && !vantaEffect) {
        vantaEffect = window.VANTA.GLOBE({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x3eadec,
          backgroundColor: 0x1b1b22,
        });
      }
    };

    // Load Vanta after the scripts are loaded
    if (typeof window !== 'undefined' && window.VANTA) {
      loadVanta();
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              refetchOnWindowFocus: false,
              retry: false,
            },
          },
        })
      }
    >
      <MantineProvider theme={theme} forceColorScheme="dark">
        <GlobalProvider>
          <ModalsProvider>
            <Head>
              <title>Octagon AI - Where your AI project lives.</title>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
              />
              <link rel="shortcut icon" href="/favicon.svg" />
            </Head>
            <DynamicContextProvider
              settings={{
                environmentId: 'a2dea8be-028b-4848-a65f-a57fe56a8770',
                walletConnectors: [EthereumWalletConnectors],
                walletConnectorExtensions: [EthersExtension],
                cssOverrides: cssOverrides,
              }}
            >
              <HeaderMegaMenu />
              <div
                ref={vantaRef}
                style={{
                  position: 'fixed',
                  width: '100%',
                  height: '100vh',
                  zIndex: -1,
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    minHeight: '100vh',
                    overflow: 'auto',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Component {...pageProps} />
                  </div>
                </div>
              </div>
              {/* <FooterLinks /> */}
            </DynamicContextProvider>
            <Notifications />
          </ModalsProvider>
        </GlobalProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}
