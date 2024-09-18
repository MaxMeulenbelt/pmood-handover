import Emotion from '../models/EmotionSensitivity/Emotion'
import emotionSensitivityScore from '../lib/emotionSensitivityScore'

describe('calculateEmotionSensitivity()', () => {
  it('should return 0.0 for an empty results array', () => {
    expect(emotionSensitivityScore.calculateEmotionSensitivity([])).toStrictEqual({
      score: 0.0,
      averageResponseTime: 0.0,
      hitRate: 0.0,
      falseAlarmRate: 0.0,
      totalMisses: 0,
    })
  })

  it('should correctly calculate the average for a populated array', () => {
    expect(
      emotionSensitivityScore.calculateEmotionSensitivity([
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Happy,
          },
          emotion: Emotion.Sad,
          initialTimestamp: new Date(0),
          emotionTimestamp: new Date(1000),
        },
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Happy,
          },
          emotion: Emotion.Sad,
          initialTimestamp: new Date(0),
          emotionTimestamp: new Date(2000),
        },
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Sad,
          },
          emotion: Emotion.Sad,
          initialTimestamp: new Date(0),
          emotionTimestamp: new Date(3000),
        },
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Sad,
          },
          emotion: Emotion.Sad,
          initialTimestamp: new Date(0),
          emotionTimestamp: new Date(4000),
        },
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Happy,
          },
          emotion: Emotion.Happy,
          initialTimestamp: new Date(0),
          emotionTimestamp: new Date(5000),
        },
      ])
    ).toStrictEqual({
      score: 0.6,
      averageResponseTime: 3000.0,
      hitRate: 1.0,
      falseAlarmRate: 2 / 3,
      totalMisses: 0,
    })
  })
})

describe('calculateScore()', () => {
  it('should return 0.0 for an empty results array', () => {
    expect(emotionSensitivityScore.calculateScore([])).toBe(0.0)
  })

  it('should correctly calculate the average for a populated array', () => {
    expect(
      emotionSensitivityScore.calculateScore([
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Happy,
          },
          emotion: Emotion.Happy,
          initialTimestamp: new Date(),
          emotionTimestamp: new Date(),
        },
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Sad,
          },
          emotion: Emotion.Sad,
          initialTimestamp: new Date(),
          emotionTimestamp: new Date(),
        },
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Happy,
          },
          emotion: Emotion.Sad,
          initialTimestamp: new Date(),
          emotionTimestamp: new Date(),
        },
      ])
    ).toBe(0.6666666666666666)
  })
})

describe('calculateAverageResponseTime()', () => {
  it('should return 0.0 for an empty results array', () => {
    expect(emotionSensitivityScore.calculateAverageResponseTime([])).toBe(0.0)
  })

  it('should correctly calculate the average for a populated array', () => {
    expect(
      emotionSensitivityScore.calculateAverageResponseTime([
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Happy,
          },
          emotion: Emotion.Happy,
          initialTimestamp: new Date(0),
          emotionTimestamp: new Date(1000),
        },
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Happy,
          },
          emotion: Emotion.Happy,
          initialTimestamp: new Date(0),
          emotionTimestamp: new Date(2000),
        },
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Happy,
          },
          emotion: Emotion.Happy,
          initialTimestamp: new Date(0),
          emotionTimestamp: new Date(3000),
        },
      ])
    ).toBe(2000.0)
  })
})

describe('calculateHitRate()', () => {
  it('should return empty for an empty results array', () => {
    expect(emotionSensitivityScore.calculateHitRate([])).toBe(0)
  })

  it('should correct calculate the hit rate', () => {
    expect(
      emotionSensitivityScore.calculateHitRate([
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Sad,
          },
          emotion: Emotion.Sad,
          initialTimestamp: new Date(),
          emotionTimestamp: new Date(),
        },
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Sad,
          },
          emotion: Emotion.Sad,
          initialTimestamp: new Date(),
          emotionTimestamp: new Date(),
        },
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Sad,
          },
          emotion: Emotion.Happy,
          initialTimestamp: new Date(),
          emotionTimestamp: new Date(),
        },
      ])
    ).toBe(2 / 3)
  })
})

describe('calculateFalseAlarmRate()', () => {
  it('should return empty for an empty results array', () => {
    expect(emotionSensitivityScore.calculateFalseAlarmRate([])).toBe(0)
  })

  it('should correct calculate the hit rate', () => {
    expect(
      emotionSensitivityScore.calculateFalseAlarmRate([
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Happy,
          },
          emotion: Emotion.Sad,
          initialTimestamp: new Date(),
          emotionTimestamp: new Date(),
        },
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Happy,
          },
          emotion: Emotion.Sad,
          initialTimestamp: new Date(),
          emotionTimestamp: new Date(),
        },
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Happy,
          },
          emotion: Emotion.Happy,
          initialTimestamp: new Date(),
          emotionTimestamp: new Date(),
        },
      ])
    ).toBe(2 / 3)
  })
})

describe('getResponseHits()', () => {
  it('should return empty for an empty results array', () => {
    expect(emotionSensitivityScore.getResponseHits([]).length).toBe(0)
  })

  it('should extract only the Hits (H) from a set of responses', () => {
    expect(
      emotionSensitivityScore.getResponseHits([
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Sad,
          },
          emotion: Emotion.Sad,
          initialTimestamp: new Date(),
          emotionTimestamp: new Date(),
        },
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Sad,
          },
          emotion: Emotion.Sad,
          initialTimestamp: new Date(),
          emotionTimestamp: new Date(),
        },
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Happy,
          },
          emotion: Emotion.Sad,
          initialTimestamp: new Date(),
          emotionTimestamp: new Date(),
        },
      ]).length
    ).toBe(2)
  })
})

describe('getResponseMisses()', () => {
  it('should return empty for an empty results array', () => {
    expect(emotionSensitivityScore.getResponseMisses([]).length).toBe(0)
  })

  it('should extract only the Misses (M) from a set of responses', () => {
    expect(
      emotionSensitivityScore.getResponseMisses([
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Sad,
          },
          emotion: Emotion.Happy,
          initialTimestamp: new Date(),
          emotionTimestamp: new Date(),
        },
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Sad,
          },
          emotion: Emotion.Happy,
          initialTimestamp: new Date(),
          emotionTimestamp: new Date(),
        },
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Happy,
          },
          emotion: Emotion.Sad,
          initialTimestamp: new Date(),
          emotionTimestamp: new Date(),
        },
      ]).length
    ).toBe(2)
  })
})

describe('getResponseFalseAlarms()', () => {
  it('should return empty for an empty results array', () => {
    expect(emotionSensitivityScore.getResponseFalseAlarms([]).length).toBe(0)
  })

  it('should extract only the False Alarms (FA) from a set of responses', () => {
    expect(
      emotionSensitivityScore.getResponseFalseAlarms([
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Happy,
          },
          emotion: Emotion.Sad,
          initialTimestamp: new Date(),
          emotionTimestamp: new Date(),
        },
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Happy,
          },
          emotion: Emotion.Sad,
          initialTimestamp: new Date(),
          emotionTimestamp: new Date(),
        },
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Sad,
          },
          emotion: Emotion.Happy,
          initialTimestamp: new Date(),
          emotionTimestamp: new Date(),
        },
      ]).length
    ).toBe(2)
  })
})

describe('getResponseCorrectRejections()', () => {
  it('should return empty for an empty results array', () => {
    expect(emotionSensitivityScore.getResponseCorrectRejections([]).length).toBe(0)
  })

  it('should extract only the Correct Rejections (CR) from a set of responses', () => {
    expect(
      emotionSensitivityScore.getResponseCorrectRejections([
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Happy,
          },
          emotion: Emotion.Happy,
          initialTimestamp: new Date(),
          emotionTimestamp: new Date(),
        },
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Happy,
          },
          emotion: Emotion.Happy,
          initialTimestamp: new Date(),
          emotionTimestamp: new Date(),
        },
        {
          image: {
            name: 'hapnegseq1.jpg',
            answer: Emotion.Sad,
          },
          emotion: Emotion.Happy,
          initialTimestamp: new Date(),
          emotionTimestamp: new Date(),
        },
      ]).length
    ).toBe(2)
  })
})
