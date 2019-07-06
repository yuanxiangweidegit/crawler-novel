const puppeteer = require('puppeteer')
const url = 'https://www.biquge5.com/2_2023/1009344.html'
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
	
		let data = {}
		data.name = $('.bookname').find('h1').text()
		data.skip={}
		let it = $('.bookname .bottem1').children('p').eq(1)
		if(it.children('a').eq(1)&&it.children('a').eq(1).attr('href')){
			data.skip.last= it.children('a').eq(1).attr('href')
		}
		if(it.children('a').eq(2)&&it.children('a').eq(2).attr('href')){
			data.skip.catalogue= it.children('a').eq(2).attr('href')
		}
		if(it.children('a').eq(3)&&it.children('a').eq(3).attr('href')){
			data.skip.next= it.children('a').eq(3).attr('href')
		}
		data.content = $('#content').text()
		return data
	})
	console.log(result)
}
crawler(url)