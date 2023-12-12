import { InputLabel, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import GButton from "../../../../components/GButton"
import Map from "./Map"

const FormInput = ({ ...props }) => {
  return (
    <div className={"flex flex-col gap-1"}>
      <InputLabel className='!font-quicksand !font-semibold !text-white'>{props.inputlabel}</InputLabel>
      <div className={"flex gap-2 w-full " + (props.multiline === true ? 'items-start' : 'items-center')}>
        <TextField size='small' variant='outlined' color='secondary' fullWidth sx={{
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
        }} {...props} />
      </div>
    </div>
  )
}

type Props = {
  data: any;
  onChange: (data: any) => void
}

function Step2({ data, onChange }: Props) {
  const [form, setForm] = useState({
    npwp: '',
    coordinate: '',
    luas_tanah: '',
    fungsi_bangunan: ''
  });
  const [map, setMap] = useState<any>({
    show: false,
    lokasi: data.lokasi
  })

  useEffect(() => {
    if (data?.form?.id) {
      setForm({ ...form, ...data.form });
    }
  }, [data?.form?.id]);

  useEffect(() => {
    onChange(form);
  }, [form]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleCoordinate = (coordinate: string) => {
    setMap({ ...map, show: false });
    setForm({ ...form, coordinate: coordinate });
  }

  return (
    <>
      <Map show={map.show} lokasi={form.coordinate != '' ? '' : (data?.lokasi ?? '')} onClose={() => setMap({ ...map, show: false })} coordinate={form.coordinate} onSelect={handleCoordinate} />
      <Typography variant='h4' mb={3} className='!font-quicksand !font-semibold'>Data Formulir</Typography>
      <FormInput inputlabel='Nomor pokok Wajib Pajak' type='text' name='npwp' value={form.npwp} onChange={handleInput} required />
      <div className="flex flex-col gap-1">
        <InputLabel className="!font-quicksand !font-semibold !text-white">Koordinat Geografis yang dimohonkan</InputLabel>
        <div className="flex gap-10 items-center">
          {form.coordinate != '' ?
            <>
              <Typography className="!font-quicksand !font-semibold">COORDINATE: {form.coordinate.split(',').join(', ')}</Typography>
              <GButton onClick={() => setForm({ ...form, coordinate: '' })} color="error">Hapus Koordinat</GButton>
            </>
            : <GButton onClick={() => setMap({ ...map, show: true })}>Ambil Koordinat Geografis</GButton>
          }
        </div>
      </div>
      <FormInput inputlabel='Luas tanah yang dimohonkan (meter persegi/M2)' type='number' name='luas_tanah' value={form.luas_tanah} onChange={handleInput} required />
      <FormInput inputlabel='Fungsi Bangunan' type='text' name='fungsi_bangunan' value={form.fungsi_bangunan} onChange={handleInput} required />
    </>
  )
}

export default Step2