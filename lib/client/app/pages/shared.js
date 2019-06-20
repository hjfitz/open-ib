import axios from 'axios'
import format from 'date-fns/format'

export const formatDate = date => format(date, '(dd) DD/MM/YY @ HH.mm.ss')

export const api = axios.create({baseURL: '/api'})

export async function getImgDims(imgSrc) {
	const parsed = await fetch(imgSrc, {method: 'HEAD'})
	console.log(parsed)
}

export function imageToB64(file) {
	return new Promise((res, rej) => {
		try {
			const reader = new FileReader()
			reader.addEventListener('load', () => {
				// const cv = document.createElement('canvas')
				// const ctx = cv.getContext('2d')
				// const scalingFactor = 1000
				// const img = new Image()
				// img.src = reader.result
				// img.onload = async () => {
				// 	const {height, width} = img
				// 	console.log(getImgDims(reader.result))
				// 	if (height > scalingFactor) {
				// 		res(reader.result)
				// 		return
				// 	}
				// 	// const newHeight = height / scalingFactor
				// 	const newWidth = width / (height / scalingFactor) 
				// 	ctx.drawImage(img, 0, 0, scalingFactor, newWidth)
				// 	res(cv.toDataURL())
				// }
				res(reader.result)
			}, false)
			reader.addEventListener('error', rej)
			reader.readAsDataURL(file)
		} catch (err) {
			rej(err)
		}
	})
}


export function noop() {}