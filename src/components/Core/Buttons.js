import { Button } from 'antd';
import styled from 'styled-components';

export const RedButton = styled(Button)`
  background-color: #f04134;
  color: white;
  border-color: #f04134;
  &:hover {
    background-color: #c1291e;
    border-color: #c1291e;  
    color: white;
  }
`;

export const GreenButton = styled(Button)`
  background-color: #48a91f;
  color: white;
  border-color: #48a91f;
  &:hover {
    background-color: #328011;
    border-color: #328011;  
    color: white;
  }
`;
