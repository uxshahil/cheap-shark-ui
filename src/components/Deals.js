import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllDealsAsync, filterDeals } from '../features/deals';
import PageHeader from "./PageHeader";
import { Row, Col, Typography, Input, Checkbox, Button } from 'antd';
import '../styles/Deals.css';

import { DownOutlined, UpOutlined } from '@ant-design/icons';

const { Text, Title } = Typography
const { Search } = Input;

function Deals() {

  const [filterTog, setFilterTog] = useState(true);
  const [dealsTog, setDealsTog] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch()

  dispatch(getAllDealsAsync());

  const handleSearch = value => {
    setSearchTerm(value);
    dispatch(filterDeals(value));
  }

  const Filters = (props) => {

    function filterResults(e) {
      setDealsTog(e.target.checked);
    };

    function toggle() {
      setFilterTog(!props.dropdown);
    }

    return (
      <>
        <Row className='dealsFilters'>
          <Col span={23}>
            <Text className='dealsFiltersText'>Filters

            </Text>
          </Col>
          <Col span={1} className='dealsFiltersChevron' onClick={toggle}>
            {filterTog ? <UpOutlined /> : <DownOutlined />}
          </Col>
        </Row>
        <Row className={filterTog ? 'dealsFiltersChecks' : 'hide'}>
          <Checkbox className='dealsFiltersCheckbox' onChange={filterResults} checked={dealsTog}>On Sale</Checkbox>
        </Row>
      </>
    )
  }

  const DealsList = (props) => {
    const allDeals = useSelector((state) => state.deals.allDeals[0]);
    const noDeals = useSelector((state) => state.deals.noDeals[0]);
    const filteredDeals = useSelector((state) => state.deals.filtered)

    const [deals, setDeals] = useState();

    useEffect(() => {
      if (!searchTerm) {
        setDeals(dealsTog ? allDeals : noDeals)
      }
      else if (!filteredDeals[0] && searchTerm) {
        setDeals();
      }
      else if (filteredDeals[0] && searchTerm) {
        setDeals(dealsTog ? filteredDeals : noDeals);
      }
    }, [allDeals, noDeals, filteredDeals]);

    const NoResults = () => {
      return (
        <Col className='noResultContainer'>
          {!searchTerm
            ? (!allDeals ? <Title>Loading...</Title> : <Title>Sorry, no deals available</Title>)
            : <>
              <Title>Sorry, no deals available for search term: <strong>{searchTerm}</strong></Title>
              <Button className='noResultButton' onClick={() => { setSearchTerm('') }}>Reset Search</Button>
            </>}
        </Col>)
    }
    
    if (!deals) return <NoResults />

    const listDeals = deals.map((deal) =>

      <Col className='dealContainer'>
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
      <Filters dropdown={filterTog} />
      <DealsList />
    </>
  );
}

export default Deals;