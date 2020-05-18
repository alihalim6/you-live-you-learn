import {BASE_COLOR_LIGHT, BASE_COLOR_DARK, BORDER_COLOR, BORDER_WIDTH, BASE_GRAY} from '../constants/AppConstants';
import {isIOS} from '../utilities/PlatformHelper';

const profileImageSize = 150;
const menuContainerMarginTop = (isIOS() ? 32 : 10);
const followingPadding = 12;

const MenuStyles = {
	container: {
		flex: 1,
		marginTop: menuContainerMarginTop
	},
	header: {
		height: 234,
		backgroundColor: BASE_COLOR_LIGHT,
		borderBottomWidth: BORDER_WIDTH,
		borderColor: BORDER_COLOR
	},
	profileImageContainer: {
		width: profileImageSize,
		height: profileImageSize,
		borderWidth: BORDER_WIDTH,
		borderRadius: 100,
		borderColor: BORDER_COLOR,
		alignSelf: 'center',
		overflow: 'hidden'
	},
	profileImage: {
		flex: 1,
		width: '100%'
	},
	userName: {
		margin: 12,
		marginBottom: 10,
		fontSize: 18,
		color: BASE_COLOR_DARK,
		fontWeight: 'bold',
		alignSelf: 'center'
	},
	followContainer: {
		width: '100%',
		fontSize: 14,
		flex: 1,
		flexDirection: 'row'
	},
	followLabel: {
		color: BASE_GRAY,
		fontWeight: 'bold',
		flex: 1
	},
	following: {
		textAlign: 'right',
		paddingRight: followingPadding
	},
	followers: {
		textAlign: 'left',
		paddingLeft: followingPadding
	},
	item: {
		borderTopWidth: BORDER_WIDTH,
		borderColor: BORDER_COLOR,
		paddingTop: 20,
		paddingLeft: 26,
		height: 60,
		backgroundColor: BASE_COLOR_LIGHT
	},
	topMenuItem: {
		borderTopWidth: 0
	},
	menuItemLabel: {
		color: BASE_COLOR_DARK,
		fontSize: 16
	}
};

export default MenuStyles;