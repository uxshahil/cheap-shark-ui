import React, { useState } from 'react';
import { SiteHeader } from './';
import { Layout, Row, Col, Typography, Input, Checkbox } from 'antd';
import '../styles/Deals.css';

import { DownOutlined, UpOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Text } = Typography
const { Search } = Input;

function Deals() {

  const [filterTog, setFilterTog] = useState(false);

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
          <Checkbox className='dealsFiltersCheckbox' onChange={filterResults}>On Sale</Checkbox>
        </Row>
      </>
    )
  }

  return (
    <>
      <SiteHeader />
      <Content>
        <PageHeader />
        <Filters dropdown={filterTog} />
      </Content>
    </>
  );
}

export default Deals;