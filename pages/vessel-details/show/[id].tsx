import { MuiShowInferencer } from "@refinedev/inferencer/mui";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import {
  useShow,
  IResourceComponentsProps,
  useTranslate,
  useOne,
} from "@refinedev/core";
import { Show } from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

// export const VesselDetailShow: React.FC<IResourceComponentsProps> = () => {
//   const translate = useTranslate();
//   const { queryResult } = useShow();
//   const { data, isLoading } = queryResult;
//   console.log(data)
//   const record = data?.data;

// console.log(record)

//   return (
//       <Show isLoading={isLoading}>
//           <Stack gap={1}>
//             <Typography variant="h3" color={"white"}>{record?.vessel_name}</Typography>
//           </Stack>
//       </Show>
//   );
// };


// export default VesselDetailShow


export default function BlogPostShow() {
  return <MuiShowInferencer />;
}

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
