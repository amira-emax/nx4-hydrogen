import {NotFound} from '~/components/NotFound';

export const meta = () => {
  return [{title: 'Page Not Found'}];
};

export default function NotFoundPage() {
  return <NotFound />;
}
