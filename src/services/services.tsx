import { people } from "./people/people.service";

export class services {
  people: people;

  constructor() {
    this.people = new people();
  }
}
