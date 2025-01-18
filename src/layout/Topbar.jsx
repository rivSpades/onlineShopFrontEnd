import Link from 'next/link';
import React from 'react';

const Topbar = () => {
  // Handle form submission

  return (
    <div className="top-bar">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 d-flex align-items-center justify-content-center gap-3">
            <div className="company-logo">
              <Link legacyBehavior href="/">
                <a>
                  <img src="/assets/img/logo.svg" alt="Company Logo" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
