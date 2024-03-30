import {useQuery} from '@apollo/client';
import {authToken} from '../apollo/GlobalVar';
import {LOGGED_IN_USER} from '../graphql/queries';
import {LoggedInUserQuery} from '../graphql/schemaTypes';

const useUser = () => {
	const token = authToken();
	const {data, error, loading, refetch} = useQuery<LoggedInUserQuery>(LOGGED_IN_USER);

	if (token && !error) {
		return {user: data?.loggedInUser, error, loading, refetch};
	} else {
		return {user: null, error: null, loading: false, refetch};
	}
};

export default useUser;
