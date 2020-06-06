import dataBase from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import LodashId from 'lodash-id'
import path from 'path'
import fs from 'fs'
import { app, remote } from 'electron'

const APP = process.type === 'renderer' ? remote.app : app;

const STROE_PATH = APP.getPath('userData');

if (process.type !== 'renderer') {
    if (!fs.existsSync(STROE_PATH)) {
        fs.mkdirSync(STROE_PATH);
    }
}

const adapter = new FileSync(path.join(STROE_PATH, '/data.json'));

const db = dataBase(adapter);
db._.mixin(LodashId);
//初始化数值
if (!db.has('user').value()) {
    db.set('user', {
        userName: 'Samcw'
    }).write();
}
if (!db.has('projectList').value()) {
    db.set('projectList', []).write();
}

export default db;