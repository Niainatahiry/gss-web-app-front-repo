import { Monitor } from 'lucide-react'
import Button from '../ui/Button'
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
      <Button
        key={name}
        variant="ghost"
        shape="none"
        className="group w-28 h-28 flex-col gap-2 rounded-card bg-white/5 text-white hover:bg-white/[0.02] hover:text-white"
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
      </Button>
    ))}
  </div>
</section>
  )
}

export default SelectPlatformsSection
