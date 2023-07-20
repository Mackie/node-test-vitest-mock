import { Repo } from "./Repo";
import * as Handler from "./handler/Handler";

export class App {
  constructor(input: string) {
    const repo = new Repo(input);
    console.log(`Repo: ${repo.getToken()}`);
    const res = Handler.handler(input);
    console.log(`Handler: ${res}`);
  }
}
