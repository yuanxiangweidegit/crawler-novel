const puppeteer = require('puppeteer')
const url = 'https://www.biquge5.com/2_2023/'
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
		let info = $('#info')
		let data = {}
		data.info = {
			title:info.find('h1').text(),
			author:info.children('p').eq(0).text(),
			status:info.children('p').eq(1).text(),
			endTime:info.children('p').eq(2).text(),
			newSection:{
				text:info.children('p').eq(3).text(),
				href:info.children('p').eq(3).find('a').attr('href'),
			}
		}
		data.list=[]
		$('#list ul li').each((index,item)=>{
			let it =$(item).find('a')
			let obj ={
				text:it.text(),
				href:it.attr('href')
			}
			data.list.push(obj)
		})
		
		return data
	})
	console.log(result)
}
crawler(url)