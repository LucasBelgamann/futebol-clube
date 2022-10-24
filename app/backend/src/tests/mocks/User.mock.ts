export const oneUser = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: 'password',
};

export const validUser = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

export const invalidUser = {
  email: 'admininson.com',
  password: 'thisIsMyPassword',
};

export const withoutEmail = {
  password: 'secret_admin',
};

export const rightRes =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIn0sImlhdCI6MTY2NjM5MzM0OSwiZXhwIjoxNjY3MjU3MzQ5fQ.0h2eWInBopIUHIZm2kxCRydo8FmTYCQ1C-t7OhNyl80';