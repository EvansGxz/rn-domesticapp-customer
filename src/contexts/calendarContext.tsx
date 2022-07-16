import React, {createContext, useState, useContext, useMemo} from 'react';
type TCalendarContext = {
  category_id: string;
  setcategory_id: (category_id: string) => void;
  workday: string;
  setworkday: (workday: string) => void;
  start_date: string;
  setstart_date: (start_date: string) => void;
  finish_date: string;
  setfinish_date: (finish_date: string) => void;
  service_time: string | Date;
  setservice_time: (service_time: string) => void;
  address: string;
  setaddress: (address: string) => void;
  customer_id: string;
  setcustomer_id: (customer_id: string) => void;
};

const CalendarContext = createContext<TCalendarContext>({} as TCalendarContext);

interface CalendarProps {
  children: JSX.Element | JSX.Element[];
}

export const CalendarProvider = (props: CalendarProps) => {
  const [category_id, setcategory_id] = useState<string>("");
  const [workday, setworkday] = useState<string>("");
  const [finish_date, setfinish_date] = useState<string>("");
  const [start_date, setstart_date] = useState<string>('');
  const [service_time, setservice_time] = useState<Date | string>(new Date());
  const [address, setaddress] = useState<string>("");
  const [customer_id, setcustomer_id] = useState<string>("");

  const value = useMemo(() => {
    return {
      category_id,
      setcategory_id,
      workday,
      setworkday,
      start_date,
      setstart_date,
      service_time,
      setservice_time,
      address,
      setaddress,
      customer_id,
      setcustomer_id,
      finish_date,
      setfinish_date,
    }
  }, [
    category_id,
    setcategory_id,
    workday,
    setworkday,
    start_date,
    setstart_date,
    service_time,
    setservice_time,
    address,
    setaddress,
    customer_id,
    setcustomer_id,
    finish_date,
    setfinish_date,
  ])
  
  return (
    <CalendarContext.Provider value={value}>
      {props.children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) throw new Error('useCalendar debe estar dentro del proveedor CalendarContext');
  return context
};