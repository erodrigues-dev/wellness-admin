import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import { listActivities } from '~/services/scheduler';

const AppointmentContext = createContext({});

export function AppointmentProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [slotData, setSlotData] = useState();
  const [calendar, setCalendar] = useState(null);
  const [activities, setActivities] = useState([]);

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchActivities = useCallback(async (calendarId) => {
    try {
      const { data: response } = await listActivities(calendarId);
      setActivities(response);
    } catch (error) {
      toast.error('Unable to list activities of calendar');
    }
  }, []);

  const setData = useCallback((data) => {
    setSlotData(data);
    setSelectedDate(data.start);
    setCalendar(data.calendar);
    setIsOpen(true);
  }, []);

  const handleChangeActivity = useCallback(
    (activityId) => {
      const activity = activities.find((x) => x.id === Number(activityId));
      setSelectedActivity(activity);
    },
    [activities]
  );

  const handleChangeDate = (value) => {
    setSelectedDate(value);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSave = useCallback(async (data) => {
    console.log('handleSave', data);
  }, []);

  useEffect(() => {
    if (calendar?.id) fetchActivities(calendar?.id);
  }, [calendar, fetchActivities]);

  return (
    <AppointmentContext.Provider
      value={{
        isOpen,
        slotData,
        calendar,
        activities,
        selectedActivity,
        selectedDate,
        setData,
        handleChangeActivity,
        handleChangeDate,
        handleClose,
        handleSave,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointmentContext() {
  return useContext(AppointmentContext);
}
