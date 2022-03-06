import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button, Image, Typography } from 'antd';

import { useDispatch, useSelector } from "react-redux";
import { getAllStoresAsync, getStoreName } from '../features/stores';
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

  const Deal = (props) => {

    const deal = useSelector((state) => state.deals.data.deal);
    const isLoading = useSelector((state) => state.deals.loading);

    useEffect(() => {
      dispatch(getDealAsync(props.dealId)).then(() => {
      });
    }, [props.dealId])  

    useEffect(()=>{
      if(!isLoading){
        setGameId(deal.gameInfo.gameID)
        setStoreId(deal.gameInfo.storeID)
        setDealImage(deal.gameInfo.thumb)
      }      
    }, [deal, isLoading])  

    if (isLoading) return 'loading...';

    return (
      <>
        <Row className='dealDetailContainer'>
          <Col span={24} className='dealDetailContainerTitle'>
            <Text className='dealDetailTextTitle'>{deal.gameInfo.name}</Text>
          </Col>
          <Col span={24} className='dealDetailContainerDescription'>
            <Text>
              <span className='dealDetailTextNormalPrice'>${deal.gameInfo.retailPrice}</span>
              <span className='dealDetailTextSalePrice'>${deal.gameInfo.salePrice}</span>
            </Text>
            <Text className='dealDetailTextYouSave'>You save ${(deal.gameInfo.retailPrice - deal.gameInfo.salePrice).toFixed(2)}</Text>
          </Col>
        </Row>
      </>
    )

  }

  const Store = (props) => {    

    const storeName = useSelector((state) => state.stores.data.storeName);
    const storesIsLoading = useSelector((state)=> state.stores.loading);

    useEffect(() => {
      if (!storesIsLoading) {
        dispatch(getStoreName(props.storeId));    
      }
    }, [props.storeId, storesIsLoading])

    if (storesIsLoading || storeName === '') return 'loading...';    

    return (
      <>
        <Row className='storeTitleContainer'>
          <Col span={24} className='storeTitleTextContainer'>
            <Text className='storeTitleText'>{storeName}</Text>
          </Col>
        </Row>
      </>
    )
  }

  const OtherDeals = (props) => {

    const game = useSelector((state) => state.game.data);
    const gameIsLoading = useSelector((state)=> state.game.loading)    
    const allStores = useSelector((state) => state.stores.data.allStores);
    const storesIsLoading = useSelector((state)=> state.stores.loading)

    useEffect(() => {
      dispatch(getAllStoresAsync());
      dispatch(getGameAsync(props.gameId)).then(() => {
      });
    }, [props.gameId])

    if (gameIsLoading || storesIsLoading) return 'loading...'
    if (game.deals.length === '0') return 'No Deals';      

    const filterDeals = (game) => {
      // only return deals with savings
      const dealsWithSavings = game.deals.filter(deal => deal.savings > 0);

      // remove current deal from list
      const exclCurrentDeal = removeCurrentDeal(props.dealId, dealsWithSavings);

      function removeCurrentDeal(dealID, dealArray) {
        const filtered = []
        for (var i = 0; i < dealArray.length; i++) {
          if (dealArray[i].dealID !== dealID) {
            filtered.push(dealArray[i]);
          }
        }
        return filtered;
      }    

      return exclCurrentDeal
    }

    const listDeals = filterDeals(game).map((deal) =>
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
    if (!props.thumb) return '';
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