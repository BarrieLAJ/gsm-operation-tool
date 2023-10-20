import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";
import React from "react";

import dynamic from "next/dynamic";
const VesselDetailList = dynamic(() => import("@components/Lists"), {
	ssr: false,
});

export const VesselDetailListPage = () => {
	return <VesselDetailList />;
};

export default VesselDetailListPage;

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
