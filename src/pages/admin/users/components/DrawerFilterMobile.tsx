import { useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
function DrawerFilterMobile() {

    const [isOpenFilter, setIsOpenFilter] = useState(false)

    const toggleDrawer =
        (state: boolean) => {
            setIsOpenFilter(state)
        };

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
                {['Nama', 'Tanggal', 'Jenis Akun'].map((text, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton>
                            <div className='bg-[#4D4D4D] rounded-xl text-white p-3 flex items-center justify-center w-full'>
                                <ListItemText className='flex items-center justify-center' primary={text} />

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
    return (
        <Fragment key={'bottom'}>
            <Button onClick={() => toggleDrawer(true)}>Tanggal</Button>
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

export default DrawerFilterMobile