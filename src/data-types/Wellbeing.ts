/**
 * WARNING 1: DO NOT CHANGE THE VALUES, AFTER THE APP IS PUBLISHED.
 *
 * WARNING 2: DO NOT USE ZERO AS A VALUE
 */
export enum Wellbeing {
  FeelingWell = 1,
  ShowingSymptoms = 2,
  TestedNegative = 3,
  TestedPositive = 4,
}

export enum CovidSymptom {
  Fever = 1,
  Cough = 2,
  SoreThroat = 3,
  BreathingDifficulty = 4, // Shortness of breath
  ChestPain = 5, // Persistent pain or pressure in the chest
  Tiredness = 6,
  NasalCongestion = 7,
  RunnyNose = 8,
  Diarrhea = 9,
  Other = 61,
}

// Underlying medical condition
export enum MedicalCondition {
  None = 1,
  ChronicLungDisease = 2,
  Asthma = 3, // Moderate or severe asthma
  HeartConditions = 4,
  Obesity = 5,
  Diabetes = 6,
  ChronicKidneyDisease = 7,
  LiverDisease = 8,
  Other = 61,
}
