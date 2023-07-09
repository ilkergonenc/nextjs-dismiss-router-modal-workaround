import Image from 'next/image'
import Link from 'next/link'

import { Photo, photosArrayLength } from '@/config/photos'

export default function Frame({ photo }: { photo: Photo }) {
	function navPhotoId(idString: string, navDirection: 'prev' | 'next') {
		let linkId: string = ''
		const idNumber = parseInt(idString)
		if (navDirection === 'prev') {
			const prevId = idNumber - 1
			if (prevId > 0) linkId = prevId.toString()
		}
		if (navDirection === 'next') {
			const nextId = idNumber + 1
			if (nextId < photosArrayLength) linkId = nextId.toString()
		}
		return linkId
	}
	return (
		<>
			<Image
				alt=""
				src={photo.imageSrc}
				height={600}
				width={600}
				className="w-full object-cover aspect-square col-span-2"
			/>

			<div>
				<h3>{photo.name}</h3>
				<p>Taken by {photo.username}</p>
			</div>

			<div className="flex justify-between">
				<Link href={`/photos/${navPhotoId(photo.id, 'prev')}`}>{'< Prev'}</Link>
				<Link href={`/photos/${navPhotoId(photo.id, 'next')}`}>{'Next >'}</Link>
			</div>
		</>
	)
}
