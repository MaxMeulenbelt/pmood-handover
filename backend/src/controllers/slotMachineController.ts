import SlotMachineRecord from '../models/SlotMachineRecord'

/**
 * Creates a new slot machine record and saves it to the database.
 */
const createNewRecord = async (userId: number, numberOfGamesPlayed: number, feedbackHappy: number, feedbackContinue: number, win: number, nearMiss: number) => {
  const slotMachineRecord = new SlotMachineRecord(userId, numberOfGamesPlayed, feedbackHappy, feedbackContinue, win, nearMiss)

  await slotMachineRecord.saveData()
}

/**
 * Gets all the records from the slot machine table in the database and returns it.
 *
 * @returns records All the records in the slot machine table.
 */
const getAllRecords = async () => {
  const [records] = await SlotMachineRecord.getAll()

  return records
}

export default {
  createNewRecord,
  getAllRecords,
}
