import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "./PageHeader";
import { getAllStores, filterStores } from '../features/stores';

import { Row, Col, Typography, Button, Image } from 'antd';
import '../styles/Stores.css';

const { Text, Title } = Typography

function Stores() {
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch()
  dispatch(getAllStores());

  const handleSearch = value => {
    setSearchTerm(value);
    dispatch(filterStores(value));
  }

  const StoresList = (props) => {
    const allStores = useSelector((state) => state.stores.allStores);
    const filteredStores = useSelector((state) => state.stores.filtered);
    
    const [ stores, setStores ] = useState();

    useEffect(()=>{
      if (!searchTerm) {
        setStores(allStores)
      }else(
        setStores(filteredStores)
      )
    },
    [allStores, filteredStores]);

    const NoResults = () => {
      return (
        <Col className='noResultContainer'>
          {!searchTerm
            ? (!allStores ? <Title>Loading...</Title> : <Title>Sorry, no stores available</Title>)
            : <>
              <Title>Sorry, no stores available for search term: <strong>{searchTerm}</strong></Title>
              <Button className='noResultButton' onClick={() => { setSearchTerm('') }}>Reset Search</Button>
            </>}
        </Col>)
    }    
    
    if (!stores) return <NoResults />

    const listStores = stores.map((store) =>
      <Col className='storeContainer' key={store.storeID}>
        <Row className='storeImageContainer'>
          <Image width='100%' src={'https://www.cheapshark.com/'+store.images.logo}></Image>
        </Row>        
        <Row>
          <Col span={24} className='storeContainerTitle'>
            <Text className='storeTextTitle'>{store.storeName}</Text>
          </Col>
          <Col span={24} className='storeContainerDescription'>
            <Text className='storeDescriptionDeals'>{'total deals unavailable'}</Text>            
          </Col>
          <Col span={24} className='storeContainerButton'>
            <Button className='storeButton' onClick={''}>View More</Button>
          </Col>
        </Row>
      </Col>
    )

    return (
      <Row className='storesContainer'>
        {listStores}
      </Row>
    )
  }

  return (
    <>
      <PageHeader
        onSearch={handleSearch}
        placeholder={'Search stores by name'}
        headerText={'Stores'}
      />
      <StoresList />
    </>
  );
}

export default Stores;