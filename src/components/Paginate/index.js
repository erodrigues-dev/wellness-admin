import React from 'react';
import Pagination from 'react-js-pagination';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

/**
 * Paginate
 * @param {{
 *  activePage: number
 *  itemsCountPerPage: number
 *  totalItemsCount: number
 *  onChange(page:Number):void
 * }} props
 */
const Paginate = (props) => (
  <Container>
    <Pagination {...props} itemClass="page-item" linkClass="page-link" />
  </Container>
);

export default Paginate;
