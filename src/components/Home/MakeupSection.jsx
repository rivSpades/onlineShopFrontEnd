import Link from 'next/link'
import React from 'react'

const MakeupSection = () => {
  return (
    <div className="makeup-section mb-110">
      <div className="container">
        <div className="makeup-top-item">
          <div className="row align-items-center justify-content-center g-0 gy-4">
            <div className="col-lg-6">
              <div className="makeup-img hover-img">
                <img src="/assets/img/home1/makeup-img1.png" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="makeup-content">
                <span>BROW BESTSELLERS</span>
                <h2>They’re kinda our Best thing!</h2>
                <p>Whatever your summer looks like, bring your own heat with up to 25% off Lumin Brand.Pellentesque ipsum dui, laoreet vitae ex in, pellentesque aliquam leo.</p>
                <Link legacyBehavior href="/shop"><a className="primary-btn1 style-2 hover-btn3">*Shop All Brows*</a></Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row align-items-center justify-content-center g-0 gy-4">
          <div className="col-lg-6 order-lg-1 order-2">
            <div className="makeup-content">
              <h2>Try on your perfect Best Makeup!</h2>
              <p>Whatever your summer looks like, bring your own heat with up to 25% off Lumin Brand.Pellentesque ipsum dui, laoreet vitae ex in, pellentesque aliquam leo.</p>
              <Link legacyBehavior href="/shop"><a className="primary-btn1 style-2 hover-btn3">*Try It Now*</a></Link>
            </div>
          </div>
          <div className="col-lg-6 order-lg-2 order-1">
            <div className="makeup-img hover-img">
              <img src="/assets/img/home1/makeup-img2.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default MakeupSection
