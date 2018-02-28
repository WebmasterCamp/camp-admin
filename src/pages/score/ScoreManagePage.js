import React from 'react'
import { connect } from 'react-redux'
import { InputNumber, Button } from 'antd'
import { compose, withState, withProps } from 'recompose'
import styled from 'styled-components'

import { actions as scoreActions } from '../../ducks/score'
const Container = styled.div`
  text-align: center;
  @media (max-width: 768px) {
    width: 400px;
  }
`

const DetailContainer = styled.div`
  margin-bottom: 10px;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ScoreInput = styled(InputNumber)`
  width: 100%;
  margin-bottom: 10px;
  font-size: 36px;
  height: fit-content;
`

const enhance = compose(
  connect(
    state => ({
      saving: state.score.saving,
      user: state.auth.user,
    }),
    { ...scoreActions },
  ),
  withState('score', 'setScore', 0),
  withProps(props => ({
    onSubmit: () => {
      props.updateScore(props.score, props.user.username)
    },
  })),
)

const ScoreManagePage = props => {
  const { score, saving } = props
  return (
    <Container>
      <DetailContainer>
        <h1>ใส่ยอด +/- ได้ (โปรดใส่เลขอย่างเดียวนะพลีส)</h1>
        <h2>โกงบ้านบึ้มนะจ๊ะ</h2>
      </DetailContainer>
      <InputContainer>
        <ScoreInput onChange={v => props.setScore(v)} value={score} />
        <Button
          loading={saving}
          onClick={() => props.onSubmit()}
          type="primary"
        >
          Submit
        </Button>
      </InputContainer>
    </Container>
  )
}

export default enhance(ScoreManagePage)
