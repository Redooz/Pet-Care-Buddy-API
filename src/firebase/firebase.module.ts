import { Module } from '@nestjs/common';
import { FirebaseService } from './services/firebase.service';

@Module({
  providers: [FirebaseService]
})
export class FirebaseModule {}
