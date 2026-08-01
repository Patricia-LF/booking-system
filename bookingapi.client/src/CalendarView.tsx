import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

interface Booking {
  id: number;
  customer: { name: string };
  service: { name: string };
  startTime: string;
  endTime: string;
}

interface Props {
  bookings: Booking[];
}

function CalendarView({ bookings }: Props) {
  const events = bookings.map((b) => ({
    id: b.id.toString(),
    title: `${b.customer.name} — ${b.service.name}`,
    start: b.startTime,
    end: b.endTime,
  }));

  return (
    <FullCalendar
      plugins={[timeGridPlugin]}
      initialView="timeGridWeek"
      locale="sv"
      firstDay={1}
      events={events}
      slotMinTime="07:00:00"
      slotMaxTime="20:00:00"
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "timeGridWeek,timeGridDay",
      }}
    />
  );
}

export default CalendarView;
