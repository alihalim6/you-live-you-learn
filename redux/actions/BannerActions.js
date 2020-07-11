import * as types from '../actions/ActionTypes';

export function showBanner(banner){
  return {type: types.BANNER_SHOWING, banner};
}