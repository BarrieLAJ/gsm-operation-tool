// import { MuiEditInferencer } from "@refinedev/inferencer/mui";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import { Edit } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps } from "@refinedev/core";
import { FieldValues, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";
import { convertFormatedNumberToNumber } from "src/util";

export const VesselDetailEdit: React.FC<IResourceComponentsProps> = () => {
	const {
		saveButtonProps,
		refineCore: { queryResult, onFinish },
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onFinishHandler = (data: FieldValues) => {
		onFinish({
			vessel_name: data.vessel_name,
			eta: data.eta,
			embark: data.embark,
			disembark: data.disembark,
			imo_number: data.imo_number,
			feeding_cost: convertFormatedNumberToNumber(data.feeding_cost),
			wages: convertFormatedNumberToNumber(data.wages),
			vessel_email: data.vessel_email,
			captain_name: data.captain_name,
			vessel_owner: { name: data.vessel_owner_name, email: data.vessel_owner_email },
		});
	};

	const vesselDetailsData = queryResult?.data?.data;

	return (
		<Edit saveButtonProps={{ ...saveButtonProps, onClick: handleSubmit(onFinishHandler) }}>
			<Box component="form" sx={{ display: "flex", flexDirection: "column" }} autoComplete="off">
				{/* <TextField
                    {...register("id", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.id}
                    helperText={(errors as any)?.id?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label={translate("vessel-details.fields.id")}
                    name="id"
                    disabled
                /> */}
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
				<Controller
					control={control}
					name="feeding_cost"
					render={({ field: { onChange, name, value } }) => (
						<NumberFormat
							thousandsGroupStyle="thousand"
							decimalSeparator="."
							displayType="input"
							type="text"
							thousandSeparator={true}
							value={value}
							onChange={onChange}
							customInput={TextField}
							error={!!(errors as any)?.feeding_cost}
							helperText={(errors as any)?.feeding_cost?.message}
							margin="normal"
							fullWidth
							InputLabelProps={{ shrink: true }}
							label={"Feeding Cost"}
							name={name}
						/>
					)}
				/>
				<Controller
					control={control}
					name="wages"
					render={({ field: { onChange, name, value } }) => (
						<NumberFormat
							thousandsGroupStyle="thousand"
							decimalSeparator="."
							displayType="input"
							type="text"
							thousandSeparator={true}
							value={value}
							onChange={onChange}
							customInput={TextField}
							error={!!(errors as any)?.wages}
							helperText={(errors as any)?.wages?.message}
							margin="normal"
							fullWidth
							InputLabelProps={{ shrink: true }}
							label={"Wages"}
							name={name}
						/>
					)}
				/>
				<TextField
					{...register("vessel_owner_name", {
						required: "This field is required",
					})}
					error={!!(errors as any)?.vessel_owner_name}
					helperText={(errors as any)?.vessel_owner_name?.message}
					defaultValue={vesselDetailsData?.vessel_owner ? vesselDetailsData?.vessel_owner.name : undefined}
					margin="normal"
					fullWidth
					InputLabelProps={{ shrink: true }}
					type="text"
					label={"Vessel Owner Name"}
					name="vessel_owner_name"
				/>
				<TextField
					{...register("vessel_owner_email", {
						required: "This field is required",
						// value: queryResult?.data?.data.vessel_owner.email,
					})}
					error={!!(errors as any)?.vessel_owner_email}
					helperText={(errors as any)?.vessel_owner_email?.message}
					margin="normal"
					defaultValue={vesselDetailsData?.vessel_owner ? vesselDetailsData?.vessel_owner.email : undefined}
					fullWidth
					InputLabelProps={{ shrink: true }}
					type="email"
					label={"Vessel Owner Email"}
					name="vessel_owner_email"
				/>
				<TextField
					{...register("imo_number", {
						required: "This field is required",
						valueAsNumber: true,
					})}
					error={!!(errors as any)?.wages}
					helperText={(errors as any)?.wages?.message}
					margin="normal"
					fullWidth
					InputLabelProps={{ shrink: true }}
					type="text"
					label={"IMO Number"}
					name="imo_number"
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
		</Edit>
	);
};

export default VesselDetailEdit;

// export default function BlogPostEdit() {
//   return <MuiEditInferencer />;
// }

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
	const { authenticated, redirectTo } = await authProvider.check(context);

	const translateProps = await serverSideTranslations(context.locale ?? "en", ["common"]);

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
