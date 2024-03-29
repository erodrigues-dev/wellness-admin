export const config = Object.freeze({
  apiUrl: process.env.REACT_APP_API_URL,
  pageLimit: Number(process.env.REACT_APP_PAGE_LIMIT) || 10,
  squareAppId: process.env.REACT_APP_SQUARE_APP_ID,
  squareLocationId: process.env.REACT_APP_SQUARE_LOCATION_ID,
  socketUrl: process.env.REACT_APP_API_URL,
  socketKey: process.env.REACT_APP_SOCKET_KEY,
  workoutLogTrainerSpecialties:
    process.env.REACT_APP_WORKOUT_LOG_TRAINER_SPECIALTIES?.split(';') || [
      'Head Trainer',
      'Trainer',
    ],
});
