import { MuiListInferencer } from "@refinedev/inferencer/mui";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import React from "react";
import {
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
  List,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Box } from "@mui/material";

// const VesselDetailList: React.FC<IResourceComponentsProps> = () => {
//   const translate = useTranslate();
//   const { dataGridProps } = useDataGrid();

//   const columns = React.useMemo<GridColDef[]>(
//     () => [
//       {
//         field: "vessel_name",
//         flex: 1,
//         headerName: "Vessel Name",
//         sortable: true,
//         align: "center",
//         headerAlign: "center",
//         minWidth: 80,
//       },
//       {
//         field: "eta",
//         headerName: "ETA",
//         flex: 1,
//         sortable: true,
//         align: "center",
//         headerAlign: "center",
//         minWidth: 80,
//         renderCell(params) {
//           return <Box>{new Date(params.value).toDateString()}</Box>;
//         },
//       },
//       {
//         field: "embark",
//         headerName: "Embark",
//         flex: 1,
//         sortable: true,
//         align: "center",
//         headerAlign: "center",
//         minWidth: 80,
//         renderCell(params) {
//           return <Box>{new Date(params.value).toDateString()}</Box>;
//         },
//       },
//       {
//         field: "disembark",
//         headerName: "DisEmbark",
//         flex: 1,
//         sortable: true,
//         align: "center",
//         headerAlign: "center",
//         minWidth: 80,
//         renderCell(params) {
//           return <Box>{new Date(params.value).toDateString()}</Box>;
//         },
//       },
//       {
//         field: "feeding_cost",
//         headerName: "Feeding Cost(SLE)",
//         flex: 1,
//         sortable: true,
//         align: "center",
//         headerAlign: "center",
//         minWidth: 80,
//         renderCell(params) {
//           return <Box>{params.value}</Box>;
//         },
//       },
//       {
//         field: "wages",
//         headerName: "Wages(SLE)",
//         flex: 1,
//         sortable: true,
//         align: "center",
//         headerAlign: "center",
//         minWidth: 80,
//         renderCell(params) {
//           return <Box>{params.value}</Box>;
//         },
//       },
//       {
//         field: "actions",
//         headerName: translate("table.actions"),
//         sortable: false,
//         renderCell: function render({ row }) {
//           return (
//             <>
//               <EditButton hideText recordItemId={row.id} />
//               <ShowButton hideText recordItemId={row.id} />
//               <DeleteButton hideText recordItemId={row.id} />
//             </>
//           );
//         },
//         align: "center",
//         headerAlign: "center",
//         minWidth: 80,
//       },
//     ],
//     [translate]
//   );

//   return (
//     <List>
//       <DataGrid {...dataGridProps} columns={columns} autoHeight />
//     </List>
//   );
// };

// export default VesselDetailList;

export default function BlogPostList() {
  return <MuiListInferencer />;
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
