import Link from 'next/link'
import React from 'react'

const BlogDetailsPage = () => {
  return (
    <div className="blog-details-section mt-110 mb-110">
      <div className="container">
        <div className="row g-lg-4 gy-5">
          <div className="col-lg-8">
            <div className="blog-author-meta">
              <div className="author-area">
                <div className="author-img">
                  <img src="/assets/img/inner-page/blog-author-img1.png" alt="" />
                </div>
                <div className="author-content">
                  <p>
                    By, <a href="#">Cooper Jogan</a>
                  </p>
                </div>
              </div>
              <div className="blog-meta">
                <div className="tag">
                  <ul>
                    <li>
                      <Link legacyBehavior href="/blog-grid"><a>Beauty</a></Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/blog-grid"><a>Makeup</a></Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/blog-grid"><a>Health</a></Link>
                    </li>
                  </ul>
                </div>
                <div className="meta">
                  <ul>
                    <li>
                      <svg width={10} height={13} viewBox="0 0 10 13" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.50807 12.2427C7.93941 9.84557 7.34014 6.82892 5.08305 5.07027C5.08174 5.06928 5.08042 5.06803 5.07936 5.06729L5.08912 5.09017L5.08754 5.10733C5.5273 6.20316 5.46561 7.40619 4.92539 8.43835L4.54468 9.16608L4.42789 8.36199C4.34853 7.81656 4.13049 7.29626 3.79461 6.85081H3.74161L3.71367 6.7762C3.71762 7.60963 3.53149 8.43064 3.16633 9.20513C2.68729 10.2186 2.75768 11.3873 3.35484 12.332L3.76692 12.9841L3.02555 12.6886C1.80301 12.2014 0.82567 11.2627 0.343986 10.1134C-0.195701 8.83007 -0.0957787 7.34202 0.611588 6.13377C0.980431 5.50527 1.23881 4.83797 1.37986 4.15003L1.51775 3.47577L1.86945 4.07716C2.0374 4.36392 2.16105 4.67432 2.23777 5.00038L2.24568 5.00809L2.25385 5.06032L2.2615 5.05808C3.31503 3.73766 3.9462 2.09466 4.03822 0.43102L4.06195 0L4.44529 0.23578C6.00978 1.19755 7.09627 2.74057 7.43189 4.47435L7.43954 4.50992L7.44349 4.51539L7.46063 4.49251C7.76725 4.11049 7.92913 3.65609 7.92913 3.17781V2.43714L8.40291 3.02759C9.50443 4.39999 10.0692 6.10243 9.99323 7.82154C9.8999 9.84507 8.73009 11.6211 6.86373 12.5834L6.05565 13L6.50807 12.2427Z" />
                      </svg>
                      1.5K View
                    </li>
                    <li>
                      <a href="#comment">
                        <svg width={13} height={13} viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_713_23)">
                            <path d="M11.8341 12.1565C11.8541 12.2467 11.8537 12.3401 11.833 12.4301C11.8123 12.5201 11.7718 12.6043 11.7145 12.6767C11.6572 12.7491 11.5845 12.8078 11.5016 12.8486C11.4188 12.8894 11.3279 12.9112 11.2356 12.9124C11.1403 12.9119 11.0464 12.8898 10.961 12.8476L9.86878 12.3139C8.84811 12.6866 7.7304 12.6975 6.70263 12.3448C5.67486 11.9921 4.79938 11.2972 4.22266 10.3763C4.99538 10.4765 5.78053 10.4129 6.52709 10.1898C7.27365 9.96668 7.9649 9.58894 8.5559 9.08116C9.14691 8.57337 9.62445 7.94691 9.95749 7.24247C10.2905 6.53804 10.4716 5.77141 10.4889 4.99242C10.4892 4.63894 10.4531 4.28637 10.3809 3.94032C11.1197 4.29865 11.7479 4.8499 12.1992 5.53581C12.6505 6.22173 12.9081 7.01683 12.9448 7.83708C12.9693 8.45902 12.8639 9.07923 12.6355 9.65823C12.4071 10.2372 12.0606 10.7623 11.6182 11.2001L11.8341 12.1565Z" />
                            <path d="M4.93651 0.175979C3.64394 0.16156 2.3984 0.660306 1.473 1.56285C0.54761 2.4654 0.0178911 3.69809 1.0495e-06 4.99061C-0.000437261 5.64682 0.13642 6.29587 0.401779 6.89603C0.667137 7.4962 1.05512 8.0342 1.54081 8.47548L1.34211 9.53621C1.32558 9.62527 1.3288 9.71688 1.35156 9.80457C1.37432 9.89225 1.41606 9.97386 1.47383 10.0436C1.5316 10.1134 1.60399 10.1696 1.68588 10.2084C1.76778 10.2471 1.85717 10.2674 1.94776 10.2677C2.0502 10.2676 2.15101 10.242 2.24117 10.1934L3.40989 9.56552C3.90334 9.7238 4.4183 9.80477 4.93651 9.80556C6.22913 9.81998 7.47472 9.32119 8.40012 8.41857C9.32552 7.51596 9.8552 6.28319 9.87301 4.99061C9.85512 3.69809 9.3254 2.4654 8.40001 1.56285C7.47462 0.660306 6.22908 0.16156 4.93651 0.175979ZM3.08532 5.72955C2.96327 5.72955 2.84397 5.69336 2.7425 5.62555C2.64102 5.55775 2.56193 5.46138 2.51523 5.34862C2.46852 5.23587 2.4563 5.1118 2.48011 4.9921C2.50392 4.8724 2.56269 4.76245 2.64899 4.67615C2.73529 4.58986 2.84524 4.53109 2.96493 4.50728C3.08463 4.48347 3.2087 4.49569 3.32146 4.54239C3.43421 4.5891 3.53058 4.66819 3.59839 4.76966C3.66619 4.87114 3.70238 4.99044 3.70238 5.11248C3.70238 5.27614 3.63737 5.43309 3.52165 5.54881C3.40593 5.66454 3.24897 5.72955 3.08532 5.72955ZM4.93651 5.72955C4.81446 5.72955 4.69516 5.69336 4.59368 5.62555C4.49221 5.55775 4.41312 5.46138 4.36642 5.34862C4.31971 5.23587 4.30749 5.1118 4.3313 4.9921C4.35511 4.8724 4.41388 4.76245 4.50018 4.67615C4.58648 4.58986 4.69643 4.53109 4.81612 4.50728C4.93582 4.48347 5.05989 4.49569 5.17265 4.54239C5.2854 4.5891 5.38177 4.66819 5.44958 4.76966C5.51738 4.87114 5.55357 4.99044 5.55357 5.11248C5.55357 5.27614 5.48856 5.43309 5.37284 5.54881C5.25711 5.66454 5.10016 5.72955 4.93651 5.72955ZM6.7877 5.72955C6.66565 5.72955 6.54635 5.69336 6.44487 5.62555C6.3434 5.55775 6.26431 5.46138 6.2176 5.34862C6.1709 5.23587 6.15868 5.1118 6.18249 4.9921C6.2063 4.8724 6.26507 4.76245 6.35137 4.67615C6.43766 4.58986 6.54762 4.53109 6.66731 4.50728C6.78701 4.48347 6.91108 4.49569 7.02384 4.54239C7.13659 4.5891 7.23296 4.66819 7.30077 4.76966C7.36857 4.87114 7.40476 4.99044 7.40476 5.11248C7.40476 5.27614 7.33975 5.43309 7.22403 5.54881C7.1083 5.66454 6.95135 5.72955 6.7877 5.72955Z" />
                          </g>
                        </svg>   
                        450 Comment
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="blog-thumb">
              <img src="/assets/img/inner-page/blog-thumb-img.png" alt="" />
              <Link legacyBehavior href="/blog-grid"><a>20 July, 2023</a></Link>
            </div>
            <div className="blog-content">
              <h1>Vestibulum leo ex posueret eurot lobortis utoo beauty.</h1>
              <p>Mauris et enim magna. Quisque ornare vitae nibh eget tincidunt. In purus orci, iaculis iaculis turpis europeat, molestie rhoncus turpis. Nullam at urna bibendum, vulputate purus non, facilisis turpis. Mauris sit amet semle vitae neque condimentum viverra ut sed massa. Phasellus tortor arcu, placerat vel odio quis, commodo offert pellentesque leo. Cras mollis tempus risus sit amet pellentesque. Nam et augue faucibus, consequat turpison eget, tristique velit.</p>
              <p>Mauris et enim magna. Quisque ornare vitae nibh eget tincidunt. In purus orci, iaculis iaculis turpis europeat, molestie rhoncus turpis. Nullam at urna bibendum, vulputate purus non, facilisis turpis. Mauris sit amet semle vitae neque condimentum viverra ut sed massa.</p>
              <h3>Vestibulum leo ex posueret</h3>
              <p>Mauris et enim magna. Quisque ornare vitae nibh eget tincidunt. In purus orci, iaculis iaculis turpis europeat, molestie rhoncus turpis. Nullam at urna bibendum, vulputate purus non, facilisis turpis. Mauris sit amet semle vitae neque condimentum viverra ut sed massa. Phasellus tortor arcu, placerat vel odio quis, commodo offert pellentesque leo. Cras mollis tempus risus sit amet pellentesque. Nam et augue faucibus, consequat turpison eget, tristique velit.</p>
              <blockquote>
                <p>Mauris et enim magna quisque ornaret vitae nibbah egeto tincidunt. In purus orci, iaculis iaculis turpis european nori wordless more than work.</p>
              </blockquote>
              <h3>Donec blandit fermentum.</h3>
              <p>Mauris et enim magna. Quisque ornare vitae nibh eget tincidunt. In purus orci, iaculis iaculis turpis europeat, molestie rhoncus turpis. Nullam at urna bibendum, vulputate purus non, facilisis turpis. Mauris sit amet semle vitae neque condimentum viverra ut sed massa.</p>
              <div className="blog-details-img-group">
                <div className="row g-4">
                  <div className="col-lg-6">
                    <div className="blog-details-img">
                      <img src="/assets/img/inner-page/blog-details-group-img1.png" alt="" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="blog-details-img">
                      <img src="/assets/img/inner-page/blog-details-group-img2.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <p>Mauris et enim magna. Quisque ornare vitae nibh eget tincidunt. In purus orci, iaculis iaculis turpis europeat, molestie rhoncus turpis. Nullam at urna bibendum, vulputate purus non, facilisis turpis. Mauris sit amet semle vitae neque condimentum viverra ut sed massa. Phasellus tortor arcu, placerat vel odio quis, commodo offert pellentesque leo. Cras mollis tempus risus sit amet pellentesque. Nam et augue faucibus, consequat turpison eget, tristique velit.</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="sidebar-area">
              <div className="shop-widget mb-30">
                <h5 className="shop-widget-title">Search Here</h5>
                <form>
                  <div className="search-box">
                    <input type="text" placeholder="Search Here" />
                    <button type="submit"><i className="bx bx-search" /></button>
                  </div>
                </form>
              </div>
              <div className="shop-widget mb-30">
                <div className="check-box-item">
                  <h5 className="shop-widget-title">Categories</h5>
                  <ul className="shop-item">
                    <li>
                      <Link legacyBehavior href="/blog-grid"><a>All Product</a></Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/blog-grid"><a>Healthy &amp; Natural</a></Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/blog-grid"><a>Beauty &amp; Cosmetics</a></Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/blog-grid"><a>Selfcare Veggies</a></Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/blog-grid"><a>Personal Care</a></Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/blog-grid"><a>Men’s Collections</a></Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/blog-grid"><a>kids &amp; Baby Set</a></Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/blog-grid"><a>Summer product</a></Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="shop-widget mb-30">
                <h5 className="shop-widget-title">Recent Post</h5>
                <div className="recent-post-widget mb-20">
                  <div className="recent-post-img">
                    <Link legacyBehavior href="/blog-details"><a><img src="/assets/img/inner-page/recent-post-img1.png" alt="" /></a></Link>
                  </div>
                  <div className="recent-post-content">
                    <Link legacyBehavior href="/blog-grid"><a>20 July, 2023</a></Link>
                    <h6><Link legacyBehavior href="/blog-details"><a>Poutsicle Hydrating Lipo Stain offering.</a></Link></h6>
                  </div>
                </div>
                <div className="recent-post-widget mb-20">
                  <div className="recent-post-img">
                    <Link legacyBehavior href="/blog-details"><a><img src="/assets/img/inner-page/recent-post-img2.png" alt="" /></a></Link>
                  </div>
                  <div className="recent-post-content">
                    <Link legacyBehavior href="/blog-grid"><a>12 July, 2023</a></Link>
                    <h6><Link legacyBehavior href="/blog-details"><a>rutrum vitae augue idel euismod pulvi.</a></Link></h6>
                  </div>
                </div>
                <div className="recent-post-widget mb-20">
                  <div className="recent-post-img">
                    <Link legacyBehavior href="/blog-details"><a><img src="/assets/img/inner-page/recent-post-img3.png" alt="" /></a></Link>
                  </div>
                  <div className="recent-post-content">
                    <Link legacyBehavior href="/blog-grid"><a>04 July, 2023</a></Link>
                    <h6><Link legacyBehavior href="/blog-details"><a>Donec blandit fermentu diam non.</a></Link></h6>
                  </div>
                </div>
              </div>
              <div className="shop-widget">
                <h5 className="shop-widget-title">Tags</h5>
                <ul className="tag-list">
                  <li>
                    <Link legacyBehavior href="/blog-grid"><a> Makeup</a></Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/blog-grid"><a> Organic</a></Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/blog-grid"><a> Skin Care</a></Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/blog-grid"><a> Beauty Care</a></Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/blog-grid"><a> Herbal</a></Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/blog-grid"><a> Handmade</a></Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/blog-grid"><a> Zerowaste</a></Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/blog-grid"><a> Women Fashion</a></Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/blog-grid"><a> Natural</a></Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-tag-and-social">
          <div className="tag">
            <h6>Tag: </h6>
            <ul className="tag-list">
              <li>
                <Link legacyBehavior href="/blog-grid"><a> Makeup</a></Link>
              </li>
              <li>
                <Link legacyBehavior href="/blog-grid"><a> Organic</a></Link>
              </li>
              <li>
                <Link legacyBehavior href="/blog-grid"><a> Skin Care</a></Link>
              </li>
              <li>
                <Link legacyBehavior href="/blog-grid"><a> Beauty Care</a></Link>
              </li>
            </ul>
          </div>
          <div className="social">
            <h6>Share On:</h6>
            <ul className="social-list">
              <li>
                <a href="https://www.facebook.com/"><i className="fab fa-facebook-f" /></a>
              </li>
              <li>
                <a href="https://twitter.com/"><i className="fab fa-twitter" /></a>
              </li>
              <li>
                <a href="https://www.pinterest.com/"><i className="fab fa-pinterest-p" /></a>
              </li>
              <li>
                <a href="https://www.instagram.com/"><i className="fab fa-instagram" /></a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row mb-110">
          <div className="col-lg-12">
            <div className="blog-details-navigation">
              <div className="single-navigation">
                <div className="content">
                  <Link legacyBehavior href="/blog-details"><a>Previous</a></Link>
                  <h4><Link legacyBehavior href="/blog-details"><a>Nam condimentum ante at</a></Link></h4>
                </div>
                <Link legacyBehavior href="/blog-details">
                  <a  className="nav-icon"><svg width={18} height={18} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 17.4854L1.51472 9.00007M1.51472 9.00007L10 0.514789M1.51472 9.00007L17.4246 9.35362" />
                  </svg>  </a>
                </Link>
              </div>
              <div className="single-navigation two">
                <Link legacyBehavior href="/blog-details">
                  <a  className="nav-icon"><svg width={18} height={18} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 0.514648L16.4853 8.99993M16.4853 8.99993L8 17.4852M16.4853 8.99993L0.575379 8.64638" />
                  </svg></a>
                </Link>
                <div className="content">
                  <Link legacyBehavior href="/blog-details"><a>NEXT </a></Link>
                  <h4><Link legacyBehavior href="/blog-details"><a>Vestibulum eu sapien velit</a></Link></h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-9">
            <div className="comment-section" id="comment">
              <div className="comment-title">
                <h3>2 Comment</h3>
              </div>
              <ul className="author-comment mb-100">
                <li>
                  <div className="author-img">
                    <img src="/assets/img/inner-page/comment-author1.png " alt="" />
                  </div>
                  <div className="comment-content">
                    <div className="author-post">
                      <div className="author-info">
                        <h5>Polard Girdet</h5>
                        <span> 02 June,2023 &nbsp; &nbsp;10.30PM</span>
                      </div>
                      <div className="reply">
                        <a href="#">
                          <i className="bi bi-arrow-return-right" />
                          Reply
                        </a>
                      </div>
                    </div>
                    <p>Odio tellus, dignissim fermentumara purus nec, consequat dapibus metus.Vivamusut urna world classo mauris, faucibus at egestas quis, fermentum egetonav neque. Duisonajt pharetra lectus nec risusonota and we are always support our customer support available.</p>
                  </div>
                </li>
                <li>
                  <div className="author-img">
                    <img src="/assets/img/inner-page/comment-author2.png " alt="" />
                  </div>
                  <div className="comment-content">
                    <div className="author-post">
                      <div className="author-info">
                        <h5>James Jordan</h5>
                        <span> 04 June,2023 &nbsp; &nbsp;12.30PM</span>
                      </div>
                      <div className="reply">
                        <a href="#">
                          <i className="bi bi-arrow-return-right" />
                          Reply
                        </a>
                      </div>
                    </div>
                    <p>Odio tellus, dignissim fermentumara purus nec, consequat dapibus metus.Vivamusut urna world classo mauris, faucibus at egestas quis, fermentum egetonav neque. Duisonajt pharetra lectus nec risusonota and we are always support our customer support available.</p>
                  </div>
                </li>
              </ul>
              <div className="comment-title">
                <h3>Leave A Comment</h3>
              </div>
              <form className="contact-form">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-inner mb-40">
                      <input type="text" placeholder="Enter Your Name" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-inner mb-40">
                      <input type="email" placeholder="Enter your email" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-inner mb-40">
                      <input type="text" placeholder="Subject" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-inner mb-40">
                      <textarea rows={5} placeholder="Your Messege" defaultValue={""} />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <button type="submit" className="primary-btn1 hover-btn3">Post a Comment</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogDetailsPage
