// Temporary type declarations to resolve Next.js import errors

declare module 'next' {
  export interface Metadata {
    title?: string;
    description?: string;
    keywords?: string[];
    author?: string;
    robots?: string;
    openGraph?: {
      title?: string;
      description?: string;
      images?: string[];
    };
  }
}

declare module 'next/image' {
  import { FC } from 'react';
  
  interface ImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    quality?: number;
    fill?: boolean;
    sizes?: string;
    style?: React.CSSProperties;
    className?: string;
    onLoad?: () => void;
    onError?: () => void;
  }
  
  const Image: FC<ImageProps>;
  export default Image;
}

declare module 'next/headers' {
  export function cookies(): {
    get: (name: string) => { value: string } | undefined;
    set: (name: string, value: string, options?: any) => void;
    delete: (name: string) => void;
    has: (name: string) => boolean;
    getAll: () => Array<{ name: string; value: string }>;
  };
  
  export function headers(): Headers;
}

declare module 'next/navigation' {
  export function useSearchParams(): URLSearchParams;
  export function useRouter(): {
    push: (url: string) => void;
    replace: (url: string) => void;
    back: () => void;
    forward: () => void;
    refresh: () => void;
    prefetch: (url: string) => void;
  };
  export function usePathname(): string;
  export function useParams(): { [key: string]: string | string[] };
  export function redirect(url: string): never;
  export function notFound(): never;
}

declare module 'next/link' {
  import { ReactNode } from 'react';
  
  interface LinkProps {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    locale?: string | false;
    children: ReactNode;
    className?: string;
    target?: string;
    rel?: string;
    onClick?: () => void;
  }
  
  const Link: React.FC<LinkProps>;
  export default Link;
}

declare module 'next/server' {
  export class NextRequest extends Request {
    url: string;
    nextUrl: {
      pathname: string;
      search: string;
      searchParams: URLSearchParams;
      origin: string;
    };
    cookies: {
      get: (name: string) => { value: string } | undefined;
      set: (name: string, value: string) => void;
    };
    headers: Headers;
    json(): Promise<any>;
  }
  
  export class NextResponse extends Response {
    static json(body: any, init?: ResponseInit): NextResponse;
    static redirect(url: string | URL, status?: number): NextResponse;
    static next(): NextResponse;
    static rewrite(url: string | URL): NextResponse;
  }
}

declare module 'lucide-react' {
  import { FC } from 'react';
  
  interface IconProps {
    size?: number | string;
    color?: string;
    strokeWidth?: number;
    className?: string;
    style?: React.CSSProperties;
  }
  
  export const AlertOctagon: FC<IconProps>;
  export const AlertTriangle: FC<IconProps>;
  export const ArrowRight: FC<IconProps>;
  export const Award: FC<IconProps>;
  export const BarChart3: FC<IconProps>;
  export const BookOpen: FC<IconProps>;
  export const Brain: FC<IconProps>;
  export const CheckCircle: FC<IconProps>;
  export const CheckCircle2: FC<IconProps>;
  export const ChevronLeft: FC<IconProps>;
  export const Clock: FC<IconProps>;
  export const Crown: FC<IconProps>;
  export const Database: FC<IconProps>;
  export const Download: FC<IconProps>;
  export const FileText: FC<IconProps>;
  export const Headphones: FC<IconProps>;
  export const Home: FC<IconProps>;
  export const Lightbulb: FC<IconProps>;
  export const Mail: FC<IconProps>;
  export const Settings: FC<IconProps>;
  export const Share2: FC<IconProps>;
  export const Shield: FC<IconProps>;
  export const Sparkles: FC<IconProps>;
  export const Star: FC<IconProps>;
  export const Target: FC<IconProps>;
  export const TrendingUp: FC<IconProps>;
  export const Users: FC<IconProps>;
  export const Zap: FC<IconProps>;
}
