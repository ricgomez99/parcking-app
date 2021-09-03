import React, { useState } from "react";
import { DateTimePicker } from "@material-ui/pickers";

const Calendar = () => {
  const [fechaSeleccionada, cambiarFechaSeleccionada] = useState(new Date());

  return (
    <div className="group">
      <label className="dateLabel">Fecha y Hora de Igreso</label>
      <DateTimePicker
        value={fechaSeleccionada}
        onChange={cambiarFechaSeleccionada}
      />
    </div>
  );
};

export default Calendar;
