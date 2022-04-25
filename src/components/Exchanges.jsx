import React from 'react';
import millify from 'millify';
import { Row, Col, Typography, Avatar, Divider } from 'antd';
import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;
  // Note: To access this endpoint you need premium plan
  console.log(exchangesList);
  if (isFetching) return <Loader />;
  return (
    <>
      <div style={{ backgroundColor: 'black', padding: 10 }}>
        <Row>
          <Col span={1}>Rank</Col>
          <Col span={5}>Exchanges</Col>
          <Col span={5}>Markets</Col>
          <Col span={5}>24h Volume</Col>
          <Col span={5}>Price</Col>
        </Row>
        <Divider />
      </div>
      <div style={{ backgroundColor: 'black' }}>
        {exchangesList.map((exchange) => (
          <Row key={exchange?.uuid} style={{ padding: 10 }}>
            <Col><Text><strong>{exchange?.rank}.</strong></Text></Col>
            <Col span={6}>
              <Col> <Avatar className="exchange-image" src={exchange?.iconUrl} /></Col>

              <Text><strong>{exchange?.name}</strong></Text>
            </Col>
            <Col span={4}>{millify(exchange?.numberOfMarkets)}</Col>
            <Col span={5}>${millify(exchange['24hVolume'])}</Col>
            <Col span={5}>${millify(exchange.price)}</Col>
          </Row>
        ))}
      </div>
    </>
  );
};

export default Exchanges;

