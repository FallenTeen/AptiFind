import AppLogoIcon from '@/components/app-logo-icon';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { name, quote } = usePage<SharedData>().props;

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-10 text-white lg:flex dark:border-r overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
                </div>
                <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
                <div className="absolute bottom-20 right-20 w-24 h-24 bg-blue-400/10 rounded-full blur-lg"></div>
                <div className="absolute top-1/2 left-10 w-16 h-16 bg-purple-400/10 rounded-full blur-md"></div>

                <Link href={route('home')} className="relative z-20 flex items-center text-lg font-medium">
                    <AppLogoIcon className="mr-3 size-8 fill-current text-white" />
                    <span className="text-xl font-bold">{name}</span>
                </Link>

                <div className="relative z-20 flex-1 flex flex-col justify-center">
                    <div className="max-w-md">
                        <h2 className="text-4xl font-bold mb-6 leading-tight">
                            Sistem Penilaian
                            <br />
                            <span className="text-blue-300">SE-Evaluation</span>
                        </h2>
                        <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                            Platform terdepan untuk evaluasi kualitas search engine website perguruan tinggi untuk kebutuhan pengembangan.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span className="text-blue-100">Tes Minat Bakat Terstandar</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <span className="text-blue-100">Analisis Cerdas & Rekomendasi</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <span className="text-blue-100">Panduan Karir & Pendidikan</span>
                            </div>
                        </div>
                    </div>
                </div>

                {quote && (
                    <div className="relative z-20 mt-auto">
                        <div className="border-l-4 border-blue-400 pl-6">
                            <blockquote className="space-y-2">
                                <p className="text-lg italic text-blue-100">&ldquo;{quote.message}&rdquo;</p>
                                <footer className="text-sm text-blue-200 font-medium">— {quote.author}</footer>
                            </blockquote>
                        </div>
                    </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400"></div>
            </div>

            {/* FORMM */}
            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6">
                    {/* Mobile */}
                    <Link href={route('home')} className="relative z-20 flex items-center justify-center lg:hidden">
                        <AppLogoIcon className="h-12 fill-current text-blue-600" />
                    </Link>

                    {/* Header */}
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                        <p className="text-sm text-gray-600">{description}</p>
                    </div>

                    {/* Form Content */}
                    <div className="w-full p-2">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
