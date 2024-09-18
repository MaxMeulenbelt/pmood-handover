type PDDQuestion = {
  question: string
  answers: string[]
  skip?: boolean
}

const pddRiskPregnant = [
  {
    question: "Hi, to get to know you better, I'm going to ask you some questions designed to assess your risk of depression. Let's get started!",
    answers: [''],
  },
  {
    question: 'Firstly, I want to ask about you well-being and mental health.',
    answers: [''],
  },
  {
    question: 'Do you smoke?',
    answers: ['Yes', 'No'],
  },
  {
    question: 'Have you ever been diagnosed with a mental disorder? (e.g. depression, anxiety, schizophrenia, bipolar disorder)',
    answers: ['Yes', 'No'],
  },
] as PDDQuestion[]

const pddRiskMums = [{}] as PDDQuestion[]

const pddReusable = [
  {
    question: 'Think back to the last two weeks, how often have you been bothered by any of the following?',
    answers: [''],
  },
  {
    question: 'Feeling nervous, anxious or on edge?',
    answers: ['Not at all', 'Several Days', 'More than half the days', 'Nearly every day'],
  },
  {
    question: 'Not being able to stop or control worrying?',
    answers: ['Not at all', 'Several Days', 'More than half the days', 'Nearly every day'],
  },
  {
    question: 'Worrying too much about different things?',
    answers: ['Not at all', 'Several Days', 'More than half the days', 'Nearly every day'],
  },
  {
    question: 'Trouble relaxing?',
    answers: ['Not at all', 'Several Days', 'More than half the days', 'Nearly every day'],
  },
  {
    question: 'Being so restless that it is hard to sit still?',
    answers: ['Not at all', 'Several Days', 'More than half the days', 'Nearly every day'],
  },
  {
    question: 'Feeling afraid as if something awful might happen?',
    answers: ['Not at all', 'Several Days', 'More than half the days', 'Nearly every day'],
  },
  {
    question:
      "Now let's discuss your relationships. In particular I want to talk about experiences of violence because they are important in assessing risk of depression. Remember, your responses are entirely confidential and anonymous so your data will not be shared with anyone.",
    answers: [''],
  },
  {
    question:
      'Firstly, I want to ask about psychological violence. Psychological violence is when someone tries to hurt you emotionally and can be verbal or non-verbal. For example, this can include yelling, screaming or swearing at you as well as insulting, humiliating or threatening you.',
    answers: [''],
  },
  {
    question: 'Have you ever experienced psychological violence?',
    answers: ['Yes', 'No'],
    skip: true,
  },
  {
    question: 'Have you ever experienced this from an intimate partner?',
    answers: ['Yes', 'No', 'Not applicable'],
  },
  {
    question: 'Have you ever experienced this from a care giver or family member?',
    answers: ['Yes', 'No', 'Not applicable'],
  },
  {
    question: 'Did you experience this before your pregnancy?',
    answers: ['Yes', 'No', 'Not applicable'],
  },
  {
    question: 'Did you experience this during your pregnancy?',
    answers: ['Yes', 'No', 'Not applicable'],
  },
  {
    question:
      'Now I want to ask you about your experiences of domestic violence. Domestic violence is when a partner or carer (over the age of 16) is controlling, coercive or threatening towards you. This can include physical acts of violence as well as more emotional such as restricting your independence or threatening to kick you out.',
    answers: [''],
  },
  {
    question: 'Have you ever experienced domestic violence?',
    answers: ['Yes', 'No'],
    skip: true,
  },
  {
    question: 'Have you ever experienced this from an intimate partner?',
    answers: ['Yes', 'No', 'Not applicable'],
  },
  {
    question: 'Have you ever experienced this from a care giver or family member?',
    answers: ['Yes', 'No', 'Not applicable'],
  },
  {
    question: 'Did you experience this before your pregnancy?',
    answers: ['Yes', 'No', 'Not applicable'],
  },
  {
    question: 'Did you experience this during your pregnancy?',
    answers: ['Yes', 'No', 'Not applicable'],
  },
  {
    question:
      'I now want to ask about physical violence. Physical violence refers to any unwanted hostile contact which can cause injury or bodily harm. For example, this can include slapping, kicking, punching, choking, pushing, restraining or use of a weapon.',
    answers: [''],
  },
  {
    question: 'Have you ever experienced physical violence?',
    answers: ['Yes', 'No'],
    skip: true,
  },
  {
    question: 'Have you ever experienced this from an intimate partner?',
    answers: ['Yes', 'No', 'Not applicable'],
  },
  {
    question: 'Have you ever experienced this from a care giver or family member?',
    answers: ['Yes', 'No', 'Not applicable'],
  },
  {
    question: 'Did you experience this before your pregnancy?',
    answers: ['Yes', 'No', 'Not applicable'],
  },
  {
    question: 'Did you experience this during your pregnancy?',
    answers: ['Yes', 'No', 'Not applicable'],
  },
  {
    question:
      'Finally, I want to discuss sexual violence. Sexual violence refers to a sexual experience which you did not give consent to or were pressured into. This can include kissing, fondling, petting, sexual intercourse or other sex acts.',
    answers: [''],
  },
  {
    question: 'Have you ever experienced sexual violence?',
    answers: ['Yes', 'No'],
    skip: true,
  },
  {
    question: 'Have you ever experienced this from an intimate partner?',
    answers: ['Yes', 'No', 'Not applicable'],
  },
  {
    question: 'Have you ever experienced this from a care giver or family member?',
    answers: ['Yes', 'No', 'Not applicable'],
  },
  {
    question: 'Did you experience this before your pregnancy?',
    answers: ['Yes', 'No', 'Not applicable'],
  },
  {
    question: 'Did you experience this during your pregnancy?',
    answers: ['Yes', 'No', 'Not applicable'],
  },
  {
    question:
      "We're now onto the final section of the questionnaire. I would like you know a bit more about who you are. Remember, your answers are confidential and will not be used to identify you.",
    answers: [''],
  },
  {
    question: 'What is your date of birth?',
    answers: ['date of birth'],
  },
  {
    question: 'What is your ethnicity?',
    answers: ['ethnicity'],
  },
  {
    question: 'What is your country of birth?',
    answers: ['birth'],
  },
] as PDDQuestion[]
