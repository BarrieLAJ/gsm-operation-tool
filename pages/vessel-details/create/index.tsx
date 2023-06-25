import { MuiCreateInferencer } from "@refinedev/inferencer/mui";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import { Create } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";

// const VesselDetailCreate: React.FC<IResourceComponentsProps> = () => {
//   const translate = useTranslate();
//   const {
//     saveButtonProps,
//     refineCore: { formLoading },
//     register,
//     control,
//     formState: { errors },
//   } = useForm();

//   return (
//     <Create
//       isLoading={formLoading}
//       resource="Vessel Details"
//       saveButtonProps={saveButtonProps}
//     >
//       <Box
//         component="form"
//         sx={{ display: "flex", flexDirection: "column" }}
//         autoComplete="off"
//       >
//         <TextField
//           {...register("vessel_name", {
//             required: "This field is required",
//           })}
//           error={!!(errors as any)?.vessel_name}
//           helperText={(errors as any)?.vessel_name?.message}
//           margin="normal"
//           fullWidth
//           InputLabelProps={{ shrink: true }}
//           type="text"
//           label={"Vessel Name"}
//           name="vessel_name"
//         />
//         <TextField
//           {...register("feeding_cost", {
//             required: "This field is required",
//           })}
//           error={!!(errors as any)?.vessel_name}
//           helperText={(errors as any)?.vessel_name?.message}
//           margin="normal"
//           fullWidth
//           InputLabelProps={{ shrink: true }}
//           type="text"
//           label={"Feeding Costs"}
//           name="feeding_cost"
//         />
//         <TextField
//           {...register("wages", {
//             required: "This field is required",
//           })}
//           error={!!(errors as any)?.vessel_name}
//           helperText={(errors as any)?.vessel_name?.message}
//           margin="normal"
//           fullWidth
//           InputLabelProps={{ shrink: true }}
//           type="text"
//           label={"Wages"}
//           name="wages"
//         />
//       </Box>
//     </Create>
//   );
// };

// export default VesselDetailCreate;

export default function BlogPostCreate() {
  return <MuiCreateInferencer />;
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
        destination: `${redirectTo}?to=${encodeURIComponent(
          "/vessel-details"
        )}`,
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
