
import { HomeWhite, HomeYellow } from "../../components/icons/home"
import { DocumentWhite, DocumentYellow } from "../../components/icons/document"
import { CompassWhite, CompassYellow } from "../../components/icons/compass"
import { UserWhite, UserYellow } from "../../components/icons/user"
import { MenuItem, ListMenuItem } from "../interface/menu"
export const publicMenu: MenuItem[] = [
    {
        path: '/permohonan',
        label: 'Beranda',
        iconDefault: HomeYellow,
        iconActive: HomeWhite
    },
    {
        path: '/petunjuk-permohonan',
        label: 'Petunjuk Permohonan',
        iconDefault: DocumentYellow,
        iconActive: DocumentWhite
    },
    {
        path: '/tentang-krk',
        label: 'Tentang KRK',
        iconDefault: CompassYellow,
        iconActive: CompassWhite
    }
]

export const publicListMenu: ListMenuItem[] = [
    {
        path: '/permohonan',
        label: 'Pantau Permohonan',
    },
    {
        path: '/petunjuk-permohonan',
        label: 'Petunjuk Permohonan',
    },
    {
        path: '/tentang-krk',
        label: 'Tentang KRK',
    }
]

export const publicNoAuthListMenu: MenuItem[] = [
    {
        path: '/pantau',
        label: 'Pantau Permohonan',
        iconDefault: HomeYellow,
        iconActive: HomeWhite
    },
    {
        path: '/petunjuk-permohonan',
        label: 'Petunjuk Permohonan',
        iconDefault: DocumentYellow,
        iconActive: DocumentWhite
    },
    {
        path: '/tentang-krk',
        label: 'Tentang KRK',
        iconDefault: CompassYellow,
        iconActive: CompassWhite
    }
]

export const privateMenu = [
    {
        path: '/permohonan',
        label: 'Beranda',
        iconDefault: HomeYellow,
        iconActive: HomeWhite
    },
    {
        path: '/statistik',
        label: 'Statistik',
        iconDefault: DocumentYellow,
        iconActive: DocumentWhite
    },
    {
        path: '/users',
        label: 'User',
        iconDefault: UserYellow,
        iconActive: UserWhite
    }
]

export const privateListMenu = [
    {
        path: '/permohonan',
        label: 'Pantau Permohonan',
        iconDefault: HomeYellow,
        iconActive: HomeWhite
    },
    {
        path: '/statistik',
        label: 'Statistik',
        iconDefault: DocumentYellow,
        iconActive: DocumentWhite
    },
    {
        path: '/users',
        label: 'User',
        iconDefault: UserYellow,
        iconActive: UserWhite
    }
]