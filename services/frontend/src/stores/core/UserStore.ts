type UserData = {
  name: string
}

export default class UserStore {
  username: string;
  authorizedToken = 'test_key';

  constructor(userData: UserData) {
    this.username = userData.name;
  }
}