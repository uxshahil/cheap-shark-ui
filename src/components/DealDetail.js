import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button, Image, Typography } from 'antd';

import { useDispatch, useSelector } from "react-redux";
import { getAllStores, getStoreName } from '../features/stores';
import { getDealAsync } from '../features/deals';
import { getGameAsync } from '../features/game';

import '../styles/Deals.css';
import '../styles/DealDetail.css';

const { Text } = Typography;

function DealDetail() {
  const { id } = useParams();

  const [gameId, setGameId] = useState(null);
  const [storeId, setStoreId] = useState(null);
  const [dealImage, setDealImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  dispatch(getAllStores());

  const Deal = (props) => {

    const deal = useSelector((state) => state.deals.deal);

    useEffect(() => {
      dispatch(getDealAsync(props.dealId)).then(() => {
      });
    }, [props.dealId])

    if (deal.length === 0) return null;

    setGameId(deal[0].gameInfo.gameID)
    setStoreId(deal[0].gameInfo.storeID)
    setDealImage(deal[0].gameInfo.thumb)

    return (
      <>
        <Row className='dealDetailContainer'>
          <Col span={24} className='dealDetailContainerTitle'>
            <Text className='dealDetailTextTitle'>{deal[0].gameInfo.name}</Text>
          </Col>
          <Col span={24} className='dealDetailContainerDescription'>
            <Text>
              <span className='dealDetailTextNormalPrice'>${deal[0].gameInfo.retailPrice}</span>
              <span className='dealDetailTextSalePrice'>${deal[0].gameInfo.salePrice}</span>
            </Text>
            <Text className='dealDetailTextYouSave'>You save ${(deal[0].gameInfo.retailPrice - deal[0].gameInfo.salePrice).toFixed(2)}</Text>
          </Col>
        </Row>
      </>
    )

  }

  const Store = (props) => {

    const { allStores, store } = useSelector((state) => state.stores);

    useEffect(() => {
      if (allStores.length > 1) {
        dispatch(getStoreName(props.storeId));
      }
    }, [props.storeId, allStores.length])

    if (!store) return 'null';

    return (
      <>
        <Row className='storeTitleContainer'>
          <Col span={24} className='storeTitleTextContainer'>
            <Text className='storeTitleText'>{store}</Text>
          </Col>
        </Row>
      </>
    )
  }

  const OtherDeals = (props) => {

    const { game } = useSelector((state) => state.game);
    const { allStores } = useSelector((state) => state.stores);

    useEffect(() => {
      dispatch(getGameAsync(props.gameId)).then(() => {
      });
    }, [props.gameId])

    if (!game[0]) return null;
    if (!game[0].deals) return 'nodeals';

    // only return deals with savings
    const dealsWithSavings = game[0].deals.filter(deal => deal.savings > 0);

    // remove current deal from list
    const exlcCurrentDeal = removeCurrentDeal(props.dealId, dealsWithSavings);
    
    function removeCurrentDeal(nameKey, myArray) {
      const newArray = []
      for (var i = 0; i < myArray.length; i++) {        
        if (myArray[i].dealID !== nameKey) {
          newArray.push(myArray[i]);
        }        
      }
      return newArray;
    }

    const listDeals = exlcCurrentDeal.map((deal) =>
      <React.Fragment key={deal.dealID}>
        <Row className='otherDealsDealContainer'>
          <Col span={24}>
            <Text className='otherDealsDealTitle'>
              {allStores.find(x => x.storeID === deal.storeID).storeName}
            </Text>
          </Col>
          <Row className='otherDealsDealDescription'>
            <Col >
              <Text>
                <span className='otherDealsTextNormalPrice'>${deal.retailPrice}</span>
                <span className='otherDealsTextSalePrice'>${deal.price}</span>
              </Text>

            </Col>
            <Col>
              <Button className='otherDealsButton' onClick={() => { navigate('/deals/' + encodeURI(deal.dealID)) }}>View More</Button>
            </Col>
          </Row>
        </Row>
      </React.Fragment>
    );

    return (
      <>
        <Row className='otherDealsTitleContainer'>
          <Col span={24} className='otherDealsTitleTextContainer' >
            <Text className='otherDealsTitleText' >Other deals for this game</Text>
          </Col>
        </Row>
        {listDeals}
      </>
    )
  }

  const GameImage = (props) => {
    if (!props.thumb) return null;
    return (
      <Row>
        <Col span={24}>
          <Image src={props.thumb} width={'100%'} />
        </Col>
      </Row>
    )
  }

  return (
    <>
      <Row style={{ columnGap: '96px' }}>
        <Col span={14} >
          {id ? <Deal dealId={id} /> : ''}
          {storeId ? <Store storeId={storeId} /> : ''}
          {dealImage ? <GameImage thumb={dealImage} /> : ''}
        </Col>
        <Col span={8}>
          {gameId ? <OtherDeals gameId={gameId} dealId={id} /> : ''}
        </Col>
      </Row>
    </>
  )
}

export default DealDetail;