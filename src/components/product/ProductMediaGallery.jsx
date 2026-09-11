import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function ProductMediaGallery() {
  // Temporary static data.
  // Later, this can come directly from the product/API.
  const media = [
    {
      type: 'image',
      url: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2483190/706eb79418b2a74192de059693ddcbfaa803108a/ss_706eb79418b2a74192de059693ddcbfaa803108a.1920x1080.jpg?t=1788887415',
      alt: 'Game screenshot 1',
    },
    {
      type: 'image',
      url: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2483190/383ace7815eaa8f8f5128a58fd8ca7df911d3e14/ss_383ace7815eaa8f8f5128a58fd8ca7df911d3e14.1920x1080.jpg?t=1788887415',
      alt: 'Game screenshot 2',
    },
    {
      type: 'image',
      url: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2483190/d4b81f0cafcfba410371e53bd696fb5cc9b434c0/ss_d4b81f0cafcfba410371e53bd696fb5cc9b434c0.1920x1080.jpg?t=1788887415',
      alt: 'Game screenshot 3',
    },
    {
      type: 'image',
      url: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2483190/041b9a2854dc647bf54d7d8b36d2f4186ed72c13/ss_041b9a2854dc647bf54d7d8b36d2f4186ed72c13.1920x1080.jpg?t=1788887415',
      alt: 'Game screenshot 4',
    },
    {
      type: 'image',
      url: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2483190/945a08124625ffa26ec0077761fcbe19df07dad5/ss_945a08124625ffa26ec0077761fcbe19df07dad5.1920x1080.jpg?t=1788887415',
      alt: 'Game screenshot 5',
    },
    {
      type: 'image',
      url: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2483190/ffea3efe4e67b24ceb6f9bd0919b1ebac344b61b/ss_ffea3efe4e67b24ceb6f9bd0919b1ebac344b61b.1920x1080.jpg?t=1788887415',
      alt: 'Game screenshot 6',
    },
  ]

  const [activeMedia, setActiveMedia] = useState(0)
  const [thumbnailStart, setThumbnailStart] = useState(0)

  const previousMedia = () => {
    setActiveMedia((current) =>
      current === 0 ? media.length - 1 : current - 1
    )
  }

  const nextMedia = () => {
    setActiveMedia((current) =>
      current === media.length - 1 ? 0 : current + 1
    )
  }

  const previousThumbnails = () => {
    setThumbnailStart((current) => Math.max(0, current - 1))
  }

  const nextThumbnails = () => {
    setThumbnailStart((current) =>
      Math.min(media.length - 5, current + 1)
    )
  }

  return (
    <div className="lg:col-span-9">

      {/* =========================
          MAIN MEDIA
      ========================== */}
      <div className="relative aspect-video overflow-hidden rounded-lg bg-primary">

        <img
          src={media[activeMedia].url}
          alt={media[activeMedia].alt}
          className="w-full h-full object-cover"
        />

        {/* Previous */}
        <button
          type="button"
          onClick={previousMedia}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            w-10
            h-10
            rounded-full
            bg-black/40
            backdrop-blur-sm
            flex
            items-center
            justify-center
            text-white
            hover:bg-black/60
            transition-colors
            cursor-pointer
          "
        >
          <ChevronLeft size={20} />
        </button>

        {/* Next */}
        <button
          type="button"
          onClick={nextMedia}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            w-10
            h-10
            rounded-full
            bg-black/40
            backdrop-blur-sm
            flex
            items-center
            justify-center
            text-white
            hover:bg-black/60
            transition-colors
            cursor-pointer
          "
        >
          <ChevronRight size={20} />
        </button>

      </div>


      {/* =========================
          THUMBNAILS
      ========================== */}
      <div className="flex items-center gap-3 mt-3">

        {/* Previous thumbnails */}
        <button
          type="button"
          onClick={previousThumbnails}
          disabled={thumbnailStart === 0}
        className="
            shrink-0
            w-9
            h-9
            rounded-full
            bg-primary
            border
            border-primary-100/10
            text-white
            flex
            items-center
            justify-center
            enabled:hover:bg-primary-600
            disabled:opacity-30
            disabled:cursor-default
            disabled:border-none
            transition-colors
            cursor-pointer
            "
        >
          <ChevronLeft size={18} />
        </button>


        {/* Thumbnail grid */}
        <div className="grid grid-cols-5 gap-3 flex-1">

          {media
            .slice(thumbnailStart, thumbnailStart + 5)
            .map((item, index) => {

              const actualIndex = thumbnailStart + index

              return (
                <button
                  key={actualIndex}
                  type="button"
                  onClick={() => setActiveMedia(actualIndex)}
                  className={`
                    relative
                    aspect-video
                    overflow-hidden
                    rounded-lg
                    cursor-pointer
                    transition-all
                    ${
                      activeMedia === actualIndex
                        ? 'ring-2 ring-secondary'
                        : 'opacity-60 hover:opacity-100'
                    }
                  `}
                >
                  <img
                    src={item.url}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              )
            })}

        </div>


        {/* Next thumbnails */}
        <button
          type="button"
          onClick={nextThumbnails}
          disabled={thumbnailStart >= media.length - 5}
          className="
            shrink-0
            w-9
            h-9
            rounded-full
            bg-primary
            border
            border-primary-100/10
            text-white
            flex
            items-center
            justify-center
            enabled:hover:bg-primary-600
            disabled:opacity-30
            disabled:cursor-default
            disabled:border-none
            transition-colors
            cursor-pointer
            "
        >
          <ChevronRight size={18} />
        </button>

      </div>

    </div>
  )
}

export default ProductMediaGallery