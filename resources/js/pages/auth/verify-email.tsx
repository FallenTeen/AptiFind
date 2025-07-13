import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthSplitLayout from '@/layouts/auth/auth-split-layout';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <AuthSplitLayout 
            title="Verifikasi Email" 
            description="Sebelum melanjutkan, mohon verifikasi alamat email Anda"
        >
            <Head title="Verifikasi Email" />
            
            <div className="flex flex-col gap-6">
                {status && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-800">{status}</p>
                    </div>
                )}

                <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Periksa Email Anda
                        </h3>
                        <p className="text-sm text-gray-600">
                            Kami telah mengirimkan link verifikasi ke alamat email Anda. 
                            Silakan periksa kotak masuk dan klik link tersebut untuk memverifikasi akun Anda.
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <Button type="submit" className="w-full" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                        Kirim Ulang Email Verifikasi
                    </Button>
                </form>

                <div className="text-center text-sm text-muted-foreground">
                    <TextLink href={route('logout')} method="post" as="button">
                        Logout
                    </TextLink>
                </div>
            </div>
        </AuthSplitLayout>
    );
}
