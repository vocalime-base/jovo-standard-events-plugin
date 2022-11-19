import {
    Jovo,
    HandleRequest,
    Plugin,
    Extensible,
    InvalidParentError,
    PluginConfig,
} from '@jovotech/framework';

export type StandardEventHandler = (jovo: Jovo) => Promise<void> | void;

interface StandardEventPluginConfig extends PluginConfig {
    newUserHandlers: StandardEventHandler[];
    newSessionHandlers: StandardEventHandler[];
    onRequestHandlers: StandardEventHandler[];
    onResponseHandlers: StandardEventHandler[];
}

export class StandardEventsPlugin extends Plugin<StandardEventPluginConfig> {
    getDefaultConfig(): StandardEventPluginConfig {
        return {
            newUserHandlers: [],
            newSessionHandlers: [],
            onRequestHandlers: [],
            onResponseHandlers: [],
        };
    }

    mount(extensible: Extensible): void {
        if (!(extensible instanceof HandleRequest)) {
            throw new InvalidParentError(this.constructor.name, HandleRequest);
        }

        extensible.middlewareCollection.use('before.dialogue.start', async (jovo) => {
            if (jovo.$user.isNew) {
                await this.runHandlers(jovo, this.config.newUserHandlers);
            }

            if (jovo.$session.isNew) {
                await this.runHandlers(jovo, this.config.newSessionHandlers);
            }

            await this.runHandlers(jovo, this.config.onRequestHandlers);
        });

        extensible.middlewareCollection.use('before.response.start', async (jovo) => {
            await this.runHandlers(jovo, this.config.onResponseHandlers);
        });
    }

    async runHandlers(jovo: Jovo, handlers: StandardEventHandler[]): Promise<void> {
        for (const handler of handlers) {
            await handler(jovo);
        }
    }
}
