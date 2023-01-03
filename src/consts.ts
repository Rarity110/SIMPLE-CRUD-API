enum RESPONSE_CODES {
	OK_GET = 200,
	OK_POST = 201,
	OK_PUT = 200,
	OK_DELETE = 204,
	NOT_FOUND = 404,
	BAD_REQUEST = 400,
	SERVER_ERROR = 500,
	NOT_UUID = 400,
}

enum RESPONSE_MESSAGES {
	OK_GET_ALL = 'All users data are received',
	OK_GET_USER = 'User data are received',
	BAD_REQUEST_GET_USER = 'Bad Request',
	NOT_FOUND_USER = 'User not found',
	BAD_REQUEST_GET = 'UserId is invalid (not uuid)',
	OK_POST = 'User is successfully created',
	BAD_REQUEST_POST = 'Request body does not contain required fields',
	OK_PUT = 'Users data are successfully updated',
	BAD_REQUEST_PUT = 'Request body does not contain required fields',
	OK_DELETE = 'User is successfully deleted',
	BAD_REQUEST_DELETE = 'UserId is invalid (not uuid)',
	NOT_FOUND_DELETE = 'User not found',
	SERVER_ERROR = 'Server error',
	NOT_FOUND_PAGE = 'Page not found',
	INVALID_METHOD = 'Invalid method',
	NOT_UUID = 'UserId is invalid (not uuid)',
}

enum REQUEST_METHODS {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

const ENDPOINT = '/api/users';

export { ENDPOINT, RESPONSE_CODES, RESPONSE_MESSAGES, REQUEST_METHODS };
