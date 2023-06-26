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
    DateField,
    EmailField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";

export const VesselDetailList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { dataGridProps } = useDataGrid();

    const columns = React.useMemo<GridColDef[]>(
        () => [
            // {
            //     field: "id",
            //     headerName: translate("vessel-details.fields.id"),
            //     type: "number",
            //     minWidth: 50,
            // },
            // {
            //     field: "created_at",
            //     flex: 1,
            //     headerName: translate("vessel-details.fields.created_at"),
            //     minWidth: 250,
            //     renderCell: function render({ value }) {
            //         return <DateField value={value} />;
            //     },
            // },
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
                minWidth: 200,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "disembark",
                flex: 1,
                headerName: "Disembark",
                minWidth: 200,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "feeding_cost",
                flex: 1,
                headerName: "Feeding Costs",
                type: "number",
                minWidth: 200,
            },
            {
                field: "wages",
                flex: 1,
                headerName: "Wages",
                type: "number",
                minWidth: 200,
            },
            {
                field: "vessel_email",
                flex: 1,
                headerName: "Vessel Email",
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <EmailField value={value} />;
                },
            },
            {
                field: "captain_name",
                flex: 1,
                headerName: "Captain Name",
                minWidth: 200,
            },
            {
                field: "actions",
                headerName: translate("table.actions"),
                sortable: false,
                renderCell: function render({ row }) {
                    return (
                        <>
                            <EditButton hideText recordItemId={row.id} />
                            <ShowButton hideText recordItemId={row.id} />
                            <DeleteButton hideText recordItemId={row.id} />
                        </>
                    );
                },
                align: "center",
                headerAlign: "center",
                minWidth: 80,
            },
        ],
        [translate],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};


export default VesselDetailList

// export default function BlogPostList() {
//   return <MuiListInferencer />;
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
