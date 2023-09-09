// import { MuiShowInferencer } from "@refinedev/inferencer/mui";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";

import { useShow, IResourceComponentsProps } from "@refinedev/core";
import { Show, NumberField, DateField, TextFieldComponent as TextField, EmailField } from "@refinedev/mui";
import { Typography, Stack, Box } from "@mui/material";

export const VesselDetailShow: React.FC<IResourceComponentsProps> = () => {
	const { queryResult } = useShow();
	const { data, isLoading } = queryResult;

	const record = data?.data;

	return (
		<Show isLoading={isLoading}>
			<Stack gap={1}>
				<Stack direction={"row"} width={"100%"} gap={2}>
					<Typography variant="body2" flex={1} fontWeight="medium" bgcolor={"#efefef"} p={1}>
						ID
					</Typography>
					<NumberField value={record?.id ?? ""} flex={6} />
				</Stack>
				<Stack direction={"row"} width={"100%"} gap={2}>
					<Typography variant="body2" flex={1} fontWeight="medium" bgcolor={"#efefef"} p={1}>
						Vessel Name
					</Typography>
					<TextField value={record?.vessel_name} flex={6} />
				</Stack>
				<Stack direction={"row"} width={"100%"} gap={2}>
					<Typography variant="body2" flex={1} fontWeight="medium" bgcolor={"#efefef"} p={1}>
						ETA
					</Typography>
					<DateField value={record?.eta} flex={6} />
				</Stack>
				<Stack direction={"row"} width={"100%"} gap={2}>
					<Typography variant="body2" flex={1} fontWeight="medium" bgcolor={"#efefef"} p={1}>
						Embark
					</Typography>
					<DateField value={record?.embark} flex={6} />
				</Stack>
				<Stack direction={"row"} width={"100%"} gap={2}>
					<Typography variant="body2" flex={1} fontWeight="medium" bgcolor={"#efefef"} p={1}>
						Disembark
					</Typography>
					<DateField value={record?.disembark} flex={6} />
				</Stack>
				<Stack direction={"row"} width={"100%"} gap={2}>
					<Typography variant="body2" flex={1} fontWeight="medium" bgcolor={"#efefef"} p={1}>
						Feeding Cost
					</Typography>
					<NumberField value={record?.feeding_cost ?? ""} flex={6} />
				</Stack>
				<Stack direction={"row"} width={"100%"} gap={2}>
					<Typography variant="body2" flex={1} fontWeight="medium" bgcolor={"#efefef"} p={1}>
						Wages
					</Typography>
					<NumberField value={record?.wages ?? ""} prefix="SLE" flex={6} />
				</Stack>
				<Stack direction={"row"} width={"100%"} gap={2}>
					<Typography variant="body2" flex={1} fontWeight="medium" bgcolor={"#efefef"} p={1}>
						Vessel Owner Name
					</Typography>
					<TextField value={record?.vessel_owner?.name ?? "-"} flex={6} />
				</Stack>
				<Stack direction={"row"} width={"100%"} gap={2}>
					<Typography variant="body2" flex={1} fontWeight="medium" bgcolor={"#efefef"} p={1}>
						Vessel Owner Email
					</Typography>
					<Box flex={6}>
						<EmailField value={record?.vessel_owner?.email ?? "-"} />
					</Box>
				</Stack>
				<Stack direction={"row"} width={"100%"} gap={2}>
					<Typography variant="body2" flex={1} fontWeight="medium" bgcolor={"#efefef"} p={1}>
						Vessel Email
					</Typography>
					<Box flex={6}>
						<EmailField value={record?.vessel_email} />
					</Box>
				</Stack>
				<Stack direction={"row"} width={"100%"} gap={2}>
					<Typography variant="body2" flex={1} fontWeight="medium" bgcolor={"#efefef"} p={1}>
						Captain Name
					</Typography>
					<TextField value={record?.captain_name} flex={6} />
				</Stack>
			</Stack>
		</Show>
	);
};

export default VesselDetailShow;

// export default function BlogPostShow() {
//   return <MuiShowInferencer />;
// }

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
	const { authenticated, redirectTo } = await authProvider.check(context);

	// const translateProps = await serverSideTranslations(context.locale ?? "en", ["common"]);
	// console.log(translateProps);

	if (!authenticated) {
		return {
			props: {
				// ...translateProps,
			},
			redirect: {
				destination: `${redirectTo}?to=${encodeURIComponent("/vessel-details")}`,
				permanent: false,
			},
		};
	}

	return {
		props: {
			// ...translateProps,
		},
	};
};
