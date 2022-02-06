# Welcome to Jovo Standard Events Plugin 👋
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/github/license/vocalime-base/Jovo-Standard-Events-Plugin)](https://github.com/vocalime-base/jovo-standard-events-plugin/blob/master/LICENSE)
![Workflow](https://img.shields.io/github/workflow/status/vocalime-base/jovo-standard-events-plugin/Release%20package)

> Handle standard events outside your components.

### 🏠 [Homepage](https://github.com/vocalime-base/jovo-standard-events-plugin#readme)

## Install

```sh
npm install @vocalime/jovo-standard-events-plugin
```

## Example

### index.js

```typescript
import { StandardEventPlugin } from '@vocalime/jovo-standard-events-plugin';
import { App } from '@jovotech/framework';
import {
    newUser,
    newSession,
    onRequest,
} from './standard-event-handlers';

export const app = new App({
    components: [
        // Your components
    ],
    plugins: [
        // Other plugins...,
        new StandardEventsPlugin({
            newUserHandlers: [newUser],
            newSessionHandlers: [newSession],
            onRequestHandlers: [onRequest],
        }),
    ],
});
```

### standard-event-handlers.ts

```typescript
import { Jovo } from '@jovotech/framework';

export async function newUser(this: Jovo): Promise<void> {
    console.log('This function runs the first time the user invokes your app.');
}

export async function newSession(this: Jovo): Promise<void> {
    console.log('This function runs once per session.');
}

export async function onRequest(this: Jovo): Promise<void> {
    console.log('This function runs once per request.');
}
```

## Author

👤 **Vocalime**

* Website: www.vocalime.com
* Github: [@vocalime-base](https://github.com/vocalime-base)
* Linkedin: [@vocalime](https://www.linkedin.com/company/vocalime/)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2022 [vocalime](https://github.com/vocalime-base).

This project is [MIT](https://github.com/vocalime-base/jovo-standard-events-plugin/blob/master/LICENSE) licensed.
