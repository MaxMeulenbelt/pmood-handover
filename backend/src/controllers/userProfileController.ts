import UserProfileRecord from '../models/UserProfileRecord'

/**
 * Creates a new slot machine record and saves it to the database.
 */
const createNewRecord = async (userId: number, name: string, dateOfBirth: Date, pregnancyStatus: string, dueDate: Date) => {
  const userProfileRecord = new UserProfileRecord(userId, name, dateOfBirth, pregnancyStatus, dueDate)

  await userProfileRecord.saveData()
}

/**
 * Gets all the records from the slot machine table in the database and returns it.
 *
 * @returns records All the records in the slot machine table.
 */
const getAllRecords = async () => {
  const [records] = await UserProfileRecord.getAll()

  return records
}

export default {
  createNewRecord,
  getAllRecords,
}
