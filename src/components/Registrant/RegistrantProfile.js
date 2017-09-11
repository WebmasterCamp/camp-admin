import React from 'react';
import { Card, Col, Tag } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { getImagePath, majorAsText } from '../../utils/helpers';

const Label = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const Question = styled.span`
  font-size: 15px;
  font-weight: bold;
  margin-right: 5px;
  margin-bottom: 4px;
  white-space: pre-line;
`;

const Answer = styled.span`
  font-size: 16px;
`;

const AvatarImage = styled.div`
  background-image: url('${props => `${getImagePath(props.image)}`}');
  background-position: center center;
  background-size: contain;
  width: 180px;
  height: 180px;
  background-repeat: no-repeat;
`;

const RegistrantProfile = props => {
  return (
    <div>
      <Card loading={props.isLoading} noHovering>
        <Col span={5}>
          <AvatarImage image={props.picture} />
        </Col>
        <Col span={8}>
          <Tag color="#108ee9">{props.status === 'in progress' ? 'Pending' : majorAsText(props.major)}</Tag>
          <Label style={{ marginTop: 8 }}>{`${props.title}${props.firstName} ${props.lastName}`}</Label>
          <Label>{`${props.firstNameEN} ${props.lastNameEN}`}</Label>
          <p style={{ marginTop: 10 }}>
            <Question>ชื่อเล่น: </Question>
            <Answer>{props.nickname}</Answer>
          </p>
          <p>
            <Question>เพศ: </Question>
            <Answer>{props.sex}</Answer>
          </p>
        </Col>
        <Col span={8}>
          <p>
            <Question>สถานศึกษา: </Question>
            <Answer>{props.university}</Answer>
          </p>
          <p>
            <Question>ชั้นปี: </Question>
            <Answer>{props.academicYear}</Answer>
          </p>
          <p>
            <Question>คณะ: </Question>
            <Answer>{props.faculty}</Answer>
          </p>
          <p>
            <Question>สาขา: </Question>
            <Answer>{props.department}</Answer>
          </p>
        </Col>
      </Card>
      <Card
        loading={props.isLoading}
        noHovering
        title="ข้อมูลติดต่อ"
        style={{ marginTop: 20 }}
      >
        <p>
          <Question>ที่อยู่: </Question>
          <Answer>{props.address}</Answer>
        </p>
        <p>
          <Question>จังหวัด: </Question>
          <Answer>{props.province}</Answer>
        </p>
        <p>
          <Question>Email: </Question>
          <Answer>{props.email}</Answer>
        </p>
        <p>
          <Question>เบอร์ติดต่อ: </Question>
          <Answer>{props.phone}</Answer>
        </p>
        <p style={{ marginTop: 15 }}>
          <Question>ผู้ติดต่อฉุกเฉิน: </Question>
          <Answer>{props.emergencyName}</Answer>
        </p>
        <p style={{ marginTop: 15 }}>
          <Question>เบอร์ติดต่อฉุนเฉิน: </Question>
          <Answer>{props.emergencyPhone}</Answer>
        </p>
        <p>
          <Question>เกี่ยวข้องเป็น: </Question>
          <Answer>{props.emergencyPhoneRelated}</Answer>
        </p>
      </Card>
      <Card
        loading={props.isLoading}
        noHovering
        title="ข้อมูลเพิ่มเติม"
        style={{ marginTop: 20 }}
      >
        <Col span={12}>
          <p>
            <Question>วันเกิด: </Question>
            <Answer>{moment(props.birthdate).format('D MMMM YYYY')}</Answer>
          </p>
          <p>
            <Question>กรุ๊ปเลือด: </Question>
            <Answer>{props.blood}</Answer>
          </p>
          <p>
            <Question>ศาสนา: </Question>
            <Answer>{props.religion}</Answer>
          </p>
          <p>
            <Question>ไซส์เสื้อ: </Question>
            <Answer>{props.shirtSize}</Answer>
          </p>
        </Col>
        <Col span={12}>
          <p>
            <Question>โรคประจำตัว: </Question>
            <Answer>{props.disease}</Answer>
          </p>
          <p>
            <Question>ยาที่ใช้ประจำ: </Question>
            <Answer>{props.med}</Answer>
          </p>

          <p>
            <Question>ยาที่แพ้: </Question>
            <Answer>{props.medAllergy}</Answer>
          </p>
          <p>
            <Question>อาหารที่รับประทาน: </Question>
            <Answer>{props.food}</Answer>
          </p>
          <p>
            <Question>อาหารที่แพ้: </Question>
            <Answer>{props.foodAllergy}</Answer>
          </p>
        </Col>
      </Card>
      <Card
        loading={props.isLoading}
        noHovering
        title="ข้อมูลเพิ่มเติม"
        style={{ marginTop: 20 }}
      >
        <p>
          <Question>รู้จักค่ายได้ผ่านช่องทางไหน: </Question>
          <Answer>{props.knowCamp.join(', ')}</Answer>
        </p>
        <p><Question>กิจกรรมและความสามารถพิเศษ</Question></p>
        <p><Answer>{props.activities}</Answer></p>
      </Card>
    </div>
  );
}

export default RegistrantProfile;
