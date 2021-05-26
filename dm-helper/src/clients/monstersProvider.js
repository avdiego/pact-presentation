import axios from 'axios';

export default async (challengeRating) => {
  try {
    return await axios.get(`http://localhost:8082/ms/d&d-monsters/v1/monsters/challenge-rating/${challengeRating}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
};
