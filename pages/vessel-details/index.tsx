import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import React from "react";

import { useDataGrid, List, DateField } from "@refinedev/mui";
import { GridColDef, GridRow, GridRowProps } from "@mui/x-data-grid/";
import { IResourceComponentsProps, useNavigation } from "@refinedev/core";
import { Box, Button } from "@mui/material";
import { Edit } from "@mui/icons-material";
import dynamic from "next/dynamic";
const DataGrid = dynamic(() => import("@components/commons/Table"), { ssr: false });

export const VesselDetailList: React.FC<IResourceComponentsProps> = () => {
	const { dataGridProps } = useDataGrid({});
	const columns = React.useMemo<GridColDef[]>(
		() => [
			{
				field: "vessel_name",
				flex: 1,
				headerName: "Vessel Name",
				minWidth: 200,
			},
			{
				field: "eta",
				flex: 1,
				headerName: "ETA",
				// type: "date",
				minWidth: 200,
				renderCell: function render({ value }) {
					return <DateField value={value} />;
				},
			},
			{
				field: "embark",
				flex: 1,
				headerName: "Embark",
				type: "datetime",
				headerAlign: "center",
				align: "center",
				minWidth: 200,
				renderCell: function render({ value }) {
					return <DateField value={value} />;
				},
			},
			{
				field: "disembark",
				flex: 1,
				headerName: "Disembark",
				type: "datetime",
				headerAlign: "center",
				align: "center",
				minWidth: 200,
				renderCell: function render({ value }) {
					return <DateField value={value} />;
				},
			},
			{
				field: "feeding_cost",
				// flex: 1,
				headerName: "Feeding Costs",
				headerAlign: "center",
				align: "center",
				type: "number",
				minWidth: 150,
			},
			{
				field: "wages",
				// flex: 1,
				headerName: "Wages",
				headerAlign: "center",
				align: "center",
				type: "number",
				minWidth: 150,
			},
			// {
			// 	field: "imo_number",
			// 	flex: 1,
			// 	headerName: "IMO Number",
			// 	type: "string",
			// 	minWidth: 200,
			// },
			// {
			// 	field: "vessel_email",
			// 	flex: 1,
			// 	headerName: "Vessel Email",
			// 	minWidth: 250,
			// 	renderCell: function render({ value }) {
			// 		return <EmailField value={value} />;
			// 	},
			// },
			// {
			// 	field: "vessel_owner_name",
			// 	flex: 1,
			// 	headerName: "Vessel Owner Name",
			// 	minWidth: 250,
			// 	renderCell: function render({ row }) {
			// 		const value = row.vessel_owner;
			// 		return <>{value?.name || ""}</>;
			// 	},
			// },
			// {
			// 	field: "vessel_owner",
			// 	flex: 1,
			// 	headerName: "Vessel Owner Email",
			// 	minWidth: 250,
			// 	renderCell: function render({ value }) {
			// 		return <EmailField value={value?.email || ""} />;
			// 	},
			// },
			{
				field: "captain_name",
				flex: 1,
				headerName: "Captain Name",
				minWidth: 200,
			},
			{
				field: "actions",
				headerName: "Actions",
				type: "actions",
				sortable: false,
				renderCell: function render({ row }) {
					const { show, edit } = useNavigation();
					return (
						<>
							<Button
								// hideText
								// recordItemId={row.id}
								onMouseDown={(e) => {
									e.stopPropagation();
								}}
								onClick={(e) => {
									edit("vessel-details", row.id);
									e.stopPropagation();
								}}
							>
								<Edit />
							</Button>
						</>
					);
				},
				align: "center",
				headerAlign: "center",
				minWidth: 80,
			},
		],
		[]
	);

	return (
		<List>
			<DataGrid
				{...dataGridProps}
				columns={columns}
				autoHeight
				disableColumnSelector
				slotProps={{
					row: {
						sx: {
							"&:hover": {
								cursor: "pointer",
							},
						},
					},
				}}
				slots={{
					row: (props: GridRowProps) => {
						const { show } = useNavigation();
						return (
							<Box
								sx={{
									"&:hover": {
										cursor: "pointer",
									},
								}}
								onClick={(e) => {
									e.stopPropagation();
									show("vessel-details", props.row?.id);
								}}
							>
								<GridRow {...props} />
							</Box>
						);
					},
				}}
			/>
		</List>
	);
};

export default VesselDetailList;

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
