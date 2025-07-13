import { type PropsWithChildren } from 'react';
import AuthSplitLayout from './auth/auth-split-layout';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <AuthSplitLayout title={title} description={description}>
            {children}
        </AuthSplitLayout>
    );
}
