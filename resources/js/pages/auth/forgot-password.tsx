import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthSplitLayout from '@/layouts/auth/auth-split-layout';

type ForgotPasswordForm = {
    email: string;
};

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<ForgotPasswordForm>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <AuthSplitLayout 
            title="Lupa Password" 
            description="Masukkan email Anda untuk menerima link reset password"
        >
            <Head title="Lupa Password" />
            
            {status && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">{status}</p>
                </div>
            )}

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Alamat Email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="Masukkan alamat email Anda"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <Button type="submit" className="w-full" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                        Kirim Link Reset Password
                    </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                    Ingat password Anda?{' '}
                    <TextLink href={route('login')}>
                        Kembali ke halaman login
                    </TextLink>
                </div>
            </form>
        </AuthSplitLayout>
    );
}
