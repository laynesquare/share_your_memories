import { recommendations } from './recommendations';
import { combineReducers } from 'redux';
import { alert } from './auth.alert';
import { posts } from './posts';
import { auth } from './auth';

export default combineReducers({ posts, auth, alert, recommendations });
