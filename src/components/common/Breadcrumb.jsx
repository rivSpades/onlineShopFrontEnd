import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Breadcrumb = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Set mounted to true only on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents server rendering of Breadcrumb

  // Split router.pathname instead of asPath to exclude query parameters
  const currentPath = router.pathname.replace(/\/$/, ''); // Remove trailing slash
  const currentRoute = currentPath.split('/').filter(Boolean);

  return (
    <div className="breadcrumb-section">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link legacyBehavior href="/">
                <a>Home</a>
              </Link>
            </li>
            {currentRoute.map((route, index) => (
              <li
                key={index}
                className={`breadcrumb-item ${
                  index === currentRoute.length - 1 ? 'active' : ''
                }`}
              >
                {index === currentRoute.length - 1 ? (
                  <span>{route}</span>
                ) : (
                  <Link
                    legacyBehavior
                    href={`/${currentRoute.slice(0, index + 1).join('/')}`}
                  >
                    <a>{route}</a>
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
