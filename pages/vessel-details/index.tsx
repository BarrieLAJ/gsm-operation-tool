import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import React from "react";

import { useDataGrid, List, DateField } from "@refinedev/mui";
import { GridColDef, GridRow, GridRowProps } from "@mui/x-data-grid";
import { IResourceComponentsProps, useNavigation } from "@refinedev/core";
import { Box, Button } from "@mui/material";
import { Edit } from "@mui/icons-material";
import dynamic from "next/dynamic";
const DataGrid = dynamic(() => import("@components/commons/Table"));

const columns: GridColDef[] = [
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
		headerName: "Feeding Costs",
		headerAlign: "center",
		align: "center",
		type: "number",
		minWidth: 150,
	},
	{
		field: "wages",
		headerName: "Wages",
		headerAlign: "center",
		align: "center",
		type: "number",
		minWidth: 150,
	},
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
			const { edit } = useNavigation();
			return (
				<>
					<Button
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
];

export const VesselDetailList: React.FC<IResourceComponentsProps> = () => {
	const { dataGridProps } = useDataGrid({});
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
	if (!authenticated) {
		return {
			props: {},
			redirect: {
				destination: `${redirectTo}?to=${encodeURIComponent("/vessel-details")}`,
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};
