import React from 'react'

const Footer = () => {
  return (
    <footer id="footer" className="pt-16 pb-8 text-white bg-[#5CB338]">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-2 lg:grid-cols-4">
          {/* <!-- University Info --> */}
          <div className="animate__animated animate__fadeIn animate__fadeInUp"
            style={{ visibility: 'visible' }}>
            <h3 className="mb-6 text-2xl font-bold">Everest University</h3>
            <p className="mb-6 text-white">Empowering minds, shaping futures through excellence in education.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white transition-colors hover:text-gray-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                </svg>
              </a>
              <a href="#" className="text-white transition-colors hover:text-gray-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                </svg>
              </a>
              <a href="#" className="text-white transition-colors hover:text-gray-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.016 18.6h-2.472v-3.9c0-.918-.018-2.1-1.278-2.1-1.28 0-1.476 1.002-1.476 2.04v3.96H9.318V9.6h2.375v1.08h.033c.33-.624 1.137-1.284 2.34-1.284 2.505 0 2.97 1.65 2.97 3.795V18.6zM7.63 8.52c-.792 0-1.434-.642-1.434-1.434 0-.792.642-1.434 1.434-1.434.792 0 1.434.642 1.434 1.434 0 .792-.642 1.434-1.434 1.434zM6.39 18.6h2.484V9.6H6.39v9z"></path>
                </svg>
              </a>
              <a href="#" className="text-white transition-colors hover:text-gray-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* <!-- Quick Links --> */}
          <div className="animate__animated animate__fadeIn animate__fadeInUp">
            <h3 className="mb-6 text-xl font-bold">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="#academics" className="text-white transition-colors hover:text-gray-200">Academics</a></li>
              <li><a href="#admissions" className="text-white transition-colors hover:text-gray-200">Admissions</a></li>
              <li><a href="#campuslife" className="text-white transition-colors hover:text-gray-200">Campus Life</a></li>
              <li><a href="#newsevents" className="text-white transition-colors hover:text-gray-200">News &amp; Events</a></li>
              <li><a href="#alumni" className="text-white transition-colors hover:text-gray-200">Alumni</a></li>
            </ul>
          </div>

          {/* <!-- Contact Info --> */}
          <div className="animate__animated animate__fadeIn animate__fadeInUp">
            <h3 className="mb-6 text-xl font-bold">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span className="text-white">123 University Ave, City, State</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span className="text-white">+1(555)123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span className="text-white">info@EverestUni.edu</span>
              </li>
            </ul>
          </div>

          {/* <!-- Newsletter --> */}
          <div className="animate__animated animate__fadeIn animate__fadeInUp">
            <h3 className="mb-6 text-xl font-bold">Newsletter</h3>
            <p className="mb-4 text-white">Subscribe to our newsletter for updates</p>
            <form className="space-y-4">
              <input type="email" placeholder="Your email address" className="w-full px-4 py-2 text-gray-700 border rounded-lg bg-white border-[#4AA02C] focus:outline-none focus:ring-2 focus:ring-white" />
              <button type="submit" className="w-full py-2 transition-colors bg-white text-[#5CB338] rounded-lg font-semibold hover:bg-gray-200">Subscribe</button>
            </form>
          </div>
        </div>

        {/* <!-- Bottom Bar --> */}
        <div className="pt-8 mt-8 border-t border-white">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="mb-4 text-sm text-white md:mb-0">© 2024 Everest University. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-white transition-colors hover:text-gray-200">Privacy Policy</a>
              <a href="#" className="text-sm text-white transition-colors hover:text-gray-200">Terms of Service</a>
              <a href="#" className="text-sm text-white transition-colors hover:text-gray-200">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer