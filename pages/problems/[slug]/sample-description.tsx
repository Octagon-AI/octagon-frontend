import {
  Table,
  Progress,
  Anchor,
  Text,
  Group,
  LoadingOverlay,
  Button,
} from '@mantine/core';

const SampleDescription = () => {
  return (
    <Text
      size="lg"
      style={{ color: 'white', textAlign: 'left', lineHeight: '1.6' }}
    >
      {/* {service?.description} */}
      <strong>Context</strong>
      <p>
        Uniswap is a decentralized exchange (DEX) that operates on the Ethereum
        blockchain, using an automated market maker (AMM) model. Uniswap V3 and
        V4 introduced a paradigm shift by allowing liquidity providers (LPs) to
        concentrate their liquidity within specific price ranges. While this
        innovation enhances capital efficiency and potential returns, it also
        brings about a unique set of challenges and complexities that LPs must
        navigate.
      </p>

      <strong>The Core Problem: Range-Specific Liquidity Management</strong>
      <p>
        <strong>1. Range-Specific Liquidity</strong>
        <br />
        In Uniswap V3 and V4, LPs must specify a price range within which they
        want their liquidity to be active. This approach concentrates liquidity
        around the current market price, making it more efficient and
        potentially more profitable. However, it also means that:
      </p>
      <ul>
        <li>
          <strong>Liquidity is Inactive Outside the Range:</strong> If the
          market price moves outside the specified range, the provided liquidity
          becomes inactive. This means the LP stops earning trading fees until
          the market price re-enters the specified range.
        </li>
      </ul>

      <p>
        <strong>2. Need for Active Management</strong>
        <br />
        The dynamic nature of cryptocurrency markets requires LPs to actively
        manage their positions. This involves:
      </p>
      <ul>
        <li>
          <strong>Continuous Monitoring:</strong> LPs must continuously track
          the market price of the assets within their liquidity pool to ensure
          their specified range remains effective.
        </li>
        <li>
          <strong>Frequent Adjustments:</strong> As market conditions change,
          LPs need to adjust their liquidity ranges to remain within the optimal
          fee-earning zone. This requires:
          <ul>
            <li>
              <strong>Withdrawing Liquidity:</strong> LPs must withdraw their
              liquidity from the old range.
            </li>
            <li>
              <strong>Redeploying Liquidity:</strong> They must then redeploy
              their liquidity within a new, more appropriate range.
            </li>
          </ul>
        </li>
        <li>
          <strong>Gas Fees:</strong> Each adjustment involves transactions on
          the Ethereum blockchain, which incurs gas fees. Frequent adjustments
          can therefore become costly, especially during times of high network
          congestion.
        </li>
      </ul>

      <p>
        <strong>3. Timing Constraints</strong>
        <br />
        The need to actively manage liquidity is compounded by timing
        constraints:
      </p>
      <ul>
        <li>
          <strong>Timely Adjustments:</strong> To maximize earnings, LPs need to
          adjust their liquidity ranges promptly when market prices shift.
          Delayed adjustments can lead to periods where no fees are earned.
        </li>
        <li>
          <strong>Price Volatility:</strong> During periods of high price
          volatility, the optimal price range can change rapidly, necessitating
          more frequent adjustments. This increases the complexity and cost of
          managing liquidity positions.
        </li>
      </ul>

      <p>
        <strong>4. Strategic Complexity</strong>
        <br />
        LPs must develop strategies to balance risk and return effectively:
      </p>
      <ul>
        <li>
          <strong>Automated Strategies:</strong> Some LPs use automated
          strategies or third-party services to manage their positions. These
          tools can adjust liquidity ranges based on predefined criteria or
          real-time market data.
        </li>
        <li>
          <strong>Manual Adjustments:</strong> Alternatively, LPs can manually
          manage their positions, requiring a deep understanding of market
          dynamics and a commitment to active monitoring.
        </li>
        <li>
          <strong>Hedging:</strong> To mitigate risks associated with price
          movements, some LPs employ hedging strategies, such as using options
          or other financial instruments. This adds another layer of complexity
          to liquidity provision.
        </li>
      </ul>
    </Text>
  );
};

export default SampleDescription;
