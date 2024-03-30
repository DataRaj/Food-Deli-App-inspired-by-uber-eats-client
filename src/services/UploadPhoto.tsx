import * as filestack from 'filestack-js';
export const client = filestack.init('AncOrYkrcRkll1kf2xYZ8z');
export const uploadPhotoHandler = async (setPhotoUrl) => {
	const options = {
		maxFiles: 5,
		uploadInBackground: false,
		onUploadDone: async (res) => {
			const file = await res?.filesUploaded[0]?.url;
			if (file) {
				setPhotoUrl(file);
			}
		},
	};
	await client.picker(options).open();
};
