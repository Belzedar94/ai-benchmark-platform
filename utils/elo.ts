// K-factor determines how much the Elo rating changes after each match
const K_FACTOR = 32;

/**
 * Calculate the expected score for a player based on their rating and opponent's rating
 * @param ratingA - Rating of player A
 * @param ratingB - Rating of player B
 * @returns Expected score for player A (between 0 and 1)
 */
export function calculateExpectedScore(ratingA: number, ratingB: number): number {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
}

/**
 * Calculate the new Elo rating for a player
 * @param currentRating - Current rating of the player
 * @param expectedScore - Expected score for the player
 * @param actualScore - Actual score (1 for win, 0.5 for draw, 0 for loss)
 * @returns New Elo rating
 */
export function calculateNewRating(
  currentRating: number,
  expectedScore: number,
  actualScore: number
): number {
  return Math.round(currentRating + K_FACTOR * (actualScore - expectedScore));
}

/**
 * Update Elo ratings for two models based on a match result
 * @param ratingA - Current rating of model A
 * @param ratingB - Current rating of model B
 * @param outcome - 'A' if model A won, 'B' if model B won, 'tie' for a draw
 * @returns Object containing new ratings for both models
 */
export function updateEloRatings(
  ratingA: number,
  ratingB: number,
  outcome: 'A' | 'B' | 'tie'
): { newRatingA: number; newRatingB: number } {
  const expectedScoreA = calculateExpectedScore(ratingA, ratingB);
  const expectedScoreB = calculateExpectedScore(ratingB, ratingA);

  let actualScoreA: number;
  let actualScoreB: number;

  if (outcome === 'A') {
    actualScoreA = 1;
    actualScoreB = 0;
  } else if (outcome === 'B') {
    actualScoreA = 0;
    actualScoreB = 1;
  } else {
    // Tie
    actualScoreA = 0.5;
    actualScoreB = 0.5;
  }

  const newRatingA = calculateNewRating(ratingA, expectedScoreA, actualScoreA);
  const newRatingB = calculateNewRating(ratingB, expectedScoreB, actualScoreB);

  return { newRatingA, newRatingB };
}