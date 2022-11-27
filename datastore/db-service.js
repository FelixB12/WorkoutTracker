import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

// Add Table Names bellow
export const table_WorkoutPlan = 'workoutPlan';
export const table_WorkoutRoutine = 'workoutRoutine';
// End Table Name

enablePromise(true);

export const getDbConnection = async () => {
  return openDatabase({name: 'workout-test-9.db', location: 'default'});
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
    id INTEGER NOT NULL,
    exerciseName TEXT NOT NULL,
    sets INTEGER NOT NULL,
    reps INTEGER NOT NULL,
    weight NUMERIC NOT NULL,
    day INTEGER NOT NULL);`;
  await db.executeSql(query);
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
    `INSERT INTO ${table_WorkoutRoutine} (id, exerciseName, sets, reps, weight, day) values` +
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
