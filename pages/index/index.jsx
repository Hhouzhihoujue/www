import Head from "next/Head";
import Link from "next/link";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./index.scss";
import axios from "axios";

const getDayTime = time => {
	const formatTime = new Date(time);
	const year = formatTime.getFullYear();
	const mounth = formatTime.getMonth() + 1;
	const day = formatTime.getDate();
	return `${year}.${mounth < 10 ? `0${mounth}` : mounth}.${day < 10 ? `0${day}` : day}`;
};

const handleArticles = acticles => {
	const timeObj = {};
	acticles.forEach(item => {
		const time = getDayTime(item.created_at);
		if (timeObj[time]) {
			timeObj[time].push(item);
		} else {
			timeObj[time] = [item];
		}
	});
	return timeObj;
};

const BlogItem = (props) => {
	const { blog } = props;
	return (
		<Link href={`/blog?id=${blog._id}`}>
			<div className={styles.blogItem}>
				{blog.title}
			</div>
		</Link>
	);
};

const BlogWithTime = (props) => {
	const { day, articles } = props;
	return (
		<div className={styles.blogTimeItem}>
			<div className={styles.time} key={day}>{day}</div>
			{
				articles.map(blog => (
					<BlogItem key={blog._id} blog={blog} />
				))
			}
		</div>
	);
};

const BlogList = (props) => {
	const { acticles } = props;
	const timeArticles = handleArticles(acticles.data.list);
	const dates = Object.keys(timeArticles).sort((a, b) => new Date(b).valueOf() - new Date(a).valueOf());
	return (
		<>
			<Head>
				<title>小航的博客</title>
				<meta name="keywords" content={"小航的博客 - 记录走过的每一步"} />
			</Head>
			<>
				<Header />
				<div className={styles.content}>
					{
						dates.map(day => (
							<BlogWithTime key={day} day={day} articles={timeArticles[day]} />
						))
					}
				</div>
				<Footer />
			</>
		</>
	);
};

BlogList.getInitialProps = async ({ req }) => {
	const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
	let acticles;
	try {
		const { data } = await axios.get("https://api.justdodo.cn/acticles");
		acticles = data;
	} catch (error) {
		console.log(error);
	}
	return { userAgent, acticles };
};

export default BlogList;