import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLogoIcon from '@/components/app-logo-icon';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={route('home')} className="flex items-center space-x-2">
            <AppLogoIcon className="h-8 w-8 fill-current text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Minat Bakat App</span>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#beranda" className="text-gray-600 hover:text-gray-900 font-medium">
              Beranda
            </Link>
            <Link href="#tentang" className="text-gray-600 hover:text-gray-900 font-medium">
              Tentang
            </Link>
            <Link href="#layanan" className="text-gray-600 hover:text-gray-900 font-medium">
              Layanan
            </Link>
            <Link href="#kontak" className="text-gray-600 hover:text-gray-900 font-medium">
              Kontak
            </Link>
          </div>
          
          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost">
              <Link href={route('login')}>
                Masuk
              </Link>
            </Button>
            <Button asChild>
              <Link href={route('register')}>
                Daftar
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
