# Witz (https://app.witz.com)[https://app.witz.com]

## Features

### Authentication

- [x] It should be able to authenticate using e-mail & password;

### Users

- [x] It should be able to create a new user;
- [x] It should be able to list all user suitabilities;

### Suitabilities

- [x] It should be able to create a new suitability;

## RBAC

Roles & permissions.

### Roles

- ADMIN
- MEMBER
- GUEST

### Permissions table

|                 | ADMIN | MEMBER | GUEST |
| --------------- | ----- | ------ | ----- |
| Create Account  | ✅    | ✅     | ✅    |
| Login mail/pass | ✅    | ✅     | ❌    |
| Login mail/pass | ✅    | ✅     | ❌    |

> ✅ = allowed
> ❌ = not allowed
> ⚠️ = allowed w/ conditions

#### Conditions

- Only owners may transfer organization ownership;
- Only administrators and project authors may update/delete the project;
- Members can leave their own organization;
