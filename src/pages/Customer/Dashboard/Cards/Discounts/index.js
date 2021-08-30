import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import { FUNCTIONALITIES } from '~/consts/functionalities';
import useAuth from '~/contexts/auth';
import useToast from '~/hooks/useToast';
import * as service from '~/services/discount';

import ModalForm from '../../../../Discount/Form';
import { CardLayout } from '../CardLayout';
import List from './List';

const Discounts = () => {
  const { hasPermission } = useAuth();
  const hasPermissionToCreate = hasPermission(
    FUNCTIONALITIES.settings.discount.create
  );
  const hasPermissionToUpdate = hasPermission(
    FUNCTIONALITIES.settings.discount.update
  );
  const { id } = useParams();
  const { sendToast } = useToast();
  const [openAdd, setOpenAdd] = useState(false);
  const [discounts, setDiscounts] = useState();

  const listDiscounts = useCallback(async () => {
    try {
      const { data } = await service.listAll({
        customerId: id,
        page: 1,
        limit: 5,
      });

      setDiscounts(data);
    } catch (error) {
      sendToast(error.message);
    }
  }, [sendToast, id]);

  useEffect(() => {
    listDiscounts();
  }, [listDiscounts]);

  async function handleDelete(item) {
    try {
      await service.destroy(item);

      sendToast('Discount deleted.');
      listDiscounts();
    } catch (error) {
      sendToast(error.message, false);
    }
  }

  return (
    <CardLayout
      title="Discounts"
      buttons={
        <>
          {hasPermissionToCreate && (
            <Button
              variant="outline-secondary"
              className="ml-2"
              onClick={() => setOpenAdd(true)}
            >
              Add
            </Button>
          )}
          <Link to={`/discounts/${id}`}>
            <Button variant="outline-primary" className="ml-2 text-nowrap">
              See More
            </Button>
          </Link>
        </>
      }
    >
      <List
        list={discounts}
        reloadList={listDiscounts}
        handleDelete={handleDelete}
        allowEdit={hasPermissionToUpdate}
      />
      {openAdd && (
        <ModalForm setClose={setOpenAdd} reloadList={listDiscounts} />
      )}
    </CardLayout>
  );
};

export default Discounts;
