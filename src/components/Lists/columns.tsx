import { useNavigation } from "@refinedev/core";
import { Button } from "@mui/material";
import Edit from "@mui/icons-material/Edit";
import type { GridColDef } from "@mui/x-data-grid";
import { DateField } from "@refinedev/mui";

export const columns: GridColDef[] = [
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
