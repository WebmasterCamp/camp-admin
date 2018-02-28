import React from 'react'
import styled from 'styled-components'

import { getPdfPath } from '../../utils/helpers'

const Container = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
`

const Question = styled.h2`
  font-weight: 600;
  margin-bottom: 10px;
`

const Answer = styled.h3`
  white-space: pre-line;
`

const AnswerItem = props => (
  <Container>
    <Question>{props.question}</Question>
    {props.isLink &&
      props.answer && (
        <a href={getPdfPath(props.answer)} target="_blank">
          เปิดไฟล์ Portfolio
        </a>
      )}
    {props.isLink && !props.answer && <p>ไม่มี Portfolio</p>}
    {!props.isLink && <Answer>{props.answer}</Answer>}
  </Container>
)

export default AnswerItem
