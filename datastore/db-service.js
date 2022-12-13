import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

import moment from 'moment';
import {forEach} from 'lodash';

// Add Table Names bellow
export const table_WorkoutPlan = 'workoutPlan';
export const table_WorkoutRoutine = 'workoutRoutine';
export const table_WorkoutProgram = 'workoutProgram';
export const table_WorkoutProgramRoutineActivity =
  'workoutProgramRoutineActivity';
export const table_WorkoutSchedule = 'workoutSchedule';
// End Table Name

enablePromise(true);

export const getDbConnection = async () => {
  return openDatabase({name: 'workout-test-12.db', location: 'default'});
};

export const createWorkoutPlanTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS ${table_WorkoutPlan}(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    planName TEXT NOT NULL,
    planDays INTEGER NOT NULL);`;
  await db.executeSql(query);
};

export const createWorkoutRoutineTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS ${table_WorkoutRoutine}(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    planId INTEGER NOT NULL,
    exerciseName TEXT NOT NULL,
    sets INTEGER NOT NULL,
    reps INTEGER NOT NULL,
    weight NUMERIC NOT NULL,
    day INTEGER NOT NULL);`; // TODO Add Routine Id
  await db.executeSql(query);
};

export const createWorkoutProgramTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS ${table_WorkoutProgram}(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workoutPlanId INTEGER NOT NULL,
    isActive INTEGER NOT NULL,
    isCompleted INTEGER NOT NULL,
    dateStarted TEXT NOT NULL,
    dateFinished TEXT
  );`;

  await db.executeSql(query);
};

export const createWorkoutScheduleTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS ${table_WorkoutSchedule}(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    programId INTEGER NOT NULL,
    weekNumber INTEGER NOT NULL,
    isCompleted INTEGER NOT NULL,
    day INTEGER NOT NULL
  );`;

  await db.executeSql(query);
};

export const createWorkoutProgramRoutineActivityTable = async (
  db: SQLiteDatabase,
) => {
  const query = `CREATE TABLE IF NOT EXISTS ${table_WorkoutProgramRoutineActivity}(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    programId INTEGER NOT NULL,
    day INTEGER NOT NULL,
    date_started TEXT NOT NULL,
    setNumber INTEGER NOT NULL,
    rep INTEGER NOT NULL,
    weight NUMERIC NOT NULL,
    routineId INTEGER NOT NULL,
    scheduleId INTEGER NOT NULL
  );`;

  await db.executeSql(query);
};

export const startWorkoutProgram = async (
  db: SQLiteDatabase,
  workoutPlanId,
) => {
  const date = moment().format();
  const query = `INSERT INTO ${table_WorkoutProgram} (workoutPlanId, isActive, isCompleted, dateStarted) values ('${workoutPlanId}', '1', '0', '${date}')`;

  return await db.executeSql(query);
};

export const getWorkoutPlan = async (db: SQLiteDatabase) => {
  try {
    const routines = [];
    const query = `SELECT * from ${table_WorkoutPlan}`;
    const results = await db.executeSql(query);

    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        routines.push(result.rows.item(index));
      }
    });

    return routines;
  } catch (err) {
    throw Error('Failed to load table');
  }
};

export const getWorkoutRoutine = async (db: SQLiteDatabase) => {
  try {
    const routines = [];
    const query = `SELECT * from ${table_WorkoutRoutine}`;
    const results = await db.executeSql(query);

    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        routines.push(result.rows.item(index));
      }
    });

    return routines;
  } catch (err) {
    throw Error('Failed to load table');
  }
};

export const getRoutinesForPlanId = async (db, planId) => {
  try {
    const routines = [];
    const query = `SELECT * from ${table_WorkoutRoutine} where planId = ${planId}`;
    const results = await db.executeSql(query);

    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        routines.push(result.rows.item(index));
      }
    });

    return routines;
  } catch (err) {
    throw Error('Failed to load table');
  }
};

export const saveWorkoutPlan = async (db: SQLiteDatabase, data) => {
  const insertQuery = `INSERT INTO ${table_WorkoutPlan} (planName, planDays) values ('${data.planName}', '${data.planDays}')`;
  try {
    const result = await db.executeSql(insertQuery);

    return result[0].insertId;
  } catch (err) {
    throw Error('Failed to insert to table');
  }
};

export const saveWorkoutRoutine = async (db: SQLiteDatabase, data: []) => {
  const insertQuery =
    `INSERT INTO ${table_WorkoutRoutine} (planId, exerciseName, sets, reps, weight, day) values` +
    data
      .map(
        routine =>
          `(${routine.planId}, '${routine.exerciseName}', ${routine.sets}, ${routine.reps}, ${routine.weight}, ${routine.day})`,
      )
      .join(',');

  try {
    return await db.executeSql(insertQuery);
  } catch (err) {
    throw Error('Failed to load table');
  }
};

export const getActiveWorkoutPlans = async (db: SQLiteDatabase) => {
  const plans = [];
  const query = `SELECT program.id as programId, program.workoutPlanId, plan.planName 
    FROM ${table_WorkoutProgram} program JOIN ${table_WorkoutPlan} plan 
      WHERE program.isActive = 1 AND program.isCompleted = 0 AND plan.id = program.workoutPlanId`;

  const results = await db.executeSql(query);

  results.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      plans.push(result.rows.item(index));
    }
  });

  console.log('ACTIVE PROGRAMS', plans);

  return plans;
};

export const getWorkoutPorgram = async (db: SQLiteDatabase, programId) => {
  const program = [];
  const query = `SELECT program.id as programId, program.workoutPlanId, plan.planName
    FROM ${table_WorkoutProgram} program JOIN ${table_WorkoutPlan} plan
    WHERE program.id = ${programId} AND plan.id = program.workoutPlanId`;

  const results = await db.executeSql(query);

  results.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      program.push(result.rows.item(index));
    }
  });

  return program;
};

export const createSchedule = async (db: SQLiteDatabase, programId) => {
  const query = `INSERT INTO ${table_WorkoutSchedule} (programId, weekNumber, isCompleted, day) VALUES ('${programId}', 1, 0, 1)`;

  const result = await db.executeSql(query);

  return result[0].insertId;
};

export const getLatestSchedule = async (db: SQLiteDatabase, programId) => {
  const latest = [];

  const query = `SELECT * FROM ${table_WorkoutSchedule} s 
    WHERE s.programId = ${programId} and s.id = (SELECT max(id) FROM ${table_WorkoutSchedule})
    ORDER BY s.id desc limit 1`;

  const results = await db.executeSql(query);

  results.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      latest.push(result.rows.item(index));
    }
  });

  return latest;
};

export const getWorkoutRoutineForDay = async (
  db: SQLiteDatabase,
  planId,
  day,
) => {
  const routines = [];
  const query = `SELECT * FROM ${table_WorkoutRoutine} where planId = ${planId} AND day = ${day}`;

  const results = await db.executeSql(query);

  results.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      routines.push(result.rows.item(index));
    }
  });

  return routines;
};

// export const updateScheduleCompleted = async (
//   db: SQLiteDatabase,
//   scheduleId,
// ) => {
//   const query = ``;

//   await db.executeSql(query);
// };

export const getWorkoutRoutineActivity = async (
  db: SQLiteDatabase,
  scheduleId,
) => {
  const routineActivity = [];

  const query = `SELECT * FROM ${table_WorkoutProgramRoutineActivity} 
    WHERE scheduleId = '${scheduleId}' `;

  const results = await db.executeSql(query);

  results.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      routineActivity.push(result.rows.item(index));
    }
  });

  return routineActivity;
};

export const saveWorkoutActivity = async (
  db: SQLiteDatabase,
  programId,
  day,
  setNumber,
  rep,
  weight,
  routineId,
  scheduleId,
) => {
  const date_started = moment().format('YYYYMMDD');
  // https://stackoverflow.com/questions/3634984/insert-if-not-exists-else-update

  const query = `INSERT INTO ${table_WorkoutProgramRoutineActivity} 
    (programId, day, date_started, setNumber, rep, weight, routineId, scheduleId)
    VALUES('${programId}', '${day}', '${date_started}', '${setNumber}', '${rep}', '${weight}', 
    '${routineId}', '${scheduleId}')`;

  const result = await db.executeSql(query);

  return result[0].insertId;
};

export const updateWorkoutActivity = async (
  db: SQLiteDatabase,
  id,
  rep,
  weight,
) => {
  const query = `UPDATE ${table_WorkoutProgramRoutineActivity} 
    SET (rep, weight) = ('${rep}', '${weight}') 
      WHERE id = '${id}' `;

  return await db.executeSql(query);
};

/**
 *     programId INTEGER NOT NULL,
    day INTEGER NOT NULL,
    date_started TEXT NOT NULL,
    setNumber INTEGER NOT NULL,
    rep INTEGER NOT NULL,
    weight NUMERIC NOT NULL,
    routineId INTEGER NOT NULL,
    scheduleId INTEGER NOT NULL
 */
