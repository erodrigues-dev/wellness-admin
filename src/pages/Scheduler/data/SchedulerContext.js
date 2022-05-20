import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import { clearTime } from '~/helpers/date';
import { listAll as listAllCalendars } from '~/services/calendar';
import { listCalendarLabels } from '~/services/calendar-labels';
import { listItems } from '~/services/scheduler';
import { cancelAppointment } from '~/services/scheduler-appointments';
import { deleteBlock } from '~/services/scheduler-blocks';
import { deleteClass } from '~/services/scheduler-classes';

import { confirm } from '../../../components/ConfirmAlertWithButtons';
import { settings } from './settings';

export const initialModalState = {
  type: '',
  selectedId: '',
  isCreate: false,
  isEdit: false,
  isDisplay: false,
  isOpen: false,
};

const initialItemsState = {
  appointments: [],
  classes: [],
  blocks: [],
};

export const SchedulerContext = createContext();

export function SchedulerProvider({ children }) {
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendars, setSelectedCalendars] = useState([]);
  const [selectedDate, setSelectedDate] = useState(clearTime(new Date()));
  const [items, setItems] = useState(initialItemsState);
  const [modal, setModal] = useState(initialModalState);
  const [labels, setLabels] = useState([]);
  const [fetchingLabels, setFetchingLabels] = useState(true);

  const mapAppointmentsToDataItem = useCallback((data) => {
    const title = `${data?.customer?.name} (${data.activity.name})`;
    const start = new Date(data.dateStart);
    const end = new Date(data.dateEnd);

    return {
      id: data.id,
      type: 'appointment',
      title,
      start,
      end,
      calendarId: data.calendar ? data.calendar.id : data.calendarId,
      activity: data.activity,
      ...data,
    };
  }, []);

  const mapClassesToDataItem = useCallback((data) => {
    const title = `${data.activity.name} - ${data.reservedSlots ?? 0}/${
      data.slots
    }`;
    const start = new Date(data.dateStart);
    const end = new Date(data.dateEnd);

    return {
      ...data,
      id: data.id,
      type: 'class',
      title,
      start,
      end,
      calendarId: data.calendar ? data.calendar.id : data.calendarId,
      activity: data.activity,
    };
  }, []);

  const mapBlocksToDataItem = useCallback((data) => {
    const title = `Unavailable period`;
    const start = new Date(data.dateStart);
    const end = new Date(data.dateEnd);

    return {
      ...data,
      type: 'block',
      title,
      start,
      end,
      calendarId: data.calendar ? data.calendar.id : data.calendarId,
      recurrenceExceptions: data.recurrenceExceptions.map(
        (exDate) => new Date(exDate)
      ),
    };
  }, []);

  const fetchCalendars = useCallback(async () => {
    try {
      const { data } = await listAllCalendars();

      if (data.length === 0) toast.error('Not exist calendars');

      setCalendars(data);
      setSelectedCalendars(data);
    } catch (error) {
      toast.error('Unable to load calendars');
    }
  }, []);

  const fetchSchedulerItems = useCallback(async () => {
    try {
      if (selectedCalendars.length > 0 && selectedDate) {
        setItems(initialItemsState);

        const { data } = await listItems({
          calendars: selectedCalendars.map((item) => item.id),
          date: selectedDate,
        });
        const appointments = data?.appointments?.map(mapAppointmentsToDataItem);
        const classes = data?.classes?.map(mapClassesToDataItem);
        const blocks = data?.blocks?.map(mapBlocksToDataItem);

        setItems({
          appointments,
          classes,
          blocks,
        });
      }
    } catch (error) {
      toast.error('Unable to list scheduler data');
    }
  }, [
    selectedDate,
    selectedCalendars,
    mapAppointmentsToDataItem,
    mapClassesToDataItem,
    mapBlocksToDataItem,
  ]);

  const openModal = (data) => {
    setModal((state) => (state.isOpen ? state : data));
  };

  const closeModal = () => setModal(initialModalState);

  const confirmRemoveRecurrent = (type) => {
    return new Promise((resolve) => {
      confirm(`Delete ${type}`, `Select a option to delete ${type}`, [
        {
          text: 'Only this',
          action: () => resolve({ confirmed: true, following: false }),
        },
        {
          text: 'This and following',
          action: () => resolve({ confirmed: true, following: true }),
        },
        {
          text: 'Cancel',
          color: 'secondary',
          action: () => resolve({ confirmed: false }),
        },
      ]);
    });
  };

  const confirmRemoveNonRecurrent = (type) => {
    return new Promise((resolve) => {
      confirm(`Delete ${type}`, `Are you sure you want to delete ${type}`, [
        {
          text: 'Ok',
          action: () => resolve({ confirmed: true }),
        },
        {
          text: 'Cancel',
          color: 'secondary',
          action: () => resolve({ confirmed: false }),
        },
      ]);
    });
  };

  const confirmRemoveItem = useCallback(async (item) => {
    const { type, recurrenceRule } = item;
    const isRecurrent = Boolean(recurrenceRule);
    if (isRecurrent) return confirmRemoveRecurrent(type);
    return confirmRemoveNonRecurrent(type);
  }, []);

  const handleRemoveBlock = async (item, following) => {
    const { id, start: date } = item;
    await deleteBlock({ id, date, following });
  };

  const handleRemoveClass = async (item, following) => {
    await deleteClass(item.id, following);
  };

  const handleRemoveAppointment = async (item) => {
    await cancelAppointment(item.id);
  };

  const handleRemoveInAPI = useCallback(async (item, following) => {
    try {
      const { type } = item;
      if (type === 'block') await handleRemoveBlock(item, following);
      if (type === 'class') await handleRemoveClass(item, following);
      if (type === 'appointment') await handleRemoveAppointment(item);
      return { ok: true };
    } catch {
      toast.error(`Unable to delete ${item.type}`);
      return { ok: false };
    }
  }, []);

  const handleRemoveInScheduler = useCallback(async (item) => {
    const { type } = item;
    setItems((state) => {
      return {
        ...state,
        blocks:
          type === 'block'
            ? state.blocks.filter((current) => current.id !== item.id)
            : state.blocks,
        classes:
          type === 'class'
            ? state.classes.filter((current) => current.id !== item.id)
            : state.classes,
        appointments:
          type === 'appointment'
            ? state.appointments.filter((current) => current.id !== item.id)
            : state.appointments,
      };
    });
  }, []);

  const handleRemoveItem = useCallback(
    async (item) => {
      const { confirmed, following } = await confirmRemoveItem(item);
      if (!confirmed) return;
      const { ok } = await handleRemoveInAPI(item, following);
      if (ok) {
        handleRemoveInScheduler(item);
        toast.success(`${item.type} deleted successfully`);
      }
    },
    [confirmRemoveItem, handleRemoveInAPI, handleRemoveInScheduler]
  );

  const incrementReservedSlotInClass = useCallback(
    (id) => {
      setItems((state) => ({
        ...state,
        classes: state.classes.map((clazz) => {
          if (clazz.id === id) {
            const updatedClass = {
              ...clazz,
              reservedSlots: (clazz.reservedSlots || 0) + 1,
            };
            return mapClassesToDataItem(updatedClass);
          }
          return clazz;
        }),
      }));
    },
    [mapClassesToDataItem]
  );

  useEffect(() => {
    setFetchingLabels(true);
    listCalendarLabels()
      .then((response) => setLabels(response.data))
      .catch(() => toast.error('Error on fetch calendar labels'))
      .finally(() => setFetchingLabels(false));
  }, []);

  useEffect(() => {
    fetchCalendars();
  }, [fetchCalendars]);

  useEffect(() => {
    fetchSchedulerItems();
  }, [fetchSchedulerItems]);

  return (
    <SchedulerContext.Provider
      value={{
        calendars,
        selectedCalendars,
        items,
        settings,
        setSelectedCalendars,
        selectedDate,
        setSelectedDate,
        modal,
        setModal: openModal,
        openModal,
        forceOpenModal: setModal,
        closeModal,
        labels,
        setLabels,
        fetchingLabels,
        mapAppointmentsToDataItem,
        mapClassesToDataItem,
        setItems,
        mapBlocksToDataItem,
        handleRemoveItem,
        incrementReservedSlotInClass,
      }}
    >
      {children}
    </SchedulerContext.Provider>
  );
}

export function useSchedulerContext() {
  return useContext(SchedulerContext);
}
