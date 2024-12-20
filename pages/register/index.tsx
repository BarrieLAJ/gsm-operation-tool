import { AuthPage, ThemedTitleV2 } from "@refinedev/mui";

import { GetServerSideProps } from "next";

import { authProvider } from "src/authProvider";

import { AppIcon } from "src/components/app-icon";

export default function Register() {
	return <AuthPage type="register" title={<ThemedTitleV2 collapsed={false} text="Guardship" icon={<AppIcon />} />} />;
}

Register.noLayout = true;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
	const { authenticated } = await authProvider.check(context);

	if (authenticated) {
		return {
			props: {},
			redirect: {
				destination: `/`,
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};
