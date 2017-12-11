function HTML(html, state) {
	const preloadedState = JSON.stringify(state);

	return `<!DOCTYPE html>
		<html>
			<head>
				<title>QuoteTweetHelper</title>
				<script src="//platform.twitter.com/widgets.js" async></script>
				<link rel="stylesheet" href="/styles.css" />
			</head>
			<body>
				<div id="app">${html}</div>
				<script>
					window.__PRELOADED_STATE__ = ${preloadedState.replace(/</g, '\\u003c')}
				</script>
				<script src="/bundle.js"></script>
			</body>
		</html>`;
}

export default HTML;
