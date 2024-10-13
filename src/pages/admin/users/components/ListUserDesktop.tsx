
import { Button, Pagination, Table, TableBody, TableSortLabel, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Link } from "react-router-dom"
import { formatDate, ucwords } from "../../../../utils/Helpers"

import { OrderType } from "../../../../data/interface/user"

interface ListUserDesktopProps {
  data: any,
  paginate: any,
  setPage: React.Dispatch<React.SetStateAction<any>>,
  setConfirm: React.Dispatch<React.SetStateAction<any>>,
  order: OrderType,
  orderBy: string,
  search: string,
  handleRequestSort: (column: string) => void,
  handleChangeSearch: (search: string) => void,
  handleClickSearch: () => void
}
export default function ListUserDesktop({ data, paginate, setPage, setConfirm, order, orderBy, handleRequestSort, search, handleChangeSearch, handleClickSearch }: ListUserDesktopProps) {

  const columns = [
    { id: 'name', label: 'Nama' },
    { id: 'createdAt', label: 'Tanggal Register' },
    { id: 'role', label: 'Role' },
  ];
  return (
    <>
      <div>

        <div>
          <div className="flex h-11">
            <input className="bg-transparent border border-white w-full rounded-l-lg pl-4" value={search} onChange={(e) => handleChangeSearch(e.target.value)} />
            <button className="cursor-pointer bg-white w-56 text-black rounded-r-lg flex items-center justify-center text-lg" onClick={handleClickSearch}>
              Cari
            </button>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border flex-row mt-4">
          <TableContainer>
            <Table size="small">
              <TableHead className="bg-gdarkgray-500">
                <TableRow>
                  {
                    columns.map((column, index) => (
                      <TableCell
                        align="center"
                        key={column.id}
                        sortDirection={orderBy === column.id ? order : false}
                      >
                        <TableSortLabel
                          active={orderBy === column.id}
                          direction={orderBy === column.id ? order : 'asc'}
                          onClick={() => handleRequestSort(column.id)}
                        >
                          {column.label}
                        </TableSortLabel>
                      </TableCell>
                    ))
                  }
                  <TableCell
                    align="center"

                    key={'action'}
                    width="200px"
                  >
                    <TableSortLabel
                    >
                      Download Form
                    </TableSortLabel>
                  </TableCell>
                  {/* <TableCell className="!font-heebo !text-base" align="center">Nama</TableCell>
                <TableCell className="!font-heebo !text-base" align="center">Tanggal Register</TableCell>
                <TableCell className="!font-heebo !text-base" align="center">Role</TableCell>
                <TableCell className="!font-heebo !text-base" align="center">Aksi</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length > 0 ? data.map((v: any, i: number) => {
                  return <TableRow key={i}>
                    <TableCell className="!border-b-0 !border-t !border-r !border-r-white !border-t-white" align="center">{v.name}</TableCell>
                    <TableCell className="!border-b-0 !border-t !border-t-white !border-r !border-r-white" align="center">{formatDate(v.createdAt, 'DD MM YYYY', 'long')}</TableCell>
                    <TableCell className="!border-b-0 !border-t !border-t-white !border-r !border-r-white" align="center">{ucwords(v.role.toLowerCase())}</TableCell>
                    <TableCell className="!border-b-0 !border-t !border-t-white !border-l !border-l-white w-0" align="center">
                      <div className="flex justify-center gap-1 items-center">
                        <Link to={`/users/${v.uuid}`}>
                          <Button size="small" variant="contained" color="success" className="!py-0.5 !rounded-full !px-5 !text-sm !capitalize !whitespace-nowrap">Lihat Profile</Button>
                        </Link>
                        {/* <Button size="small" variant="contained" color="error" className="!py-0.5 !rounded-full !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => setConfirm({
                          ...confirm,
                          uuid: v.uuid,
                          show: true,
                          title: 'Anda Yakin Ingin Menghapus?',
                          message: `<center>Data user ${v.name} akan terhapus!</cemter>`
                        })}>Hapus</Button> */}
                      </div>
                    </TableCell>
                  </TableRow>
                }) : <TableRow><TableCell colSpan={6} align="center">Data tidak tersedia</TableCell></TableRow>}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="flex justify-center mt-3">
          <Pagination color='secondary' variant="outlined" count={paginate.totalPages} page={paginate.currentPage} onChange={(_, p) => setPage(p)} />
        </div>
      </div>
    </>
  )
}