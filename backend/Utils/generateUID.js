import { customAlphabet } from 'nanoid/non-secure'
const genUid = async() => {
    const nanoid_one =  customAlphabet("1234567890abcdefgmnd", 25);
    const nanoid_two =  customAlphabet("1234567890abcdefgbr", 25);
    const nanoid_three =  customAlphabet("1234567890abcdefgbr", 25);
    const uid = nanoid_one(7) + nanoid_two(9) + nanoid_three(8);
    return uid
  };

export default genUid;

