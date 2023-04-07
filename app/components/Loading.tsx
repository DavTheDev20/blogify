import Image from 'next/image';
import LoadingImage from '../../public/loading.svg';

export default function Loading() {
  return <Image src={LoadingImage} alt="Loading..." className="text-center" />;
}
