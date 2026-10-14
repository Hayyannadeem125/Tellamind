import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function NotFoundPage() {
  return <section className="not-found section-wrap"><span className="not-found-code">404</span><h1>This page took <em>a different path.</em></h1><p>The link may have changed or the page may no longer be here. You can head back to the homepage or explore our services.</p><div><Link className="button button-dark" to="/">Back to home <ArrowLeft size={15}/></Link><Link className="text-link" to="/services">Explore services <ArrowRight size={15}/></Link></div></section>;
}
