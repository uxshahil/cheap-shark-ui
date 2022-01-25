import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllDealsAsync, filterDeals } from '../features/deals';

import { Row, Col, Typography, Input, Checkbox, Button } from 'antd';
import '../styles/Deals.css';

import { DownOutlined, UpOutlined } from '@ant-design/icons';

const { Text } = Typography
const { Search } = Input;

function Deals() {

  const [filterTog, setFilterTog] = useState(true);
  const [dealsTog, setDealsTog] = useState(true);
  const [q, setQ] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch()

  dispatch(getAllDealsAsync());

  const PageHeader = () => {

    const handleSearch = value => {
      setQ(value);
      dispatch(filterDeals(value));
    }

    return (
      <Row className='pageHeader'>
        <Col span={18} >
          <Text className='dealsHeaderText'>Deals</Text>
        </Col>
        <Col span={6}>
          <Search placeholder="Search deals by name" onSearch={handleSearch} />
        </Col>
      </Row>
    )
  }

  const Filters = (props) => {

    function filterResults(e) {
      console.log(`checked = ${e.target.checked}`);
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

  const DealsList = () => {
    const allDeals = useSelector((state) => state.deals.allDeals[0]);
    const noDeals = useSelector((state) => state.deals.noDeals[0]);
    const filteredDeals = useSelector((state) => state.deals.filtered)

    const [deals, setDeals] = useState(dealsTog ? allDeals : noDeals);

    useEffect(() => {

      if (!filteredDeals[0] && !q) {
        setDeals(dealsTog ? allDeals : noDeals)
      }
      else if (!filteredDeals[0] && q) {
        setDeals('');
        console.log(q);
      }
      else {
        setDeals(filteredDeals);
      }

      console.log(filteredDeals)
    }, [allDeals, noDeals, filteredDeals, q]);

    const NoResults = () => {
      return (
        <Col style={{ marginTop: '80px' }}>
          <Text>Sorry, no deals available for search term: "<strong>{q}</strong>"</Text>
          <Button style={{ marginLeft: '16px'}} onClick={() => { setQ('') }}>Reset Search</Button>
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
      <PageHeader />
      <Filters dropdown={filterTog} />
      <DealsList />
    </>
  );
}

export default Deals;