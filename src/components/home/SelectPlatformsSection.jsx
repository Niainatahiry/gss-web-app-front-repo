import React from 'react'
import { Monitor } from 'lucide-react'
import PlaystationLogo from '../../assets/logos/consoleLogos/playstation.svg?react'
import XboxLogo from '../../assets/logos/consoleLogos/Xbox_Logo.svg?react'
import NintendoLogo from '../../assets/logos/consoleLogos/Nintendo_Switch_Logo.svg?react'

function SelectPlatformsSection() {
  const platforms = [
    { name: 'PC', Icon: Monitor },
    { name: 'PlayStation', Icon: PlaystationLogo },
    { name: 'Xbox', Icon: XboxLogo },
    { name: 'Nintendo Switch', Icon: NintendoLogo },
  ]

  return (
<section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0">
  <div className="flex justify-center gap-8">
    {platforms.map(({ name, Icon }) => (
      <button
        key={name}
        type="button"
        className="
          group
          w-28 h-28
          flex flex-col
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-white/5
          hover:bg-white/2
          text-white
          transition-all
          duration-200
          cursor-pointer
        "
      >
        <Icon
          className="
            w-9 h-9
            opacity-70
            group-hover:opacity-100
            transition-opacity
          "
        />

        <span className="text-xs font-medium text-center">
          {name}
        </span>
      </button>
    ))}
  </div>
</section>
  )
}

export default SelectPlatformsSection
