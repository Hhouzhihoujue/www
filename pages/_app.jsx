import App, {Container} from "next/app";
import React from "react";
import "../style/reset.css";

export default class MyApp extends App {
	// eslint-disable-next-line no-unused-vars
	static async getInitialProps ({ Component, router, ctx }) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return {pageProps};
	}

	render () {
		const {Component, pageProps} = this.props;
		return <Container>
			<Component {...pageProps} />
		</Container>;
	}
}