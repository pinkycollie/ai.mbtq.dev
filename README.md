# SPLASH! Component

A highly customizable floating component designed to indicate funding status or other important information in your React applications.

## Features

- 🎨 **Highly Customizable**: Modify colors, size, position, text, and icons
- ✨ **Animated**: Smooth entrance/exit animations and optional effects
- 📱 **Responsive**: Works across all device sizes
- 🔄 **Interactive**: Click handlers and dismissible options
- ♿ **Accessible**: Built with accessibility in mind

## Installation

1. Copy the `splash.tsx` component into your project
2. Ensure you have the required dependencies:

\`\`\`bash
npm install framer-motion
\`\`\`

## Basic Usage

\`\`\`tsx
import { Splash } from './components/splash'

export default function MyPage() {
  return (
    <div>
      <Splash status="funded" />
      {/* Your page content */}
    </div>
  )
}
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| status | 'funded' \| 'not-funded' \| 'needs-funding' | 'needs-funding' | The funding status to display |
| text | string | undefined | Custom text to display in the splash |
| position | 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' | 'top-right' | Position of the splash component |
| size | 'small' \| 'medium' \| 'large' | 'medium' | Size of the splash component |
| color | string | undefined | Primary color for the splash (Tailwind class) |
| animated | boolean | true | Whether to show the splash with animations |
| dismissible | boolean | false | Whether the splash can be dismissed |
| icon | React.ReactNode | undefined | Custom icon to display |
| onClick | () => void | undefined | Callback when splash is clicked |
| className | string | undefined | Additional CSS classes |
| pulse | boolean | true | Whether to pulse the splash |
| rotate | boolean | false | Whether to rotate the splash on entry |
| showDelay | number | 0 | Delay before showing the splash (ms) |
| show | boolean | true | Whether to show the splash |

## Examples

### Dynamic Status Change

\`\`\`tsx
import { useState } from 'react'
import { Splash } from './components/splash'

export default function ProjectPage() {
  const [projectFunded, setProjectFunded] = useState(false)
  
  return (
    <div>
      <Splash 
        status={projectFunded ? "funded" : "needs-funding"}
        onClick={() => setProjectFunded(!projectFunded)}
      />
      
      <h1>Project Dashboard</h1>
      <button onClick={() => setProjectFunded(!projectFunded)}>
        {projectFunded ? "Mark as Needs Funding" : "Mark as Funded"}
      </button>
    </div>
  )
}
\`\`\`

### Custom Styling

\`\`\`tsx
import { Splash } from './components/splash'
import { Heart } from 'lucide-react'

export default function CustomSplashExample() {
  return (
    <div>
      <Splash 
        text="OPEN SOURCE"
        color="bg-purple-600"
        icon={<Heart className="h-4 w-4" />}
        position="bottom-left"
        size="large"
        pulse={true}
        rotate={true}
      />
      
      {/* Your content */}
    </div>
  )
}
\`\`\`

## Accessibility Considerations

- Ensure sufficient color contrast between the splash background and text
- Don't rely solely on color to convey information
- Consider users who may have animations disabled

## License

MIT
