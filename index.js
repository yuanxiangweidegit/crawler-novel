const puppeteer = require('puppeteer')
const url = 'https://www.biquge5.com/shuku/1/allvisit-0-1.html'
const sleep = time => new Promise(resolve => {
	setTimeout(resolve, time)
});
const crawler = async (url)=> {
	console.log('start crawler start'+'=======>'+url)
	const  browser = await puppeteer.launch({
		args:['--no-sandbox'],
		dumpio:false
	})
	const page = await browser.newPage()
	await page.goto(url,{
		waitUntil:'networkidle2'
	})
	const result = await page.evaluate(()=>{
		let $ = window.$
		let list = $('.list-group .list-group-item')
		let data = []
		list.each((index,item)=>{
			let it = $(item).find('.row')
			let obj ={
				title:it.children('div').eq(0).find('a').text(),
				href:it.children('div').eq(0).find('a').attr('href'),
				newSection:it.children('div').eq(1).find('a').text(),
				newSectionUrl:it.children('div').eq(1).find('a').attr('href'),
				author:it.children('div').eq(2).find('span').text(),
				date:it.children('div').eq(3).find('span').text()
			}
			data.push(obj)
		})
		return data
	})
	console.log(result)
}
crawler(url)