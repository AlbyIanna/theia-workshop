import { ContainerModule } from "inversify";
import { ConnectionContainerModule } from '@theia/core/lib/node/messaging/connection-container-module';
import { ListFilesService, ListFilesServicePath } from '../common/list-files'
import { ListFilesServiceImpl } from "./list-files-impl";


export default new ContainerModule((bind, unbind, isBound, rebind) => {
  const listFilesServiceConnectionModule = ConnectionContainerModule.create(({ bind, bindBackendService }) => {
      bind(ListFilesServiceImpl).toSelf().inSingletonScope();
      bind(ListFilesService).toService(ListFilesServiceImpl);
      bindBackendService(ListFilesServicePath, ListFilesService);
  });
  bind(ConnectionContainerModule).toConstantValue(listFilesServiceConnectionModule);
});