import React from 'react';

// Import partner logos
import awsLogo from '../assets/aws.jpg';
import miicLogo from '../assets/miic.jpg';
import mukLogo from '../assets/muk logo.jpg';
import oxfordLogo from '../assets/oxford.jpg';
import standardCharteredLogo from '../assets/standard-chartered-bank-uganda-seeklogo.png';
import villageCapitalLogo from '../assets/villagecapital.jpg';
import clinitouchLogo from '../assets/clinitouch.jpg';
import tech2Logo from '../assets/tech2.jpg';
import upgLogo from '../assets/upg.png';
import accessLogo from '../assets/access.jpg';

const Partners: React.FC = () => {
  const partners = [
    { name: 'AWS', logo: awsLogo },
    { name: 'MIIC', logo: miicLogo },
    { name: 'Makerere University', logo: mukLogo },
    { name: 'Oxford', logo: oxfordLogo },
    { name: 'Standard Chartered Bank', logo: standardCharteredLogo },
    { name: 'Village Capital', logo: villageCapitalLogo },
    { name: 'Clinitouch', logo: clinitouchLogo },
    { name: 'Tech Partner 2', logo: tech2Logo },
    { name: 'UPG', logo: upgLogo },
    { name: 'Access', logo: accessLogo },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Partners
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We collaborate with leading organizations and institutions to drive innovation in healthcare research and technology.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 w-full h-32 flex items-center justify-center"
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="max-w-full max-h-full object-contain transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Interested in partnering with us?{' '}
            <a href="/contact" className="text-blue-600 hover:text-blue-700 underline">
              Get in touch
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Partners;