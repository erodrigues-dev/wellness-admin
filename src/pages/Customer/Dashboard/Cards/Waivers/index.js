import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CustomerWaiverDetail } from '~/pages/CustomerWaiver/Detail';
import { CustomerWaiverSign } from '~/pages/CustomerWaiver/Sign';
import service from '~/services/customerWaiver';

import confirmHandler from '../../../../../components/ConfirmAlert/confirmHandler';
import { CardLayout } from '../CardLayout';
import { List } from './List';

const PAGE = 1;
const LIMIT = 3;

const Waivers = () => {
  const { id: customerId } = useParams();
  const [list, setList] = useState([]);
  const [modal, setModal] = useState({});

  const fetchList = useCallback(async () => {
    const { data } = await service.list(PAGE, LIMIT, customerId);
    setList(data);
  }, [customerId]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const handleOpenDetail = (waiverId) => {
    setModal({
      waiverId,
      action: 'detail',
    });
  };

  const handleOpenSign = (waiverId) => {
    setModal({
      waiverId,
      action: 'sign',
    });
  };

  const handleDelete = (waiverId) => {
    confirmHandler(
      'Are you sure to delete this waiver for customer account?',
      async () => {
        try {
          await service.remove(customerId, waiverId);
          setList((current) => current.filter((x) => x.waiver.id !== waiverId));
          toast.success('Waiver deleted from customer account with success.');
        } catch (error) {
          toast.error(error.message);
        }
      }
    );
  };

  const handleCloseModal = () => setModal({});

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
      <List
        list={list}
        onClickDetail={handleOpenDetail}
        onClickSign={handleOpenSign}
        onClickDelete={handleDelete}
      />

      {modal.action === 'detail' && (
        <CustomerWaiverDetail
          customerId={customerId}
          waiverId={modal.waiverId}
          onClose={handleCloseModal}
        />
      )}

      {modal.action === 'sign' && (
        <CustomerWaiverSign
          customerId={customerId}
          waiverId={modal.waiverId}
          onClose={handleCloseModal}
          onRefresh={fetchList}
        />
      )}
    </CardLayout>
  );
};

export default Waivers;
