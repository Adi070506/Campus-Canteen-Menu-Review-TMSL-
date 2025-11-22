'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { signOut } from '@/lib/auth-helpers'
import { LogOut, User } from 'lucide-react'

interface UserMenuProps {
    user: {
        email: string
        profile: {
            full_name: string
            role: string
        } | null
    }
}

export function UserMenu({ user }: UserMenuProps) {
    const initials = user.profile?.full_name
        ?.split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase() || user.email[0].toUpperCase()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.profile?.full_name || 'User'}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        {user.profile?.role && (
                            <p className="text-xs leading-none text-muted-foreground capitalize mt-1">
                                {user.profile.role}
                            </p>
                        )}
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <form action={signOut}>
                        <button type="submit" className="flex w-full items-center">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Sign out</span>
                        </button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
