import {
    Jovo,
    HandleRequest,
    Plugin,
    Extensible,
    InvalidParentError,
    PluginConfig,
} from '@jovotech/framework';

export type StandardEventHandler = (this: Jovo) => Promise<void> | void;

interface StandardEventPluginConfig extends PluginConfig {
    newUserHandlers: StandardEventHandler[];
    newSessionHandlers: StandardEventHandler[];
    onRequestHandlers: StandardEventHandler[];
}

export class StandardEventsPlugin extends Plugin<StandardEventPluginConfig> {
    getDefaultConfig(): StandardEventPluginConfig {
        return {
            newUserHandlers: [],
            newSessionHandlers: [],
            onRequestHandlers: [],
        };
    }

    mount(extensible: Extensible): void {
        if (!(extensible instanceof HandleRequest)) {
            throw new InvalidParentError(this.constructor.name, HandleRequest);
        }

        extensible.middlewareCollection.use('request.end', async (jovo) => {
            await this.executeNewUserHandlers(jovo);
            await this.executeNewSessionHandlers(jovo);
            await this.executeOnRequestHandlers(jovo);
            return;
        });
    }

    async executeNewUserHandlers(jovo: Jovo): Promise<void> {
        if (jovo.$user.isNew) {
            for (const handler of this.config.newUserHandlers) {
                await handler.bind(jovo)();
            }
        }
    }

    async executeNewSessionHandlers(jovo: Jovo): Promise<void> {
        if (jovo.$session.isNew) {
            for (const handler of this.config.newSessionHandlers) {
                await handler.bind(jovo)();
            }
        }
    }

    async executeOnRequestHandlers(jovo: Jovo): Promise<void> {
        for (const handler of this.config.onRequestHandlers) {
            await handler.bind(jovo)();
        }
    }
}
