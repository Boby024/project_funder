export interface FeedbackDonate {
  alreadyDonate: boolean; // if the user already donate for the project
  statusProject: string;  // the project still active or not
  enoughCredit: string;   // if there was enough credit on the account of user
}
