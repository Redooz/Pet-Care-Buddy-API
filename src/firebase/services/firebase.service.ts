import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from 'src/config';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Analytics, getAnalytics } from 'firebase/analytics';

@Injectable()
export class FirebaseService {
  public app: FirebaseApp;
  public analytics: Analytics;

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {
    const {
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      appId,
      measurementId,
    } = configService.firebase;

    this.app = initializeApp({
      apiKey: apiKey,
      authDomain: authDomain,
      projectId: projectId,
      storageBucket: storageBucket,
      messagingSenderId: messagingSenderId,
      appId: appId,
      measurementId: measurementId,
    });

    this.analytics = getAnalytics(this.app);
  }
}
