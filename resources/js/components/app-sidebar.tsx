import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type NavItemOrGroup, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    Folder,
    LayoutGrid,
    PlusCircle,
    FileText,
    History,
    Building2,
    GraduationCap,
    Search,
    Heart,
    BarChart3,
    Database,
    Users,
    Settings,
    Download,
    Upload
} from 'lucide-react';
import AppLogo from './app-logo';
import { route } from '@/lib/route';

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const role = auth.user?.role;

    let mainNavItems: NavItemOrGroup[] = [
        {
            title: 'Dashboard',
            href: route('dashboard') as string,
            icon: LayoutGrid,
        },
    ];

    if (role === 'admin') {
        mainNavItems = [
            ...mainNavItems,
            // Minat Bakat System
            {
                title: 'Minat Bakat',
                items: [
                    { title: 'Soal', href: route('admin.soal.index') as string, icon: PlusCircle },
                    { title: 'Paket Soal', href: route('admin.paket-soal.index') as string, icon: FileText },
                    { title: 'Riwayat Pengisi', href: route('admin.riwayat.index') as string, icon: History },
                ]
            },
            // Research System - Data Management
            {
                title: 'Perguruan Tinggi',
                href: route('admin.perguruan-tinggi.index') as string,
                icon: Building2,
            },
            // Research System - Evaluasi
            {
                title: 'Evaluasi Search Engine',
                items: [
                    { title: 'Daftar Evaluasi', href: route('admin.evaluasi-search-engine.index') as string, icon: Search },
                    { title: 'Statistik Evaluasi', href: route('admin.evaluasi-search-engine.statistics') as string, icon: BarChart3 },
                    { title: 'Export Data', href: route('admin.evaluasi-search-engine.export') as string, icon: Download },
                ]
            },
            // Research System - Minat Program Studi
            {
                title: 'Minat Program Studi',
                items: [
                    { title: 'Daftar Minat', href: route('admin.minat-program-studi.index') as string, icon: Heart },
                    { title: 'Statistik Minat', href: route('admin.minat-program-studi.statistics') as string, icon: BarChart3 },
                    { title: 'Export Data', href: route('admin.minat-program-studi.export') as string, icon: Download },
                ]
            },
            // Research System - Analytics
            // {
            //     title: 'Analisis Penelitian',
            //     items: [
            //         { title: 'Dashboard Penelitian', href: route('admin.penelitian.dashboard') as string, icon: Database },
            //         { title: 'Statistik Penelitian', href: route('admin.penelitian.statistik') as string, icon: BarChart3 },
            //         { title: 'Export Laporan', href: route('admin.penelitian.export') as string, icon: Download },
            //     ]
            // },
        ];
    } else if (role === 'user') {
        mainNavItems = [
            ...mainNavItems,
            // Minat Bakat System for Users
            {
                title: 'Tes Minat Bakat',
                items: [
                    { title: 'Kerjakan Paket Soal', href: route('user.isi-soal.index') as string, icon: FileText },
                    { title: 'Riwayat Tes', href: route('user.riwayat.index') as string, icon: History },
                ]
            },
            // Research System for Users
            {
                title: 'Pencarian Perguruan Tinggi',
                items: [
                    { title: 'Cari Perguruan Tinggi', href: route('user.perguruan-tinggi.index') as string, icon: Building2 },
                    { title: 'Cari Program Studi', href: route('user.program-studi.index') as string, icon: GraduationCap },
                ]
            },
            {
                title: 'Evaluasi & Minat',
                items: [
                    { title: 'Evaluasi Search Engine', href: '/evaluasi-search-engine', icon: Search },
                    { title: 'Minat Program Studi', href: route('user.minat-program-studi.index') as string, icon: Heart },
                ]
            },
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
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
