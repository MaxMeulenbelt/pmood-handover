export type PregnantCategory = keyof PregnantQuizResults
export type PregnantSubcategory = keyof Subcategories<PregnantQuizResults>[PregnantCategory]

type Subcategories<T> = {
  [P in keyof T]: keyof T[P]
}
export type PregnantQuizResults = {
  pregnancy_status: {
    first_pregnancy: string
    due_date: string
  }
  health: {
    height_weight_before: string
    perinatal_anaemia: string
    gestational_diabetes: string
    smoking: string
  }
  mental_wellbeing: {
    premenstual_syndrome: string[]
    mental_disorders: string[]
    anxiety: string[]
  }
  violence: {
    psychological: string[]
    domestic: string[]
    physical: string[]
    sexual: string[]
  }
  demographics: {
    date_of_birth: string
    ethnicity: string
    immigration_status: string
    residency: string
    immigration_reason: string
    marriage_status: string
    employment_status: string
    education: string
    income: string
    expenses: string
  }
}
export type NewMumCategory = keyof NewMumQuizResults
export type NewMumSubcategory = keyof Subcategories<NewMumQuizResults>[NewMumCategory]

export type NewMumQuizResults = {
  birth: {
    caesarean_section: string
    preterm_birth: string
    unintended_pregnancy: string
  }
  health: {
    height_weight_before: string
    perinatal_anaemia: string
    gestational_diabetes: string
    smoking: string
  }
  mental_wellbeing: {
    premenstual_syndrome: string[]
    mental_disorders: string[]
    anxiety: string[]
  }
  violence: {
    psychological: string[]
    domestic: string[]
    physical: string[]
    sexual: string[]
  }
  demographics: {
    date_of_birth: string
    ethnicity: string
    immigration_status: string
    residency: string
    immigration_reason: string
    marriage_status: string
    employment_status: string
    education: string
    income: string
    expenses: string
  }
}

export type OtherCategory = keyof OtherQuizResults
export type OtherSubcategory = keyof Subcategories<OtherQuizResults>[OtherCategory]

export type OtherQuizResults = {
  health: {
    smoking: string
    premenstual_syndrome: string
    mental_disorders: string
    anxiety: string[]
  }
  violence: {
    psychological: string[]
    domestic: string[]
    physical: string[]
    sexual: string[]
  }
  demographics: {
    date_of_birth: string
    ethnicity: string
    immigration_status: string
    residency: string
    immigration_reason: string
    marriage_status: string
    employment_status: string
    education: string
    income: string
    expenses: string
  }
}
