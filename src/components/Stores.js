import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "./PageHeader";
import { getAllStoresAsync, filterStoresAsync } from '../features/stores';

import { Row, Col, Typography, Button, Image } from 'antd';
import '../styles/Stores.css';

const { Text, Title } = Typography

function Stores() {
  
  const [state, setState] = useState({storesFilter: ''})    

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllStoresAsync());
  }, [dispatch])

  const handleSearch = value => {    
    setState({storesFilter: value});     
  }

  const StoresList = () => {
    let renderStores;

    const storesFilter = state.storesFilter;  

    const allStores = useSelector((state) => state.stores.data.allStores);
    const filteredStores = useSelector((state) => state.stores.data.filteredStores);
    const isLoading = useSelector((state) => state.stores.loading);            

    useEffect(() => {
      if (!isLoading) {
        dispatch(filterStoresAsync(allStores, storesFilter))
      }
    }, [allStores, storesFilter, isLoading]);

    const NoResults = ({ message, resetSearch }) => {
      return (
        <Col className='noResultContainer'>
          <Title>{message}</Title>
          {resetSearch ? <Button className='noResultButton' onClick={()=>{setState({storesFilter: ''})}}>Reset Search</Button> : ''}
        </Col>
      )
    }
    
    if (isLoading) return <NoResults message={'Loading...'} />    

    if (storesFilter === '') {
      renderStores = allStores;
    } else {
      renderStores = filteredStores;
    }

    if (!renderStores.length && storesFilter !== '') return <NoResults message={`Sorry, no stores available for search term: ${storesFilter}`} resetSearch={true} />

    if (!renderStores.length) return <NoResults message={'Sorry, no stores available'} />

    const listStores = renderStores.map((store) =>
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