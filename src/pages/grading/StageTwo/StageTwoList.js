import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withProps, withState } from 'recompose';
import _ from 'lodash'
import { Table, Tag, Col, Row, Collapse, Input } from 'antd';
import styled from 'styled-components';

// import StageOneGrading from './StageOneGrading';
import { actions as gradingActions } from '../../../ducks/grading';
import { RedButton, GreenButton } from '../../../components/Core/Buttons';

const Panel = Collapse.Panel;

const enhance = compose(
  connect(
    state => ({
      isLoadingList: state.grading.isLoadingList,
      lists: state.grading.lists,
      answers: state.grading.answers,
      selectedItem: state.grading.selectedItem,
      graderNote: state.grading.note
    }),
    { ...gradingActions }
  ),
  withState('currentId', 'setCurrentId', ''),
  withState('note', 'setNote', ''),
  withProps(
    ownProps => ({
      lists: ownProps.lists.map((item) => ({
        ...item,
        key: item._id,
        id: item._id,
        note: item.noteStageTwo || ''
      })),
      loadGradingItem: id => {
        ownProps.getStageTwoItem(id);
        ownProps.setCurrentId(id);
      },
      onPass: (id, pass, note) => {
        ownProps.gradeStageTwoItem(id, pass, note)
          .then(() => ownProps.getStageTwoList())
          .then(() => {
            ownProps.getStageTwoItem(-1);
            ownProps.setCurrentId('');
          })
      }
    })
  ),
  lifecycle({
    componentDidMount() {
      this.props.getStageTwoList();
    },
    componentWillReceiveProps(nextProps) {
      console.log(nextProps.selectedItem.noteStageTwo, this.props.selectedItem.noteStageTwo);
      if (nextProps.selectedItem.noteStageTwo !== this.props.selectedItem.noteStageTwo) {
        nextProps.setNote(nextProps.selectedItem.noteStageTwo);
      }
    }
  })
);

const columns = props => [{
  title: 'ID',
  dataIndex: 'id',
  key: 'id',
  width: '100px',
  render: (text, item, idx) => <a onClick={() => props.loadGradingItem(idx)}>{text.substring(text.length - 5)}</a>,
}, {
  title: 'Status',
  dataIndex: 'status',
  key: 'status',
  width: '100px',  
  render: (text, record) => {
    console.log(record);
    if (!record.isJudgeStageTwo) {
      return <p>-</p>
    }
    if (record.isPassStageTwo) {
      return <Tag color="#87d068">Pass</Tag>;
    }
    return <Tag color="#f50">Nope</Tag>;
  }
}, {
  title: 'Note',
  dataIndex: 'note',
  key: 'note',
  render: text => <p>{text.substring(0, 10)}{text.substring(0, 10).length === 0 ? '' : '...'}</p>
}];

const GradingContainer = styled.div`
  max-height: 800px;
  overflow-y: scroll;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  padding: 15px 20px;
  width: 100%;
`;

const InfoItem = styled.p`
  font-size: 16px;
`;

const Label = styled.p`
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 18px;
`;

const ActionSpan = styled.div`
  padding-top: 15px;
  > * {
    margin-right: 10px;
  }
`;

const NoteInput = styled(Input.TextArea)`
  margin-top: 10px;
`;

const StageOneList = props => {
  const { selectedItem, note } = props;
  console.log(note);
  return (
    <div>
      <h1>Grading</h1>
      <Row gutter={16}>
        <Col span={8}>
          <Table
            loading={props.isLoadingList}
            size="middle"
            bordered
            columns={columns(props)}
            dataSource={props.lists}
            locale={{ emptyText: 'No Data.' }}
          />
        </Col>
        <Col span={16}>
          {Object.keys(selectedItem).length !== 0 && (
            <GradingContainer>
              <Label>ID: {selectedItem._id}</Label>
              <Collapse defaultActiveKey={['profile', 'contact']}>
                <Panel header={<p><b>ข้อมูลส่วนตัว</b></p>} key="profile">
                  <InfoItem><b>ชื่อ-นามสกุล:</b> {selectedItem.firstName} {selectedItem.lastName}</InfoItem>
                  <InfoItem><b>Name:</b> {selectedItem.firstNameEN} {selectedItem.lastNameEN}</InfoItem>
                  <InfoItem><b>ชื่อเล่น:</b> {selectedItem.nickname}</InfoItem>
                  <InfoItem><b>เพศ:</b> {selectedItem.sex}</InfoItem>
                  <InfoItem><b>สถานศึกษา:</b> {selectedItem.university}</InfoItem>
                  <InfoItem><b>ชั้นปี:</b> {selectedItem.academicYear}</InfoItem>
                  <InfoItem><b>คณะ:</b> {selectedItem.faculty}</InfoItem>
                  <InfoItem><b>สาขา:</b> {selectedItem.department}</InfoItem>
                </Panel>
                <Panel header={<p><b>ข้อมูลการติดต่อ</b></p>} key="contact">
                  <InfoItem><b>ที่อยู่:</b> {selectedItem.address}</InfoItem>
                  <InfoItem><b>จังหวัด:</b> {selectedItem.province}</InfoItem>
                  <InfoItem><b>Email:</b> {selectedItem.email}</InfoItem>
                  <InfoItem><b>เบอร์ติดต่อ:</b> {selectedItem.phone}</InfoItem>
                  <InfoItem><b>ผู้ติดต่อฉุกเฉิน:</b> {selectedItem.emergencyName}</InfoItem>
                  <InfoItem><b>เบอร์ติดต่อฉุนเฉิน:</b> {selectedItem.emergencyPhone}</InfoItem>
                  <InfoItem><b>เกี่ยวข้องเป็น:</b> {selectedItem.emergencyPhoneRelated}</InfoItem>
                </Panel>
              </Collapse>
              <NoteInput rows={3} value={note} onChange={e => props.setNote(e.target.value)} />
              <ActionSpan>
                <GreenButton icon="check-circle" onClick={() => props.onPass(selectedItem._id, true, note)}>Yes</GreenButton>
                <RedButton icon="close-circle" onClick={() => props.onPass(selectedItem._id, false, note)}>Nope</RedButton>
              </ActionSpan>
            </GradingContainer>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default enhance(StageOneList);
