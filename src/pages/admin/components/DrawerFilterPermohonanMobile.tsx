import { useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

interface DrawerFilterPermohonanMobileProps {
    orderBy: string,
    handleChangeOrderBy: (orderBy: string) => void
}
function DrawerFilterPermohonanMobile(props: DrawerFilterPermohonanMobileProps) {
    const { orderBy, handleChangeOrderBy } = props

    const [isOpenFilter, setIsOpenFilter] = useState(false)

    const toggleDrawer =
        (state: boolean) => {
            setIsOpenFilter(state)
        };

    const columns = [
        { id: 'created_at', label: 'Tanggal' },
        { id: 'name', label: 'Nama Pemohon' },
        // { id: 'step', label: 'Tahap Permohonan' },
    ];

    const list = () => (
        <Box
            className="!bg-[#B3B3B3]"
            role="presentation"
            onClick={() => toggleDrawer(false)}
            onKeyDown={() => toggleDrawer(false)}
        >
            <div className='flex items-center font-semibold text-xl pt-4 text-[#666666] justify-center'>
                Urutkan berdasarkan
            </div>
            <List>
                {columns.map((col, index) => (
                    <ListItem key={index} disablePadding onClick={() => handleChangeOrderBy(col.id)}>
                        <ListItemButton>
                            <div className={`${col.id === orderBy ? 'bg-white text-[#4D4D4D]' : 'bg-[#4D4D4D] text-white'} rounded-xl  p-3 flex items-center justify-center w-full`}>
                                <ListItemText className='flex items-center justify-center' primary={col.label} />

                            </div>
                            {/* <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon> */}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </Box>
    );

    function getLabelOrderBy(value: string) {
        const findOrderBy = columns.find(col => col.id == value)
        return findOrderBy?.label
    }
    return (
        <Fragment key={'bottom'}>
            <Button onClick={() => toggleDrawer(true)}>{getLabelOrderBy(orderBy)}</Button>
            <SwipeableDrawer
                anchor={'bottom'}
                open={isOpenFilter}
                onClose={() => toggleDrawer(false)}
                onOpen={() => toggleDrawer(true)}
            >
                {list()}
            </SwipeableDrawer>
        </Fragment>
    )
}

export default DrawerFilterPermohonanMobile