import React from "react";

const TopCards = () => {
  return (
    <div>
      <div className="flex items-center bg-gray-100 dark:bg-gray-900">
        <div className="container max-w-6xl px-5 mx-auto">
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 md:grid-cols-2">
            <div className="p-5 bg-white rounded-2xl shadow-sm dark:bg-gray-800">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="flex items-center justify-center lg:w-16 lg:h-16 xl:w-10 xl:h-10 rounded-full bg-danger-100 text-danger">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-shopping-cart xl:w-7 xl:h-7"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      stroke-width="1.75"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                      <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                      <path d="M17 17h-11v-14h-2"></path>
                      <path d="M6 5l14 1l-1 7h-13"></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="lg:flex">
                  <div className="text-gray-400 dark:text-white">المبيعات</div> {/* Use dark:text-white */}
                    <span className="flex items-center px-2 py-0.5 mx-2 text-sm text-success dark:bg-success-100 dark:text-success bg-success-100 rounded-full">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 15L12 9L6 15"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                      <span>1.8%</span>
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    $9850.90
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 bg-white rounded-2xl shadow-sm dark:bg-gray-800">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="flex items-center justify-center lg:w-16 lg:h-16 xl:w-10 xl:h-10 rounded-full bg-warning-100 text-warning">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-credit-card xl:w-7 xl:h-7"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      stroke-width="1.75"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M3 5m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z"></path>
                      <path d="M3 10l18 0"></path>
                      <path d="M7 15l.01 0"></path>
                      <path d="M11 15l2 0"></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="flex">
                    <div className="text-gray-400 dark:text-white">الطلبات</div>
                    <span className="flex items-center px-2 py-0.5 mx-2 text-sm text-success dark:bg-success-100 dark:text-success bg-success-100 rounded-full">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 15L12 9L6 15"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                      <span>1.8%</span>
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">350</div>
                </div>
              </div>
            </div>
            <div className="p-5 bg-white rounded-2xl shadow-sm dark:bg-gray-800">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="flex items-center justify-center lg:w-16 lg:h-16 xl:w-10 xl:h-10 rounded-full bg-success-100 text-success">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="xl:w-7 xl:h-7"
                    >
                      <path
                        d="M19.7712 13.1046C20.7714 12.1044 21.3333 10.7478 21.3333 9.33333C21.3333 7.91885 20.7714 6.56229 19.7712 5.5621C18.771 4.5619 17.4145 4 16 4C14.5855 4 13.2289 4.5619 12.2288 5.5621C11.2286 6.56229 10.6667 7.91885 10.6667 9.33333C10.6667 10.7478 11.2286 12.1044 12.2288 13.1046C13.2289 14.1048 14.5855 14.6667 16 14.6667C17.4145 14.6667 18.771 14.1048 19.7712 13.1046Z"
                        stroke="currentColor"
                        stroke-width="1.75"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M9.40033 21.4003C11.1507 19.65 13.5246 18.6667 16 18.6667C18.4753 18.6667 20.8493 19.65 22.5997 21.4003C24.35 23.1507 25.3333 25.5246 25.3333 28H6.66666C6.66666 25.5246 7.64999 23.1507 9.40033 21.4003Z"
                        stroke="currentColor"
                        stroke-width="1.75"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="flex">
                    <div className="text-gray-400 dark:text-white">العملاء</div>
                    <span className="flex items-center px-2 py-0.5 mx-2 text-sm text-success dark:bg-success-100 dark:text-success bg-success-100 rounded-full">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 15L12 9L6 15"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                      <span>1.8%</span>
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">1375</div>
                </div>
              </div>
            </div>
            <div className="p-5 bg-white rounded-2xl shadow-sm dark:bg-gray-800">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="flex items-center justify-center lg:w-16 lg:h-16 xl:w-10 xl:h-10 rounded-full bg-primary-100 text-primary">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="xl:w-7 xl:h-7"
                    >
                      <path
                        d="M12 25.3333V17.3333C12 16.6261 11.719 15.9478 11.219 15.4477C10.7189 14.9476 10.0406 14.6667 9.33333 14.6667H6.66667C5.95942 14.6667 5.28115 14.9476 4.78105 15.4477C4.28095 15.9478 4 16.6261 4 17.3333V25.3333C4 26.0406 4.28095 26.7189 4.78105 27.219C5.28115 27.719 5.95942 28 6.66667 28H9.33333C10.0406 28 10.7189 27.719 11.219 27.219C11.719 26.7189 12 26.0406 12 25.3333ZM12 25.3333V12C12 11.2928 12.281 10.6145 12.781 10.1144C13.2811 9.61428 13.9594 9.33333 14.6667 9.33333H17.3333C18.0406 9.33333 18.7189 9.61428 19.219 10.1144C19.719 10.6145 20 11.2928 20 12V25.3333M12 25.3333C12 26.0406 12.281 26.7189 12.781 27.219C13.2811 27.719 13.9594 28 14.6667 28H17.3333C18.0406 28 18.7189 27.719 19.219 27.219C19.719 26.7189 20 26.0406 20 25.3333M20 25.3333V6.66667C20 5.95942 20.281 5.28115 20.781 4.78105C21.2811 4.28095 21.9594 4 22.6667 4H25.3333C26.0406 4 26.7189 4.28095 27.219 4.78105C27.719 5.28115 28 5.95942 28 6.66667V25.3333C28 26.0406 27.719 26.7189 27.219 27.219C26.7189 27.719 26.0406 28 25.3333 28H22.6667C21.9594 28 21.2811 27.719 20.781 27.219C20.281 26.7189 20 26.0406 20 25.3333Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="flex">
                    <div className="text-gray-400 dark:text-white">المطعام</div>
                    <span className="flex items-center px-2 py-0.5 mx-2 text-sm text-danger bg-danger-100 dark:bg-danger-100 dark:text-danger  rounded-full">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                      <span>2.5%</span>
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">32</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCards;
