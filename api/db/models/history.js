import db from '../db.js'
import { User } from './user.js';
import { Music } from './music.js'

const History = db.define('history', {})

Music.belongsToMany(User, { through: 'history' });

export { History };