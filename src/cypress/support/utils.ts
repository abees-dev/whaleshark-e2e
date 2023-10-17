import { UserData } from '../../models/User';

const getUserData = () => {
	return new Promise<UserData>((resolve, reject) => {
		cy.wait('@data', { timeout: 10000 }).then((currentSubject) => {
			if (currentSubject.response.statusCode < 400) {
				return resolve(currentSubject.response.body);
			}
			return resolve(null);
		});
	});
};

export { getUserData };
