import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button, Image, Typography } from 'antd';

import { useDispatch, useSelector } from "react-redux";
import { getStoreName } from '../features/stores';

import '../styles/Deals.css';
import '../styles/DealDetail.css';

const { Text } = Typography;

const dealUrl = "https://www.cheapshark.com/api/1.0/deals?id=";
const gameUrl = "https://www.cheapshark.com/api/1.0/games?id=";

var axios = require('axios');

let storeCache;

function DealDetail() {
  const { id } = useParams();
  const [gameId, setGameId] = useState(null);
  const [storeId, setStoreId] = useState(null);
  const [dealImage, setDealImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const Deal = (props) => {

    const [deal, setDeal] = useState(null);

    useEffect(() => {

      var getDeal = {
        method: 'get',
        url: dealUrl + props.dealId,
        headers: {}
      };

      axios(getDeal)
        .then(function (response) {
          console.log((response.data));
          setDeal(response.data)
          setGameId(response.data.gameInfo.gameID)
          setStoreId(response.data.gameInfo.storeID)          
          setDealImage(response.data.gameInfo.thumb)
        })
        .catch(function (error) {
          console.log(error);
        });
    }, [props.dealId]);

    console.log(deal);

    if (deal === null || deal.length === 0) return null;

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
            <Text className='dealDetailTextYouSave'>You save ${deal.gameInfo.retailPrice - deal.gameInfo.salePrice}</Text>
          </Col>
        </Row>
      </>
    )
  }

  const Store = (props) => {
      
    const storeName = useSelector((state) => state.stores.value);
    dispatch(getStoreName(props.storeId));

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

  // const OtherDeals = (props) => {

  //   const [game, setGame] = useState(null);

  //   useEffect(() => {

  //     var getGame = {
  //       method: 'get',
  //       url: gameUrl + props.gameId,
  //       headers: {}
  //     };

  //     axios(getGame)
  //       .then(function (response) {
  //         console.log((response.data));
  //         setGame(response.data)
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }, [props.gameId]);

  //   if (!game) return null;

  //   const dealsWithSavings = game.deals.filter(deal => deal.savings > 0);

  //   const listDeals = dealsWithSavings.map((deal) =>
  //     <React.Fragment key={deal.dealID}>
  //       <Row className='otherDealsDealContainer'>
  //         <Col span={24}>
  //           <Text className='otherDealsDealTitle'>
  //             {storeCache.find(x => x.storeID === deal.storeID).storeName}

  //           </Text>
  //         </Col>
  //         <Row className='otherDealsDealDescription'>
  //           <Col >
  //             <Text>
  //               <span className='otherDealsTextNormalPrice'>${deal.retailPrice}</span>
  //               <span className='otherDealsTextSalePrice'>${deal.price}</span>
  //             </Text>

  //           </Col>
  //           <Col>
  //             <Button className='otherDealsButton' onClick={() => { navigate('/deals/' + deal.dealID) }}>View More</Button>
  //           </Col>
  //         </Row>
  //       </Row>
  //     </React.Fragment>
  //   );

  //   return (
  //     <>
  //       <Row className='otherDealsTitleContainer'>
  //         <Col span={24} className='otherDealsTitleTextContainer' >
  //           <Text className='otherDealsTitleText' >Other deals for this game</Text>
  //         </Col>
  //       </Row>
  //       {listDeals}
  //     </>
  //   )
  // }

  const GameImage = (props) => {
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
          {/* {gameId ? <OtherDeals gameId={gameId} /> : ''} */}
        </Col>
      </Row>
    </>
  )
}

export default DealDetail;