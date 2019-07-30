import { JsonschemaFormCommandContribution, JsonschemaFormMenuContribution, ListFilesCommandContribution, ListFilesMenuContribution, ListFilesKeybindingContribution } from './jsonschema-form-contribution';
import {
    CommandContribution,
    MenuContribution
} from "@theia/core/lib/common";
import { OpenHandler, WidgetFactory, WebSocketConnectionProvider } from "@theia/core/lib/browser";
import { ContainerModule } from "inversify";
import { JsonschemaFormWidget, JsonschemaFormWidgetOptions } from './jsonschema-form-widget';
import { JsonschemaFormOpenHandler } from './jsonschema-form-open-handler';
import { KeybindingContribution } from "@theia/core/lib/browser";
import { ListFilesService, ListFilesServicePath } from '../common/list-files';
import { ListFilesWidget } from './listfiles-widget';
require('../../src/browser/style/list-files.css')

export default new ContainerModule(bind => {
    // add your contribution bindings here

    bind(CommandContribution).to(JsonschemaFormCommandContribution).inSingletonScope();
    bind(MenuContribution).to(JsonschemaFormMenuContribution).inSingletonScope();
    bind(CommandContribution).to(ListFilesCommandContribution).inSingletonScope();
    bind(MenuContribution).to(ListFilesMenuContribution).inSingletonScope();
    bind(KeybindingContribution).to(ListFilesKeybindingContribution).inSingletonScope();
    bind(ListFilesService).toDynamicValue(context => WebSocketConnectionProvider.createProxy(context.container, ListFilesServicePath)).inSingletonScope();
    

    bind(OpenHandler).to(JsonschemaFormOpenHandler).inSingletonScope();
    bind(WidgetFactory).toDynamicValue(({ container }) => ({
        id: JsonschemaFormWidget.id,
        createWidget: (options: JsonschemaFormWidgetOptions) => {
            const child = container.createChild();
            child.bind(JsonschemaFormWidgetOptions).toConstantValue(options);
            child.bind(JsonschemaFormWidget).toSelf();
            return child.get(JsonschemaFormWidget);
        }
    }));

    bind(WidgetFactory).toDynamicValue(({ container }) => ({
        id: ListFilesWidget.id,
        createWidget: () => {
            const child = container.createChild();
            child.bind(ListFilesWidget).toSelf();
            return child.get(ListFilesWidget);
        }
    }))
});