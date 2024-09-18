import EffortExpenditureRecord from '../models/EffortExpenditureRecord'

/**
 * Creates a new effort expenditure record and saves it to the database.
 */
const createNewRecord = async (
  userId: number,
  trialNumber: number,
  winProbability: number,
  userChoice: string,
  hardTaskPoints: number,
  taskCompleted: number,
  pointsWon: number
) => {
  const effortExpenditureRecord = new EffortExpenditureRecord(userId, trialNumber, winProbability, userChoice, hardTaskPoints, taskCompleted, pointsWon)

  await effortExpenditureRecord.saveData()
}

/**
 * Gets all the records from the effort expenditure table in the database and returns it.
 *
 * @returns records All the records in the effort expenditure table.
 */
const getAllRecords = async () => {
  const [records] = await EffortExpenditureRecord.getAll()

  return records
}

export default {
  createNewRecord,
  getAllRecords,
}
