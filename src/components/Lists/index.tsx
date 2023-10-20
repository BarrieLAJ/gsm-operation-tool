import React from "react";
import { IResourceComponentsProps, useNavigation } from "@refinedev/core";
import { List, useDataGrid } from "@refinedev/mui";
import { columns } from "./columns";
import dynamic from "next/dynamic";
import { GridRow, GridRowProps } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

const DataGrid = dynamic(() => import("@components/commons/Table"), {
	ssr: false,
});

const slots = {
	row: (params: GridRowProps) => <CustomRow {...params} />,
};

export const VesselDetailList: React.FC<IResourceComponentsProps> = () => {
	const { dataGridProps } = useDataGrid({ meta: { count: "estimated" } });
	return (
		<List>
			<DataGrid
				columns={columns}
				autoHeight
				disableColumnSelector
				{...dataGridProps}
				slotProps={{
					row: {
						sx: {
							"&:hover": {
								cursor: "pointer",
							},
						},
					},
				}}
				slots={slots}
			/>
		</List>
	);
};

export default VesselDetailList;

const CustomRow = (props: GridRowProps) => {
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
};
