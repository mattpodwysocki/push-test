import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { config } from './config';

declare let PushNotification: any;

platformBrowserDynamic().bootstrapModule(AppModule);

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
