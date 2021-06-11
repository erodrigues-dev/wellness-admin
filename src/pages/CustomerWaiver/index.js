import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FUNCTIONALITIES } from '~/consts/functionalities';
import useAuth from '~/contexts/auth';
import service from '~/services/customerWaiver';

import { List } from './List';
import { CustomerWaiverAdd } from './modals/Add';

const LIMIT = 10;

export const CustomerWaiver = () => {
  const { hasPermission } = useAuth();
  const { id: customerId } = useParams();

  const [data, setData] = useState({
    list: [],
    total: 0,
    page: 1,
    limit: LIMIT,
  });
  const [modal, setModal] = useState({});

  const allowCreate = hasPermission(FUNCTIONALITIES.settings.waivers.create);
  const allowEdit = hasPermission(FUNCTIONALITIES.settings.waivers.update);
  const allowDelete = hasPermission(FUNCTIONALITIES.settings.waivers.delete);

  const fetchList = useCallback(async () => {
    try {
      const { data: list, headers } = await service.list(
        data.page,
        data.limit,
        customerId
      );
      setData((current) => ({
        ...current,
        list,
        total: Number(headers['x-total-count']),
      }));
    } catch (error) {
      toast.error('Unable to list waivers');
    }
  }, [customerId, data.limit, data.page]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <Card body>
      <Card.Title>Customer Waivers</Card.Title>
      <hr />
      <div className="mt-2 d-flex justify-content-end align-items-start">
        {allowCreate && (
          <Button
            variant="secondary"
            className="ml-2"
            onClick={() => setModal({ action: 'add' })}
          >
            Add Waiver
          </Button>
        )}
      </div>
      <List
        data={data}
        allowEdit={allowEdit}
        allowDelete={allowDelete}
        // onDisplay={handleDisplay}
        // onEdit={handleEdit}
        // onDelete={handleDelete}
        onPaginate={(page) => setData((current) => ({ ...current, page }))}
      />

      {modal.action === 'add' && (
        <CustomerWaiverAdd
          customerId={customerId}
          onRefresh={fetchList}
          onClose={() => setModal({})}
        />
      )}
    </Card>
  );
};
