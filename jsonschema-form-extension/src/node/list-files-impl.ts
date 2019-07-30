import { ListFilesService } from "../common/list-files";
import { injectable } from "inversify";
import * as fs from "fs";
import URI from "@theia/core/lib/common/uri";


@injectable()
export class ListFilesServiceImpl implements ListFilesService{
  listFiles(uri: string): Promise<string[]> {
    const dir = new URI(uri).path.toString();
    console.log(`================${dir}`);
    let isDirExists = fs.existsSync(dir) && fs.lstatSync(dir).isDirectory();
    return new Promise((resolve, reject) => {
      if (!isDirExists) {
        return resolve(['this is not a directory']);
      }

      fs.readdir(dir, (err, files) => {
        if (err) {
          return reject(err);
        }
        return resolve(files);
      })

    })
  }
}