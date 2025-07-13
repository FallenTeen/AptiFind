import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthSplitLayout from '@/layouts/auth/auth-split-layout';

type ConfirmPasswordForm = {
    password: string;
};

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors } = useForm<ConfirmPasswordForm>({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.confirm'));
    };

    return (
        <AuthSplitLayout 
            title="Konfirmasi Password" 
            description="Ini adalah area yang aman dari aplikasi. Silakan konfirmasi password Anda sebelum melanjutkan."
        >
            <Head title="Konfirmasi Password" />
            
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            autoFocus
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Masukkan password Anda"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <Button type="submit" className="w-full" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                        Konfirmasi
                    </Button>
                </div>
            </form>
        </AuthSplitLayout>
    );
}
