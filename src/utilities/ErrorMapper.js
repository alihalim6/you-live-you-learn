import config from '../server/config';
//import {GALLERY, INVALID_INPUT} from '../constants/AppConstants';//circular dep with AppConstants
import {CAMERA_NOT_AUTHORIZED, INIT_USER_PROFILE_IMAGE, GALLERY} from '../constants/CameraConstants';
import {INVALID_INPUT} from '../constants/SignUpConstants';

export default function mapError(error){
	const usernamePasswordInvalid = 'INVALID USERNAME OR PASSWORD.';

	if(error){
		switch(error){
			//sign up
			case 'auth/email-already-exists' :
				return 'USERNAME ALREADY TAKEN.';
			
			//init
			case 'auth/user-not-found' :
				return 'FAILED TO LOAD USER DATA.'

			//sign in
			case 'EMAIL_NOT_FOUND' :
			case 'INVALID_PASSWORD' :
			case INVALID_INPUT :
				return usernamePasswordInvalid;

			//profile image
			case config.user.retrieveProfileImageError :
				return 'THERE WAS AN ISSUE RETRIEVING YOUR PROFILE PIC.';
			case config.user.removeProfileImageError :
				return 'COULDN\'T REMOVE PIC ON OUR END. REOPEN APP, TRY AGAIN.';
			case INIT_USER_PROFILE_IMAGE :
				return 'COULN\'T LOAD PROFILE IMAGE. CHECK APP PERMISSIONS.';

			//gallery
			case GALLERY :
				return 'COULDN\'T LOAD GALLERY. CHECK APP PERMISSIONS.';

			//camera
			case CAMERA_NOT_AUTHORIZED :
				return 'PERMISSION NEEDED FOR YL2 TO ACCESS CAMERA.';

			default :
				return 'ERROR OCCURED BEHIND THE SCENES.'
		}
	}
}