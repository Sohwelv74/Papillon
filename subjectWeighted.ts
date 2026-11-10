export type SubjectCoefficients = Record<string, number>;

export type SubjectAverageInput = { name: string; average: number };

/**
 * Moyenne générale pondérée par un coefficient de matière.
 * Les matières sans moyenne valide (-1, NaN) sont ignorées.
 * Coefficient par défaut : 1.
 */
const PapillonSubjectWeightedAvg = (
  subjects: SubjectAverageInput[],
  coefficients: SubjectCoefficients = {}
): number => {
  let sum = 0;
  let coefSum = 0;

  for (const { name, average } of subjects) {
    if (typeof average !== "number" || Number.isNaN(average) || average < 0) { continue; }

    const coef = coefficients[name] ?? 1;
    if (coef <= 0) { continue; }

    sum += average * coef;
    coefSum += coef;
  }

  return coefSum > 0 ? sum / coefSum : -1;
};

export default PapillonSubjectWeightedAvg;
