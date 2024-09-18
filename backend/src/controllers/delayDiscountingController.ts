import DelayDiscountingRecord from '../models/DelayDiscountingRecord'

/**
 * Creates a new delay discounting record and saves it to the database.
 */
const createNewRecord = async (userId: number, testNumber: number, trialNumber: number, nowValue: string, laterTimeFrame: string, userChoice: string) => {
  const delayDiscountingRecord = new DelayDiscountingRecord(userId, testNumber, trialNumber, nowValue, laterTimeFrame, userChoice)

  await delayDiscountingRecord.saveData()
}

/**
 * Gets all the records from the delay discounting table in the database and returns it.
 *
 * @returns records All the records in the delay discounting table.
 */
const getAllRecords = async () => {
  const [records] = await DelayDiscountingRecord.getAll()

  return records
}

export default {
  createNewRecord,
  getAllRecords,
}
