import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { useForm } from '@inertiajs/react';
import { route } from '@/lib/route';
import { FormEvent, useState } from 'react';

const breadcrumbs = [
	{ title: 'Dashboard', href: String(route('dashboard')) },
	{ title: 'Soal', href: String(route('admin.soal.index')) },
	{ title: 'Tambah Soal', href: String(route('admin.soal.create')) },
];

interface FormErrors {
	text_soal?: string;
	bobot_minat?: string;
	bobot_bakat?: string;
}

export default function SoalCreate() {
	const { data, setData, post, errors, processing } = useForm({
		text_soal: '',
		bobot_minat: 0,
		bobot_bakat: 0,
	});

	const [localErrors, setLocalErrors] = useState<FormErrors>({});

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};

		if (!data.text_soal.trim()) {
			newErrors.text_soal = 'Teks soal wajib diisi';
		} else if (data.text_soal.trim().length < 10) {
			newErrors.text_soal = 'Teks soal minimal 10 karakter';
		}

		if (![1, 0, -1].includes(data.bobot_minat)) {
			newErrors.bobot_minat = 'Bobot minat harus -1, 0, atau 1';
		}

		if (![1, 0, -1].includes(data.bobot_bakat)) {
			newErrors.bobot_bakat = 'Bobot bakat harus -1, 0, atau 1';
		}

		setLocalErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			post(String(route('admin.soal.store')));
		}
	};

	const getBobotLabel = (value: number): string => {
		switch (value) {
			case -1: return 'Sangat Tidak Setuju';
			case 0: return 'Netral';
			case 1: return 'Sangat Setuju';
			default: return '';
		}
	};

	return (
		<AppSidebarLayout breadcrumbs={breadcrumbs}>
			<div className="max-w-4xl mx-auto">
				<div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
					<div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
						<h1 className="text-2xl font-bold text-white flex items-center gap-3">
							<div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
								<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
								</svg>
							</div>
							Tambah Soal Baru
						</h1>
						<p className="text-blue-100 mt-2">Buat soal baru untuk sistem penilaian minat dan bakat</p>
					</div>

					<form onSubmit={handleSubmit} className="p-8 space-y-8">
						{/* Text Soal */}
						<div className="space-y-2">
							<label className="block text-sm font-semibold text-gray-700 mb-3">
								Teks Soal <span className="text-red-500">*</span>
							</label>
							<div className="relative">
								<textarea
									placeholder="Masukkan teks soal yang akan ditampilkan kepada peserta..."
									value={data.text_soal}
									onChange={(e) => {
										setData('text_soal', e.target.value);
										if (localErrors.text_soal) {
											setLocalErrors(prev => ({ ...prev, text_soal: undefined }));
										}
									}}
									rows={4}
									className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none resize-none ${
										(errors.text_soal || localErrors.text_soal)
											? 'border-red-300 focus:border-red-500 bg-red-50'
											: 'border-gray-200 focus:border-blue-500 bg-gray-50 focus:bg-white'
									}`}
								/>
								<div className="absolute bottom-3 right-3 text-xs text-gray-400">
									{data.text_soal.length}/500
								</div>
							</div>
							{(errors.text_soal || localErrors.text_soal) && (
								<div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">
									<svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
									</svg>
									{errors.text_soal || localErrors.text_soal}
								</div>
							)}
						</div>

						<div className="grid md:grid-cols-2 gap-8">
							{/* Bobot Minat */}
							<div className="space-y-3">
								<label className="block text-sm font-semibold text-gray-700">
									Bobot Minat <span className="text-red-500">*</span>
								</label>
								<div className="space-y-3">
									{[-1, 0, 1].map((value) => (
										<label key={value} className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 group">
											<input
												type="radio"
												name="bobot_minat"
												value={value}
												checked={data.bobot_minat === value}
												onChange={(e) => {
													setData('bobot_minat', parseInt(e.target.value));
													if (localErrors.bobot_minat) {
														setLocalErrors(prev => ({ ...prev, bobot_minat: undefined }));
													}
												}}
												className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
											/>
											<div className="ml-3 flex-1">
												<div className="flex items-center justify-between">
													<span className="font-medium text-gray-900">{value}</span>
													<div className={`px-3 py-1 rounded-full text-xs font-medium ${
														value === 1 ? 'bg-green-100 text-green-800' :
														value === 0 ? 'bg-gray-100 text-gray-800' :
														'bg-red-100 text-red-800'
													}`}>
														{getBobotLabel(value)}
													</div>
												</div>
											</div>
										</label>
									))}
								</div>
								{(errors.bobot_minat || localErrors.bobot_minat) && (
									<div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">
										<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
											<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
										</svg>
										{errors.bobot_minat || localErrors.bobot_minat}
									</div>
								)}
							</div>

							{/* Bobot Bakat */}
							<div className="space-y-3">
								<label className="block text-sm font-semibold text-gray-700">
									Bobot Bakat <span className="text-red-500">*</span>
								</label>
								<div className="space-y-3">
									{[-1, 0, 1].map((value) => (
										<label key={value} className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 group">
											<input
												type="radio"
												name="bobot_bakat"
												value={value}
												checked={data.bobot_bakat === value}
												onChange={(e) => {
													setData('bobot_bakat', parseInt(e.target.value));
													if (localErrors.bobot_bakat) {
														setLocalErrors(prev => ({ ...prev, bobot_bakat: undefined }));
													}
												}}
												className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
											/>
											<div className="ml-3 flex-1">
												<div className="flex items-center justify-between">
													<span className="font-medium text-gray-900">{value}</span>
													<div className={`px-3 py-1 rounded-full text-xs font-medium ${
														value === 1 ? 'bg-green-100 text-green-800' :
														value === 0 ? 'bg-gray-100 text-gray-800' :
														'bg-red-100 text-red-800'
													}`}>
														{getBobotLabel(value)}
													</div>
												</div>
											</div>
										</label>
									))}
								</div>
								{(errors.bobot_bakat || localErrors.bobot_bakat) && (
									<div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">
										<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
											<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
										</svg>
										{errors.bobot_bakat || localErrors.bobot_bakat}
									</div>
								)}
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
							<button
								type="button"
								onClick={() => window.history.back()}
								className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
							>
								Batal
							</button>
							<button
								type="submit"
								disabled={processing}
								className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center gap-2"
							>
								{processing && (
									<svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
								)}
								{processing ? 'Menyimpan...' : 'Simpan Soal'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</AppSidebarLayout>
	);
}
