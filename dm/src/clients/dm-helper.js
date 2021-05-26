import axios from 'axios';

export default async (partyLevel) => {
  try {
    return await axios.get(`http://localhost:8080/ms/dm-helper/v1/monsters-book/monster/${partyLevel}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
};
