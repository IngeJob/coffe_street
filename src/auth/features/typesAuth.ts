export interface userProps {
    status: string,
    fullname: string,
    username: string,
    email: string,
    password: string,
    condition: string,
    confirmPassword: string,
    phone: string,
}

export type startLoginProps = {
    email: string,
    password: string,
}

export type startRegisterProps = {
    name: string,
    username: string,
    fullname: string,
    email: string,
    password: string,
    phone: string,
}