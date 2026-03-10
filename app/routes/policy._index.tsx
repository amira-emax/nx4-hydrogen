import {redirect} from 'react-router';
import type {Route} from './+types/policy._index';

export async function loader({context}: Route.LoaderArgs) {
  return redirect('/policies');
}
