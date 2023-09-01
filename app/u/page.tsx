import { redirect } from 'next/navigation';
const AuthenticatedPage = () => {
  redirect('/u/working');
}

export default AuthenticatedPage;