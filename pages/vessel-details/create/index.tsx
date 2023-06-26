import { MuiCreateInferencer } from "@refinedev/inferencer/mui";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";


import { Create } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";

export const VesselDetailCreate: React.FC<IResourceComponentsProps> = () => {
    const {
        saveButtonProps,
        refineCore: { formLoading },
        register,
        control,
        formState: { errors },
    } = useForm();

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
                {/* <TextField
                    {...register("created_at", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.created_at}
                    helperText={(errors as any)?.created_at?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label={translate("vessel-details.fields.created_at")}
                    name="created_at"
                /> */}
                <TextField
                    {...register("vessel_name", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.vessel_name}
                    helperText={(errors as any)?.vessel_name?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={"Vessel Name"}
                    name="vessel_name"
                />
                {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
                <TextField
                    {...register("eta", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.eta}
                    helperText={(errors as any)?.eta?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label={"ETA"}
                    name="eta"
                />

                {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
                <TextField
                    {...register("embark", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.embark}
                    helperText={(errors as any)?.embark?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label={"Embark"}
                    name="embark"
                />

                {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
                <TextField
                    {...register("disembark", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.disembark}
                    helperText={(errors as any)?.disembark?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label={"Disembark"}
                    name="disembark"
                />
                <TextField
                    {...register("feeding_cost", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.feeding_cost}
                    helperText={(errors as any)?.feeding_cost?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={"Feeding Cost"}
                    name="feeding_cost"
                />
                <TextField
                    {...register("wages", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.wages}
                    helperText={(errors as any)?.wages?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={"Wages"}
                    name="wages"
                />
                <TextField
                    {...register("vessel_email", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.vessel_email}
                    helperText={(errors as any)?.vessel_email?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="email"
                    label={"Vessel Email"}
                    name="vessel_email"
                />
                <TextField
                    {...register("captain_name", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.captain_name}
                    helperText={(errors as any)?.captain_name?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={"Captain Name"}
                    name="captain_name"
                />
            </Box>
        </Create>
    );
};

export default VesselDetailCreate


// export default function BlogPostCreate() {
//   return <MuiCreateInferencer />;
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
