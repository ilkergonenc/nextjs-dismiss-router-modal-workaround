import swagPhotos, { Photo } from '@/config/photos'
import Frame from '@/components/photos/Frame'

export default function PhotoModal({
	params: { id: photoId },
}: {
	params: { id: string }
}) {
	const photos = swagPhotos
	const photo: Photo = photos.find((p) => p.id === photoId)!

	return (
		<>
			<Frame photo={photo} />
		</>
	)
}
