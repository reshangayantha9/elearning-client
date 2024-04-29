import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer>
  <div className="border border-[#0000000e] dark:border-[#ffffff1e]" />
  <br />
  <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
      <div className="space-y-3">
        <h3 className="text-[20px] font-[600] text-black dark:text-white">
          About
        </h3>
        <ul className="space-y-4">
          <li>
            <a
              className="text-base text-black dark:text-gray-300 dark:hover:text-white"
              href="/about"
            >
              Our Story
            </a>
          </li>
          <li>
            <a
              className="text-base text-black dark:text-gray-300 dark:hover:text-white"
              href="/privacy-policy"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              className="text-base text-black dark:text-gray-300 dark:hover:text-white"
              href="/faq"
            >
              FAQ
            </a>
          </li>
        </ul>
      </div>
      <div className="space-y-3">
        <h3 className="text-[20px] font-[600] text-black dark:text-white">
          Quick Links
        </h3>
        <ul className="space-y-4">
          <li>
            <a
              className="text-base text-black dark:text-gray-300 dark:hover:text-white"
              href="/courses"
            >
              Courses
            </a>
          </li>
          <li>
            <a
              className="text-base text-black dark:text-gray-300 dark:hover:text-white"
              href="/profile"
            >
              My Account
            </a>
          </li>
          <li>
            <a
              className="text-base text-black dark:text-gray-300 dark:hover:text-white"
              href="/course-dashboard"
            >
              Course Dashboard
            </a>
          </li>
        </ul>
      </div>
      <div className="space-y-3">
        <h3 className="text-[20px] font-[600] text-black dark:text-white">
          Social Links
        </h3>
        <ul className="space-y-4">
          <li>
            <a
              className="text-base text-black dark:text-gray-300 dark:hover:text-white"
              href="#"
            >
              Youtube
            </a>
          </li>
          <li>
            <a
              className="text-base text-black dark:text-gray-300 dark:hover:text-white"
              href="#"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              className="text-base text-black dark:text-gray-300 dark:hover:text-white"
              href="#"
            >
              github
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-[20px] font-[600] text-black dark:text-white pb-3">
          Contact Info
        </h3>
        <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
          Call Us: 1-885-665-2022
        </p>
        <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
          Address: +7011 Vermont Ave, Los Angeles, CA 90044
        </p>
        <p className="text-base text-black dark:text-gray-300 dark:hover:text-white  pb-2">
          Mail Us: hello@elearning.com
        </p>
      </div>
    </div>
    <br />
    <p className="text-center text-black dark:text-white">
      Copyright © 2024 ELearning | All Rights Reserved
    </p>
  </div>
  <br />
</footer>

  )
}

export default Footer