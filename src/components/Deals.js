import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { Row, Col, Typography, Input, Checkbox, Button } from 'antd';
import '../styles/Deals.css';

import { DownOutlined, UpOutlined } from '@ant-design/icons';

const { Text } = Typography
const { Search } = Input;

const baseURL = "https://www.cheapshark.com/api/1.0/deals?onSale=0";

var axios = require('axios');

var config = {
  method: 'get',
  url: baseURL,
  headers: {}
};

function Deals() {

  const [filterTog, setFilterTog] = useState(true);
  const [dealsTog, setDealsTog] = useState(true);
  const navigate = useNavigate();

  const PageHeader = () => {
    return (
      <Row className='pageHeader'>
        <Col span={18} >
          <Text className='dealsHeaderText'>Deals</Text>
        </Col>
        <Col span={6}>
          <Search placeholder="Search deals by name" onSearch={''} />
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

    const [deals, setDeals] = React.useState(null);

    React.useEffect(() => {
      axios(config)
        .then(function (response) {
          console.log((response.data));
          setDeals(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);

    if (!deals) return null;

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
            <Button className='dealButton' onClick={()=>{navigate('/deals/'+deal.dealID)}}>View More</Button>
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

  const NoDealsList = () => {

    const [deals, setDeals] = React.useState(null);

    React.useEffect(() => {
      axios(config)
        .then(function (response) {
          console.log((response.data));

          const deals = response.data;
          let noDeals = []
          deals.forEach(filterNoDeals);

          function filterNoDeals(deal) {
            if (!deal.isOnSale) {
              noDeals.push(deal)
            }
          }

          setDeals(noDeals)
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);

    if (deals === null) {
      return (
        <Row className='dealsContainer'>
          <Col>No Deals!</Col>
        </Row>
      )
    };

    const listDeals = deals.map((deal) =>

      <Col className='dealContainer'>
        <Row>
          <Col span={24} className='dealContainerTitle'>
            <Text className='dealTextTitleBold'>{deal.title.length > 15 ? deal.title.slice(0, 15) + '...' : deal.title}</Text>
          </Col>
          <Col span={24} className='dealContainerDescription'>
            <Text className='dealTextNormalPrice'>${deal.normalPrice}</Text>
            <Text className='dealTextSalePrice'>${deal.salePrice}</Text>
          </Col>
          <Col span={24} className='dealContainerButton'>
            <Button className='dealButton'>View More</Button>
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
        {dealsTog ? <DealsList /> : <NoDealsList />}      
    </>
  );
}

export default Deals;