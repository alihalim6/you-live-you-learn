import config from '../server/config';

export default function mapError(error){
	if(error){
	console.log('handling error: ' + error);	
		switch(error){
			//sign up
			case 'auth/email-already-exists' :
				return 'USERNAME ALREADY TAKEN.';
			
			//init
			case 'auth/user-not-found' :
				return 'FAILED TO LOAD USER DATA.'

			//sign in
			case 'EMAIL_NOT_FOUND' :
				return usernamePasswordInvalid;
			case 'INVALID_PASSWORD' :
				return usernamePasswordInvalid;

			//profile image
			case config.user.retrieveProfileImageError :
				return 'THERE WAS AN ISSUE RETRIEVING YOUR PROFILE PIC.';
			case config.user.removeProfileImageError :
				return 'COULDN\'T REMOVE PIC ON OUR END. REOPEN APP AND TRY AGAIN.';

			default :
				return 'ERROR OCCURED BEHIND THE SCENES.'
		}
	}
}