import React, { useCallback, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

import service from '~/services/waiver';

import confirmHandler from '../../components/ConfirmAlert/confirmHandler';
import { Filter } from './Filter';
import { FormWaiver } from './Form';
import { List } from './List';

export const Waiver = () => {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});

  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isDisplay, setIsDisplay] = useState(false);

  const fetchList = useCallback(async () => {
    try {
      const { data, headers } = await service.list(page, filters);
      setList(data);
      setTotal(Number(headers['x-total-count']));
    } catch (error) {
      toast.error('Unable to list waivers');
    }
  }, [page, filters]);

  const handleCreate = () => {
    setSelectedId(null);
    setIsDisplay(false);
    setIsOpen(true);
  };

  const handleDisplay = (item) => {
    setSelectedId(item.id);
    setIsDisplay(true);
    setIsOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedId(item.id);
    setIsDisplay(false);
    setIsOpen(true);
  };

  const handleDelete = (item) => {
    confirmHandler('Are you sure want delete this record?', async () => {
      try {
        await service.destroy(item.id);
        fetchList();
        toast.success('Waiver deleted successfully');
      } catch (error) {
        toast.error(error.message);
      }
    });
  };

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <Card body>
      <Card.Title>Waivers</Card.Title>
      <hr />
      <Filter onFilter={setFilters} allowCreate onCreate={handleCreate} />
      <List
        list={list}
        total={total}
        page={page}
        allowEdit
        allowDelete
        onDisplay={handleDisplay}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPaginate={setPage}
      />
      {isOpen && (
        <FormWaiver
          id={selectedId}
          onClose={() => setIsOpen(false)}
          isDisplay={isDisplay}
          onSave={fetchList}
        />
      )}
    </Card>
  );
};
