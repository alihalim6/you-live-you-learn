import * as types from '../actions/ActionTypes';

export function setPostPage(page){
  return {type: types.POST_PAGE, page};
}