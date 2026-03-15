import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import '@/styles/index.css'

import Home from '@/pages/Home'
import SailPointDashboard from '@/pages/SailPointDashboard'
import ComingSoon from '@/pages/ComingSoon'

// The base path must match vite's base config (set via VITE_BASE_PATH env var).
// For GitHub Pages: VITE_BASE_PATH=/your-repo-name/
const basename = import.meta.env.BASE_URL

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sailpoint-dashboard" element={<SailPointDashboard />} />
        {/* Placeholder routes */}
        <Route path="/who" element={<ComingSoon title="Who" />} />
        <Route path="/how" element={<ComingSoon title="How" />} />
        <Route path="/why" element={<ComingSoon title="Why" />} />
        <Route path="/tekmetric" element={<ComingSoon title="Tekmetric" />} />
        <Route path="/sailpoint-workflows" element={<ComingSoon title="SailPoint Workflows" />} />
        <Route path="/uber" element={<ComingSoon title="Uber" />} />
        <Route path="/orange-logic" element={<ComingSoon title="Orange Logic" />} />
        <Route path="/art-commerce" element={<ComingSoon title="Art + Commerce" />} />
        <Route path="/leadership" element={<ComingSoon title="Leadership" />} />
        <Route path="/endorsements" element={<ComingSoon title="Endorsements" />} />
        <Route path="/resume" element={<ComingSoon title="Resume" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
