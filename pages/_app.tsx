import { Refine } from "@refinedev/core";
import { notificationProvider, RefineSnackbarProvider, ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/mui";
import routerProvider, { DocumentTitleHandler, UnsavedChangesNotifier } from "@refinedev/nextjs-router";
import type { NextPage } from "next";
import { AppProps } from "next/app";

import { Header } from "@components/header";
import { ColorModeContextProvider } from "@contexts";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { dataProvider } from "@refinedev/supabase";
import { authProvider } from "src/authProvider";
import { AppIcon } from "src/components/app-icon";
import { supabaseClient } from "src/utility";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
	const renderComponent = () => {
		if (Component.noLayout) {
			return <Component {...pageProps} />;
		}

		return (
			<ThemedLayoutV2
				Header={() => <Header sticky />}
				Title={({ collapsed }) => <ThemedTitleV2 collapsed={collapsed} text="Guardship" icon={<AppIcon />} />}
			>
				<Component {...pageProps} />
			</ThemedLayoutV2>
		);
	};
	return (
		<>
			<ColorModeContextProvider>
				<CssBaseline />
				<GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
				<RefineSnackbarProvider>
					<Refine
						routerProvider={routerProvider}
						dataProvider={dataProvider(supabaseClient)}
						authProvider={authProvider}
						notificationProvider={notificationProvider}
						resources={[
							{
								name: "vessel-details",
								list: "/vessel-details",
								create: "/vessel-details/create",
								edit: "/vessel-details/edit/:id",
								show: "/vessel-details/show/:id",
								meta: {
									canDelete: true,
								},
							},
						]}
						options={{
							syncWithLocation: true,
							warnWhenUnsavedChanges: true,
						}}
					>
						{renderComponent()}
						<UnsavedChangesNotifier />
						<DocumentTitleHandler />
					</Refine>
				</RefineSnackbarProvider>
			</ColorModeContextProvider>
		</>
	);
}

export default MyApp;
