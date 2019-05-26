
import Head from "next/Head";
import { withRouter } from "next/router";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import styles from "./index.scss";

const formatTime = time => {
	const t = new Date(time);
	const y = t.getFullYear();
	const M = t.getMonth() + 1;
	const d = t.getDay();
	return `${y} / ${M < 9 ? `0${M}` : M} / ${d < 9 ? `0${d}` : d}`;
};

const Blog = (props) => {
	const { acticle } = props;
	const { content = "", title = "", created_at = "" } = acticle || {};
	const createdAt = created_at && formatTime(created_at);
	return (
		<>
			<Head>
				<title>{`${title}-小航的博客`}</title>
				<meta name="keywords" content={`${title}-小航的博客`} />
				<meta name="description" content={content.slice(0, 40)} />
			</Head>
			<>
				<Header />
				<div className={styles.content}>
					<h1 className={styles.title}>{title}</h1>
					<p className={styles.time}>{createdAt}</p>
					<div dangerouslySetInnerHTML={{ __html: content }}></div>
				</div>
				<Footer />
			</>
		</>
	);
};

Blog.getInitialProps = async (ctx) => {
	const id = ctx.query && ctx.query.id;
	let acticle;
	try {
		const { data } = await axios.get(`https://api.justdodo.cn/acticles/${id}`);
		acticle = data.data;
	} catch (error) {
		console.log(error);
	}
	return { acticle };
};

export default withRouter(Blog);