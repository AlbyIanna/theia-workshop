import { injectable, inject } from "inversify";
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MessageService } from "@theia/core/lib/common";
import { CommonMenus, KeybindingContribution, KeybindingRegistry } from "@theia/core/lib/browser";

export const JsonschemaFormCommand = {
    id: 'JsonschemaForm.command',
    label: "Shows a message"
};

export const ListFilesCommand = {
    id: 'Arduino.ListFiles',
    label: "List All Files"
 };

@injectable()
export class JsonschemaFormCommandContribution implements CommandContribution {

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(JsonschemaFormCommand, {
            execute: () => this.messageService.info('Hello World!')
        });
    }
}

@injectable()
export class JsonschemaFormMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: JsonschemaFormCommand.id,
            label: 'Say Hello'
        });
    }
}

@injectable()
export class ListFilesCommandContribution implements CommandContribution {
    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(ListFilesCommand, {
            execute: () => this.messageService.info('Listing Files...')
        });
    }
}

@injectable()
export class ListFilesMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: ListFilesCommand.id,
            label: 'List Files'
        });
    }
}


@injectable()
export class ListFilesKeybindingContribution implements KeybindingContribution {

    registerKeybindings(keybinding: KeybindingRegistry): void {
        keybinding.registerKeybinding({
            command: ListFilesCommand.id,
            keybinding: 'alt+shift+l'
        });
    }
}