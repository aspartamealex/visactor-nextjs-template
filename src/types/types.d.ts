declare module 'react' {
  import * as React from 'react'
  export = React
  export as namespace React
}

declare module 'lucide-react' {
  import { FC, SVGProps } from 'react'
  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: string | number
    color?: string
    strokeWidth?: string | number
  }
  export const Plus: FC<IconProps>
  // Add other icons as needed
}

declare module 'date-fns' {
  export function format(date: Date | number, format: string): string
  // Add other date-fns functions as needed
}

declare module 'next/navigation' {
  export function useRouter(): {
    push: (url: string) => void
    // Add other router methods as needed
  }
}

// Add JSX namespace to fix JSX element type errors
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
} 