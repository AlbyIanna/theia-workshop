import { ListFilesService } from "../common/list-files";
import { injectable } from "inversify";

@injectable()
export class ListFilesServiceImpl implements ListFilesService{
  listFiles(uri: string): Promise<string[]> {
    console.log(uri); // just logging the uri to see if the call is working
    return new Promise((resolve, reject) => {
      return resolve([]);
    })
  }
}