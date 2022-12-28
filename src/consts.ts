const enum RESPONSE_CODES {
    OK_GET = 200,
    OK_POST = 201,
    OK_PUT = 200,
    OK_DELETE = 204,
    NOT_FOUND = 404,
    BAD_REQUEST = 400,
};

const enum ERROR_MESSAGES {
    OK_GET_ALL = 'All users data are received',
    OK_GET_USER = 'User data are received',
    BAD_REQUEST_GET_USER = 'Bad Request',
    NOT_FOUND_USER = 'User is not found',
    BAD_REQUEST_GET = 'UserId is invalid (not uuid)',
    OK_POST = 'User is successfully created',
    BAD_REQUEST_POST = 'Request body does not contain required fields',
    OK_PUT = 'Users data are successfully updated',
    BAD_REQUEST_PUT = 'UserId is invalid (not uuid)',
    OK_DELETE = 'User is successfully deleted',
    BAD_REQUEST_DELETE = 'UserId is invalid (not uuid)',
    NOT_FOUND_DELETE = 'User is not found',
};

const enum REQUEST_METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
};

const ENDPOINT = '/users';

export { ENDPOINT, RESPONSE_CODES, ERROR_MESSAGES, REQUEST_METHODS };