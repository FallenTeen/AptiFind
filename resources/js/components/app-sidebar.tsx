import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, PlusCircle, FileText, History } from 'lucide-react';
import AppLogo from './app-logo';
import { route } from '@/lib/route';

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const role = auth.user?.role;

    let mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard') as string,
            icon: LayoutGrid,
        },
    ];

    if (role === 'admin') {
        mainNavItems = [
            ...mainNavItems,
            { title: 'Soal', href: route('admin.soal.index') as string, icon: PlusCircle },
            { title: 'Paket Soal', href: route('admin.paket-soal.index') as string, icon: FileText },
            { title: 'Riwayat Pengisi', href: route('admin.riwayat.index') as string, icon: History },
        ];
    } else if (role === 'user') {
        mainNavItems = [
            ...mainNavItems,
            { title: 'Riwayat', href: route('user.riwayat.index') as string, icon: History },
            { title: 'Kerjakan Paket Soal', href: route('user.isi-soal.index') as string, icon: FileText },
        ];
    }

    const footerNavItems: NavItem[] = [
        {
            title: 'Repository',
            href: 'https://github.com/laravel/react-starter-kit',
            icon: Folder,
        },
        {
            title: 'Documentation',
            href: 'https://laravel.com/docs/starter-kits#react',
            icon: BookOpen,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild size="lg">
                            <Link href={route('dashboard') as string} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
