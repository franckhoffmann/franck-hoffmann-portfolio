import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router'
import '@/styles/index.css'

import Home from '@/pages/Home'
import SailPointDashboard from '@/pages/SailPointDashboard'
import Tekmetric from '@/pages/Tekmetric'
import SailPointWorkflows from '@/pages/SailPointWorkflows'
import Uber from '@/pages/Uber'
import OrangeLogic from '@/pages/OrangeLogic'
import ArtAndCommerce from '@/pages/ArtAndCommerce'
import ComingSoon from '@/pages/ComingSoon'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// The base path must match vite's base config (set via VITE_BASE_PATH env var).
// For GitHub Pages: VITE_BASE_PATH=/your-repo-name/
const basename = import.meta.env.BASE_URL

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Placeholder routes */}
        <Route path="/who" element={<ComingSoon title="Who" />} />
        <Route path="/how" element={<ComingSoon title="How" />} />
        <Route path="/why" element={<ComingSoon title="Why" />} />
        <Route path="/what/sailpoint-dashboard" element={<SailPointDashboard />} />
        <Route path="/what/tekmetric" element={<Tekmetric />} />
        <Route path="/what/sailpoint-workflows" element={<SailPointWorkflows />} />
        <Route path="/what/uber" element={<Uber />} />
        <Route path="/what/orange-logic" element={<OrangeLogic />} />
        <Route path="/what/art-and-commerce" element={<ArtAndCommerce />} />
        <Route path="/leadership" element={<ComingSoon title="Leadership" />} />
        <Route path="/endorsements" element={<ComingSoon title="Endorsements" />} />
        <Route path="/resume" element={<ComingSoon title="Resume" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
