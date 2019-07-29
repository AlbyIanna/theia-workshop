export const ListFilesService = Symbol('ListFilesService');
export interface ListFilesService {
  listFiles(uri: string): Promise<string[]>;
}

export const ListFilesServicePath = '/services/list-files-service';