import {Link} from 'react-router';
import {Button} from './ui/button';

interface NotFoundProps {
  title?: string;
  message?: string;
}

export function NotFound({
  title = 'Page Not Found',
  message = "Sorry, the page you're looking for doesn't exist or has been moved.",
}: NotFoundProps) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 md:py-32">
      <div className="text-center max-w-lg mx-auto flex flex-col items-center gap-6">
        <h1 className="text-[120px] md:text-[180px] leading-none font-light text-primary tracking-tighter opacity-10 font-[family-name:var(--font-imagefuture)]">
          404
        </h1>
        <div className="space-y-4 -mt-8 md:-mt-12 relative z-10">
          <h2 className="text-h2-light text-primary uppercase tracking-widest">
            {title}
          </h2>
          <p className="text-body-regular text-secondary max-w-md mx-auto">
            {message}
          </p>
        </div>
        <div className="mt-8">
          <Link to="/">
            <Button variant='filled' size="lg" className="min-w-[200px]">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
