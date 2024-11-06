import { getConnection } from "../database/database";

const table = "hours_calendar";

const getHours = async (req, res) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query("select * from " + table);
    res.json(result);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

const getDays = async (req, res) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query(
      "select * from days_calendar ORDER BY order_day"
    );
    res.json(result);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

const updateHours = async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  try {
    const id = parseInt(req.params.id); // Convierte req.params.id a un entero

    const { min_hour_calendar, max_hour_calendar } = req.body;
    if (
      id === undefined ||
      min_hour_calendar === undefined ||
      max_hour_calendar === undefined
    ) {
      res.json({
        rta: -1,
        message: "Ocurrio un problema, por favor complete todos los campos",
      });
    }
    const hours = {
      min_hour_calendar,
      max_hour_calendar,
    };
    console.log("RTAAA", `UPDATE ${table}  SET ? where id= ?`, [hours, id]);
    const connection = await getConnection();
    const [result] = await connection.query(
      `UPDATE ${table}  SET ? where id= ?`,
      [hours, id]
    );
    console.log("result", result.affectedRows);
    if (result.affectedRows > 0) {
      res.json({ rta: 1, message: "Se actualizo correctamente." });
    } else {
      res.json({ rta: -1, message: "Ocurrio un error1." });
    }
  } catch (err) {
    res.json({ rta: -1, message: "Ocurrio un error2." });
    res.send(err.message);
  }
};

const updateDays = async (req, res) => {
  console.log("req.body", req.body);
  const days = req.body;
  console.log("entra days", days);
  try {
    const connection = await getConnection();
    for (const day of days) {
      const dayOpen = day.is_open ? 1 : 0;
      await connection.query(
        `UPDATE days_calendar SET is_open = ? WHERE id = ?`,
        [dayOpen, day.id]
      );
    }
    res.json({ rta: 1, message: "Días actualizados correctamente." });
  } catch (err) {
    res.json({ rta: -1, message: "Error al actualizar los días." });
  }
};

export const hoursController = {
  getHours,
  getDays,
  updateHours,
  updateDays,
};
