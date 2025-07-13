import { type ReactNode } from 'react';

interface PageLayoutProps {
    children: ReactNode;
    className?: string;
}

export function PageLayout({ children, className = '' }: PageLayoutProps) {
    return (
        <div className={`flex h-full flex-1 flex-col gap-6 p-6 ${className}`}>
            {children}
        </div>
    );
}

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    children?: ReactNode;
    className?: string;
}

export function PageHeader({ title, subtitle, children, className = '' }: PageHeaderProps) {
    return (
        <div className={`flex items-center justify-between ${className}`}>
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
                {subtitle && (
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">{subtitle}</p>
                )}
            </div>
            {children && (
                <div className="flex items-center gap-3">
                    {children}
                </div>
            )}
        </div>
    );
}

interface PageContentProps {
    children: ReactNode;
    className?: string;
}

export function PageContent({ children, className = '' }: PageContentProps) {
    return (
        <div className={`flex-1 ${className}`}>
            {children}
        </div>
    );
}

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className = '' }: CardProps) {
    return (
        <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}>
            {children}
        </div>
    );
}

interface CardHeaderProps {
    children: ReactNode;
    className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
    return (
        <div className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 ${className}`}>
            {children}
        </div>
    );
}

interface CardContentProps {
    children: ReactNode;
    className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
    return (
        <div className={`px-6 py-4 ${className}`}>
            {children}
        </div>
    );
} 