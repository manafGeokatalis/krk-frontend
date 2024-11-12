import { Autocomplete, InputLabel, TextField, Typography } from "@mui/material"
import { useState } from "react"
import GButton from "../../../../components/GButton"
import Map from "./Map"

const FormInput = ({ ...props }) => {
  return (
    <div className={"flex  gap-10"}>
      <InputLabel className='!font-quicksand w-5/12 !font-semibold !text-white'>{props.inputlabel}</InputLabel>
      <div className={"flex gap-2 w-full " + (props.multiline === true ? 'items-start' : 'items-center')}>
        <span className='font-semibold font-quicksand'>:</span>
        <TextField size='small' variant='outlined' color='secondary' fullWidth sx={{
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
        }} {...props} />
      </div>
    </div>
  )
}

const FormSelect = ({ ...props }) => {
  return (
    <div className="flex gap-10 items-center">
      <InputLabel className='!font-quicksand w-5/12 !font-semibold !text-white'>{props.inputlabel}</InputLabel>
      <div className="flex gap-2 items-center w-full">
        <span className='font-semibold font-quicksand'>:</span>
        <Autocomplete size='small' color='secondary' fullWidth sx={{
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
        }}
          disableClearable
          renderInput={(params) => <TextField {...params} label={props.placeholder ?? 'Pilih'} required={props.required} />}
          options={props.options}
          {...props} />
      </div>
    </div>
  )
}

type Props = {
  data: any;
  handleUpdateForm: (key: string, value: string) => void;
}

function Step2({ data, handleUpdateForm }: Props) {
  const FUNGSI_BANGUNAN = [{
    id: 'Fungsi Hunian',
    name: "Fungsi Hunian"
  }, {
    id: 'Fungsi Keagamaan',
    name: "Fungsi Keagamaan"
  }, {
    id: 'Fungsi Usaha',
    name: "Fungsi Usaha"
  }, {
    id: 'Fungsi Social dan Budaya',
    name: "Fungsi Social dan Budaya"
  }, {
    id: 'Fungsi Khusus',
    name: "Fungsi Khusus"
  }, {
    id: 'FUNGSI_LAINNYA',
    name: "Fungsi Lainnya"
  }]

  const STATUS_TANAH = [{
    id: 'Sertifikat Hak Milik (SHM)',
    name: "Sertifikat Hak Milik (SHM)"
  }, {
    id: 'Sertifikat Hak Guna Bangunan (HGB)',
    name: "Sertifikat Hak Guna Bangunan (HGB)"
  }, {
    id: 'Sertifikat Hak Guna Usaha (HGU)',
    name: "Sertifikat Hak Guna Usaha (HGU)"
  }, {
    id: 'Sertifikat Hak Atas Satuan Rumah Susun (SHSRS)',
    name: "Sertifikat Hak Atas Satuan Rumah Susun (SHSRS)"
  }, {
    id: 'Tanah Girik',
    name: "Tanah Girik"
  }, {
    id: 'STATUS_TANAH_LAINNYA',
    name: "Status Tanah Lainnya"
  }]
  const FUNGSI_BANGUNAN_LAINNYA = 'FUNGSI_LAINNYA'
  const STATUS_TANAH_LAINNYA = 'STATUS_TANAH_LAINNYA'
  const form = data
  // const [form, setForm] = useState({
  //   npwp: '',
  //   coordinate: '',
  //   luas_tanah: '',
  //   fungsi_bangunan: ''
  // });
  const [map, setMap] = useState<any>({
    show: false,
    lokasi: data.lokasi
  })

  const [selectBangunan, setSelectBangunan] = useState(getIdBangunanOrDefault(form.fungsi_bangunan))
  const [selectTanah, setSelectTanah] = useState(getIdStatusTanahOrDefault(form.status_tanah))






  // useEffect(() => {
  //   if (data?.form?.id) {
  //     setForm({ ...form, ...data.form });
  //   }
  // }, [data?.form?.id]);

  // useEffect(() => {
  //   onChange(form);
  // }, [form]);

  function getIdBangunanOrDefault(id: string) {
    if (id && id.length > 0) {
      const found = FUNGSI_BANGUNAN.find(fungsi => fungsi.id === id);
      return found ? found.id : FUNGSI_BANGUNAN_LAINNYA;
    } else {
      return ''
    }
  }

  function getIdStatusTanahOrDefault(id: string) {
    if (id && id.length > 0) {
      const found = STATUS_TANAH.find(tanah => tanah.id === id);
      return found ? found.id : STATUS_TANAH_LAINNYA;
    } else {
      return ''
    }
  }
  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUpdateForm(e.target.name, e.target.value)
  }

  const handleCoordinate = (coordinate: string) => {
    setMap({ ...map, show: false });
    handleUpdateForm('coordinate', coordinate);
  }
  return (
    <>
      <Map show={map.show} lokasi={form.coordinate != '' ? '' : (data?.lokasi ?? '')} onClose={() => setMap({ ...map, show: false })} coordinate={form.coordinate} onSelect={handleCoordinate} />
      <Typography variant='h4' mb={3} className='!font-quicksand !font-semibold'>Data Formulir</Typography>
      {/* <FormInput inputlabel='Nomor pokok Wajib Pajak' type='text' name='npwp' value={form.npwp} onChange={handleInput} required /> */}
      <div className="flex flex-col gap-1 mb-4">
        <InputLabel className="!font-quicksand !font-semibold !text-white">Koordinat Geografis yang dimohonkan</InputLabel>
        <div className="flex gap-10 items-center">
          {form?.coordinate && form.coordinate != '' ?
            <>
              <Typography className="!font-quicksand !font-semibold">COORDINATE: {form.coordinate.split(',').join(', ')}</Typography>
              <GButton onClick={() => handleUpdateForm('coordinate', '')} color="error">Hapus Koordinat</GButton>
            </>
            : <GButton onClick={() => setMap({ ...map, show: true })}>Ambil Koordinat Geografis</GButton>
          }
        </div>
      </div>
      <FormSelect clas inputlabel='Pilih Fungsi Bangunan' name='fungsi_bangunan'
        placeholder='Pilih Fungsi Bangunan'
        options={FUNGSI_BANGUNAN}
        getOptionLabel={(obj: any) => obj.name}
        value={selectBangunan ? FUNGSI_BANGUNAN.filter((obj: any) => obj.id == selectBangunan)[0] ?? null : null}
        onChange={(_e: React.ChangeEvent<HTMLSelectElement>, value: any) => {
          // setForm({ ...form, lokasi_desa_id: value.id });
          // handleUpdateForm('fungsi_bangunan', value.id)
          setSelectBangunan(value.id)
          if (value.id !== FUNGSI_BANGUNAN_LAINNYA) {
            handleUpdateForm('fungsi_bangunan', value.id)
          } else {
            handleUpdateForm('fungsi_bangunan', '')

          }

        }} required />
      <div className={selectBangunan !== FUNGSI_BANGUNAN_LAINNYA ? 'hidden' : ''}>
        <FormInput disabled={selectBangunan !== FUNGSI_BANGUNAN_LAINNYA} inputlabel='Fungsi Bangunan Lainnya' type='text' name='fungsi_bangunan' value={form.fungsi_bangunan} onChange={handleFormInput} required />
      </div>

      <FormSelect clas inputlabel='Pilih Status Tanah' name='status_tanah'
        placeholder='Pilih Status Tanah'
        options={STATUS_TANAH}
        getOptionLabel={(obj: any) => obj.name}
        value={selectTanah ? STATUS_TANAH.filter((obj: any) => obj.id == selectTanah)[0] ?? null : null}
        onChange={(_e: React.ChangeEvent<HTMLSelectElement>, value: any) => {
          // setForm({ ...form, lokasi_desa_id: value.id });
          // handleUpdateForm('fungsi_bangunan', value.id)
          setSelectTanah(value.id)
          if (value.id !== STATUS_TANAH_LAINNYA) {
            handleUpdateForm('status_tanah', value.id)
          } else {
            handleUpdateForm('status_tanah', '')

          }

        }} required />
      <div className={selectTanah !== STATUS_TANAH_LAINNYA ? 'hidden' : ''}>
        <FormInput disabled={selectTanah !== STATUS_TANAH_LAINNYA} inputlabel='Status Tanah Lainnya' type='text' name='status_tanah' value={form.status_tanah} onChange={handleFormInput} required />
      </div>

      {/* <FormInput inputlabel='Luas tanah yang dimohonkan (meter persegi/M2)' type='number' name='luas_tanah' value={form.luas_tanah} onChange={handleInput} required /> */}
    </>
  )
}

export default Step2