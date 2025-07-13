import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type NavItemOrGroup } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItemOrGroup[] }) {
    const page = usePage();
    
    return (
        <>
            {items.map((item) => {
                // Check if item is a group
                if ('items' in item) {
                    return (
                        <SidebarGroup key={item.title} className="px-2 py-0">
                            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                            <SidebarMenu>
                                {item.items.map((subItem) => (
                                    <SidebarMenuItem key={subItem.title}>
                                        <SidebarMenuButton 
                                            asChild 
                                            isActive={page.url.startsWith(subItem.href)} 
                                            tooltip={{ children: subItem.title }}
                                        >
                                            <Link href={subItem.href} prefetch>
                                                {subItem.icon && <subItem.icon />}
                                                <span>{subItem.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroup>
                    );
                }
                
                // Regular nav item
                return (
                    <SidebarGroup key={item.title} className="px-2 py-0">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton 
                                    asChild 
                                    isActive={page.url.startsWith(item.href)} 
                                    tooltip={{ children: item.title }}
                                >
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                );
            })}
        </>
    );
}
