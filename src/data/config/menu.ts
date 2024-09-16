import { Home,Description,Explore } from "@mui/icons-material"
import { MenuItem } from "../interface/menu"
export const publicMenu:MenuItem[]=[
    {
        path :'/permohonan',
        label:'Beranda',
        icon:Home
    },
    {
        path :'/petunjuk-permohonan',
        label:'Petunjuk Permohonan',
        icon:Description
    },
    {
        path :'/tentang-krk',
        label:'Tentang KRK',
        icon:Explore
    }
]

export const privateMenu=[
    {
        path :'/permohonan',
        label:'Beranda',
        icon:Home
    },
    {
        path :'/statistik',
        label:'Statistik',
        icon:Description
    },
    {
        path :'/users',
        label:'User',
        icon:Explore
    }
]