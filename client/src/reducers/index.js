import { combineReducers } from 'redux';
import { posts } from './posts';
import { auth } from './auth';
import { alert } from './auth.alert';
import { recommendations } from './recommendations';

export default combineReducers({ posts, auth, alert, recommendations });
