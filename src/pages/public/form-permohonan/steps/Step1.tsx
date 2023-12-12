import { Autocomplete, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { notification } from '../../../../utils/Recoils';
import { createNotifcation } from '../../../../utils/Helpers';

const FormInput = ({ ...props }) => {
  return (
    <div className={"flex gap-10 " + (props.multiline === true ? 'items-start' : 'items-center')}>
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
  data?: any;
  onChange: (data: any) => void
}

function Step1({ onChange, data }: Props) {
  const [form, setForm] = useState<any>({
    name: '',
    email: '',
    wa: '',
    wa_kuasa: '',
    provinsi_id: null,
    kabupaten_id: null,
    kecamatan_id: null,
    desa_id: null,
    alamat: '',
    lokasi_provinsi_id: null,
    lokasi_kabupaten_id: null,
    lokasi_kecamatan_id: null,
    lokasi_desa_id: null,
    lokasi_alamat: '',
  });
  const [provinsi, setProvinsi] = useState<any>([]);
  const [kabupaten, setKabupaten] = useState<any>([]);
  const [kecamatan, setKecamatan] = useState<any>([]);
  const [kelurahan, setKelurahan] = useState<any>([]);
  const [lokasiprovinsi, setLokasiProvinsi] = useState<any>([]);
  const [lokasikabupaten, setLokasiKabupaten] = useState<any>([]);
  const [lokasikecamatan, setLokasiKecamatan] = useState<any>([]);
  const [lokasikelurahan, setLokasiKelurahan] = useState<any>([]);
  const [lokasi, setLokasi] = useState('');
  const [_N, setN] = useRecoilState(notification);

  useEffect(() => {
    getProvinsi();
  }, []);
  useEffect(() => {
    if (data?.id) {
      setForm({ ...form, ...data });
    }
  }, [data?.id]);

  useEffect(() => {
    onChange({ form, lokasi });
  }, [form, lokasi]);

  useEffect(() => {
    if (form.provinsi_id) {
      getKabupaten(form.provinsi_id);
    }
  }, [form.provinsi_id])
  useEffect(() => {
    if (form.kabupaten_id) {
      getKecamatan(form.kabupaten_id);
    }
  }, [form.kabupaten_id])
  useEffect(() => {
    if (form.kecamatan_id) {
      getKelurahan(form.kecamatan_id);
    }
  }, [form.kecamatan_id])
  useEffect(() => {
    if (form.lokasi_provinsi_id && lokasiprovinsi.length > 0) {
      getKabupaten(form.lokasi_provinsi_id, true);
      const lokasiName = lokasiprovinsi.filter((obj: any) => obj.id == form.lokasi_provinsi_id)[0]?.name;
      if (lokasiName) {
        setLokasi(lokasiName);
      }
    }
  }, [lokasiprovinsi.length, form.lokasi_provinsi_id])
  useEffect(() => {
    if (form.lokasi_kabupaten_id && lokasikabupaten.length > 0) {
      getKecamatan(form.lokasi_kabupaten_id, true);
      const lokasiName = lokasikabupaten.filter((obj: any) => obj.id == form.lokasi_kabupaten_id)[0]?.name;
      if (lokasiName) {
        setLokasi(lokasi + ',' + lokasiName);
      }
    }
  }, [lokasikabupaten.length, form.lokasi_kabupaten_id])
  useEffect(() => {
    if (form.lokasi_kecamatan_id && lokasikecamatan.length > 0) {
      getKelurahan(form.lokasi_kecamatan_id, true);
      const lokasiName = lokasikecamatan.filter((obj: any) => obj.id == form.lokasi_kecamatan_id)[0]?.name;
      if (lokasiName) {
        setLokasi(lokasi + ',' + lokasiName);
      }
    }
  }, [lokasikecamatan.length, form.lokasi_kecamatan_id])
  useEffect(() => {
    if (form.lokasi_desa_id && lokasikelurahan.length > 0) {
      const lokasiName = lokasikelurahan.filter((obj: any) => obj.id == form.lokasi_desa_id)[0]?.name;
      if (lokasiName) {
        setLokasi(lokasi + ',' + lokasiName);
      }
    }
  }, [lokasikelurahan.length, form.lokasi_desa_id])

  const getProvinsi = async () => {
    try {
      const res: any = await axios.get('/location/provinsi');
      const convertName = res?.data?.data.map((obj: any) => {
        return { ...obj, name: obj.name.toUpperCase() };
      });
      setProvinsi(convertName);
      setLokasiProvinsi(convertName);
    } catch (error: any) {
      setN(createNotifcation(error.message));
    }
  }
  const getKabupaten = async (provinsi_id: any, lokasi = false) => {
    try {
      const res: any = await axios.get(`/location/kabupaten/${provinsi_id}`);
      if (!lokasi) {
        setKabupaten(res?.data?.data.map((obj: any) => {
          return { ...obj, name: obj.name.toUpperCase() };
        }));
      } else {
        setLokasiKabupaten(res?.data?.data.map((obj: any) => {
          return { ...obj, name: obj.name.toUpperCase() };
        }));
      }
    } catch (error: any) {
      setN(createNotifcation(error.message));
    }
  }
  const getKecamatan = async (kabupaten_id: any, lokasi = false) => {
    try {
      const res: any = await axios.get(`/location/kecamatan/${kabupaten_id}`);
      if (!lokasi) {
        setKecamatan(res?.data?.data.map((obj: any) => {
          return { ...obj, name: obj.name.toUpperCase() };
        }));
      } else {
        setLokasiKecamatan(res?.data?.data.map((obj: any) => {
          return { ...obj, name: obj.name.toUpperCase() };
        }));
      }
    } catch (error: any) {
      setN(createNotifcation(error.message));
    }
  }
  const getKelurahan = async (kecamatan_id: any, lokasi = false) => {
    try {
      const res: any = await axios.get(`/location/kelurahan/${kecamatan_id}`);
      if (!lokasi) {
        setKelurahan(res?.data?.data.map((obj: any) => {
          return { ...obj, name: obj.name.toUpperCase() };
        }));
      } else {
        setLokasiKelurahan(res?.data?.data.map((obj: any) => {
          return { ...obj, name: obj.name.toUpperCase() };
        }));
      }
    } catch (error: any) {
      setN(createNotifcation(error.message));
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <>
      <Typography variant='h4' mb={1} className='!font-quicksand !font-semibold'>Data Pemohon</Typography>
      <FormInput inputlabel='Nama Pemohon*' type='text' name='name' value={form.name} onChange={handleInput} required />
      <FormInput inputlabel='Email Pemohon*' type='email' name='email' value={form.email} onChange={handleInput} required />
      <FormInput inputlabel='Whatsapp*' type='tel' name='wa' value={form.wa} onChange={handleInput} required />
      <FormInput inputlabel='Whatsapp kuasa' type='tel' name='wa_kuasa' value={form.wa_kuasa} onChange={handleInput} />
      <FormSelect inputlabel='Provinsi*' name='provinsi_id'
        placeholder='Pilih Provinsi'
        options={provinsi}
        getOptionLabel={(obj: any) => obj.name}
        value={form.provinsi_id ? provinsi.filter((obj: any) => obj.id == form.provinsi_id)[0] ?? null : null}
        onChange={(_e: React.ChangeEvent<HTMLSelectElement>, value: any) => {
          setForm({ ...form, provinsi_id: value.id, kabupaten_id: null, kecamatan_id: null, desa_id: null });
          setKabupaten([]);
          setKecamatan([]);
          setKelurahan([]);
        }} disabled={provinsi.length == 0} required />
      <FormSelect inputlabel='Kabupaten/Kota*' name='kabupaten_id'
        placeholder='Pilih Kabupaten/Kota'
        options={kabupaten}
        getOptionLabel={(obj: any) => obj.name}
        value={form.kabupaten_id ? kabupaten.filter((obj: any) => obj.id == form.kabupaten_id)[0] ?? null : null}
        onChange={(_e: React.ChangeEvent<HTMLSelectElement>, value: any) => {
          setForm({ ...form, kabupaten_id: value.id, kecamatan_id: null, desa_id: null });
          setKecamatan([]);
          setKelurahan([]);
        }} disabled={kabupaten.length == 0} required />
      <FormSelect inputlabel='Kecamatan*' name='kecamatan_id'
        placeholder='Pilih Kecamatan'
        options={kecamatan}
        getOptionLabel={(obj: any) => obj.name}
        value={form.kecamatan_id ? kecamatan.filter((obj: any) => obj.id == form.kecamatan_id)[0] ?? null : null}
        onChange={(_e: React.ChangeEvent<HTMLSelectElement>, value: any) => {
          setForm({ ...form, kecamatan_id: value.id, desa_id: null });
          setKelurahan([]);
        }} disabled={kecamatan.length == 0} required />
      <FormSelect inputlabel='Desa/Kelurahan*' name='desa_id'
        placeholder='Pilih Desa/Kelurahan'
        options={kelurahan}
        getOptionLabel={(obj: any) => obj.name}
        value={form.desa_id ? kelurahan.filter((obj: any) => obj.id == form.desa_id)[0] ?? null : null}
        onChange={(_e: React.ChangeEvent<HTMLSelectElement>, value: any) => {
          setForm({ ...form, desa_id: value.id });
        }} disabled={kelurahan.length == 0} required />
      <FormInput inputlabel='Alamat' multiline rows={4} name='alamat' value={form.alamat} onChange={handleInput} />
      <Typography variant='h4' mb={1} className='!font-quicksand !font-semibold'>Lokasi Izin</Typography>
      <FormSelect inputlabel='Provinsi*' name='lokasi_provinsi_id'
        placeholder='Pilih Provinsi'
        options={lokasiprovinsi}
        getOptionLabel={(obj: any) => obj.name}
        value={form.lokasi_provinsi_id ? lokasiprovinsi.filter((obj: any) => obj.id == form.lokasi_provinsi_id)[0] ?? null : null}
        onChange={(_e: React.ChangeEvent<HTMLSelectElement>, value: any) => {
          setForm({ ...form, lokasi_provinsi_id: value.id, lokasi_kabupaten_id: null, lokasi_kecamatan_id: null, lokasi_desa_id: null });
          setLokasiKabupaten([]);
          setLokasiKecamatan([]);
          setLokasiKelurahan([]);
        }} disabled={lokasiprovinsi.length == 0} required />
      <FormSelect inputlabel='Kabupaten/Kota*' name='lokasi_kabupaten_id'
        placeholder='Pilih Kabupaten/Kota'
        options={lokasikabupaten}
        getOptionLabel={(obj: any) => obj.name}
        value={form.lokasi_kabupaten_id ? lokasikabupaten.filter((obj: any) => obj.id == form.lokasi_kabupaten_id)[0] ?? null : null}
        onChange={(_e: React.ChangeEvent<HTMLSelectElement>, value: any) => {
          setForm({ ...form, lokasi_kabupaten_id: value.id, lokasi_kecamatan_id: null, lokasi_desa_id: null });
          setLokasiKecamatan([]);
          setLokasiKelurahan([]);
        }} disabled={lokasikabupaten.length == 0} required />
      <FormSelect inputlabel='Kecamatan*' name='lokasi_kecamatan_id'
        placeholder='Pilih Kecamatan'
        options={lokasikecamatan}
        getOptionLabel={(obj: any) => obj.name}
        value={form.lokasi_kecamatan_id ? lokasikecamatan.filter((obj: any) => obj.id == form.lokasi_kecamatan_id)[0] ?? null : null}
        onChange={(_e: React.ChangeEvent<HTMLSelectElement>, value: any) => {
          setForm({ ...form, lokasi_kecamatan_id: value.id, lokasi_desa_id: null });
          setLokasiKelurahan([]);
        }} disabled={lokasikecamatan.length == 0} required />
      <FormSelect inputlabel='Desa/Kelurahan*' name='lokasi_desa_id'
        placeholder='Pilih Desa/Kelurahan'
        options={lokasikelurahan}
        getOptionLabel={(obj: any) => obj.name}
        value={form.lokasi_desa_id ? lokasikelurahan.filter((obj: any) => obj.id == form.lokasi_desa_id)[0] ?? null : null}
        onChange={(_e: React.ChangeEvent<HTMLSelectElement>, value: any) => {
          setForm({ ...form, lokasi_desa_id: value.id });
        }} disabled={lokasikelurahan.length == 0} required />
      <FormInput inputlabel='Alamat' multiline rows={4} name='lokasi_alamat' value={form.lokasi_alamat} onChange={handleInput} />
    </>
  )
}

export default Step1