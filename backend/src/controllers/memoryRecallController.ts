import MemoryRecallRecord from '../models/MemoryRecallRecord'

/**
 * Creates a new memory recall record and saves it to the database.
 */
const createNewRecord = async (userId: number, numberOfWordsRemembered: number, numberOfPositiveWordsRemembered: number, numberOfNegativeWordsRemembered: number) => {
  const memoryRecallRecord = new MemoryRecallRecord(userId, numberOfWordsRemembered, numberOfPositiveWordsRemembered, numberOfNegativeWordsRemembered)

  await memoryRecallRecord.saveData()
}

/**
 * Gets all the records from the memory recall table in the database and returns it.
 *
 * @returns records All the records in the memory recall table.
 */
const getAllRecords = async () => {
  const [records] = await MemoryRecallRecord.getAll()

  return records
}

export default {
  createNewRecord,
  getAllRecords,
}
