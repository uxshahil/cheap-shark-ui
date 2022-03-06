import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllDealsAsync, filterDealsAsync } from '../features/deals';
import PageHeader from "./PageHeader";
import { Row, Col, Typography, Checkbox, Button } from 'antd';
import '../styles/Deals.css';

import { DownOutlined, UpOutlined } from '@ant-design/icons';

const { Text, Title } = Typography

function Deals() {
  const [state, setState] = useState({dealsOnly: true, dealsFilter: ''})

  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllDealsAsync());
  }, [dispatch])

  const handleSearch = value => {  
    setState(state => ({...state, dealsFilter: value}));    
  }

  const Filters = () => {
    const [filterTog, setFilterTog] = useState(true);

    function filterResults(e) {
      setState(state => ({...state, dealsOnly: e.target.checked}));    
      console.log(e.target.checked)      
    };

    function toggle() {
      setFilterTog(!filterTog);
    }

    return (
      <>
        <Row className='dealsFilters'>
          <Col span={23}>
            <Text className='dealsFiltersText'>Filters</Text>
          </Col>
          <Col span={1} className='dealsFiltersChevron' onClick={toggle}>
            {filterTog ? <UpOutlined /> : <DownOutlined />}
          </Col>
        </Row>
        <Row className={filterTog ? 'dealsFiltersChecks' : 'hide'}>
          <Checkbox className='dealsFiltersCheckbox' onChange={filterResults} checked={state.dealsOnly}>On Sale</Checkbox>
        </Row>
      </>
    )
  }

  const DealsList = () => {
    let renderDeals;

    const dealsOnly = state.dealsOnly;
    const dealsFilter = state.dealsFilter;  

    const filteredDeals = useSelector((state) => state.deals.data.filteredDeals)
    const allDeals = useSelector((state) => state.deals.data.allDeals);
    const isLoading = useSelector((state) => state.deals.loading);        

    useEffect(() => {
      if (!isLoading) {
        dispatch(filterDealsAsync(allDeals, dealsFilter, dealsOnly))
      }
    }, [allDeals, dealsFilter, dealsOnly, isLoading]);

    const NoResults = ({ message, resetSearch }) => {
      return (
        <Col className='noResultContainer'>
          <Title>{message}</Title>
          {resetSearch ? <Button className='noResultButton' onClick={()=>{setState(state => ({...state, dealsFilter: ''}))}}>Reset Search</Button> : ''}
        </Col>
      )
    }

    if (isLoading) return <NoResults message={'Loading...'} />    

    if (dealsFilter === '' && dealsOnly === true) {
      renderDeals = allDeals;
    } else {
      renderDeals = filteredDeals;
    }

    if (!renderDeals.length && dealsFilter !== '') return <NoResults message={`Sorry, no deals available for search term: ${dealsFilter}`} resetSearch={true} />

    if (!renderDeals.length) return <NoResults message={'Sorry, no deals available'} />

    const listDeals = renderDeals.map((deal) =>

      <Col className='dealContainer' key={deal.dealID}>
        <Row>
          <Col span={24} className='dealContainerTitle'>
            <Text className='dealTextTitle'>{deal.title.length > 15 ? deal.title.slice(0, 15) + '...' : deal.title}</Text>
          </Col>
          <Col span={24} className='dealContainerDescription'>
            <Text className='dealTextNormalPrice'>${deal.normalPrice}</Text>
            <Text className='dealTextSalePrice'>${deal.salePrice}</Text>
          </Col>
          <Col span={24} className='dealContainerButton'>
            <Button className='dealButton' onClick={() => { navigate('/deals/' + encodeURI(deal.dealID)) }}>View More</Button>
          </Col>
        </Row>
      </Col>
    );

    return (
      <Row className='dealsContainer'>
        {listDeals}
      </Row>
    );
  }

  return (
    <>
      <PageHeader
        onSearch={handleSearch}
        placeholder={'Search deals by name'}
        headerText={'Deals'}      
      />
      <Filters />
      <DealsList/>
    </>
  );
}

export default Deals;