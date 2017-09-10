import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import { connect } from "react-redux";
import { Tabs, Button, Card, Row, Col, Tag } from "antd";
import styled from "styled-components";

import { actions as registrantActions } from "../../ducks/registrant";
import RegistrantProfile from '../../components/Registrant/RegistrantProfile';
import QuestionCard from '../../components/Registrant/QuestionCard';
import questions from '../grading/questions.json';

const TabPane = Tabs.TabPane;
const { generalQuestions } = questions;

const enhance = compose(
  connect(
    state => ({
      registrant: state.registrant.registrant,
      isLoading: state.registrant.isRegistrantLoading
    }),
    { ...registrantActions }
  ),
  withProps(ownProps => ({
    userId: ownProps.match.params.id
  })),
  lifecycle({
    componentDidMount() {
      this.props.getRegistrant(this.props.userId);
    }
  })
);

const Registrant = props => {
  console.log(props);
  const { registrant } = props;
  return (
    <div>
      <Tabs>
        <TabPane tab="Profile" key="1">
          <RegistrantProfile {...registrant} loading={props.isLoading} />
        </TabPane>
        <TabPane tab="คำถามทั่วไป" key="2">
          {registrant && registrant.questions && registrant.questions.generalQuestions.map((answer, idx) => (
            <QuestionCard key={answer._id} question={generalQuestions[idx]} answer={answer.answer} loading={props.isLoading} />
          ))}
        </TabPane>
        <TabPane tab="คำถามสาขา" key="3">
          <Card
            loading={props.isLoading}
            noHovering
            title="DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD "
            style={{}}
          >
            <p>DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD DUDUD </p>
          </Card>
          <Card
            loading={props.isLoading}
            noHovering
            title="Quation 2"
            style={{ marginTop: 20 }}
          >
            <p>Answer: Card content</p>
          </Card>
          <Card
            loading={props.isLoading}
            noHovering
            title="Quation 3"
            style={{ marginTop: 20 }}
          >
            <p>Answer: Card content</p>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default enhance(Registrant);
