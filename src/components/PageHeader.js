import { Row, Col, Typography, Input } from 'antd';
import '../styles/PageHeader.css';
const { Text } = Typography;
const { Search } = Input;

function PageHeader(props) {
  return (
    <Row className='pageHeader'>
      <Col span={18} >
        <Text className='headerText'>{props.headerText}</Text>
      </Col>
      <Col span={6}>
        <Search placeholder={props.placeholder} onSearch={props.onSearch} />
      </Col>
    </Row>
  )
}

export default PageHeader;