import { Typography } from "@mui/material";
import AuthLayout from "../layouts/AuthLayout";

type Props = {}

function TentangTataRuang({ }: Props) {
  return (
    <AuthLayout title='Tentang KRK'>
      <div className="flex justify-between gap-3 mt-12 items-center">
        <Typography variant="h4" className="!font-quicksand !font-semibold">Tentang KRK</Typography>
      </div>
      <div className="flex justify-center w-full mt-32">

      </div>
    </AuthLayout>
  )
}

export default TentangTataRuang