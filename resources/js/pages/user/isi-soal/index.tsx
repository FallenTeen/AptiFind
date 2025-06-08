import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { route } from '@/lib/route';
import { Link } from '@inertiajs/react';

const breadcrumbs = [
	{ title: 'Dashboard', href: String(route('dashboard')) },
	{ title: 'Pengerjaan Soal', href: String(route('user.isi-soal.index')) },
];

type Paket = {
	id: number;
	nama_paket: string;
	detail_paket_soal: { soal: { id: number } }[];
};

export default function IsiSoalIndex({ paket }: { paket: Paket[] }) {
	return (
		<AppSidebarLayout breadcrumbs={breadcrumbs}>
			<div className="mx-auto max-w-3xl py-8">
				<h1 className="text-2xl font-bold mb-4">Pilih Paket Soal</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{paket.length === 0 ? (
						<div className="col-span-2 text-gray-500">Belum ada paket soal tersedia.</div>
					) : (
						paket.map((p) => (
							<div
								key={p.id}
								className="rounded-xl border border-gray-100 bg-white shadow-lg p-6 flex flex-col gap-2 hover:shadow-xl transition-shadow duration-200"
							>
								<div className="font-semibold text-lg mb-2">{p.nama_paket}</div>
								<div className="text-gray-500 mb-4">Jumlah Soal: {Array.isArray(p.detail_paket_soal) ? p.detail_paket_soal.length : 0}</div>
								<Link
									href={String(route('user.isi-soal.show', p.id))}
									className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-emerald-700"
								>
									Kerjakan
								</Link>
							</div>
						))
					)}
				</div>
			</div>
		</AppSidebarLayout>
	);
}
