import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { route } from '@/lib/route';
import { Link } from '@inertiajs/react';
import { PageLayout, PageHeader, PageContent, Card, CardContent } from '@/components/page-layout';
import { Badge } from '@/components/ui/badge';
import { usePage } from '@inertiajs/react';

const breadcrumbs = [
	{ title: 'Dashboard', href: String(route('dashboard')) },
	{ title: 'Pengerjaan Soal', href: String(route('user.isi-soal.index')) },
];

type Paket = {
	id: number;
	nama_paket: string;
	jumlah_soal: number;
	balance_minat: number;
	balance_bakat: number;
	detail_paket_soal: { soal: { id: number } }[];
};

interface User {
	id: number;
	name: string;
	status_mahasiswa: 'calon_mahasiswa' | 'mahasiswa_aktif';
	perguruan_tinggi?: {
		id: number;
		nama: string;
		akronim: string;
	};
	program_studi?: {
		id: number;
		nama: string;
		jenjang: string;
	};
}

export default function IsiSoalIndex({ paket }: { paket: Paket[] }) {
	const { auth } = usePage<{ auth: { user: User } }>().props;
	const user = auth.user;

	const getStatusBadge = (status: string) => {
		if (status === 'mahasiswa_aktif') {
			return <Badge className="bg-green-100 text-green-800">Mahasiswa Aktif</Badge>;
		}
		return <Badge className="bg-blue-100 text-blue-800">Calon Mahasiswa</Badge>;
	};

	return (
		<AppSidebarLayout breadcrumbs={breadcrumbs}>
			<PageLayout>
				<PageHeader 
					title="Pilih Paket Soal"
					subtitle="Pilih paket soal yang ingin Anda kerjakan untuk mengukur minat dan bakat"
				/>
				
				{/* Informasi Status User */}
				<div className="mb-6">
					<Card>
						<CardContent className="p-4">
							<div className="flex items-center justify-between">
								<div>
									<h3 className="text-lg font-semibold text-gray-900">
										Selamat datang, {user.name}!
									</h3>
									<div className="flex items-center gap-2 mt-1">
										{getStatusBadge(user.status_mahasiswa)}
										{user.status_mahasiswa === 'mahasiswa_aktif' && user.perguruan_tinggi && (
											<span className="text-sm text-gray-600">
												• {user.perguruan_tinggi.nama} ({user.perguruan_tinggi.akronim})
											</span>
										)}
										{user.status_mahasiswa === 'mahasiswa_aktif' && user.program_studi && (
											<span className="text-sm text-gray-600">
												• {user.program_studi.jenjang} {user.program_studi.nama}
											</span>
										)}
									</div>
								</div>
								<div className="text-right">
									<p className="text-sm text-gray-600">
										{user.status_mahasiswa === 'mahasiswa_aktif' 
											? 'Paket soal yang ditampilkan disesuaikan dengan program studi Anda'
											: 'Semua paket soal tersedia untuk Anda'
										}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
				
				<PageContent>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{paket.length === 0 ? (
							<Card className="col-span-full">
								<CardContent>
									<div className="text-center py-12">
										<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
											<svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
											</svg>
										</div>
										<h3 className="text-lg font-medium text-gray-900 mb-2">
											{user.status_mahasiswa === 'mahasiswa_aktif' 
												? 'Belum ada paket soal yang relevan'
												: 'Belum ada paket soal tersedia'
											}
										</h3>
										<p className="text-gray-500">
											{user.status_mahasiswa === 'mahasiswa_aktif'
												? 'Silakan hubungi administrator untuk menambahkan paket soal yang sesuai dengan program studi Anda.'
												: 'Silakan hubungi administrator untuk menambahkan paket soal.'
											}
										</p>
									</div>
								</CardContent>
							</Card>
						) : (
							paket.map((p) => (
								<Card key={p.id} className="hover:shadow-lg transition-shadow duration-200">
									<CardContent>
										<div className="flex flex-col gap-4">
											<div>
												<h3 className="font-semibold text-lg text-gray-900 mb-2">{p.nama_paket}</h3>
												<div className="space-y-1">
													<p className="text-gray-500 text-sm">
														Jumlah Soal: {p.jumlah_soal}
													</p>
													<p className="text-gray-500 text-sm">
														Balance Minat: {p.balance_minat}
													</p>
													<p className="text-gray-500 text-sm">
														Balance Bakat: {p.balance_bakat}
													</p>
												</div>
											</div>
											<Link
												href={String(route('user.isi-soal.show', p.id))}
												className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-emerald-700"
											>
												<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
												</svg>
												Kerjakan
											</Link>
										</div>
									</CardContent>
								</Card>
							))
						)}
					</div>
				</PageContent>
			</PageLayout>
		</AppSidebarLayout>
	);
}
