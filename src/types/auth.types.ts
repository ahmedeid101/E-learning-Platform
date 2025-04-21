export interface AuthCredentials {
    email: string;
    password: string;
}

export interface RegisterInput  extends AuthCredentials {
    name: string;
    role?: 'student' | 'instructor' | 'admin';
}