import { JsonschemaFormCommandContribution, JsonschemaFormMenuContribution, ListFilesCommandContribution, ListFilesMenuContribution, ListFilesKeybindingContribution } from './jsonschema-form-contribution';
import {
    CommandContribution,
    MenuContribution
} from "@theia/core/lib/common";
import { OpenHandler, WidgetFactory } from "@theia/core/lib/browser";
import { ContainerModule } from "inversify";
import { JsonschemaFormWidget, JsonschemaFormWidgetOptions } from './jsonschema-form-widget';
import { JsonschemaFormOpenHandler } from './jsonschema-form-open-handler';
import { KeybindingContribution } from "@theia/core/lib/browser";

export default new ContainerModule(bind => {
    // add your contribution bindings here

    bind(CommandContribution).to(JsonschemaFormCommandContribution).inSingletonScope();
    bind(MenuContribution).to(JsonschemaFormMenuContribution).inSingletonScope();
    bind(CommandContribution).to(ListFilesCommandContribution).inSingletonScope();
    bind(MenuContribution).to(ListFilesMenuContribution).inSingletonScope();
    bind(KeybindingContribution).to(ListFilesKeybindingContribution).inSingletonScope();
    

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
});