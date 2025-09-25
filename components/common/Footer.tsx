import React from "react";
import FooterTop from "./FooterTop";
import Container from "./Container";
import { categoriesData, quickLinksData } from "@/constant/data";
import Link from "next/link";
import SocialMedia from "./SocialMedia";
import SubLogo from "./SubLogo";

const Footer = () => {
  return (
    <footer className="bg-tech_white border-t">
      <Container>
        <FooterTop />
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <SubLogo className="w-40 mb-4" />
            <p className="text-tech_light_color text-sm">
              Discover curated product collections at Freshcart, blending style
              and comfort to elevate your needs.
            </p>
            <SocialMedia
              className="text-tech_dark_color/60"
              iconClassName="border-tech_dark_color/60 hover:border-tech_orange hover:text-tech_orange"
              tooltipClassName="bg-tech_dark_color text-white"
            />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinksData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={item?.href}
                    className="text-gray-600 hover:text-tech_orange text-sm font-medium hoverEffect"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-3">
              {categoriesData.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={`/category/${item?.href}`}
                    className="text-gray-600 hover:text-tech_blue text-sm font-medium hoverEffect capitalize"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Newsletter</h3>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe to our newsletter to receive updates and exclusive
              offers.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-gray-200"
              />
              <button
                type="submit"
                className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="py-6 border-t text-center text-sm text-tech_light_color">
          <Link href={"https://www.linkedin.com/in/noureldin-sw/"}>
            © {new Date().getFullYear()}{" "}
            <span className="text-tech_dark font-black tracking-wider uppercase hover:text-tech_blue hoverEffect group font-sans">
              FRESHCAR
              <span className="text-tech_blue group-hover:text-tech_dark_color hoverEffect">
                T
              </span>
            </span>
            . All rights reserved
          </Link>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
