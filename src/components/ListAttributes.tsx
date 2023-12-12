import { Search } from '@mui/icons-material';
import { MenuItem, OutlinedInput, Select } from '@mui/material';
import type { FC } from 'react';
import { useState, useEffect } from 'react';

interface ReturnValue {
  perPage: number,
  search: string
}

interface ListAttributesProps {
  onChange: (object: ReturnValue) => void
}

let tm: ReturnType<typeof setTimeout>;
const ListAttributes: FC<ListAttributesProps> = ({ onChange }) => {
  const countList = [10, 30, 50, 100, 500, 1000];
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');

  useEffect(() => {
    clearTimeout(tm);
    tm = setTimeout(() => {
      onChange({ perPage: perPage, search: search });
    }, 500);
  }, [perPage, search])

  return (
    <div className="flex flex-col md:flex-row items-center gap-2 justify-end">
      <Select variant='outlined' color='secondary' size='small' value={perPage} onChange={e => setPerPage(Number(e.target.value))} className='!rounded-xl' sx={{
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
        },
      }}>
        {countList.map(l => {
          return <MenuItem key={l} value={l}>{l}</MenuItem>
        })}
      </Select>
      <OutlinedInput type='search' color='secondary' size='small' placeholder='Cari data' endAdornment={<Search />} onChange={e => setSearch(e.target.value)} className='!rounded-xl' sx={{
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
        },
      }} />
    </div>
  );
}

export default ListAttributes;
