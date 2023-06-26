import { MuiShowInferencer } from "@refinedev/inferencer/mui";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";

import {
  useShow,
  IResourceComponentsProps,
  useTranslate,
} from "@refinedev/core";
import {
  Show,
  NumberField,
  DateField,
  TextFieldComponent as TextField,
  EmailField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const VesselDetailShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
      <Show isLoading={isLoading}>
          <Stack gap={1}>
              <Typography variant="body1" fontWeight="bold">
                  ID
              </Typography>
              <NumberField value={record?.id ?? ""} />
              <Typography variant="body1" fontWeight="bold">
                  Vessel Name
              </Typography>
              <TextField value={record?.vessel_name} />
              <Typography variant="body1" fontWeight="bold">
                 ETA
              </Typography>
              <DateField value={record?.eta} />
              <Typography variant="body1" fontWeight="bold">
                  Embark
              </Typography>
              <DateField value={record?.embark} />
              <Typography variant="body1" fontWeight="bold">
                  Disembark
              </Typography>
              <DateField value={record?.disembark} />
              <Typography variant="body1" fontWeight="bold">
                  Feeding Cost
              </Typography>
              <NumberField value={record?.feeding_cost ?? ""} />
              <Typography variant="body1" fontWeight="bold">
                  Wages
              </Typography>
              <NumberField value={record?.wages ?? ""} />
              <Typography variant="body1" fontWeight="bold">
                  Vessel Email
              </Typography>
              <EmailField value={record?.vessel_email} />
              <Typography variant="body1" fontWeight="bold">
                  Captain Name
              </Typography>
              <TextField value={record?.captain_name} />
          </Stack>
      </Show>
  );
};


export default VesselDetailShow

// export default function BlogPostShow() {
//   return <MuiShowInferencer />;
// }

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  if (!authenticated) {
    return {
      props: {
        ...translateProps,
      },
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/vessel-details")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...translateProps,
    },
  };
};
