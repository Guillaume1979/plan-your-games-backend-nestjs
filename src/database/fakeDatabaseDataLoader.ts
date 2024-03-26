import { Injectable, Logger } from '@nestjs/common';
import { environment } from '../app.module';

@Injectable()
export class FakeDatabaseDataLoader {
  constructor() {
    this.#loadFakeData();
  }

  async #loadFakeData() {
    Logger.log('START Loading', 'FAKE DATA');
    await this.#loadUsers();
    Logger.log('END Loading', 'FAKE DATA');
  }

  async #loadUsers() {
    const users = [];
  }
  async #loadGuilds() {}
  async #loadSessions() {}
}
