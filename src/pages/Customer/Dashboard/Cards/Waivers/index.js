import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import service from '~/services/customerWaiver';

import { CardLayout } from '../CardLayout';
import { List } from './List';

const PAGE = 1;
const LIMIT = 3;

const Waivers = () => {
  const [list, setList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    service.list(PAGE, LIMIT, id).then(({ data }) => setList(data));
  }, [id]);

  return (
    <CardLayout
      title="Waivers"
      buttons={
        <>
          <Button variant="outline-secondary mr-2">Add</Button>
          <Button variant="outline-primary" className="text-nowrap">
            See More
          </Button>
        </>
      }
    >
      <List list={list} />
    </CardLayout>
  );
};

export default Waivers;
