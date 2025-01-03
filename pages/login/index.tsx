import { AuthPage, ThemedTitleV2 } from "@refinedev/mui";

import { GetServerSideProps } from "next";

import { authProvider } from "src/authProvider";

import { AppIcon } from "src/components/app-icon";
export default function Login() {
	return (
		<AuthPage
			type="login"
			formProps={{
				defaultValues: {
					email: "info@guardshipsl.com",
					password: "",
				},
			}}
			title={<ThemedTitleV2 collapsed={false} text="Guardship" icon={<AppIcon />} />}
		/>
	);
}

Login.noLayout = true;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
	const { authenticated } = await authProvider.check(context);

	// const translateProps = await serverSideTranslations(context.locale ?? "en", ["common"]);

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
		props: {
			// ...translateProps,
		},
	};
};
