# Ionic 3 Azure Notification Hubs Sample

This is a sample of using the [Ionic Framework](https://ionicframework.com/) version 3 with [Azure Notification Hubs](https://azure.microsoft.com/en-us/services/notification-hubs/) to receive push notifications.  This uses the [cordova-azure-notification-hubs](https://www.npmjs.com/package/cordova-azure-notification-hubs) Cordova plugin to talk directly with Azure Notification Hubs.

## Getting Started

In order to get started, you need the following values from the Azure Portal, the Notification Hub name, and the DefaultListenSharedAccessSignature connection string under Access Policies.  Modify the `src/app/config.ts` filling in the appropriate values.

```typescript
export const config = {
  name: '',
  connectionString: ''
};
```

To receive pushes, then configure the `PushNotification` class in the root.  To import a non-Ionic Cordova plugin, you need to declare the global.

```typescript
declare let PushNotification: any;
```

Putting this together, we can demonstrate the end to end sample with the following code which sets the Azure Notification Hub properties and Android and iOS settings as well.

```typescript
import { config } from './config';
declare let PushNotification: any;

const push = PushNotification.init({
  notificationHubPath: config.name,
  connectionString: config.connectionString,

  android: {
      sound: true
  },
  ios: {
      alert: 'true',
      badge: true,
      sound: 'false'
  }
});

push.on('registration', data => {
  console.log(data.registrationId);
  console.log(data.azureRegId);
  alert(JSON.stringify(data));
});

push.on('notification', data => {
  console.log(data.message);
  alert(JSON.stringify(data));
});

push.on('error', err => console.log(`Error: ${err}`));
```

## Android Development

In order to use with Android, download your 'google.services.json' to the repository root.

## License

MIT License

Copyright (c) 2019 Matthew Podwysocki

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
