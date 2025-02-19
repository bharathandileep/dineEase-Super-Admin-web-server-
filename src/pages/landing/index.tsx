import React from "react";
import ContactUs from "./ContactUs";
import { Hero } from "./Hero";
import { NavigationBar } from "./NavigationBar";
import Features from "./Features";
import Benefits from "./Benefits";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import Metrics from "./Metrics";
import PlatformHighlights from "./PlatformHighlights";
import AppDownload from "./AppDownload";
import Footer from "./Footer";

function index() {
  return (
    <div>
      <NavigationBar />
      <Hero />
      <Features />
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <Metrics />
      <PlatformHighlights />
      <AppDownload />
      <Footer  />
    </div>
  );
}
export default index;
