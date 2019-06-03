module.exports = {
	base: '/',
	title: 'Grimoh',
	description: ' ',
	serviceWorker: true,
	ga: 'UA-137907582-1',
	locales: {
		'/': {
			lang: 'ja'
		}
	},
	meta: [
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' }
	],
	themeConfig: {
		search: true,
		docsDir: 'docs',
		sidebar: 'auto',
		lastUpdated: 'Last Updated',
		serviceWorker: {
      		updatePopup: {
        		message   : "New content has been added.",
        		buttonText: "Update",
      		}
    	},
    	nav: [
			{
				text: 'About',
				items: [
					{text: 'Twitter', link: 'https://twitter.com/grimoh117'},
      				{text: 'GitHub', link: 'https://github.com/grimoh117'}
				]
			}
    	],
		footer: '',
  	},
	markdown: {
		config: md => {
			md.options.linkify = true
			md.use(require('markdown-it-footnote'));
		}
	}
}
