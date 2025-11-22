import React from 'react';
import { getIconComponent } from "../../data/DataContactSection.jsx";
import { useTranslation } from '../../hooks/useTranslation'; 

const InfoCard = ({ info }) => {
  const IconComponent = getIconComponent(info);

  return (
    <div className="border border-gray-200 p-6 rounded-xl shadow-sm bg-white">
      <div className="flex justify-start mb-4">
        <IconComponent className="w-8 h-8 text-blue-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
      {info.details.map((detail, index) => (
        <p key={index} className="text-gray-600 text-sm leading-relaxed">
          {detail}
        </p>
      ))}
    </div>
  );
};

export const ContactSection = () => {
  const { t } = useTranslation();
  
  const contactInfoData = [
    {
      iconName: 'MapPin',
      title: t.contact.location,
      details: [t.contact.locationValue],
      fallbackIcon: null,
    },
    {
      iconName: 'Mail',
      title: t.contact.emailAddress,
      details: [t.contact.emailValue],
      fallbackIcon: null,
    },
    {
      iconName: 'Phone',
      title: t.contact.phoneNumber,
      details: [t.contact.phoneValue],
      fallbackIcon: null,
    },
    {
      iconName: 'Clock',
      title: t.contact.availability,
      details: [t.contact.availabilityValue],
      fallbackIcon: null,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire soumis. Envoi simulé.");
  };

  return (
    <section id="contact" className="bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="lg:flex lg:gap-16 items-start">
          <div className="lg:w-2/5 mb-10 lg:mb-0 pt-10 lg:pt-0">
            <h3 className="text-xl font-semibold text-gray-400 flex items-center mb-2">
              <span className="text-blue-400 mr-2">/</span> {t.contact.subtitle}
            </h3>
            <h2 className="text-5xl sm:text-6xl font-extrabold text-white mb-6">
              {t.contact.title}
            </h2>
            <p className="text-gray-400 leading-relaxed text-lg max-w-md">
              {t.contact.description}
            </p>
          </div>
          <div className="lg:w-3/5">
            <div className="bg-gray-100 p-8 md:p-12 rounded-xl shadow-2xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">{t.contact.formTitle}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder={t.contact.firstName}
                    className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                  <input
                    type="text"
                    placeholder={t.contact.lastName}
                    className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>
                <input
                  type="email"
                  placeholder={t.contact.email}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
                <input
                  type="tel"
                  placeholder={t.contact.mobile}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                />
                <textarea
                  placeholder={t.contact.message}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                ></textarea>
                <div className="text-center pt-2">
                  <button
                    type="submit"
                    className="px-8 py-3 text-lg font-semibold text-white bg-gray-900 rounded-lg shadow-xl hover:bg-gray-700 transition duration-300 uppercase tracking-widest"
                  >
                    {t.contact.sendMessage}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-10 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfoData.map((info, index) => (
              <InfoCard key={index} info={info} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContactSection;