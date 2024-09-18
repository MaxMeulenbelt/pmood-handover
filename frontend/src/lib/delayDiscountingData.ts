/**
 * Number of screens the user has went through after finishing practice trials.
 */
const progressAfterPractice = 13

/**
 * The total number of trials (not including practice trials).
 */
const maxTrials = 36

/**
 * The total number of screen for the whole task (to assist with completion bar increments).
 */
const numberOfIncrements = progressAfterPractice + maxTrials + 1 + 1

export default {
  progressAfterPractice,
  maxTrials,
  numberOfIncrements,
}
