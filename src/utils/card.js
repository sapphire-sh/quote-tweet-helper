function card(meta) {
	return `<!DOCTYPE html>
		<html>
			<head>
				<meta name="twitter:card" content="${meta.media ? 'summary_large_image' : 'summary'}" />
				<meta name="twitter:creator" content="@${meta.creator}" />
				<meta name="twitter:site" content="@quote_helper" />
				<meta name="twitter:title" content="${meta.title}" />
				<meta name="twitter:description" content="${meta.description}" />
				<meta name="twitter:image" content="${meta.image}" />
			</head>
			<body>
			</body>
		</html>`;
}

export default card;
